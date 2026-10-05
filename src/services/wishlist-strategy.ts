/**
 * SERVICE LAYER (thuần, dùng được cả ở client) — kiểm tra chiến lược danh sách nguyện vọng.
 *
 * Quy chế: thí sinh chỉ trúng tuyển MỘT nguyện vọng — nguyện vọng có thứ tự ưu tiên cao nhất mà mình đủ điểm.
 * Vì vậy danh sách hợp lý thường xếp: Thử sức → Vừa sức → An toàn, và luôn có ít nhất 1 nguyện vọng An toàn.
 */
import type { FitLevel, Program, ScoreProfile, AdmissionScore } from "../domain/types";
import { ADMISSION_METHODS, FIT_LABELS, fitForProfile, profileMethod, type FitResult } from "./scoring.service";

export type CheckLevel = "danger" | "warning" | "info" | "ok";

export interface StrategyItem {
  id: string;
  label: string; // "Marketing – NEU"
  program: Pick<Program, "cutoffs" | "altCutoffs" | "combos" | "tuitionMin" | "tuitionMax">;
}

export interface StrategyCheck {
  id: string;
  level: CheckLevel;
  title: string;
  detail: string;
  programIds?: string[];
}

export interface StrategyReport {
  status: CheckLevel | "incomplete";
  checks: StrategyCheck[];
  counts: Record<FitLevel | "unknown", number>;
  /** Mức của từng nguyện vọng theo thứ tự danh sách (null = không xét được). */
  results: FitResult[];
  /** Thứ tự gợi ý nếu thứ tự hiện tại chưa hợp lý. */
  suggestedOrder: string[] | null;
}

type ProfileLike = Pick<ScoreProfile, "method" | "combo" | "priorityRegion" | "priorityGroup" | "budgetMax"> & {
  admission: Pick<AdmissionScore, "rawTotal">;
};

/** Độ "khó" để sắp thứ tự: thử sức (2) → vừa sức (1) → an toàn (0). */
const AMBITION: Record<FitLevel, number> = { "thu-suc": 2, "vua-suc": 1, "an-toan": 0 };
const SEVERITY: Record<CheckLevel, number> = { danger: 3, warning: 2, info: 1, ok: 0 };
const nv = (i: number) => `NV${i + 1}`;
const joinNv = (idx: number[]) => (idx.length <= 3 ? idx.map(nv).join(", ") : `${idx.slice(0, 3).map(nv).join(", ")} và ${idx.length - 3} NV khác`);

