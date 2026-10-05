import { NextResponse } from "next/server";
import type { Region } from "@/domain/types";
import { ADMISSION_METHODS, isMethodKey, recommendationService, REGION_LABELS, sanitizeRiasec } from "@/services";
import { getCurrentUser } from "@/lib/auth";
import { jsonBody } from "@/lib/http";

/**
 * POST /api/recommendations — gợi ý "Dành cho bạn".
 * Body (đều tuỳ chọn): { riasec: {percents, code}, score: {method, total, combo}, budgetMax, regions, groupIds, goalMajorId, limit (≤ 12) }.
 * Tỉnh/thành lấy từ hồ sơ tài khoản (nếu đã đăng nhập), không nhận từ client.
 */
export async function POST(req: Request) {
  const { body, error } = await jsonBody(req, 16 * 1024);
  if (error) return error;
  const b = body ?? {};
  const riasec = b.riasec ? sanitizeRiasec(b.riasec) : null;

  let score: { method: "thpt" | "hocba" | "dgnl-hn" | "dgnl-hcm"; total: number; combo: string } | null = null;
  const s = b.score as { method?: unknown; total?: unknown; combo?: unknown } | undefined;
  if (s && isMethodKey(s.method) && typeof s.total === "number" && s.total > 0 && s.total <= ADMISSION_METHODS[s.method].max) {
    score = { method: s.method, total: s.total, combo: typeof s.combo === "string" ? s.combo.slice(0, 5) : "" };
  }
  const budgetMax = typeof b.budgetMax === "number" && b.budgetMax > 0 && b.budgetMax < 10_000 ? b.budgetMax : null;
  const regions = Array.isArray(b.regions) ? (b.regions.filter((r) => typeof r === "string" && r in REGION_LABELS) as Region[]) : [];
  const groupIds = Array.isArray(b.groupIds) ? b.groupIds.filter((g): g is string => typeof g === "string").slice(0, 20) : [];

  const goalMajorId = typeof b.goalMajorId === "string" && /^[a-z0-9][a-z0-9-]{0,99}$/.test(b.goalMajorId) ? b.goalMajorId : null;
  const limit = typeof b.limit === "number" && Number.isInteger(b.limit) ? Math.min(12, Math.max(1, b.limit)) : 6;

  const user = await getCurrentUser();
  const result = await recommendationService.recommend({ riasec, score, budgetMax, regions, groupIds, province: user?.province ?? null, goalMajorId }, limit);
  return NextResponse.json({ ...result, province: user?.province ?? null });
}
