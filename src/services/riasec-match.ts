/** Hàm thuần (dùng được ở client): mức hợp sở thích giữa kết quả RIASEC và một ngành (0–98). */
import type { Major, RiasecResult } from "../domain/types";

export function matchMajor(result: Pick<RiasecResult, "percents" | "code">, major: Pick<Major, "riasec">): number {
  const weights = [0.5, 0.3, 0.2];
  const base = major.riasec.reduce((acc, t, i) => acc + result.percents[t] * weights[i], 0);
  const overlap = major.riasec.filter((t) => result.code.includes(t)).length;
  const exactOrder = major.riasec.filter((t, i) => result.code[i] === t).length;
  const bonus = overlap * 2 + exactOrder;
  return Math.max(0, Math.min(98, Math.round(base + bonus)));
}
