import { NextResponse } from "next/server";
import { userDataService } from "@/services";
import { requireUser } from "@/lib/auth";
import { jsonBody } from "@/lib/http";

/** Dữ liệu đồng bộ của tài khoản: đã lưu, nguyện vọng, hồ sơ điểm, kết quả trắc nghiệm. */
export async function GET() {
  const { user, error } = await requireUser();
  if (error) return error;
  return NextResponse.json({ ok: true, data: await userDataService.get(user.id) });
}

export async function PUT(req: Request) {
  const { user, error } = await requireUser();
  if (error) return error;
  const { body, error: tooBig } = await jsonBody(req, 256 * 1024);
  if (tooBig) return tooBig;
  return NextResponse.json({ ok: true, data: await userDataService.replace(user.id, body) });
}
