import { NextResponse, type NextRequest } from "next/server";
import { catalogService } from "@/services";

export async function GET(req: NextRequest) {
  const sp = req.nextUrl.searchParams;
  const items = await catalogService.listMajors({
    group: sp.get("group") ?? undefined,
    q: sp.get("q") ?? undefined,
    letter: sp.get("letter") ?? undefined,
  });
  return NextResponse.json(
    { items },
    {
      headers: {
        "Cache-Control": "public, max-age=60, s-maxage=300, stale-while-revalidate=86400",
      },
    }
  );
}
