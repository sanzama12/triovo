/**
 * Giới hạn tần suất đơn giản trong bộ nhớ (cửa sổ trượt cố định).
 * Đủ cho 1 tiến trình demo; khi chạy nhiều instance nên thay bằng Redis/Upstash.
 */
const g = globalThis as unknown as { __trovioRate?: Map<string, number[]> };
const buckets = (g.__trovioRate ??= new Map<string, number[]>());

/** Trả về số giây cần chờ (0 = được phép) và ghi nhận lượt nếu được phép. */
export function rateLimit(key: string, limit: number, windowSec: number, now = Date.now()): number {
  const since = now - windowSec * 1000;
  const hits = (buckets.get(key) ?? []).filter((t) => t > since);
  if (hits.length >= limit) {
    buckets.set(key, hits);
    return Math.max(1, Math.ceil((hits[0] + windowSec * 1000 - now) / 1000));
  }
  hits.push(now);
  buckets.set(key, hits);
  if (buckets.size > 5000) {
    for (const [k, v] of buckets) if (!v.some((t) => t > since)) buckets.delete(k);
  }
  return 0;
}
