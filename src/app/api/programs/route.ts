import { NextResponse, type NextRequest } from "next/server";
import { parseProgramFilters, programService } from "@/services";

/** GET /api/programs?q=&score=&combos=A00,D01&tuition=15-30&regions=bac&types=cong-lap&sort=&page= */
export async function GET(req: NextRequest) {
  const filters = parseProgramFilters(Object.fromEntries(req.nextUrl.searchParams));
  const data = await programService.search(filters);
  
  return NextResponse.json(data, {
    headers: {
      "Cache-Control": "public, max-age=60, s-maxage=300, stale-while-revalidate=86400",
    },
  });
}
