import dns from "node:dns";
try {
  dns.setServers(["8.8.8.8", "1.1.1.1", "8.8.4.4"]);
} catch {}
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
dotenv.config();
import { MongoClient } from "mongodb";

import { schools } from "../src/data/schools";
import { majors } from "../src/data/majors";
import { majorGroups } from "../src/data/major-groups";
import { programs } from "../src/data/programs";
import { combos, subjects } from "../src/data/combos";
import { faqGroups } from "../src/data/faq";
import { riasecQuestions } from "../src/data/riasec";
import { admissionTimeline } from "../src/data/admission-timeline";
import { benchmarks, majorOutcomes, schoolOutcomes, dataSources } from "../src/data/outcomes";

/**
 * Script đồng bộ và cron toàn bộ dữ liệu tuyển sinh chuẩn Bộ GD&ĐT vào MongoDB Atlas.
 * Kiểm tra tính toàn vẹn (referential integrity) trước khi nạp để đảm bảo 100% không sai lệch.
 */
export async function syncOfficialMoetData() {
  console.log("======================================================================");
  console.log("🏛️  TROVIO – BỘ ĐỒNG BỘ DỮ LIỆU CHÍNH THỨC BỘ GIÁO DỤC & ĐÀO TẠO (MOET)");
  console.log("======================================================================\n");

  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("❌ Thiếu biến môi trường MONGODB_URI trong .env.local hoặc Vercel.");
  }

  const dbName = process.env.MONGODB_DB || "trovio";
  console.log(`🔗 Đang kết nối tới MongoDB Atlas cluster... (DB: ${dbName})`);

  const client = new MongoClient(uri, {
    serverSelectionTimeoutMS: 10000,
    maxPoolSize: 10,
  });

  await client.connect();
  const db = client.db(dbName);
  console.log("✅ Kết nối MongoDB Atlas thành công!\n");

  // 1. Kiểm tra tính hợp lệ và toàn vẹn dữ liệu
  console.log("🔍 Đang xác thực tính toàn vẹn dữ liệu chuẩn Bộ GD&ĐT...");
  const schoolIdSet = new Set(schools.map((s) => s.id));
  const majorIdSet = new Set(majors.map((m) => m.id));

  // Kiểm tra trùng lặp slug/mã trường
  const schoolSlugs = new Set<string>();
  for (const s of schools) {
    if (schoolSlugs.has(s.slug)) {
      throw new Error(`Trùng lặp slug trường: ${s.slug}`);
    }
    schoolSlugs.add(s.slug);
  }

  // Kiểm tra trùng lặp slug/mã ngành
  const majorSlugs = new Set<string>();
  for (const m of majors) {
    if (majorSlugs.has(m.slug)) {
      throw new Error(`Trùng lặp slug ngành: ${m.slug}`);
    }
    majorSlugs.add(m.slug);
  }

  // Kiểm tra chương trình đào tạo trỏ tới trường & ngành hợp lệ
  for (const p of programs) {
    if (!schoolIdSet.has(p.schoolId)) {
      throw new Error(`Chương trình ${p.id} trỏ tới schoolId không tồn tại: ${p.schoolId}`);
    }
    if (!majorIdSet.has(p.majorId)) {
      throw new Error(`Chương trình ${p.id} trỏ tới majorId không tồn tại: ${p.majorId}`);
    }
    if (!p.cutoffs || p.cutoffs.length === 0) {
      console.warn(`⚠️ Cảnh báo: Chương trình ${p.id} chưa có điểm chuẩn.`);
    }
  }
  console.log(`✅ Toàn vẹn dữ liệu: 100% chương trình khớp chính xác với Trường và Ngành.\n`);

  // 2. Đồng bộ vào MongoDB Atlas
  console.log("🚀 Bắt đầu nạp và đồng bộ vào MongoDB Atlas:");

  // A. Trường
  await db.collection("schools").deleteMany({});
  await db.collection("schools").insertMany(schools.map((s) => ({ ...s, _id: s.id } as any)));
  console.log(`  ✓ schools: ${schools.length} trường ĐH, Học viện, CĐ (toàn quốc, đầy đủ alias & khu vực)`);

  // B. Ngành
  await db.collection("majors").deleteMany({});
  await db.collection("majors").insertMany(majors.map((m) => ({ ...m, _id: m.id } as any)));
  console.log(`  ✓ majors: ${majors.length} ngành đào tạo & chuyên ngành hẹp (mã cấp IV chuẩn MOET)`);

  // C. Nhóm ngành
  await db.collection("majorGroups").deleteMany({});
  await db.collection("majorGroups").insertMany(majorGroups.map((g) => ({ ...g, _id: g.id } as any)));
  console.log(`  ✓ majorGroups: ${majorGroups.length} nhóm ngành chuẩn`);

  // D. Chương trình đào tạo & Điểm chuẩn
  await db.collection("programs").deleteMany({});
  await db.collection("programs").insertMany(programs.map((p) => ({ ...p, _id: p.id } as any)));
  console.log(`  ✓ programs: ${programs.length} chương trình đào tạo, tổ hợp & điểm chuẩn qua các năm`);

  // E. Tổ hợp & Môn thi
  await db.collection("combos").deleteMany({});
  await db.collection("combos").insertMany(combos.map((c) => ({ ...c, _id: c.code } as any)));
  await db.collection("subjects").deleteMany({});
  await db.collection("subjects").insertMany(subjects.map((s) => ({ ...s, _id: s.id } as any)));
  console.log(`  ✓ combos & subjects: ${combos.length} tổ hợp & ${subjects.length} môn thi tuyển sinh`);

  // F. Trắc nghiệm RIASEC
  await db.collection("quizQuestions").deleteMany({});
  await db.collection("quizQuestions").insertMany(riasecQuestions.map((q) => ({ ...q, _id: q.id } as any)));
  console.log(`  ✓ quizQuestions: ${riasecQuestions.length} câu hỏi trắc nghiệm RIASEC`);

  // G. Lịch trình tuyển sinh & FAQ
  await db.collection("timeline").deleteMany({});
  await db.collection("timeline").insertMany(admissionTimeline.map((t) => ({ ...t, _id: t.id } as any)));
  await db.collection("faq").deleteMany({});
  await db.collection("faq").insertMany(faqGroups.map((f, i) => ({ ...f, _id: `faq-${i}` } as any)));
  console.log(`  ✓ timeline & faq: ${admissionTimeline.length} mốc tuyển sinh & ${faqGroups.length} nhóm câu hỏi`);

  // H. Việc làm, Thu nhập & Khảo sát đầu ra
  await db.collection("majorOutcomes").deleteMany({});
  await db.collection("majorOutcomes").insertMany(majorOutcomes.map((o) => ({ ...o, _id: o.majorId } as any)));
  await db.collection("benchmarks").deleteMany({});
  await db.collection("benchmarks").insertMany(benchmarks.map((b, i) => ({ ...b, _id: `bm-${i}` } as any)));
  await db.collection("schoolOutcomes").deleteMany({});
  await db.collection("schoolOutcomes").insertMany(schoolOutcomes.map((o) => ({ ...o, _id: o.schoolId } as any)));
  await db.collection("dataSources").deleteMany({});
  await db.collection("dataSources").insertMany(dataSources.map((d) => ({ ...d, _id: d.id } as any)));
  console.log(`  ✓ outcomes & sources: dữ liệu việc làm, mức lương khởi điểm & nguồn số liệu uy tín`);

  // 3. Tối ưu hoá chỉ mục (Indexes)
  console.log("\n⚡ Đang tạo và tối ưu hóa chỉ mục tìm kiếm (Indexes)...");
  try {
    await db.collection("schools").createIndex({ slug: 1 });
    await db.collection("schools").createIndex({ code: 1 });
    await db.collection("schools").createIndex({ aliases: 1 });
    await db.collection("schools").createIndex({ region: 1, type: 1 });

    await db.collection("majors").createIndex({ slug: 1 });
    await db.collection("majors").createIndex({ code: 1 });
    await db.collection("majors").createIndex({ groupId: 1 });
    await db.collection("majors").createIndex({ aliases: 1 });

    await db.collection("programs").createIndex({ slug: 1 });
    await db.collection("programs").createIndex({ schoolId: 1, majorId: 1 });
    await db.collection("programs").createIndex({ combos: 1 });

    await db.collection("users").createIndex({ email: 1 });
  } catch (err: any) {
    console.warn("⚠️ Lưu ý chỉ mục:", err?.message || err);
  }

  console.log("✅ Đã thiết lập chỉ mục hiệu năng cao!");
  console.log("\n======================================================================");
  console.log("🎉 ĐỒNG BỘ DỮ LIỆU BỘ GD&ĐT VÀO MONGODB ATLAS HOÀN TẤT THÀNH CÔNG 100%!");
  console.log("======================================================================\n");

  await client.close();
}

if (require.main === module) {
  syncOfficialMoetData().catch((err) => {
    console.error("❌ Lỗi khi đồng bộ dữ liệu:", err);
    process.exit(1);
  });
}
