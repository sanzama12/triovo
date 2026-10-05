import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { jsonBody, tooMany } from "@/lib/http";
import { rateLimit } from "@/lib/rate-limit";
import { importService } from "@/services/import.service";

/** File mẫu CSV. */
export async function GET() {
  const { error } = await requireAdmin();
  if (error) return error;
  return new NextResponse(importService.templateCsv(), {
    headers: { "Content-Type": "text/csv; charset=utf-8", "Content-Disposition": 'attachment; filename="trovio-mau-nhap-du-lieu.csv"', "Cache-Control": "no-store" },
  });
}

/**
 * { step: "preview", fileName, content }  — content: văn bản CSV hoặc base64 của .xlsx (≤ 2 MB)
 * { step: "revalidate" | "publish", fileName, rows }
 */
export async function POST(req: Request) {
  const { user, error } = await requireAdmin();
  if (error) return error;
  const wait = rateLimit(`import:${user.id}`, 40, 600);
  if (wait) return tooMany(wait);
  const parsed = await jsonBody<Record<string, unknown>>(req, 3 * 1024 * 1024);
  if (parsed.error) return parsed.error;
  const b = parsed.body ?? {};
  const res =
    b.step === "preview"
      ? await importService.previewFile(b.fileName, b.content)
      : b.step === "revalidate"
        ? await importService.revalidate(b.fileName, b.rows)
        : b.step === "publish"
          ? await importService.publish(user, b.fileName, b.rows)
          : ({ ok: false, status: 400, message: "Thao tác không hợp lệ." } as const);
  return NextResponse.json(res, { status: res.ok ? 200 : res.status });
}
