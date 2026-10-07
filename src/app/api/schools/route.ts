import { NextResponse, type NextRequest } from "next/server";
import { catalogService } from "@/services";
import { matchesQuery } from "@/lib/text";

/**
 * GET /api/schools?q=&region=&type=&level=
 * Lấy danh sách trường học trực tiếp từ CSDL PostgreSQL qua Service Layer.
 */
export async function GET(req: NextRequest) {
  const sp = req.nextUrl.searchParams;
  const q = sp.get("q") ?? undefined;
  const region = sp.get("region") ?? undefined;
  const type = sp.get("type") ?? undefined;
  const level = sp.get("level") ?? undefined;

  let schools = await catalogService.listSchools();

  if (region) {
    schools = schools.filter((s) => s.region === region);
  }
  if (type) {
    schools = schools.filter((s) => s.type === type);
  }
  if (level) {
    schools = schools.filter((s) => s.level === level);
  }
  if (q) {
    schools = schools.filter((s) =>
      matchesQuery(q, s.name, s.shortName, s.code, s.city, ...(s.aliases || []))
    );
  }

  return NextResponse.json(
    { items: schools, total: schools.length },
    {
      headers: {
        "Cache-Control": "public, max-age=60, s-maxage=300, stale-while-revalidate=86400",
      },
    }
  );
}
