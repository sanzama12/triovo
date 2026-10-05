import { NextResponse } from "next/server";
import { authService, type ProfilePatch } from "@/services";
import { clearSession, requireUser } from "@/lib/auth";
import { jsonBody } from "@/lib/http";

export async function GET() {
  const { user, error } = await requireUser();
  return error ?? NextResponse.json({ ok: true, user });
}

/** Cập nhật hồ sơ: họ tên, vai trò, năm tốt nghiệp, tỉnh/thành, xác nhận độ tuổi, đã onboarding. */
export async function PATCH(req: Request) {
  const { user, error } = await requireUser();
  if (error) return error;
  const parsed = await jsonBody(req, 8 * 1024);
  if (parsed.error) return parsed.error;
  const body = parsed.body ?? {};
  const patch: ProfilePatch = {};
  if (typeof body.name === "string") patch.name = body.name;
  if (body.role === null || typeof body.role === "string") patch.role = body.role as ProfilePatch["role"];
  if (body.gradYear === null || typeof body.gradYear === "number") patch.gradYear = body.gradYear as number | null;
  if (body.province === null || typeof body.province === "string") patch.province = (body.province as string | null) || null;
  if (typeof body.under16 === "boolean") patch.under16 = body.under16;
  if (typeof body.parentConsent === "boolean") patch.parentConsent = body.parentConsent;
  if (typeof body.onboarded === "boolean") patch.onboarded = body.onboarded;
  if (typeof body.emailReminders === "boolean") patch.emailReminders = body.emailReminders;
  if (typeof body.surveyOptIn === "boolean") patch.surveyOptIn = body.surveyOptIn;
  const result = await authService.updateProfile(user.id, patch);
  return NextResponse.json(result, { status: result.ok ? 200 : 400 });
}

/** Xoá tài khoản cùng toàn bộ dữ liệu đồng bộ, rồi đăng xuất. */
export async function DELETE() {
  const { user, error } = await requireUser();
  if (error) return error;
  await authService.deleteAccount(user.id);
  return clearSession(NextResponse.json({ ok: true }));
}
