import { NextResponse } from "next/server";
import { userDataService } from "@/services";
import { requireUser } from "@/lib/auth";
import { jsonBody } from "@/lib/http";

/** Gọi 1 lần sau khi đăng nhập: gộp dữ liệu khách trên trình duyệt vào tài khoản. */
export async function POST(req: Request) {
  const { user, error } = await requireUser();
  if (error) return error;
  const { body, error: tooBig } = await jsonBody(req, 256 * 1024);
  if (tooBig) return tooBig;
  const { data, added } = await userDataService.mergeLocal(user.id, body);
  return NextResponse.json({ ok: true, data, added });
}
