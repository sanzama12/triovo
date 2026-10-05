import { NextResponse } from "next/server";
import { requireUser } from "@/lib/auth";
import { jsonBody, tooMany } from "@/lib/http";
import { rateLimit } from "@/lib/rate-limit";
import { qaService } from "@/services/community.service";

/** POST /api/qa/:id/answers/:answerId — { action: "helpful" | "report" } (cần đăng nhập). */
export async function POST(req: Request, { params }: { params: Promise<{ id: string; answerId: string }> }) {
  const { user, error } = await requireUser();
  if (error) return error;
  const wait = rateLimit(`qa-vote:${user.id}`, 60, 600);
  if (wait) return tooMany(wait);
  const { body, error: tooBig } = await jsonBody<{ action?: unknown }>(req, 512);
  if (tooBig) return tooBig;
  const { id, answerId } = await params;
  const res = await qaService.voteAnswer(user, id.slice(0, 80), answerId.slice(0, 80), body?.action);
  return res.ok ? NextResponse.json(res) : NextResponse.json(res, { status: res.status });
}
