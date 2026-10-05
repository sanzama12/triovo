import { NextResponse } from "next/server";
import { requireUser } from "@/lib/auth";
import { clientIp, jsonBody, tooMany } from "@/lib/http";
import { rateLimit } from "@/lib/rate-limit";
import { qaService } from "@/services/community.service";

/** POST /api/qa/:id/answers — sinh viên (email trường) trả lời; chờ duyệt. */
export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { user, error } = await requireUser();
  if (error) return error;
  const wait = Math.max(rateLimit(`qa-ans:${clientIp(req)}`, 10, 600), rateLimit(`qa-ans:u:${user.id}`, 20, 86400));
  if (wait) return tooMany(wait);
  const { body, error: tooBig } = await jsonBody(req, 8 * 1024);
  if (tooBig) return tooBig;
  const { id } = await params;
  const res = await qaService.answer(user, id.slice(0, 80), body ?? {});
  return res.ok ? NextResponse.json(res) : NextResponse.json(res, { status: res.status });
}
