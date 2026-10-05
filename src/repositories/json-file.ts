/**
 * Implementation lưu dữ liệu động vào 1 file JSON trên đĩa
 * (mặc định `.data/trovio-db.json`, đổi bằng biến môi trường TROVIO_DB_FILE):
 * tài khoản, dữ liệu đồng bộ, link chia sẻ + góp ý, chỉnh sửa dữ liệu chương trình của quản trị viên.
 *
 * Đủ cho demo/đồ án: dữ liệu còn nguyên sau khi khởi động lại `npm run dev`.
 * Khi lên production, viết implementation Prisma/Postgres cho cùng interface rồi đổi trong `index.ts`.
 */
import { mkdir, readFile, rename, stat, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { tmpdir } from "node:os";
import { randomUUID } from "node:crypto";
import { FUNNEL_EVENTS } from "../domain/types";
import { seedUsers } from "../data/users";
import { seedReviews } from "../data/reviews";
import { DEMO_SCHOOL_VERIFIED, seedClasses, seedOutcomeSurveys, seedQuestions } from "../data/community";
import { competitionOf } from "../data/programs";
import { benchmarks, dataSources, majorOutcomes, schoolOutcomes } from "../data/outcomes";
import type {
  ImportBatch,
  QuizConfig,
  RecommendConfig,
  SchoolSubmission,
  RiasecQuestion,
  Major,
  School,
  AppNotification,
  ChatAlias,
  DataReport,
  FunnelEvent,
  SusResponse,
  TimelineConfig,
  AdmissionMethod,
  AuditEntry,
  ChatLog,
  DataSource,
  MajorOutcome,
  Program,
  ProgramPatch,
  SchoolReview,
  Share,
  ShareComment,
  User,
  UserData,
  QaQuestion,
  TeacherClass,
  OutcomeSurvey,
} from "../domain/types";
import { isDemoMode } from "../lib/env";
import { hashPassword } from "../services/password.hash";
import { memoryMajorRepository, memoryProgramRepository, memoryQuizRepository, memorySchoolRepository } from "./memory";
import type {
  CatalogAdminRepository,
  ImportBatchRepository,
  MajorRepository,
  QuizConfigRepository,
  QuizRepository,
  RecommendConfigRepository,
  SchoolRepository,
  SchoolSubmissionRepository,
  AnalyticsRepository,
  ChatAliasRepository,
  DataReportRepository,
  NotificationRepository,
  ReminderLogRepository,
  SurveyRepository,
  TimelineConfigRepository,
  AuditRepository,
  ChatLogRepository,
  CommentRepository,
  OutcomeRepository,
  ProgramAdminRepository,
  ProgramRepository,
  ReviewRepository,
  ShareRepository,
  UserDataRepository,
  UserRepository,
  QaRepository,
  ClassRepository,
  OutcomeSurveyRepository,
} from "./types";

const DB_VERSION = 8;
const MAX_QA = 5000;
const MAX_CLASSES_PER_TEACHER = 30;
const MAX_CLASS_MEMBERS = 80;
const MAX_NOTIFICATIONS_PER_USER = 50;
const MAX_REPORTS = 2000;
const ANALYTICS_DAYS = 180;
/** Trần số mã ẩn danh mỗi sự kiện mỗi ngày — chặn việc spam mã ngẫu nhiên làm phình file dữ liệu. */
const MAX_ANON_PER_EVENT_DAY = 20000;
const MAX_REMINDER_LOG = 20000;
const MAX_AUDIT = 500;
const MAX_CHAT_LOGS = 500;

interface DbShape {
  version: number;
  /** id tài khoản demo đã từng được tạo (xoá rồi thì không tạo lại). */
  seeded: string[];
  users: User[];
  userData: Record<string, UserData>;
  shares: Share[];
  comments: ShareComment[];
  programOverrides: Record<string, ProgramPatch>;
  audit: AuditEntry[];
  reviews: SchoolReview[];
  /** Số liệu việc làm theo ngành do quản trị viên cập nhật (ghi đè dữ liệu gốc). */
  outcomeOverrides: Record<string, MajorOutcome>;
  /** Nguồn dữ liệu do quản trị viên thêm. */
  customSources: DataSource[];
  chatLogs: ChatLog[];
  dataReports: DataReport[];
  notifications: AppNotification[];
  timelineConfig: TimelineConfig | null;
  chatAliases: ChatAlias[];
  /** analytics[ngày][sự kiện] = danh sách mã ẩn danh (không trùng). */
  analytics: Record<string, Partial<Record<FunnelEvent, string[]>>>;
  surveys: SusResponse[];
  reminderLog: string[];
  /** v5: hỏi đáp sinh viên, lớp của giáo viên, khảo sát sau 1 năm. */
  questions: QaQuestion[];
  classes: TeacherClass[];
  outcomeSurveys: OutcomeSurvey[];
  /** v7: quản trị danh mục, cấu hình trắc nghiệm & gợi ý, nhập liệu hàng loạt, cổng trường. */
  schoolOverrides: Record<string, Partial<School>>;
  customSchools: School[];
  majorOverrides: Record<string, Partial<Major>>;
  customMajors: Major[];
  customPrograms: Program[];
  quizConfig: QuizConfig | null;
  recommendConfig: RecommendConfig | null;
  importBatches: ImportBatch[];
  schoolSubmissions: SchoolSubmission[];
}

const clone = <T>(v: T): T => structuredClone(v);
const dbFile = () => {
  if (process.env.TROVIO_DB_FILE) return process.env.TROVIO_DB_FILE;
  if (process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME) {
    return join(tmpdir(), "trovio-db.json");
  }
  return join(process.cwd(), ".data", "trovio-db.json");
};

// Dùng chung giữa các bundle (route handler / server component) và qua hot-reload.
const g = globalThis as unknown as {
  __trovioDb?: { file: string; mtime: number; data: DbShape } | null;
  __trovioDbQueue?: Promise<unknown>;
  /** Lượt đọc-từ-đĩa đang chạy (nhiều request song song dùng chung, tránh migrate/ghi file chồng nhau). */
  __trovioDbLoading?: Promise<DbShape> | null;
};

/** Bổ sung trường còn thiếu (DB tạo từ phiên bản cũ) và tài khoản demo mới. Trả về true nếu có thay đổi. */
async function migrate(data: Partial<DbShape>): Promise<boolean> {
  let changed = false;
  if (!Array.isArray(data.users)) ((data.users = []), (changed = true));
  if (!data.userData || typeof data.userData !== "object") ((data.userData = {}), (changed = true));
  if (!Array.isArray(data.shares)) ((data.shares = []), (changed = true));
  if (!Array.isArray(data.comments)) ((data.comments = []), (changed = true));
  if (!data.programOverrides || typeof data.programOverrides !== "object") ((data.programOverrides = {}), (changed = true));
  if (!Array.isArray(data.audit)) ((data.audit = []), (changed = true));
  if (!Array.isArray(data.reviews)) ((data.reviews = []), (changed = true));
  if (!data.outcomeOverrides || typeof data.outcomeOverrides !== "object") ((data.outcomeOverrides = {}), (changed = true));
  if (!Array.isArray(data.customSources)) ((data.customSources = []), (changed = true));
  if (!Array.isArray(data.chatLogs)) ((data.chatLogs = []), (changed = true));
  if (!Array.isArray(data.dataReports)) ((data.dataReports = []), (changed = true));
  if (!Array.isArray(data.notifications)) ((data.notifications = []), (changed = true));
  if (data.timelineConfig === undefined) ((data.timelineConfig = null), (changed = true));
  if (!Array.isArray(data.chatAliases)) ((data.chatAliases = []), (changed = true));
  if (!data.analytics || typeof data.analytics !== "object") ((data.analytics = {}), (changed = true));
  if (!Array.isArray(data.surveys)) ((data.surveys = []), (changed = true));
  if (!Array.isArray(data.reminderLog)) ((data.reminderLog = []), (changed = true));
  if (!Array.isArray(data.questions)) ((data.questions = []), (changed = true));
  if (!Array.isArray(data.classes)) ((data.classes = []), (changed = true));
  if (!Array.isArray(data.outcomeSurveys)) ((data.outcomeSurveys = []), (changed = true));
  if (!data.schoolOverrides || typeof data.schoolOverrides !== "object") ((data.schoolOverrides = {}), (changed = true));
  if (!Array.isArray(data.customSchools)) ((data.customSchools = []), (changed = true));
  if (!data.majorOverrides || typeof data.majorOverrides !== "object") ((data.majorOverrides = {}), (changed = true));
  if (!Array.isArray(data.customMajors)) ((data.customMajors = []), (changed = true));
  if (!Array.isArray(data.customPrograms)) ((data.customPrograms = []), (changed = true));
  if (data.quizConfig === undefined) ((data.quizConfig = null), (changed = true));
  if (data.recommendConfig === undefined) ((data.recommendConfig = null), (changed = true));
  if (!Array.isArray(data.importBatches)) ((data.importBatches = []), (changed = true));
  if (!Array.isArray(data.schoolSubmissions)) ((data.schoolSubmissions = []), (changed = true));
  if (!Array.isArray(data.seeded)) {
    // DB phiên bản 1 đã được seed u-001, u-002 lúc tạo.
    data.seeded = data.users.length ? ["u-001", "u-002"] : [];
    changed = true;
  }
  // Luôn đảm bảo tài khoản người dùng & Quản trị viên tồn tại trên mọi môi trường
  for (const { password, ...u } of seedUsers) {
    if (!data.users.some((x) => x.id === u.id || x.email === u.email)) {
      data.users.push({ ...u, passwordHash: password ? await hashPassword(password) : null });
      changed = true;
    }
  }
  if (isDemoMode()) {
    for (const r of seedReviews) {
      if (data.seeded.includes(r.id)) continue;
      if (!data.reviews.some((x) => x.id === r.id)) data.reviews.push(structuredClone(r));
      data.seeded.push(r.id);
      changed = true;
    }
    for (const q of seedQuestions) {
      if (data.seeded.includes(q.id)) continue;
      if (!data.questions.some((x) => x.id === q.id)) data.questions.push(structuredClone(q));
      data.seeded.push(q.id);
      changed = true;
    }
    // Huy hiệu "Trường đã xác nhận" mẫu (minh hoạ, có ghi chú rõ) cho 2 chương trình demo.
    if (!data.seeded.includes("verify-demo")) {
      for (const [pid, at] of DEMO_SCHOOL_VERIFIED) {
        const cur = data.programOverrides[pid] ?? {};
        if (!cur.schoolVerifiedAt) data.programOverrides[pid] = { ...cur, schoolVerifiedAt: at, schoolVerifiedNote: "Minh hoạ – xác nhận mẫu cho bản demo" };
      }
      data.seeded.push("verify-demo");
      changed = true;
    }
    for (const c of seedClasses) {
      if (data.seeded.includes(c.id)) continue;
      if (!data.classes.some((x) => x.id === c.id || x.code === c.code)) data.classes.push(structuredClone(c));
      data.seeded.push(c.id);
      changed = true;
    }
    // v2 của bộ khảo sát minh hoạ: thay các dòng demo cũ (không đụng phản hồi thật).
    if (!data.seeded.includes("os-demo-v2")) {
      data.outcomeSurveys = data.outcomeSurveys.filter((x) => !(x.demo && x.id.startsWith("os-demo-")));
      data.outcomeSurveys.push(...seedOutcomeSurveys.map((x) => structuredClone(x)));
      data.seeded.push("os-demo", "os-demo-v2");
      changed = true;
    }
  }
  if (data.version !== DB_VERSION) ((data.version = DB_VERSION), (changed = true));
  return changed;
}

async function persist(file: string, data: DbShape) {
  try {
    await mkdir(dirname(file), { recursive: true });
    // Tên file tạm duy nhất: 2 lượt ghi trong cùng 1 mili-giây không được dùng chung file tạm.
    const tmp = `${file}.${process.pid}.${randomUUID()}.tmp`;
    await writeFile(tmp, JSON.stringify(data, null, 2), { encoding: "utf8", mode: 0o600 });
    await rename(tmp, file);
    const { mtimeMs } = await stat(file);
    g.__trovioDb = { file, mtime: mtimeMs, data };
  } catch {
    g.__trovioDb = { file, mtime: Date.now(), data };
  }
}

async function load(): Promise<DbShape> {
  const file = dbFile();
  const cached = g.__trovioDb;
  if (cached && cached.file === file && cached.data?.version === DB_VERSION) {
    try {
      if ((await stat(/*turbopackIgnore: true*/ file)).mtimeMs === cached.mtime) return cached.data;
    } catch {
      /* file bị xoá: đọc lại bên dưới */
    }
  }

  // Nhiều request cùng lúc (VD trang chủ gọi song song nhiều repository) → chỉ 1 lượt đọc/migrate/ghi.
  if (!g.__trovioDbLoading) {
    g.__trovioDbLoading = loadFromDisk(file).finally(() => {
      g.__trovioDbLoading = null;
    });
  }
  return g.__trovioDbLoading;
}

async function loadFromDisk(file: string): Promise<DbShape> {
  let mtime: number | null = null;
  try {
    mtime = (await stat(file)).mtimeMs;
  } catch {
    /* chưa có file */
  }
  const cached = g.__trovioDb;
  // Chỉ dùng bản trong bộ nhớ khi cùng file, file chưa đổi VÀ cùng phiên bản cấu trúc. Bản cũ còn sót lại qua
  // hot-reload (dev server đang chạy khi cập nhật code) sẽ bị bỏ qua để chạy migrate — tránh lỗi thiếu trường mới.
  if (cached && cached.file === file && mtime !== null && cached.mtime === mtime && cached.data?.version === DB_VERSION) return cached.data;
  const data = (mtime === null ? {} : JSON.parse(await readFile(file, "utf8"))) as Partial<DbShape>;
  if ((await migrate(data)) || mtime === null) {
    await persist(file, data as DbShape);
  } else {
    g.__trovioDb = { file, mtime, data: data as DbShape };
  }
  return data as DbShape;
}

/** Đọc (chờ các lượt ghi đang xếp hàng). */
async function read<T>(fn: (db: DbShape) => T): Promise<T> {
  await (g.__trovioDbQueue ?? Promise.resolve());
  return clone(fn(await load()));
}

/** Ghi tuần tự (tránh 2 request ghi đè lẫn nhau). */
function write<T>(fn: (db: DbShape) => T): Promise<T> {
  const run = async () => {
    const db = clone(await load());
    const result = fn(db);
    await persist(dbFile(), db);
    return clone(result);
  };
  const next = (g.__trovioDbQueue ?? Promise.resolve()).then(run, run);
  g.__trovioDbQueue = next.catch(() => undefined);
  return next;
}

const norm = (email: string) => email.trim().toLowerCase();

export const jsonUserRepository: UserRepository = {
  findByEmail: (email) => read((db) => db.users.find((u) => u.email === norm(email)) ?? null),
  findById: (id) => read((db) => db.users.find((u) => u.id === id) ?? null),
  findByGoogleId: (googleId) => read((db) => db.users.find((u) => u.googleId === googleId) ?? null),
  list: () => read((db) => db.users),
  create: (input) =>
    write((db) => {
      const user: User = { ...input, email: norm(input.email), id: `u-${randomUUID()}`, createdAt: new Date().toISOString() };
      db.users.push(user);
      return user;
    }),
  update: (id, patch) =>
    write((db) => {
      const i = db.users.findIndex((u) => u.id === id);
      if (i < 0) return null;
      db.users[i] = { ...db.users[i], ...patch, id, ...(patch.email ? { email: norm(patch.email) } : {}) };
      return db.users[i];
    }),
  delete: (id) =>
    write((db) => {
      const before = db.users.length;
      db.users = db.users.filter((u) => u.id !== id);
      delete db.userData[id];
      // Xoá tài khoản = xoá luôn link chia sẻ và góp ý liên quan.
      const shareIds = new Set(db.shares.filter((s) => s.userId === id).map((s) => s.id));
      db.shares = db.shares.filter((s) => s.userId !== id);
      db.comments = db.comments.filter((c) => c.ownerId !== id && !shareIds.has(c.shareId));
      // …và cảm nhận đã viết, lượt "hữu ích".
      db.reviews = db.reviews.filter((r) => r.userId !== id).map((r) => ({ ...r, helpful: r.helpful.filter((u) => u !== id) }));
      // …thông báo; báo lỗi đã gửi được giữ để xử lý dữ liệu nhưng bỏ liên kết tài khoản.
      db.notifications = db.notifications.filter((n) => n.userId !== id);
      db.dataReports = db.dataReports.map((r) => (r.userId === id ? { ...r, userId: null } : r));
      db.reminderLog = db.reminderLog.filter((k) => !k.startsWith(`${id}:`) && !k.endsWith(`:${id}`));
      // …lớp do người này tạo, tư cách thành viên lớp; câu hỏi giữ lại ẩn danh, câu trả lời của người này bị xoá; khảo sát bỏ liên kết.
      db.classes = db.classes.filter((c) => c.teacherId !== id).map((c) => ({ ...c, memberIds: c.memberIds.filter((m) => m !== id) }));
      db.questions = db.questions.map((q) => ({ ...q, userId: q.userId === id ? null : q.userId, answers: q.answers.filter((a) => a.userId !== id) }));
      db.outcomeSurveys = db.outcomeSurveys.map((o) => (o.userId === id ? { ...o, userId: null } : o));
      return db.users.length < before;
    }),
};

export const jsonUserDataRepository: UserDataRepository = {
  get: (userId) => read((db) => db.userData[userId] ?? null),
  put: (userId, data) =>
    write((db) => {
      db.userData[userId] = data;
      return data;
    }),
  delete: (userId) =>
    write((db) => {
      delete db.userData[userId];
    }),
};

export const jsonShareRepository: ShareRepository = {
  create: (share) =>
    write((db) => {
      db.shares.push(share);
      return share;
    }),
  findById: (id) => read((db) => db.shares.find((s) => s.id === id) ?? null),
  listByUser: (userId) => read((db) => db.shares.filter((s) => s.userId === userId)),
  update: (id, patch) =>
    write((db) => {
      const i = db.shares.findIndex((s) => s.id === id);
      if (i < 0) return null;
      db.shares[i] = { ...db.shares[i], ...patch };
      return db.shares[i];
    }),
};

export const jsonCommentRepository: CommentRepository = {
  add: (comment) =>
    write((db) => {
      db.comments.push(comment);
      return comment;
    }),
  listByOwner: (ownerId) => read((db) => db.comments.filter((c) => c.ownerId === ownerId).sort((a, b) => b.createdAt.localeCompare(a.createdAt))),
  countByShare: (shareId) => read((db) => db.comments.filter((c) => c.shareId === shareId).length),
  delete: (id, ownerId) =>
    write((db) => {
      const before = db.comments.length;
      db.comments = db.comments.filter((c) => !(c.id === id && c.ownerId === ownerId));
      return db.comments.length < before;
    }),
  markAllRead: (ownerId) =>
    write((db) => {
      for (const c of db.comments) if (c.ownerId === ownerId) c.read = true;
    }),
};

const pushAudit = (db: DbShape, entry: AuditEntry) => {
  db.audit.unshift(entry);
  if (db.audit.length > MAX_AUDIT) db.audit.length = MAX_AUDIT;
};

export const jsonAuditRepository: AuditRepository = {
  append: (entry) => write((db) => pushAudit(db, entry)),
  list: (limit = 50, filter) =>
    read((db) =>
      db.audit
        .filter((a) => !filter?.targetType || (a.targetType ?? "program") === filter.targetType)
        .filter((a) => !filter?.targetId || a.programId === filter.targetId)
        .slice(0, limit),
    ),
};

export const jsonProgramAdminRepository: ProgramAdminRepository = {
  getOverride: (programId) => read((db) => db.programOverrides[programId] ?? null),
  setOverride: (programId, patch, audit) =>
    write((db) => {
      if (patch) db.programOverrides[programId] = patch;
      else delete db.programOverrides[programId];
      pushAudit(db, audit);
    }),
  listAudit: (limit = 50) => read((db) => db.audit.slice(0, limit)),
};

export const jsonOutcomeRepository: OutcomeRepository = {
  listSources: () => read((db) => [...dataSources, ...db.customSources]),
  listBenchmarks: async () => structuredClone(benchmarks),
  listMajorOutcomes: () =>
    read((db) => {
      const byId = new Map(majorOutcomes.map((o) => [o.majorId, o]));
      for (const [id, o] of Object.entries(db.outcomeOverrides)) byId.set(id, o);
      return [...byId.values()];
    }),
  listSchoolOutcomes: async () => structuredClone(schoolOutcomes),
  setMajorOutcome: (outcome) =>
    write((db) => {
      db.outcomeOverrides[outcome.majorId] = outcome;
    }),
  resetMajorOutcome: (majorId) =>
    write((db) => {
      const had = majorId in db.outcomeOverrides;
      delete db.outcomeOverrides[majorId];
      return had;
    }),
  addSource: (source) =>
    write((db) => {
      db.customSources.push(source);
    }),
};

export const jsonReviewRepository: ReviewRepository = {
  create: (review) =>
    write((db) => {
      db.reviews.push(review);
      return review;
    }),
  update: (id, patch) =>
    write((db) => {
      const i = db.reviews.findIndex((r) => r.id === id);
      if (i < 0) return null;
      db.reviews[i] = { ...db.reviews[i], ...patch, id };
      return db.reviews[i];
    }),
  findById: (id) => read((db) => db.reviews.find((r) => r.id === id) ?? null),
  findByUserAndSchool: (userId, schoolId) => read((db) => db.reviews.find((r) => r.userId === userId && r.schoolId === schoolId) ?? null),
  listBySchool: (schoolId) => read((db) => db.reviews.filter((r) => r.schoolId === schoolId)),
  listByStatus: (statuses) => read((db) => db.reviews.filter((r) => statuses.includes(r.status))),
  delete: (id) =>
    write((db) => {
      const before = db.reviews.length;
      db.reviews = db.reviews.filter((r) => r.id !== id);
      return db.reviews.length < before;
    }),
};

export const jsonChatLogRepository: ChatLogRepository = {
  add: (log) =>
    write((db) => {
      db.chatLogs.unshift(log);
      if (db.chatLogs.length > MAX_CHAT_LOGS) db.chatLogs.length = MAX_CHAT_LOGS;
    }),
  setHelpful: (id, helpful) =>
    write((db) => {
      const log = db.chatLogs.find((l) => l.id === id);
      if (!log) return false;
      log.helpful = helpful;
      return true;
    }),
  list: (limit = 200) => read((db) => db.chatLogs.slice(0, limit)),
};

// ---- Chương trình = dữ liệu gốc (memory) + phần ghi đè của quản trị viên ----

const KEYED_METHODS: Record<string, Omit<AdmissionMethod, "requirement">> = {
  thpt: { key: "thpt", name: "Xét điểm thi tốt nghiệp THPT", desc: "Theo tổng điểm tổ hợp cộng điểm ưu tiên.", tag: "Điểm thi" },
  hocba: { key: "hocba", name: "Xét học bạ THPT", desc: "Tổng điểm trung bình 3 môn theo tổ hợp lớp 10–12, cộng điểm ưu tiên.", tag: "Học bạ" },
  "dgnl-hn": { key: "dgnl-hn", name: "Xét kết quả thi ĐGNL ĐHQG Hà Nội (HSA)", desc: "Điểm bài thi HSA (thang 150), cộng điểm ưu tiên quy đổi.", tag: "ĐGNL" },
  "dgnl-hcm": { key: "dgnl-hcm", name: "Xét kết quả thi ĐGNL ĐHQG TP.HCM", desc: "Điểm bài thi (thang 1200), cộng điểm ưu tiên quy đổi.", tag: "ĐGNL" },
};

/** Áp phần ghi đè và đồng bộ danh sách phương thức có điểm chuẩn. */
export function applyProgramPatch(program: Program, patch: ProgramPatch | undefined | null): Program {
  if (!patch) return program;
  const next: Program = { ...program, ...patch };
  next.competition = competitionOf(next.cutoffs[0]?.score, next.quota);
  const available = new Set<string>([...(next.cutoffs.length ? ["thpt"] : []), ...next.altCutoffs.map((a) => a.method)]);
  const kept = next.methods.filter((m) => !m.key || available.has(m.key));
  for (const key of available) {
    if (!kept.some((m) => m.key === key)) kept.splice(Math.min(kept.length, 1), 0, { ...KEYED_METHODS[key], requirement: "Theo điểm chuẩn" });
  }
  next.methods = kept;
  return next;
}

async function withOverrides(programs: Program[]): Promise<Program[]> {
  const overrides = await read((db) => db.programOverrides);
  return programs.map((p) => applyProgramPatch(p, overrides[p.id]));
}

// ---- Danh mục: dữ liệu gốc + phần ghi đè + bản ghi quản trị viên thêm ----
async function allSchools(): Promise<School[]> {
  const [base, extra] = await Promise.all([memorySchoolRepository.findAll(), read((db) => ({ o: db.schoolOverrides, c: db.customSchools }))]);
  return [...base.map((s) => ({ ...s, ...(extra.o[s.id] ?? {}) })), ...extra.c.map((s) => ({ ...s, ...(extra.o[s.id] ?? {}), custom: true }))];
}
async function allMajors(): Promise<Major[]> {
  const [base, extra] = await Promise.all([memoryMajorRepository.findAll(), read((db) => ({ o: db.majorOverrides, c: db.customMajors }))]);
  return [...base.map((m) => ({ ...m, ...(extra.o[m.id] ?? {}) })), ...extra.c.map((m) => ({ ...m, ...(extra.o[m.id] ?? {}), custom: true }))];
}
async function allPrograms(): Promise<Program[]> {
  const [base, custom] = await Promise.all([memoryProgramRepository.findAll(), read((db) => db.customPrograms)]);
  return withOverrides([...base, ...custom.map((p) => ({ ...p, custom: true }))]);
}
/** Chương trình hiển thị cho học sinh: không ẩn, trường & ngành cũng không ẩn. */
async function visiblePrograms(): Promise<Program[]> {
  const [programs, schools, majors] = await Promise.all([allPrograms(), allSchools(), allMajors()]);
  const hiddenSchools = new Set(schools.filter((s) => s.hidden).map((s) => s.id));
  const hiddenMajors = new Set(majors.filter((m) => m.hidden).map((m) => m.id));
  const known = new Set(schools.map((s) => s.id));
  const knownMajors = new Set(majors.map((m) => m.id));
  return programs.filter((p) => !p.hidden && !hiddenSchools.has(p.schoolId) && !hiddenMajors.has(p.majorId) && known.has(p.schoolId) && knownMajors.has(p.majorId));
}

export const jsonSchoolRepository: SchoolRepository = {
  findAll: async () => (await allSchools()).filter((s) => !s.hidden),
  findById: async (id) => (await allSchools()).find((s) => s.id === id) ?? null,
  findBySlug: async (slug) => (await allSchools()).find((s) => s.slug === slug && !s.hidden) ?? null,
};

export const jsonMajorRepository: MajorRepository = {
  findAll: async () => (await allMajors()).filter((m) => !m.hidden),
  findById: async (id) => (await allMajors()).find((m) => m.id === id) ?? null,
  findBySlug: async (slug) => (await allMajors()).find((m) => m.slug === slug && !m.hidden) ?? null,
  findGroups: () => memoryMajorRepository.findGroups(),
};

export const jsonProgramRepository: ProgramRepository = {
  findAll: () => visiblePrograms(),
  findById: async (id) => (await visiblePrograms()).find((p) => p.id === id) ?? null,
  findBySlug: async (slug) => (await visiblePrograms()).find((p) => p.slug === slug) ?? null,
  findByIds: async (ids) => {
    const all = await visiblePrograms();
    return ids.map((id) => all.find((p) => p.id === id)).filter((p): p is Program => !!p);
  },
  findBySchool: async (schoolId) => (await visiblePrograms()).filter((p) => p.schoolId === schoolId),
  findByMajor: async (majorId) => (await visiblePrograms()).filter((p) => p.majorId === majorId),
};

const diff = <T extends object>(base: T, next: T): Partial<T> => {
  const out: Partial<T> = {};
  for (const k of Object.keys(next) as (keyof T)[]) if (JSON.stringify(base[k]) !== JSON.stringify(next[k])) out[k] = next[k];
  return out;
};

export const jsonCatalogAdminRepository: CatalogAdminRepository = {
  listSchools: () => allSchools(),
  saveSchool: async (school) => {
    const base = await memorySchoolRepository.findById(school.id);
    await write((db) => {
      if (base) db.schoolOverrides[school.id] = diff(base, { ...school, custom: undefined });
      else {
        const i = db.customSchools.findIndex((s) => s.id === school.id);
        const rec = { ...school, custom: true };
        if (i >= 0) db.customSchools[i] = rec;
        else db.customSchools.push(rec);
        delete db.schoolOverrides[school.id];
      }
    });
  },
  listMajors: () => allMajors(),
  saveMajor: async (major) => {
    const base = await memoryMajorRepository.findById(major.id);
    await write((db) => {
      if (base) db.majorOverrides[major.id] = diff(base, { ...major, custom: undefined });
      else {
        const i = db.customMajors.findIndex((m) => m.id === major.id);
        const rec = { ...major, custom: true };
        if (i >= 0) db.customMajors[i] = rec;
        else db.customMajors.push(rec);
        delete db.majorOverrides[major.id];
      }
    });
  },
  listPrograms: () => allPrograms(),
  getProgram: async (id) => (await allPrograms()).find((p) => p.id === id) ?? null,
  createProgram: (program) =>
    write((db) => {
      if (db.customPrograms.some((p) => p.id === program.id)) throw new Error("duplicate");
      db.customPrograms.push({ ...program, custom: true });
    }),
};

const DEFAULT_TYPE_WEIGHTS = { R: 1, I: 1, A: 1, S: 1, E: 1, C: 1 } as const;
export const jsonQuizConfigRepository: QuizConfigRepository = {
  get: () => read((db) => db.quizConfig),
  save: (cfg) =>
    write((db) => {
      db.quizConfig = cfg;
    }),
  listAll: async () => {
    const [base, cfg] = await Promise.all([memoryQuizRepository.findQuestions(), read((db) => db.quizConfig)]);
    const o = cfg?.overrides ?? {};
    return [...base.map((q) => ({ ...q, ...(o[q.id] ?? {}) })), ...(cfg?.custom ?? []).map((q) => ({ ...q, ...(o[q.id] ?? {}), custom: true }))];
  },
};
export const jsonQuizRepository: QuizRepository = {
  findQuestions: async () => (await jsonQuizConfigRepository.listAll()).filter((q) => !q.hidden),
};
export const quizTypeWeights = async () => ({ ...DEFAULT_TYPE_WEIGHTS, ...((await read((db) => db.quizConfig))?.typeWeights ?? {}) });

export const jsonRecommendConfigRepository: RecommendConfigRepository = {
  get: () => read((db) => db.recommendConfig),
  save: (cfg) =>
    write((db) => {
      db.recommendConfig = cfg;
    }),
};

const MAX_IMPORT_BATCHES = 200;
export const jsonImportBatchRepository: ImportBatchRepository = {
  add: (b) =>
    write((db) => {
      db.importBatches.unshift(b);
      db.importBatches = db.importBatches.slice(0, MAX_IMPORT_BATCHES);
    }),
  list: (limit = 20) => read((db) => db.importBatches.slice(0, limit)),
};

const MAX_SUBMISSIONS = 3000;
export const jsonSchoolSubmissionRepository: SchoolSubmissionRepository = {
  add: (x) =>
    write((db) => {
      db.schoolSubmissions.unshift(x);
      db.schoolSubmissions = db.schoolSubmissions.slice(0, MAX_SUBMISSIONS);
    }),
  list: (filter) => read((db) => db.schoolSubmissions.filter((x) => (!filter?.schoolId || x.schoolId === filter.schoolId) && (!filter?.status || x.status === filter.status))),
  findById: (id) => read((db) => db.schoolSubmissions.find((x) => x.id === id) ?? null),
  update: (id, patch) =>
    write((db) => {
      const i = db.schoolSubmissions.findIndex((x) => x.id === id);
      if (i < 0) return null;
      db.schoolSubmissions[i] = { ...db.schoolSubmissions[i], ...patch, id };
      return db.schoolSubmissions[i];
    }),
};

export const jsonDataReportRepository: DataReportRepository = {
  create: (report) =>
    write((db) => {
      db.dataReports.unshift(report);
      if (db.dataReports.length > MAX_REPORTS) db.dataReports.length = MAX_REPORTS;
      return report;
    }),
  update: (id, patch) =>
    write((db) => {
      const i = db.dataReports.findIndex((r) => r.id === id);
      if (i < 0) return null;
      db.dataReports[i] = { ...db.dataReports[i], ...patch, id };
      return db.dataReports[i];
    }),
  findById: (id) => read((db) => db.dataReports.find((r) => r.id === id) ?? null),
  list: (filter) => read((db) => db.dataReports.filter((r) => !filter?.status || filter.status.includes(r.status))),
};

export const jsonNotificationRepository: NotificationRepository = {
  add: (n) =>
    write((db) => {
      db.notifications.unshift(n);
      // Giữ tối đa MAX_NOTIFICATIONS_PER_USER thông báo mới nhất cho mỗi người.
      const seen: Record<string, number> = {};
      db.notifications = db.notifications.filter((x) => (seen[x.userId] = (seen[x.userId] ?? 0) + 1) <= MAX_NOTIFICATIONS_PER_USER);
    }),
  listByUser: (userId, limit = 20) => read((db) => db.notifications.filter((n) => n.userId === userId).slice(0, limit)),
  markRead: (userId, ids) =>
    write((db) => {
      let changed = 0;
      for (const n of db.notifications) {
        if (n.userId === userId && !n.read && (!ids || ids.includes(n.id))) {
          n.read = true;
          changed++;
        }
      }
      return changed;
    }),
};

export const jsonTimelineConfigRepository: TimelineConfigRepository = {
  get: () => read((db) => db.timelineConfig),
  set: (config) =>
    write((db) => {
      db.timelineConfig = config;
    }),
};

export const jsonChatAliasRepository: ChatAliasRepository = {
  list: () => read((db) => db.chatAliases),
  add: (alias) =>
    write((db) => {
      db.chatAliases = db.chatAliases.filter((a) => !(a.alias === alias.alias && a.kind === alias.kind));
      db.chatAliases.push(alias);
    }),
  delete: (id) =>
    write((db) => {
      const before = db.chatAliases.length;
      db.chatAliases = db.chatAliases.filter((a) => a.id !== id);
      return db.chatAliases.length < before;
    }),
};

const emptyCounts = () => Object.fromEntries(FUNNEL_EVENTS.map((e) => [e, 0])) as Record<FunnelEvent, number>;

export const jsonAnalyticsRepository: AnalyticsRepository = {
  record: (day, event, anonId) =>
    write((db) => {
      const bucket = (db.analytics[day] ??= {});
      const list = (bucket[event] ??= []);
      if (list.length < MAX_ANON_PER_EVENT_DAY && !list.includes(anonId)) list.push(anonId);
      // Chỉ giữ ANALYTICS_DAYS ngày gần nhất.
      const days = Object.keys(db.analytics).sort();
      for (const d of days.slice(0, Math.max(0, days.length - ANALYTICS_DAYS))) delete db.analytics[d];
    }),
  summary: (from, to) =>
    read((db) => {
      const sets = Object.fromEntries(FUNNEL_EVENTS.map((e) => [e, new Set<string>()])) as Record<FunnelEvent, Set<string>>;
      for (const [day, bucket] of Object.entries(db.analytics)) {
        if (day < from || day > to) continue;
        for (const e of FUNNEL_EVENTS) for (const id of bucket[e] ?? []) sets[e].add(id);
      }
      const out = emptyCounts();
      for (const e of FUNNEL_EVENTS) out[e] = sets[e].size;
      return out;
    }),
  daily: (from, to) =>
    read((db) =>
      Object.entries(db.analytics)
        .filter(([day]) => day >= from && day <= to)
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([day, bucket]) => {
          const counts = emptyCounts();
          for (const e of FUNNEL_EVENTS) counts[e] = bucket[e]?.length ?? 0;
          return { day, counts };
        }),
    ),
};