export function analyzeWishlist(items: StrategyItem[], profile: ProfileLike | null, delta = 0): StrategyReport {
  const counts: StrategyReport["counts"] = { "an-toan": 0, "vua-suc": 0, "thu-suc": 0, unknown: 0 };
  const checks: StrategyCheck[] = [];
  if (items.length === 0) return { status: "ok", checks, counts, results: [], suggestedOrder: null };

  if (!profile) {
    counts.unknown = items.length;
    checks.push({
      id: "no-profile",
      level: "info",
      title: "Chưa có điểm để kiểm tra mức an toàn",
      detail: "Nhập điểm (điểm thi, học bạ hoặc ĐGNL) để Trovio đánh giá từng nguyện vọng là An toàn, Vừa sức hay Thử sức và kiểm tra thứ tự.",
    });
    return {
      status: "incomplete",
      checks,
      counts,
      results: items.map(() => ({ fit: null, reason: "method" as const })),
      suggestedOrder: null,
    };
  }

  const method = profileMethod(profile);
  const results = items.map((it) => fitForProfile(profile, it.program, delta));
  results.forEach((r) => (r.fit ? (counts[r.fit.level] += 1) : (counts.unknown += 1)));
  const known = items.length - counts.unknown;

  // 1. Không được xét (sai tổ hợp / không xét phương thức)
  const comboIdx = results.flatMap((r, i) => (r.reason === "combo" ? [i] : []));
  const methodIdx = results.flatMap((r, i) => (r.reason === "method" ? [i] : []));
  if (comboIdx.length) {
    checks.push({
      id: "combo",
      level: "danger",
      title: `${joinNv(comboIdx)} không xét tổ hợp ${profile.combo} của bạn`,
      detail: "Với hồ sơ hiện tại, các nguyện vọng này sẽ không được xét. Hãy kiểm tra tổ hợp khác hoặc thay bằng chương trình xét tổ hợp của bạn.",
      programIds: comboIdx.map((i) => items[i].id),
    });
  }
  if (methodIdx.length) {
    checks.push({
      id: "method",
      level: "danger",
      title: `${joinNv(methodIdx)} không xét phương thức ${ADMISSION_METHODS[method].short}`,
      detail: "Chương trình không có điểm chuẩn cho phương thức bạn đang dùng. Đổi phương thức ở trang Điểm của tôi hoặc chọn chương trình khác.",
      programIds: methodIdx.map((i) => items[i].id),
    });
  }

  // 2. Không có nguyện vọng an toàn
  if (known > 0 && counts["an-toan"] === 0) {
    checks.push({
      id: "no-safe",
      level: "danger",
      title: "Chưa có nguyện vọng An toàn",
      detail: "Nếu không đỗ các nguyện vọng phía trên, bạn có thể không trúng tuyển trường nào. Nên thêm 1–2 nguyện vọng An toàn ở cuối danh sách.",
    });
  }

  // 3. Thứ tự ngược: một NV dễ hơn đứng trước NV khó hơn
  const levels = results.map((r) => r.fit?.level ?? null);
  const blocked: number[] = [];
  let firstPair: [number, number] | null = null;
  for (let j = 0; j < levels.length; j++) {
    const lj = levels[j];
    if (!lj) continue;
    for (let i = 0; i < j; i++) {
      const li = levels[i];
      if (li && AMBITION[li] < AMBITION[lj]) {
        blocked.push(j);
        firstPair ??= [i, j];
        break;
      }
    }
  }
  let suggestedOrder: string[] | null = null;
  if (firstPair) {
    const [i, j] = firstPair;
    checks.push({
      id: "order",
      level: "warning",
      title: `Thứ tự chưa hợp lý: ${nv(j)} (${FIT_LABELS[levels[j]!]}) đứng sau ${nv(i)} (${FIT_LABELS[levels[i]!]})`,
      detail: `Bạn chỉ trúng tuyển nguyện vọng có thứ tự cao nhất mà mình đủ điểm. Nếu đỗ ${nv(i)}, ${joinNv(blocked)} sẽ không bao giờ được xét dù bạn đủ điểm. Hãy xếp nguyện vọng khó (Thử sức) lên trước, An toàn xuống cuối.`,
      programIds: blocked.map((k) => items[k].id),
    });
    // Sắp ổn định: khó → dễ; nguyện vọng không xét được để cuối.
    suggestedOrder = items
      .map((it, k) => ({ id: it.id, k, rank: levels[k] ? AMBITION[levels[k]!] : -1 }))
      .sort((a, b) => b.rank - a.rank || a.k - b.k)
      .map((x) => x.id);
  }

  // 4. Học phí vượt ngân sách
  if (profile.budgetMax != null && Number.isFinite(profile.budgetMax)) {
    const over = items.flatMap((it, k) => (it.program.tuitionMin > profile.budgetMax! ? [k] : []));
    if (over.length) {
      checks.push({
        id: "budget",
        level: "warning",
        title: `${joinNv(over)} có học phí vượt ngân sách ${profile.budgetMax} triệu/năm`,
        detail: `Học phí thấp nhất: ${over.map((k) => `${nv(k)} từ ${items[k].program.tuitionMin} triệu`).join(", ")}. Cân nhắc học bổng hoặc thay bằng chương trình trong ngân sách.`,
        programIds: over.map((k) => items[k].id),
      });
    }
  }

  // 5. Cân bằng danh sách
  if (known >= 2 && counts["thu-suc"] / known > 0.6) {
    checks.push({
      id: "too-risky",
      level: "warning",
      title: "Phần lớn nguyện vọng là Thử sức",
      detail: "Danh sách khá rủi ro. Nên bổ sung vài nguyện vọng Vừa sức và An toàn.",
    });
  }
  if (known >= 2 && counts["an-toan"] === known) {
    checks.push({
      id: "too-safe",
      level: "info",
      title: "Toàn bộ nguyện vọng đều An toàn",
      detail: "Bạn có thể thêm 1–2 nguyện vọng Thử sức ở đầu danh sách để không bỏ lỡ cơ hội vào chương trình mong muốn hơn.",
    });
  }
  if (items.length < 3) {
    checks.push({
      id: "few",
      level: "info",
      title: "Danh sách còn ít nguyện vọng",
      detail: "Nên có từ 3 nguyện vọng trở lên, trải đều các mức Thử sức, Vừa sức và An toàn.",
    });
  }

  const worst = checks.reduce<CheckLevel>((w, c) => (SEVERITY[c.level] > SEVERITY[w] ? c.level : w), "ok");
  if (SEVERITY[worst] < SEVERITY.warning) {
    checks.unshift({
      id: "ok",
      level: "ok",
      title: "Danh sách hợp lý",
      detail: `Có ${counts["an-toan"]} nguyện vọng An toàn và thứ tự từ khó đến dễ. Vẫn nên đối chiếu thông tin chính thức trước khi đăng ký.`,
    });
  }
  checks.sort((a, b) => SEVERITY[b.level] - SEVERITY[a.level]);
  return { status: worst, checks, counts, results, suggestedOrder };
}

/** So sánh mức phù hợp trước/sau khi điểm thay đổi `delta` (mô phỏng "Nếu điểm của mình thay đổi…"). */
export function simulateDelta(items: StrategyItem[], profile: ProfileLike, delta: number) {
  return items.map((it) => {
    const before = fitForProfile(profile, it.program, 0).fit?.level ?? null;
    const after = fitForProfile(profile, it.program, delta).fit?.level ?? null;
    return { id: it.id, before, after, changed: before !== after };
  });
}
