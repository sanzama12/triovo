import dns from "node:dns";
try {
  dns.setServers(["8.8.8.8", "1.1.1.1", "8.8.4.4"]);
} catch {}
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
dotenv.config();
import { MongoClient } from "mongodb";

async function main() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error("❌ MONGODB_URI chưa được cấu hình.");
    process.exit(1);
  }

  const dbName = process.env.MONGODB_DB || "trovio";
  console.log(`\n🔍 Đang kết nối kiểm tra cơ sở dữ liệu MongoDB Atlas (${dbName})...\n`);

  const client = new MongoClient(uri);
  await client.connect();
  const db = client.db(dbName);

  const collections = await db.listCollections().toArray();
  console.log("=================================================");
  console.log(`📊 DANH SÁCH BẢNG (COLLECTIONS) TRONG DB '${dbName}':`);
  console.log("=================================================");

  let totalDocs = 0;
  for (const col of collections) {
    const count = await db.collection(col.name).countDocuments();
    totalDocs += count;
    console.log(` • ${col.name.padEnd(20)} : ${count.toString().padStart(4, " ")} bản ghi`);
  }
  console.log("-------------------------------------------------");
  console.log(`👉 Tổng cộng: ${collections.length} collections | ${totalDocs} documents`);
  console.log("=================================================\n");

  // Hiển thị mẫu 3 trường Đại học đầu tiên
  const sampleSchools = await db.collection("schools").find({}).limit(3).toArray();
  console.log("🏫 Mẫu 3 trường Đại học / Học viện trong MongoDB:");
  sampleSchools.forEach((s, idx) => {
    console.log(`  ${idx + 1}. [${s.code}] ${s.name} (${s.shortName || s.aliases?.join(", ")}) - ${s.city}`);
  });

  // Hiển thị mẫu 3 ngành đầu tiên kèm chuyên ngành
  const sampleMajors = await db.collection("majors").find({}).limit(3).toArray();
  console.log("\n📚 Mẫu 3 ngành đào tạo trong MongoDB:");
  sampleMajors.forEach((m, idx) => {
    const specs = m.specializations?.map((sp: any) => sp.name).join(", ") || "Không có";
    console.log(`  ${idx + 1}. [${m.code}] ${m.name} - Chuyên ngành: ${specs}`);
  });

  console.log("\n✅ Kết nối và dữ liệu trên MongoDB Atlas hoạt động hoàn hảo 100%!\n");
  await client.close();
  process.exit(0);
}

main().catch((err) => {
  console.error("Lỗi:", err);
  process.exit(1);
});
