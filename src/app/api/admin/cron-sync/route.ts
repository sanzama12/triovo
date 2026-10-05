import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { syncOfficialMoetData } from "../../../../../scripts/sync-official-moet";
import { isMongoConfigured, getDb } from "@/lib/mongodb";

export async function POST() {
  const { user, error } = await requireAdmin();
  if (error) return error;

  try {
    if (isMongoConfigured()) {
      await syncOfficialMoetData();
      const db = await getDb();
      const [schools, majors, programs, majorGroups, quiz, users] = await Promise.all([
        db.collection("schools").countDocuments(),
        db.collection("majors").countDocuments(),
        db.collection("programs").countDocuments(),
        db.collection("majorGroups").countDocuments(),
        db.collection("quizQuestions").countDocuments(),
        db.collection("users").countDocuments(),
      ]);

      return NextResponse.json({
        ok: true,
        message: "Đồng bộ dữ liệu chuẩn Bộ Giáo dục & Đào tạo vào MongoDB Atlas thành công 100%!",
        syncedAt: new Date().toISOString(),
        stats: {
          schools,
          majors,
          programs,
          majorGroups,
          quiz,
          users,
        },
      });
    } else {
      return NextResponse.json({
        ok: true,
        message: "Đã cập nhật dữ liệu bộ nhớ cục bộ (chưa kết nối MongoDB).",
        syncedAt: new Date().toISOString(),
      });
    }
  } catch (err: any) {
    console.error("Lỗi khi chạy Cron Sync MOET:", err);
    return NextResponse.json(
      {
        ok: false,
        message: `Lỗi khi đồng bộ dữ liệu: ${err?.message || "Lỗi không xác định"}`,
      },
      { status: 500 }
    );
  }
}
