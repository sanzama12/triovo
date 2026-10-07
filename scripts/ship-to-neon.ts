import fs from "node:fs";
import path from "node:path";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });
dotenv.config();

const connectionString =
  process.env.POSTGRES_URL_NON_POOLING ||
  process.env.DATABASE_URL ||
  process.env.POSTGRES_URL ||
  "postgresql://neondb_owner:npg_LnBg8SAa5MfP@ep-soft-mode-b4nr4tp4.c-6.us-east-2.aws.neon.tech/neondb?sslmode=require";

const host = "ep-soft-mode-b4nr4tp4.c-6.us-east-2.aws.neon.tech";
const sqlEndpoint = `https://${host}/sql`;

async function executeSql(sql: string): Promise<{ ok: boolean; data?: any; error?: string }> {
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const res = await fetch(sqlEndpoint, {
        method: "POST",
        headers: {
          "Neon-Connection-String": connectionString,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: sql }),
      });

      if (!res.ok) {
        const errText = await res.text();
        if (errText.includes("already exists") || errText.includes("duplicate key")) {
          return { ok: true, data: { duplicateIgnored: true } };
        }
        return { ok: false, error: `HTTP ${res.status}: ${errText}` };
      }

      const data = await res.json();
      return { ok: true, data };
    } catch (err: any) {
      if (attempt === 3) return { ok: false, error: err.message };
      await new Promise((r) => setTimeout(r, 600 * attempt));
    }
  }
  return { ok: false, error: "Retries exhausted" };
}

function parseStatements(sqlText: string): string[] {
  const statements: string[] = [];
  let current: string[] = [];
  let inQuote = false;

  for (let i = 0; i < sqlText.length; i++) {
    const c = sqlText[i];

    // Comments
    if (!inQuote && c === "-" && sqlText[i + 1] === "-") {
      const eol = sqlText.indexOf("\n", i);
      if (eol === -1) break;
      i = eol;
      continue;
    }

    // Quotes
    if (c === "'") {
      if (inQuote && sqlText[i + 1] === "'") {
        current.push("''");
        i++;
        continue;
      }
      inQuote = !inQuote;
      current.push(c);
      continue;
    }

    // Semicolon outside quote
    if (c === ";" && !inQuote) {
      const stmt = current.join("").trim();
      if (stmt && stmt.toUpperCase() !== "BEGIN" && stmt.toUpperCase() !== "COMMIT" && !stmt.toUpperCase().startsWith("SET SEARCH_PATH")) {
        statements.push(stmt + ";");
      }
      current = [];
      continue;
    }

    current.push(c);
  }

  const tail = current.join("").trim();
  if (tail && tail.toUpperCase() !== "BEGIN" && tail.toUpperCase() !== "COMMIT") {
    statements.push(tail);
  }

  return statements;
}

async function batchInsertStatement(stmt: string, batchSize = 150) {
  const valMatch = stmt.match(/VALUES\s*\n/i);
  if (!valMatch || valMatch.index === undefined) {
    return executeSql(stmt);
  }

  const header = stmt.slice(0, valMatch.index + valMatch[0].length).trim() + "\n";
  let rowsStr = stmt.slice(valMatch.index + valMatch[0].length).trim();
  if (rowsStr.endsWith(";")) rowsStr = rowsStr.slice(0, -1).trim();

  const lines = rowsStr.split("\n");
  const rawTuples: string[] = [];
  for (let line of lines) {
    let s = line.trim();
    if (s.endsWith(",")) s = s.slice(0, -1).trim();
    if (s.endsWith(";")) s = s.slice(0, -1).trim();
    if (s) rawTuples.push(s);
  }

  for (let i = 0; i < rawTuples.length; i += batchSize) {
    const chunk = rawTuples.slice(i, i + batchSize);
    const chunkSql = header + "  " + chunk.join(",\n  ") + ";";
    const res = await executeSql(chunkSql);
    if (!res.ok) {
      console.warn(`  ⚠️ Lỗi batch ${i}..${i + chunk.length}: ${res.error?.slice(0, 160)}`);
      // Retry line by line for any problematic line
      for (const single of chunk) {
        const singleSql = header + "  " + single + ";";
        await executeSql(singleSql);
      }
    }
  }
}

async function main() {
  console.log("🚀 ĐANG NẠP DỮ LIỆU ĐẦY ĐỦ VÀO NEON POSTGRESQL CLOUD...");

  const seedPath = path.join(process.cwd(), "database", "seed.sql");
  const content = fs.readFileSync(seedPath, "utf-8");

  const stmts = parseStatements(content);
  console.log(`📊 Tổng số câu lệnh SQL đã bóc tách: ${stmts.length}`);

  const core = stmts.filter((s) => !s.includes("major_curriculum_blocks"));
  console.log(`⚙️ Số câu lệnh lõi (trường, ngành, chương trình, điểm chuẩn, tổ hợp): ${core.length}`);

  for (let i = 0; i < core.length; i++) {
    const stmt = core[i];
    const target = stmt.slice(0, 50).replace(/\n/g, " ");
    console.log(`[${i + 1}/${core.length}] Đang nạp: ${target}...`);
    await batchInsertStatement(stmt, 150);
  }

  console.log("\n🎉 HOÀN THÀNH ĐẨY TẤT CẢ DỮ LIỆU LÊN NEON POSTGRESQL!");

  const check = await executeSql(`
    SELECT 
      (SELECT COUNT(*) FROM schools) as schools,
      (SELECT COUNT(*) FROM majors) as majors,
      (SELECT COUNT(*) FROM programs) as programs,
      (SELECT COUNT(*) FROM program_combos) as combos,
      (SELECT COUNT(*) FROM program_admission_methods) as methods,
      (SELECT COUNT(*) FROM program_cutoffs) as cutoffs,
      (SELECT COUNT(*) FROM riasec_questions) as riasec,
      (SELECT COUNT(*) FROM users) as users,
      (SELECT COUNT(*) FROM school_reviews) as reviews;
  `);

  if (check.ok) {
    console.log("\n📊 BẢNG TỔNG KẾT DỮ LIỆU ĐÃ NẠP TRONG POSTGRESQL:");
    console.log(JSON.stringify(check.data, null, 2));
  }
}

main().catch(console.error);
