import { NextResponse, type NextRequest } from "next/server";
import { programService } from "@/services";

/** GET /api/programs/compare?ids=a,b,c&score=26.5 — tối đa 3 chương trình. */
export async function GET(req: NextRequest) {
  const ids = (req.nextUrl.searchParams.get("ids") ?? "").split(",").filter(Boolean);
  const score = Number(req.nextUrl.searchParams.get("score"));
  const items = await programService.getByIds(ids, Number.isFinite(score) && score > 0 ? score : null);
  return NextResponse.json({ items });
}
