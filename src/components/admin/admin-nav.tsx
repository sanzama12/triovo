import { reviewService } from "@/services/review.service";
import { dataReportService } from "@/services/data-report.service";
import { qaService } from "@/services/community.service";
import { repositories } from "@/repositories";

/** Khoá các mục trên thanh bên quản trị (dùng cho số việc đang chờ). */
export type AdminSection =
  | "overview"
  | "schools"
  | "majors"
  | "programs"
  | "scores"
  | "quiz"
  | "import"
  | "users"
  | "rules"
  | "reviews"
  | "qa"
  | "reports"
  | "outcomes"
  | "timeline"
  | "chatbot"
  | "stats";

/** Số việc đang chờ xử lý hiển thị trên thanh bên (gọi ở server). */
export async function adminBadges(): Promise<Partial<Record<AdminSection, number>>> {
  const [reviews, reports, qa, subs, users] = await Promise.all([
    reviewService.queueCount(),
    dataReportService.openCount(),
    qaService.pendingCount(),
    repositories.schoolSubmissions.list({ status: "pending" }),
    repositories.users.list(),
  ]);
  return { reviews, reports, qa, overview: subs.length, users: users.filter((u) => u.schoolStaff?.status === "pending").length };
}