export const jsonSurveyRepository: SurveyRepository = {
  add: (r) =>
    write((db) => {
      db.surveys.push(r);
    }),
  list: () => read((db) => db.surveys),
};

export const jsonReminderLogRepository: ReminderLogRepository = {
  sent: (keys) => read((db) => new Set(keys.filter((k) => db.reminderLog.includes(k)))),
  add: (keys) =>
    write((db) => {
      db.reminderLog.push(...keys.filter((k) => !db.reminderLog.includes(k)));
      if (db.reminderLog.length > MAX_REMINDER_LOG) db.reminderLog.splice(0, db.reminderLog.length - MAX_REMINDER_LOG);
    }),
};

export const jsonQaRepository: QaRepository = {
  create: (q) =>
    write((db) => {
      db.questions.unshift(q);
      if (db.questions.length > MAX_QA) db.questions.length = MAX_QA;
      return q;
    }),
  update: (id, fn) =>
    write((db) => {
      const i = db.questions.findIndex((q) => q.id === id);
      if (i < 0) return null;
      db.questions[i] = { ...fn(structuredClone(db.questions[i])), id };
      return db.questions[i];
    }),
  findById: (id) => read((db) => db.questions.find((q) => q.id === id) ?? null),
  listByProgram: (programId) => read((db) => db.questions.filter((q) => q.programId === programId)),
  list: () => read((db) => db.questions),
};

