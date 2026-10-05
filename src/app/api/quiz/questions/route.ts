import { NextResponse } from "next/server";
import { riasecService } from "@/services";

export async function GET() {
  return NextResponse.json({ questions: await riasecService.getQuestions() });
}
