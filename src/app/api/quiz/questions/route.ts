import { NextResponse } from "next/server";
import { riasecService } from "@/services";

export async function GET() {
  const questions = await riasecService.getQuestions();
  return NextResponse.json(
    { questions },
    {
      headers: {
        "Cache-Control": "public, max-age=120, s-maxage=600, stale-while-revalidate=86400",
      },
    }
  );
}
