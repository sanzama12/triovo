import { NextResponse, type NextRequest } from "next/server";
import { reviewService } from "@/services/review.service";
import { getCurrentUser, requireUser } from "@/lib/auth";
import { jsonBody, tooMany } from "@/lib/http";
import { rateLimit } from "@/lib/rate-limit";

type Ctx = { params: Promise<{ id: string }> };

/** Cảm nhận đã duyệt của trường (+ cảm nhận của chính người xem nếu đã đăng nhập). */
export async function GET(req: NextRequest, ctx: Ctx) {
  const { id } = await ctx.params;
  const user = await getCurrentUser();
  const q = req.nextUrl.searchParams;
  const sort = q.get("sort") === "huu-ich" ? "huu-ich" : "moi-nhat";
  // Tham số lọc: chỉ nhận mã ngành dạng slug và năm 4 chữ số; giá trị lạ bị bỏ qua (service còn đối chiếu danh mục ngành).
  const major = q.get("major") ?? "";
  const majorId = /^[a-z0-9-]{1,60}$/.test(major) ? major : null;
  const cohortRaw = q.get("cohort") ?? "";
  const cohort = /^\d{4}$/.test(cohortRaw) ? Number(cohortRaw) : null;
  const [list, mine] = await Promise.all([
    reviewService.listPublic(id, { sort, viewerId: user?.id, majorId, cohort }),
    user ? reviewService.mine(user.id, id) : null,
  ]);
  return NextResponse.json({ ok: true, ...list, mine });
}

/** Gửi / sửa cảm nhận → luôn vào hàng chờ kiểm duyệt. */
export async function POST(req: Request, ctx: Ctx) {
  const { user, error } = await requireUser();
  if (error) return error;
  const { id } = await ctx.params;
  const parsed = await jsonBody(req, 16 * 1024);
  if (parsed.error) return parsed.error;
  const wait = rateLimit(`review:${user.id}`, 5, 3600);
  if (wait) return tooMany(wait);
  const result = await reviewService.submit(user, id, parsed.body ?? {});
  return NextResponse.json(result, { status: result.ok ? 201 : result.status });
}

/** Rút lại cảm nhận của mình. */
export async function DELETE(_req: Request, ctx: Ctx) {
  const { user, error } = await requireUser();
  if (error) return error;
  const { id } = await ctx.params;
  const ok = await reviewService.withdraw(user.id, id);
  return NextResponse.json({ ok }, { status: ok ? 200 : 404 });
}
