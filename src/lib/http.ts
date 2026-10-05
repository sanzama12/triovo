/**
 * Tiện ích cho route handler: đọc JSON có giới hạn kích thước, lấy IP client.
 */
import { NextResponse } from "next/server";

export class BodyTooLargeError extends Error {}

/** Đọc JSON body, từ chối nếu lớn hơn `maxBytes` (mặc định 64 KB). Body lỗi → null. */
export async function readJson<T = unknown>(req: Request, maxBytes = 64 * 1024): Promise<T | null> {
  const declared = Number(req.headers.get("content-length"));
  if (Number.isFinite(declared) && declared > maxBytes) throw new BodyTooLargeError();
  const text = await req.text().catch(() => "");
  if (Buffer.byteLength(text, "utf8") > maxBytes) throw new BodyTooLargeError();
  if (!text) return null;
  try {
    return JSON.parse(text) as T;
  } catch {
    return null;
  }
}

export const tooLarge = () => NextResponse.json({ ok: false, message: "Dữ liệu gửi lên quá lớn." }, { status: 413 });
export const tooMany = (retryAfterSec: number) =>
  NextResponse.json(
    { ok: false, message: `Bạn thao tác quá nhanh. Vui lòng thử lại sau ${Math.ceil(retryAfterSec / 60)} phút.` },
    { status: 429, headers: { "Retry-After": String(retryAfterSec) } },
  );

/** Đọc JSON; nếu quá lớn trả sẵn response 413. */
export async function jsonBody<T = Record<string, unknown>>(req: Request, maxBytes?: number): Promise<{ body: T | null; error: NextResponse | null }> {
  try {
    return { body: await readJson<T>(req, maxBytes), error: null };
  } catch (e) {
    if (e instanceof BodyTooLargeError) return { body: null, error: tooLarge() };
    throw e;
  }
}

/** IP client (sau reverse proxy lấy từ X-Forwarded-For). Chỉ dùng cho giới hạn tần suất. */
export function clientIp(req: Request): string {
  const fwd = req.headers.get("x-forwarded-for");
  return (fwd?.split(",")[0] ?? req.headers.get("x-real-ip") ?? "local").trim().slice(0, 64);
}
