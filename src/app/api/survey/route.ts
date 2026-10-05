import { NextResponse } from "next/server";
import { clientIp, jsonBody, tooMany } from "@/lib/http";
import { rateLimit } from "@/lib/rate-limit";
import { analyticsService } from "@/services/analytics.service";

/** POST /api/survey { answers[10], role?, comment? } — phiếu khảo sát SUS ẩn danh. */
export async function POST(req: Request) {
  const { body, error } = await jsonBody<Record<string, unknown>>(req, 4 * 1024);
  if (error) return error;
  const wait = rateLimit(`survey:${clientIp(req)}`, 10, 3600);
  if (wait) return tooMany(wait);
  if (typeof body?.website === "string" && body.website.trim()) return NextResponse.json({ ok: true, score: 0, grade: "" });
  const result = await analyticsService.submitSurvey(body ?? {});
  return NextResponse.json(result, { status: result.ok ? 201 : 400 });
}
