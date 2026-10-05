import { NextResponse } from "next/server";
import { riasecService, sanitizeRiasec } from "@/services";
import { jsonBody } from "@/lib/http";

/** POST /api/quiz/recommend { percents, code } → ngành phù hợp nhất. */
export async function POST(req: Request) {
  const { body, error } = await jsonBody(req, 8 * 1024);
  if (error) return error;
  const riasec = sanitizeRiasec(body);
  if (!riasec) return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  return NextResponse.json({ majors: await riasecService.recommendMajors(riasec) });
}
