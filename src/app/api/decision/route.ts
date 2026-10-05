import { NextResponse } from "next/server";
import { repositories } from "@/repositories";
import { outcomeService } from "@/services/outcome.service";
import { summarize } from "@/services/review.service";
import type { DecisionRow } from "@/services/decision";
import { rateLimit } from "@/lib/rate-limit";
import { clientIp, tooMany } from "@/lib/http";
import { getCurrentUser } from "@/lib/auth";
import { regionOfProvince } from "@/domain/provinces";

const ID_RE = /^[a-z0-9][a-z0-9-]{0,99}$/;
const MAX = 6;

/** GET /api/decision?ids=a,b,c — dữ liệu công khai để chấm ma trận quyết định (tối đa 6 chương trình). */
export async function GET(req: Request) {
  const wait = rateLimit(`decision:${clientIp(req)}`, 60, 60);
  if (wait) return tooMany(wait);
  const ids = (new URL(req.url).searchParams.get("ids") ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter((s) => ID_RE.test(s))
    .slice(0, MAX);
  const user = await getCurrentUser();
  const homeRegion = regionOfProvince(user?.province ?? null);
  if (!ids.length) return NextResponse.json({ rows: [], homeRegion });
  const [programs, schools, majors, outcomes, reviews] = await Promise.all([
    repositories.programs.findByIds(ids),
    repositories.schools.findAll(),
    repositories.majors.findAll(),
    outcomeService.listMajors(),
    repositories.reviews.listByStatus(["approved"]),
  ]);
  const rows: DecisionRow[] = ids
    .map((id) => programs.find((p) => p.id === id))
    .filter((p): p is NonNullable<typeof p> => !!p)
    .map((p) => {
      const school = schools.find((s) => s.id === p.schoolId)!;
      const major = majors.find((m) => m.id === p.majorId)!;
      const out = outcomes.find((o) => o.major.id === p.majorId)?.outcome ?? null;
      const sum = summarize(reviews.filter((r) => r.schoolId === p.schoolId));
      const cutoffs: DecisionRow["cutoffs"] = {};
      if (p.cutoffs[0]) cutoffs.thpt = p.cutoffs[0].score;
      for (const a of p.altCutoffs ?? []) cutoffs[a.method] = a.score;
      return {
        programId: p.id,
        slug: p.slug,
        name: p.name,
        schoolName: school.name,
        schoolCode: school.code,
        city: school.city,
        region: school.region,
        majorRiasec: major.riasec,
        cutoffs,
        tuitionMin: p.tuitionMin,
        tuitionMax: p.tuitionMax,
        salaryStart: out?.startingSalary?.metric.value ?? null,
        salaryDemo: out?.demoOnly ?? true,
        reviewAvg: sum.overall,
        reviewCount: sum.count,
      };
    });
  return NextResponse.json({ rows, homeRegion });
}
