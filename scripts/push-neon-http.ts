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
          // Ignore duplicate keys on lookup tables
          return { ok: true, data: { ignoredDuplicate: true } };
        }
        return { ok: false, error: `HTTP ${res.status}: ${errText}` };
      }

      const data = await res.json();
      return { ok: true, data };
    } catch (err: any) {
      if (attempt === 3) {
        return { ok: false, error: err.message };
      }
      await new Promise((r) => setTimeout(r, 500 * attempt));
    }
  }
  return { ok: false, error: "Max retries reached" };
}

async function main() {
  console.log("🚀 Bắt đầu nạp dữ liệu tuần tự vào Neon PostgreSQL (Cloud)...");

  const ping = await executeSql("SELECT 1 as connected;");
  if (!ping.ok) {
    console.error("❌ Không thể kết nối tới Neon PostgreSQL:", ping.error);
    process.exit(1);
  }
  console.log("✅ Kết nối Neon PostgreSQL thành công!");

  // Use seed-prod.sql (or seed.sql)
  const seedPath = path.join(process.cwd(), "database", "seed-prod.sql");
  console.log(`📄 Đang đọc file seed từ ${seedPath}...`);
  const content = fs.readFileSync(seedPath, "utf-8");

  const rawLines = content.split("\n");
  const statements: string[] = [];
  let currentStmt: string[] = [];

  for (const line of rawLines) {
    const trimmed = line.trim();
    if (trimmed.startsWith("--") || trimmed === "") {
      continue;
    }
    currentStmt.push(line);
    if (trimmed.endsWith(";")) {
      const stmt = currentStmt.join("\n").trim();
      if (
        stmt &&
        stmt.toUpperCase() !== "BEGIN;" &&
        stmt.toUpperCase() !== "COMMIT;" &&
        !stmt.toUpperCase().startsWith("SET SEARCH_PATH")
      ) {
        statements.push(stmt);
      }
      currentStmt = [];
    }
  }

  console.log(`📊 Tìm thấy tổng cộng ${statements.length} câu lệnh SQL.`);

  let succeeded = 0;
  let failed = 0;
  const startTime = Date.now();

  for (let i = 0; i < statements.length; i++) {
    const stmt = statements[i];
    const res = await executeSql(stmt);
    if (res.ok) {
      succeeded++;
    } else {
      failed++;
      console.warn(`⚠️ Lỗi câu lệnh #${i + 1} (${stmt.slice(0, 60)}...): ${res.error?.slice(0, 200)}`);
    }

    if ((i + 1) % 25 === 0 || i === statements.length - 1) {
      const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
      console.log(`⏳ Đã nạp ${i + 1}/${statements.length} (${((i + 1) / statements.length * 100).toFixed(1)}%) - ${elapsed}s (OK: ${succeeded}, Lỗi: ${failed})`);
    }
  }

  console.log(`\n🎉 Hoàn thành nạp dữ liệu! Thành công: ${succeeded}, Lỗi: ${failed}`);

  // Summary counts
  const checkRes = await executeSql(`
    SELECT 
      (SELECT COUNT(*) FROM schools) as schools,
      (SELECT COUNT(*) FROM majors) as majors,
      (SELECT COUNT(*) FROM programs) as programs,
      (SELECT COUNT(*) FROM program_cutoffs) as cutoffs,
      (SELECT COUNT(*) FROM combos) as combos;
  `);

  if (checkRes.ok && checkRes.data) {
    console.log("\n📊 THỐNG KÊ SỐ LƯỢNG BẢN GHI ĐÃ LƯU TRONG POSTGRESQL:");
    console.log(JSON.stringify(checkRes.data, null, 2));
  }
}

main().catch(console.error);
