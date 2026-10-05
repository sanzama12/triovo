import dns from "node:dns";
try {
  dns.setServers(["8.8.8.8", "1.1.1.1", "8.8.4.4"]);
} catch {
  // Ignore in environments where setting DNS servers is restricted
}
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

async function main() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error("❌ Lỗi: Chưa tìm thấy biến môi trường MONGODB_URI.");
    console.error("Vui lòng cấu hình MONGODB_URI trong file .env.local hoặc terminal.");
    console.error("Ví dụ: MONGODB_URI=mongodb+srv://<user>:<password>@cluster0.xxx.mongodb.net/trovio?retryWrites=true&w=majority");
    process.exit(1);
  }

  const dbName = process.env.MONGODB_DB || "trovio";
  console.log(`🚀 Đang kết nối tới MongoDB (${dbName})...`);

  const client = new MongoClient(uri);
  await client.connect();
  const db = client.db(dbName);
  console.log("✅ Kết nối MongoDB thành công!");

  console.log("📦 Đang nạp dữ liệu danh mục Trường, Ngành, Chuyên ngành & Chương trình...");

  // 1. Schools
  await db.collection("schools").deleteMany({});
  if (schools.length > 0) {
    await db.collection("schools").insertMany(schools.map((s: any) => ({ ...s, _id: s.id })));
  }
  console.log(`- Đã nạp ${schools.length} trường Đại học, Học viện, Cao đẳng (kèm mã viết tắt aliases)`);

  // 2. Majors
  await db.collection("majors").deleteMany({});
  if (majors.length > 0) {
    await db.collection("majors").insertMany(majors.map((m: any) => ({ ...m, _id: m.id })));
  }
  console.log(`- Đã nạp ${majors.length} ngành đào tạo & chuyên ngành hẹp`);

  // 3. Major Groups
  await db.collection("majorGroups").deleteMany({});
  if (majorGroups.length > 0) {
    await db.collection("majorGroups").insertMany(majorGroups.map((g: any) => ({ ...g, _id: g.id })));
  }
  console.log(`- Đã nạp ${majorGroups.length} nhóm ngành`);

  // 4. Programs
  await db.collection("programs").deleteMany({});
  if (programs.length > 0) {
    await db.collection("programs").insertMany(programs.map((p: any) => ({ ...p, _id: p.id })));
  }
  console.log(`- Đã nạp ${programs.length} chương trình đào tạo & điểm chuẩn`);

  // 5. Combos & Subjects
  await db.collection("combos").deleteMany({});
  if (combos.length > 0) {
    await db.collection("combos").insertMany(combos.map((c: any) => ({ ...c, _id: c.code })));
  }
  await db.collection("subjects").deleteMany({});
  if (subjects.length > 0) {
    await db.collection("subjects").insertMany(subjects.map((s: any) => ({ ...s, _id: s.id })));
  }

  // 6. RIASEC Questions
  await db.collection("quizQuestions").deleteMany({});
  if (riasecQuestions.length > 0) {
    await db.collection("quizQuestions").insertMany(riasecQuestions.map((q: any) => ({ ...q, _id: q.id })));
  }

  // 7. FAQ & Timeline
  await db.collection("faq").deleteMany({});
  if (faqGroups.length > 0) {
    await db.collection("faq").insertMany(faqGroups.map((f: any, i: number) => ({ ...f, _id: `faq-${i}` })));
  }
  await db.collection("timeline").deleteMany({});
  if (admissionTimeline.length > 0) {
    await db.collection("timeline").insertMany(admissionTimeline.map((t: any) => ({ ...t, _id: t.id })));
  }

  // 8. Outcomes & Benchmarks
  await db.collection("majorOutcomes").deleteMany({});
  if (majorOutcomes.length > 0) {
    await db.collection("majorOutcomes").insertMany(majorOutcomes.map((o: any) => ({ ...o, _id: o.majorId })));
  }
  await db.collection("benchmarks").deleteMany({});
  if (benchmarks.length > 0) {
    await db.collection("benchmarks").insertMany(benchmarks.map((b: any, i: number) => ({ ...b, _id: `bm-${i}` })));
  }
  await db.collection("schoolOutcomes").deleteMany({});
  if (schoolOutcomes.length > 0) {
    await db.collection("schoolOutcomes").insertMany(schoolOutcomes.map((o: any) => ({ ...o, _id: o.schoolId })));
  }
  await db.collection("dataSources").deleteMany({});
  if (dataSources.length > 0) {
    await db.collection("dataSources").insertMany(dataSources.map((s: any) => ({ ...s, _id: s.id })));
  }

  // Create indexes for fast queries
  await db.collection("schools").createIndex({ slug: 1 });
  await db.collection("schools").createIndex({ code: 1 });
  await db.collection("majors").createIndex({ slug: 1 });
  await db.collection("majors").createIndex({ code: 1 });
  await db.collection("programs").createIndex({ slug: 1 });
  await db.collection("programs").createIndex({ schoolId: 1 });
  await db.collection("programs").createIndex({ majorId: 1 });
  await db.collection("users").createIndex({ email: 1 }, { unique: true });

  console.log("🎉 Seed dữ liệu vào MongoDB hoàn tất thành công 100%!");
  await client.close();
  process.exit(0);
}

main().catch((err) => {
  console.error("Lỗi khi seed MongoDB:", err);
  process.exit(1);
});