export const jsonClassRepository: ClassRepository = {
  create: (c) =>
    write((db) => {
      if (db.classes.filter((x) => x.teacherId === c.teacherId).length >= MAX_CLASSES_PER_TEACHER) throw new Error("too-many-classes");
      db.classes.push(c);
      return c;
    }),
  update: (id, patch) =>
    write((db) => {
      const i = db.classes.findIndex((c) => c.id === id);
      if (i < 0) return null;
      const next = { ...db.classes[i], ...patch, id, teacherId: db.classes[i].teacherId };
      next.memberIds = Array.from(new Set(next.memberIds)).slice(0, MAX_CLASS_MEMBERS);
      db.classes[i] = next;
      return next;
    }),
  findById: (id) => read((db) => db.classes.find((c) => c.id === id) ?? null),
  findByCode: (code) => read((db) => db.classes.find((c) => c.code === code) ?? null),
  listByTeacher: (teacherId) => read((db) => db.classes.filter((c) => c.teacherId === teacherId)),
  listByMember: (userId) => read((db) => db.classes.filter((c) => c.memberIds.includes(userId))),
  delete: (id, teacherId) =>
    write((db) => {
      const before = db.classes.length;
      db.classes = db.classes.filter((c) => !(c.id === id && c.teacherId === teacherId));
      return db.classes.length < before;
    }),
};

export const jsonOutcomeSurveyRepository: OutcomeSurveyRepository = {
  add: (r) =>
    write((db) => {
      db.outcomeSurveys.push(r);
    }),
  listByProgram: (programId) => read((db) => db.outcomeSurveys.filter((o) => o.programId === programId)),
  findByUser: (userId, programId) => read((db) => db.outcomeSurveys.find((o) => o.userId === userId && o.programId === programId) ?? null),
  list: () => read((db) => db.outcomeSurveys),
};
