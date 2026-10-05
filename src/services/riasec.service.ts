/**
 * SERVICE LAYER — trắc nghiệm sở thích nghề nghiệp RIASEC (Holland).
 */
import type { Major, RiasecQuestion, RiasecResult, RiasecType } from "../domain/types";
import { RIASEC_ORDER } from "../domain/riasec";
import { repositories } from "../repositories";

export const RIASEC_TYPES: RiasecType[] = RIASEC_ORDER;

export type QuizAnswers = Record<number, number>; // questionId -> 1..5

/** Chuyển câu trả lời Likert (1–5) thành % cho từng nhóm và mã 3 chữ cái. */
export function scoreAnswers(questions: RiasecQuestion[], answers: QuizAnswers, completedAt = new Date().toISOString()): RiasecResult {
  const sums = Object.fromEntries(RIASEC_TYPES.map((t) => [t, 0])) as Record<RiasecType, number>;
  const counts = Object.fromEntries(RIASEC_TYPES.map((t) => [t, 0])) as Record<RiasecType, number>;
  let answered = 0;
  for (const q of questions) {
    const v = answers[q.id];
    if (typeof v === "number" && v >= 1 && v <= 5) {
      sums[q.type] += v - 1; // 0..4
      counts[q.type] += 1;
      answered += 1;
    }
  }
  const percents = Object.fromEntries(
    RIASEC_TYPES.map((t) => [t, counts[t] ? Math.round((sums[t] / (counts[t] * 4)) * 100) : 0]),
  ) as Record<RiasecType, number>;
  // Hoà điểm: giữ thứ tự R-I-A-S-E-C để kết quả ổn định.
  const ranking = [...RIASEC_TYPES].sort((a, b) => percents[b] - percents[a] || RIASEC_TYPES.indexOf(a) - RIASEC_TYPES.indexOf(b));
  return { percents, ranking, code: [ranking[0], ranking[1], ranking[2]], completedAt, answered };
}

/** Kiểm tra dữ liệu RIASEC client gửi lên: % trong 0–100, mã gồm 3 chữ cái hợp lệ khác nhau. */
export function sanitizeRiasec(input: unknown): Pick<RiasecResult, "percents" | "code"> | null {
  if (!input || typeof input !== "object") return null;
  const { percents, code } = input as { percents?: unknown; code?: unknown };
  if (!percents || typeof percents !== "object" || !Array.isArray(code) || code.length !== 3) return null;
  const p = percents as Record<string, unknown>;
  const out = {} as Record<RiasecType, number>;
  for (const t of RIASEC_TYPES) {
    const v = p[t];
    if (typeof v !== "number" || !Number.isFinite(v) || v < 0 || v > 100) return null;
    out[t] = v;
  }
  if (!code.every((c): c is RiasecType => RIASEC_TYPES.includes(c as RiasecType)) || new Set(code).size !== 3) return null;
  return { percents: out, code: code as [RiasecType, RiasecType, RiasecType] };
}

/** Mức độ phù hợp giữa hồ sơ RIASEC và mã Holland của ngành (0–100). */
import { matchMajor } from "./riasec-match";
export { matchMajor };

export const riasecService = {
  async getQuestions() {
    return repositories.quiz.findQuestions();
  },

  async evaluate(answers: QuizAnswers) {
    const questions = await repositories.quiz.findQuestions();
    return scoreAnswers(questions, answers);
  },

  async recommendMajors(result: Pick<RiasecResult, "percents" | "code">, limit = 6) {
    const [majors, groups] = await Promise.all([repositories.majors.findAll(), repositories.majors.findGroups()]);
    return majors
      .map((major) => ({ major, group: groups.find((g) => g.id === major.groupId)!, match: matchMajor(result, major) }))
      .sort((a, b) => b.match - a.match)
      .slice(0, limit);
  },
};
