import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { clientIp, jsonBody, tooMany } from "@/lib/http";
import { rateLimit } from "@/lib/rate-limit";
import { qaService } from "@/services/community.service";

const ID_RE = /^[a-z0-9][a-z0-9-]{0,99}$/;

/** GET /api/qa?programId=… — câu hỏi đã duyệt + quyền trả lời của người xem. */
export async function GET(req: Request) {
  const programId = new URL(req.url).searchParams.get("programId") ?? "";
  if (!ID_RE.test(programId)) return NextResponse.json({ ok: false, message: "Thiếu chương trình." }, { status: 400 });
  const user = await getCurrentUser();
  const [items, perm] = await Promise.all([qaService.listForProgram(programId, user?.id ?? null), qaService.canAnswer(user, programId)]);
  return NextResponse.json({ ok: true, items, canAnswer: perm.ok, domain: perm.domain, loggedIn: !!user });
}

/** POST /api/qa — gửi câu hỏi (ẩn danh với người xem; chờ duyệt). Body: { programId, text }. */
export async function POST(req: Request) {
  const user = await getCurrentUser();
  const wait = Math.max(rateLimit(`qa-ask:${clientIp(req)}`, 5, 600), user ? rateLimit(`qa-ask:u:${user.id}`, 10, 86400) : 0);
  if (wait) return tooMany(wait);
  const { body, error } = await jsonBody(req, 4 * 1024);
  if (error) return error;
  const programId = typeof body?.programId === "string" && ID_RE.test(body.programId) ? body.programId : "";
  const res = await qaService.ask(user, programId, body ?? {});
  return res.ok ? NextResponse.json(res) : NextResponse.json(res, { status: res.status });
}
