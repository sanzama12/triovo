import { NextResponse } from "next/server";
import { authService } from "@/services";
import { attachSession } from "@/lib/auth";
import { clientIp, jsonBody, tooMany } from "@/lib/http";
import { rateLimit } from "@/lib/rate-limit";

export async function POST(req: Request) {
  const { body, error } = await jsonBody<{ email?: unknown; password?: unknown }>(req, 8 * 1024);
  if (error) return error;
  const email = String(body?.email ?? "").slice(0, 200);
  const password = String(body?.password ?? "").slice(0, 200);
  // Chống dò mật khẩu: giới hạn theo IP và theo email (ngoài cơ chế khoá sau 5 lần sai).
  const wait = Math.max(rateLimit(`login:ip:${clientIp(req)}`, 30, 600), rateLimit(`login:email:${email.toLowerCase()}`, 10, 600));
  if (wait) return tooMany(wait);
  const result = await authService.login(email, password);
  if (!result.ok) {
    const status = result.reason === "locked" ? 423 : result.reason === "google_only" ? 409 : 401;
    return NextResponse.json(result, { status });
  }
  return await attachSession(NextResponse.json(result), result.user.id);
}
