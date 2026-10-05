import { randomUUID } from "node:crypto";
import { getDb } from "../lib/mongodb";
import type {
  AuditEntry,
  Benchmark,
  ChatAlias,
  ChatLog,
  Combo,
  DataReport,
  DataReportStatus,
  DataSource,
  FaqGroup,
  FunnelEvent,
  ImportBatch,
  Major,
  MajorGroup,
  MajorOutcome,
  Program,
  ProgramPatch,
  QuizConfig,
  RecommendConfig,
  RiasecQuestion,
  School,
  SchoolOutcome,
  SchoolReview,
  SchoolSubmission,
  Share,
  ShareComment,
  Subject,
  SusResponse,
  TeacherClass,
  TimelineConfig,
  TimelineEvent,
  User,
  UserData,
  AppNotification,
  OutcomeSurvey,
  QaQuestion,
} from "../domain/types";
import type {
  AnalyticsRepository,
  AuditRepository,
  CatalogAdminRepository,
  CatalogRepository,
  ChatAliasRepository,
  ChatLogRepository,
  ClassRepository,
  CommentRepository,
  DataReportRepository,
  ImportBatchRepository,
  MajorRepository,
  NotificationRepository,
  OutcomeRepository,
  OutcomeSurveyRepository,
  ProgramAdminRepository,
  ProgramRepository,
  QaRepository,
  QuizConfigRepository,
  QuizRepository,
  RecommendConfigRepository,
  ReminderLogRepository,
  ReviewRepository,
  SchoolRepository,
  SchoolSubmissionRepository,
  ShareRepository,
  SurveyRepository,
  TimelineConfigRepository,
  TimelineRepository,
  UserDataRepository,
  UserRepository,
} from "./types";

import { schools as initialSchools } from "../data/schools";
import { majors as initialMajors } from "../data/majors";
import { majorGroups as initialGroups } from "../data/major-groups";
import { programs as initialPrograms } from "../data/programs";
import { combos as initialCombos, subjects as initialSubjects } from "../data/combos";
import { faqGroups as initialFaq } from "../data/faq";
import { riasecQuestions as initialQuestions } from "../data/riasec";
import { admissionTimeline as initialTimeline } from "../data/admission-timeline";
import { benchmarks as initialBenchmarks, majorOutcomes as initialMajorOutcomes, schoolOutcomes as initialSchoolOutcomes, dataSources as initialSources } from "../data/outcomes";

let seededPromise: Promise<void> | null = null;

/** Đảm bảo dữ liệu nền được khởi tạo tự động trong MongoDB nếu database trống */
async function ensureSeeded() {
  if (seededPromise) return seededPromise;
  seededPromise = (async () => {
    try {
      const db = await getDb();
      const schoolCount = await db.collection("schools").countDocuments();
      if (schoolCount === 0) {
        // Nạp danh mục trường
        if (initialSchools.length) {
          await db.collection("schools").insertMany(initialSchools.map((s: any) => ({ ...s, _id: s.id })));
        }
        // Nạp danh mục ngành
        if (initialMajors.length) {
          await db.collection("majors").insertMany(initialMajors.map((m: any) => ({ ...m, _id: m.id })));
        }
        // Nạp nhóm ngành
        if (initialGroups.length) {
          await db.collection("majorGroups").insertMany(initialGroups.map((g: any) => ({ ...g, _id: g.id })));
        }
        // Nạp chương trình
        if (initialPrograms.length) {
          await db.collection("programs").insertMany(initialPrograms.map((p: any) => ({ ...p, _id: p.id })));
        }
        // Nạp tổ hợp & môn
        if (initialCombos.length) {
          await db.collection("combos").insertMany(initialCombos.map((c: any) => ({ ...c, _id: c.code })));
        }
        if (initialSubjects.length) {
          await db.collection("subjects").insertMany(initialSubjects.map((s: any) => ({ ...s, _id: s.id })));
        }
        // Nạp câu hỏi trắc nghiệm RIASEC
        if (initialQuestions.length) {
          await db.collection("quizQuestions").insertMany(initialQuestions.map((q: any) => ({ ...q, _id: q.id })));
        }
        // Nạp FAQ
        if (initialFaq.length) {
          await db.collection("faq").insertMany(initialFaq.map((f: any, i: number) => ({ ...f, _id: `faq-${i}` })));
        }
        // Nạp timeline
        if (initialTimeline.length) {
          await db.collection("timeline").insertMany(initialTimeline.map((t: any) => ({ ...t, _id: t.id })));
        }
        // Nạp việc làm & thu nhập
        if (initialMajorOutcomes.length) {
          await db.collection("majorOutcomes").insertMany(initialMajorOutcomes.map((o: any) => ({ ...o, _id: o.majorId })));
        }
        if (initialBenchmarks.length) {
          await db.collection("benchmarks").insertMany(initialBenchmarks.map((b: any, i: number) => ({ ...b, _id: `bm-${i}` })));
        }
        if (initialSchoolOutcomes.length) {
          await db.collection("schoolOutcomes").insertMany(initialSchoolOutcomes.map((o: any) => ({ ...o, _id: o.schoolId })));
        }
        if (initialSources.length) {
          await db.collection("dataSources").insertMany(initialSources.map((s: any) => ({ ...s, _id: s.id })));
        }
      }
    } catch (err) {
      console.error("MongoDB auto-seed error:", err);
    }
  })();
  return seededPromise;
}

// ==================== SCHOOL REPOSITORY ====================
export const mongoSchoolRepository: SchoolRepository = {
  async findAll(): Promise<School[]> {
    await ensureSeeded();
    const db = await getDb();
    const docs = await db.collection("schools").find({ hidden: { $ne: true } }).toArray();
    return docs.map(({ _id, ...rest }) => rest as unknown as School);
  },
  async findById(id: string): Promise<School | null> {
    await ensureSeeded();
    const db = await getDb();
    const doc = await db.collection("schools").findOne({ id, hidden: { $ne: true } });
    if (!doc) return null;
    const { _id, ...rest } = doc;
    return rest as unknown as School;
  },
  async findBySlug(slug: string): Promise<School | null> {
    await ensureSeeded();
    const db = await getDb();
    const doc = await db.collection("schools").findOne({ slug, hidden: { $ne: true } });
    if (!doc) return null;
    const { _id, ...rest } = doc;
    return rest as unknown as School;
  },
};

// ==================== MAJOR REPOSITORY ====================
export const mongoMajorRepository: MajorRepository = {
  async findAll(): Promise<Major[]> {
    await ensureSeeded();
    const db = await getDb();
    const docs = await db.collection("majors").find({ hidden: { $ne: true } }).toArray();
    return docs.map(({ _id, ...rest }) => rest as unknown as Major);
  },
  async findById(id: string): Promise<Major | null> {
    await ensureSeeded();
    const db = await getDb();
    const doc = await db.collection("majors").findOne({ id, hidden: { $ne: true } });
    if (!doc) return null;
    const { _id, ...rest } = doc;
    return rest as unknown as Major;
  },
  async findBySlug(slug: string): Promise<Major | null> {
    await ensureSeeded();
    const db = await getDb();
    const doc = await db.collection("majors").findOne({ slug, hidden: { $ne: true } });
    if (!doc) return null;
    const { _id, ...rest } = doc;
    return rest as unknown as Major;
  },
  async findGroups(): Promise<MajorGroup[]> {
    await ensureSeeded();
    const db = await getDb();
    const docs = await db.collection("majorGroups").find().toArray();
    if (docs.length === 0) return initialGroups;
    return docs.map(({ _id, ...rest }) => rest as unknown as MajorGroup);
  },
};

// ==================== PROGRAM REPOSITORY ====================
export const mongoProgramRepository: ProgramRepository = {
  async findAll(): Promise<Program[]> {
    await ensureSeeded();
    const db = await getDb();
    const docs = await db.collection("programs").find({ hidden: { $ne: true } }).toArray();
    return docs.map(({ _id, ...rest }) => rest as unknown as Program);
  },
  async findById(id: string): Promise<Program | null> {
    await ensureSeeded();
    const db = await getDb();
    const doc = await db.collection("programs").findOne({ id, hidden: { $ne: true } });
    if (!doc) return null;
    const { _id, ...rest } = doc;
    return rest as unknown as Program;
  },
  async findBySlug(slug: string): Promise<Program | null> {
    await ensureSeeded();
    const db = await getDb();
    const doc = await db.collection("programs").findOne({ slug, hidden: { $ne: true } });
    if (!doc) return null;
    const { _id, ...rest } = doc;
    return rest as unknown as Program;
  },
  async findByIds(ids: string[]): Promise<Program[]> {
    await ensureSeeded();
    const db = await getDb();
    const docs = await db.collection("programs").find({ id: { $in: ids }, hidden: { $ne: true } }).toArray();
    return docs.map(({ _id, ...rest }) => rest as unknown as Program);
  },
  async findBySchool(schoolId: string): Promise<Program[]> {
    await ensureSeeded();
    const db = await getDb();
    const docs = await db.collection("programs").find({ schoolId, hidden: { $ne: true } }).toArray();
    return docs.map(({ _id, ...rest }) => rest as unknown as Program);
  },
  async findByMajor(majorId: string): Promise<Program[]> {
    await ensureSeeded();
    const db = await getDb();
    const docs = await db.collection("programs").find({ majorId, hidden: { $ne: true } }).toArray();
    return docs.map(({ _id, ...rest }) => rest as unknown as Program);
  },
};

// ==================== CATALOG ADMIN REPOSITORY ====================
export const mongoCatalogAdminRepository: CatalogAdminRepository = {
  async listSchools(): Promise<School[]> {
    await ensureSeeded();
    const db = await getDb();
    const docs = await db.collection("schools").find().toArray();
    return docs.map(({ _id, ...rest }) => rest as unknown as School);
  },
  async saveSchool(school: School): Promise<void> {
    await ensureSeeded();
    const db = await getDb();
    await db.collection("schools").updateOne({ id: school.id }, { $set: school }, { upsert: true });
  },
  async listMajors(): Promise<Major[]> {
    await ensureSeeded();
    const db = await getDb();
    const docs = await db.collection("majors").find().toArray();
    return docs.map(({ _id, ...rest }) => rest as unknown as Major);
  },
  async saveMajor(major: Major): Promise<void> {
    await ensureSeeded();
    const db = await getDb();
    await db.collection("majors").updateOne({ id: major.id }, { $set: major }, { upsert: true });
  },
  async listPrograms(): Promise<Program[]> {
    await ensureSeeded();
    const db = await getDb();
    const docs = await db.collection("programs").find().toArray();
    return docs.map(({ _id, ...rest }) => rest as unknown as Program);
  },
  async getProgram(id: string): Promise<Program | null> {
    await ensureSeeded();
    const db = await getDb();
    const doc = await db.collection("programs").findOne({ id });
    if (!doc) return null;
    const { _id, ...rest } = doc;
    return rest as unknown as Program;
  },
  async createProgram(program: Program): Promise<void> {
    await ensureSeeded();
    const db = await getDb();
    await db.collection("programs").updateOne({ id: program.id }, { $set: { ...program, custom: true } }, { upsert: true });
  },
};

// ==================== PROGRAM ADMIN REPOSITORY ====================
export const mongoProgramAdminRepository: ProgramAdminRepository = {
  async getOverride(programId: string): Promise<ProgramPatch | null> {
    const db = await getDb();
    const doc = await db.collection("programOverrides").findOne({ programId });
    return doc ? (doc.patch as ProgramPatch) : null;
  },
  async setOverride(programId: string, patch: ProgramPatch | null, audit: AuditEntry): Promise<void> {
    const db = await getDb();
    if (patch === null) {
      await db.collection("programOverrides").deleteOne({ programId });
    } else {
      await db.collection("programOverrides").updateOne({ programId }, { $set: { programId, patch, updatedAt: new Date().toISOString() } }, { upsert: true });
    }
    await db.collection("audit").insertOne({ ...audit, _id: audit.id as any });
  },
  async listAudit(limit = 100): Promise<AuditEntry[]> {
    const db = await getDb();
    const docs = await db.collection("audit").find().sort({ timestamp: -1 }).limit(limit).toArray();
    return docs.map(({ _id, ...rest }) => rest as unknown as AuditEntry);
  },
};

// ==================== CATALOG & QUIZ REPOSITORIES ====================
export const mongoCatalogRepository: CatalogRepository = {
  async findSubjects(): Promise<Subject[]> {
    await ensureSeeded();
    const db = await getDb();
    const docs = await db.collection("subjects").find().toArray();
    if (docs.length === 0) return initialSubjects;
    return docs.map(({ _id, ...rest }) => rest as unknown as Subject);
  },
  async findCombos(): Promise<Combo[]> {
    await ensureSeeded();
    const db = await getDb();
    const docs = await db.collection("combos").find().toArray();
    if (docs.length === 0) return initialCombos;
    return docs.map(({ _id, ...rest }) => rest as unknown as Combo);
  },
  async findFaq(): Promise<FaqGroup[]> {
    await ensureSeeded();
    const db = await getDb();
    const docs = await db.collection("faq").find().toArray();
    if (docs.length === 0) return initialFaq;
    return docs.map(({ _id, ...rest }) => rest as unknown as FaqGroup);
  },
};

export const mongoQuizRepository: QuizRepository = {
  async findQuestions(): Promise<RiasecQuestion[]> {
    await ensureSeeded();
    const db = await getDb();
    const docs = await db.collection("quizQuestions").find({ hidden: { $ne: true } }).toArray();
    if (docs.length === 0) return initialQuestions;
    return docs.map(({ _id, ...rest }) => rest as unknown as RiasecQuestion);
  },
};

export const mongoQuizConfigRepository: QuizConfigRepository = {
  async get(): Promise<QuizConfig | null> {
    const db = await getDb();
    const doc = await db.collection("appConfig").findOne({ key: "quizConfig" });
    return doc ? (doc.value as QuizConfig) : null;
  },
  async save(cfg: QuizConfig): Promise<void> {
    const db = await getDb();
    await db.collection("appConfig").updateOne({ key: "quizConfig" }, { $set: { value: cfg } }, { upsert: true });
  },
  async listAll(): Promise<RiasecQuestion[]> {
    await ensureSeeded();
    const db = await getDb();
    const docs = await db.collection("quizQuestions").find().toArray();
    return docs.map(({ _id, ...rest }) => rest as unknown as RiasecQuestion);
  },
};

export const mongoRecommendConfigRepository: RecommendConfigRepository = {
  async get(): Promise<RecommendConfig | null> {
    const db = await getDb();
    const doc = await db.collection("appConfig").findOne({ key: "recommendConfig" });
    return doc ? (doc.value as RecommendConfig) : null;
  },
  async save(cfg: RecommendConfig): Promise<void> {
    const db = await getDb();
    await db.collection("appConfig").updateOne({ key: "recommendConfig" }, { $set: { value: cfg } }, { upsert: true });
  },
};

export const mongoTimelineRepository: TimelineRepository = {
  async findAll(): Promise<TimelineEvent[]> {
    await ensureSeeded();
    const db = await getDb();
    const docs = await db.collection("timeline").find().toArray();
    if (docs.length === 0) return initialTimeline;
    return docs.map(({ _id, ...rest }) => rest as unknown as TimelineEvent);
  },
};

export const mongoTimelineConfigRepository: TimelineConfigRepository = {
  async get(): Promise<TimelineConfig | null> {
    const db = await getDb();
    const doc = await db.collection("appConfig").findOne({ key: "timelineConfig" });
    return doc ? (doc.value as TimelineConfig) : null;
  },
  async set(config: TimelineConfig | null): Promise<void> {
    const db = await getDb();
    if (config === null) {
      await db.collection("appConfig").deleteOne({ key: "timelineConfig" });
    } else {
      await db.collection("appConfig").updateOne({ key: "timelineConfig" }, { $set: { value: config } }, { upsert: true });
    }
  },
};

// ==================== USER & USER DATA REPOSITORY ====================
export const mongoUserRepository: UserRepository = {
  async findByEmail(email: string): Promise<User | null> {
    const db = await getDb();
    const doc = await db.collection("users").findOne({ email: email.toLowerCase() });
    if (!doc) return null;
    const { _id, ...rest } = doc;
    return rest as unknown as User;
  },
  async findById(id: string): Promise<User | null> {
    const db = await getDb();
    const doc = await db.collection("users").findOne({ id });
    if (!doc) return null;
    const { _id, ...rest } = doc;
    return rest as unknown as User;
  },
  async findByGoogleId(googleId: string): Promise<User | null> {
    const db = await getDb();
    const doc = await db.collection("users").findOne({ googleId });
    if (!doc) return null;
    const { _id, ...rest } = doc;
    return rest as unknown as User;
  },
  async list(): Promise<User[]> {
    const db = await getDb();
    const docs = await db.collection("users").find().toArray();
    return docs.map(({ _id, ...rest }) => rest as unknown as User);
  },
  async create(input: Omit<User, "id" | "createdAt">): Promise<User> {
    const db = await getDb();
    const user: User = {
      ...input,
      id: `u-${randomUUID()}`,
      email: input.email.toLowerCase(),
      createdAt: new Date().toISOString(),
    };
    await db.collection("users").insertOne({ ...user, _id: user.id as any });
    return user;
  },
  async update(id: string, patch: Partial<Omit<User, "id">>): Promise<User | null> {
    const db = await getDb();
    const res = await db.collection("users").findOneAndUpdate(
      { id },
      { $set: { ...patch, ...(patch.email ? { email: patch.email.toLowerCase() } : {}) } },
      { returnDocument: "after" }
    );
    if (!res) return null;
    const { _id, ...rest } = res as any;
    return rest as unknown as User;
  },
  async delete(id: string): Promise<boolean> {
    const db = await getDb();
    const res = await db.collection("users").deleteOne({ id });
    await db.collection("userData").deleteOne({ userId: id });
    return res.deletedCount > 0;
  },
};

export const mongoUserDataRepository: UserDataRepository = {
  async get(userId: string): Promise<UserData | null> {
    const db = await getDb();
    const doc = await db.collection("userData").findOne({ userId });
    return doc ? (doc.data as UserData) : null;
  },
  async put(userId: string, data: UserData): Promise<UserData> {
    const db = await getDb();
    await db.collection("userData").updateOne(
      { userId },
      { $set: { userId, data, updatedAt: new Date().toISOString() } },
      { upsert: true }
    );
    return data;
  },
  async delete(userId: string): Promise<void> {
    const db = await getDb();
    await db.collection("userData").deleteOne({ userId });
  },
};

// ==================== SHARES & COMMENTS ====================
export const mongoShareRepository: ShareRepository = {
  async create(share: Share): Promise<Share> {
    const db = await getDb();
    await db.collection("shares").insertOne({ ...share, _id: share.id as any });
    return share;
  },
  async findById(id: string): Promise<Share | null> {
    const db = await getDb();
    const doc = await db.collection("shares").findOne({ id });
    if (!doc) return null;
    const { _id, ...rest } = doc;
    return rest as unknown as Share;
  },
  async listByUser(userId: string): Promise<Share[]> {
    const db = await getDb();
    const docs = await db.collection("shares").find({ userId }).sort({ createdAt: -1 }).toArray();
    return docs.map(({ _id, ...rest }) => rest as unknown as Share);
  },
  async update(id: string, patch: Partial<Omit<Share, "id" | "userId">>): Promise<Share | null> {
    const db = await getDb();
    const res = await db.collection("shares").findOneAndUpdate({ id }, { $set: patch }, { returnDocument: "after" });
    if (!res) return null;
    const { _id, ...rest } = res as any;
    return rest as unknown as Share;
  },
};

export const mongoCommentRepository: CommentRepository = {
  async add(comment: ShareComment): Promise<ShareComment> {
    const db = await getDb();
    await db.collection("comments").insertOne({ ...comment, _id: comment.id as any });
    return comment;
  },
  async listByOwner(ownerId: string): Promise<ShareComment[]> {
    const db = await getDb();
    const docs = await db.collection("comments").find({ ownerId }).sort({ createdAt: -1 }).toArray();
    return docs.map(({ _id, ...rest }) => rest as unknown as ShareComment);
  },
  async countByShare(shareId: string): Promise<number> {
    const db = await getDb();
    return db.collection("comments").countDocuments({ shareId });
  },
  async delete(id: string, ownerId: string): Promise<boolean> {
    const db = await getDb();
    const res = await db.collection("comments").deleteOne({ id, ownerId });
    return res.deletedCount > 0;
  },
  async markAllRead(ownerId: string): Promise<void> {
    const db = await getDb();
    await db.collection("comments").updateMany({ ownerId, read: false }, { $set: { read: true } });
  },
};

// ==================== OUTCOMES & REVIEWS ====================
export const mongoOutcomeRepository: OutcomeRepository = {
  async listSources(): Promise<DataSource[]> {
    await ensureSeeded();
    const db = await getDb();
    const docs = await db.collection("dataSources").find().toArray();
    return docs.length ? docs.map(({ _id, ...rest }) => rest as unknown as DataSource) : initialSources;
  },
  async listBenchmarks(): Promise<Benchmark[]> {
    await ensureSeeded();
    const db = await getDb();
    const docs = await db.collection("benchmarks").find().toArray();
    return docs.length ? docs.map(({ _id, ...rest }) => rest as unknown as Benchmark) : initialBenchmarks;
  },
  async listMajorOutcomes(): Promise<MajorOutcome[]> {
    await ensureSeeded();
    const db = await getDb();
    const docs = await db.collection("majorOutcomes").find().toArray();
    return docs.length ? docs.map(({ _id, ...rest }) => rest as unknown as MajorOutcome) : initialMajorOutcomes;
  },
  async listSchoolOutcomes(): Promise<SchoolOutcome[]> {
    await ensureSeeded();
    const db = await getDb();
    const docs = await db.collection("schoolOutcomes").find().toArray();
    return docs.length ? docs.map(({ _id, ...rest }) => rest as unknown as SchoolOutcome) : initialSchoolOutcomes;
  },
  async setMajorOutcome(outcome: MajorOutcome): Promise<void> {
    const db = await getDb();
    await db.collection("majorOutcomes").updateOne({ majorId: outcome.majorId }, { $set: outcome }, { upsert: true });
  },
  async resetMajorOutcome(majorId: string): Promise<boolean> {
    const db = await getDb();
    const init = initialMajorOutcomes.find((o) => o.majorId === majorId);
    if (init) {
      await db.collection("majorOutcomes").updateOne({ majorId }, { $set: init }, { upsert: true });
      return true;
    }
    const res = await db.collection("majorOutcomes").deleteOne({ majorId });
    return res.deletedCount > 0;
  },
  async addSource(source: DataSource): Promise<void> {
    const db = await getDb();
    await db.collection("dataSources").insertOne({ ...source, _id: source.id as any });
  },
};

export const mongoReviewRepository: ReviewRepository = {
  async create(review: SchoolReview): Promise<SchoolReview> {
    const db = await getDb();
    await db.collection("reviews").insertOne({ ...review, _id: review.id as any });
    return review;
  },
  async update(id: string, patch: Partial<Omit<SchoolReview, "id">>): Promise<SchoolReview | null> {
    const db = await getDb();
    const res = await db.collection("reviews").findOneAndUpdate({ id }, { $set: patch }, { returnDocument: "after" });
    if (!res) return null;
    const { _id, ...rest } = res as any;
    return rest as unknown as SchoolReview;
  },
  async findById(id: string): Promise<SchoolReview | null> {
    const db = await getDb();
    const doc = await db.collection("reviews").findOne({ id });
    if (!doc) return null;
    const { _id, ...rest } = doc;
    return rest as unknown as SchoolReview;
  },
  async findByUserAndSchool(userId: string, schoolId: string): Promise<SchoolReview | null> {
    const db = await getDb();
    const doc = await db.collection("reviews").findOne({ userId, schoolId });
    if (!doc) return null;
    const { _id, ...rest } = doc;
    return rest as unknown as SchoolReview;
  },
  async listBySchool(schoolId: string): Promise<SchoolReview[]> {
    const db = await getDb();
    const docs = await db.collection("reviews").find({ schoolId, status: "approved" }).sort({ createdAt: -1 }).toArray();
    return docs.map(({ _id, ...rest }) => rest as unknown as SchoolReview);
  },
  async listByStatus(statuses: SchoolReview["status"][]): Promise<SchoolReview[]> {
    const db = await getDb();
    const docs = await db.collection("reviews").find({ status: { $in: statuses } }).sort({ createdAt: -1 }).toArray();
    return docs.map(({ _id, ...rest }) => rest as unknown as SchoolReview);
  },
  async delete(id: string): Promise<boolean> {
    const db = await getDb();
    const res = await db.collection("reviews").deleteOne({ id });
    return res.deletedCount > 0;
  },
};

// ==================== CHAT, REPORTS & NOTIFICATIONS ====================
export const mongoChatLogRepository: ChatLogRepository = {
  async add(log: ChatLog): Promise<void> {
    const db = await getDb();
    await db.collection("chatLogs").insertOne({ ...log, _id: log.id as any });
  },
  async setHelpful(id: string, helpful: boolean): Promise<boolean> {
    const db = await getDb();
    const res = await db.collection("chatLogs").updateOne({ id }, { $set: { helpful } });
    return res.modifiedCount > 0;
  },
  async list(limit = 100): Promise<ChatLog[]> {
    const db = await getDb();
    const docs = await db.collection("chatLogs").find().sort({ timestamp: -1 }).limit(limit).toArray();
    return docs.map(({ _id, ...rest }) => rest as unknown as ChatLog);
  },
};

export const mongoDataReportRepository: DataReportRepository = {
  async create(report: DataReport): Promise<DataReport> {
    const db = await getDb();
    await db.collection("dataReports").insertOne({ ...report, _id: report.id as any });
    return report;
  },
  async update(id: string, patch: Partial<Omit<DataReport, "id">>): Promise<DataReport | null> {
    const db = await getDb();
    const res = await db.collection("dataReports").findOneAndUpdate({ id }, { $set: patch }, { returnDocument: "after" });
    if (!res) return null;
    const { _id, ...rest } = res as any;
    return rest as unknown as DataReport;
  },
  async findById(id: string): Promise<DataReport | null> {
    const db = await getDb();
    const doc = await db.collection("dataReports").findOne({ id });
    if (!doc) return null;
    const { _id, ...rest } = doc;
    return rest as unknown as DataReport;
  },
  async list(filter?: { status?: DataReportStatus[] }): Promise<DataReport[]> {
    const db = await getDb();
    const query = filter?.status ? { status: { $in: filter.status } } : {};
    const docs = await db.collection("dataReports").find(query).sort({ createdAt: -1 }).toArray();
    return docs.map(({ _id, ...rest }) => rest as unknown as DataReport);
  },
};

export const mongoNotificationRepository: NotificationRepository = {
  async add(n: AppNotification): Promise<void> {
    const db = await getDb();
    await db.collection("notifications").insertOne({ ...n, _id: n.id as any });
  },
  async listByUser(userId: string, limit = 50): Promise<AppNotification[]> {
    const db = await getDb();
    const docs = await db.collection("notifications").find({ userId }).sort({ createdAt: -1 }).limit(limit).toArray();
    return docs.map(({ _id, ...rest }) => rest as unknown as AppNotification);
  },
  async markRead(userId: string, ids?: string[]): Promise<number> {
    const db = await getDb();
    const query: Record<string, any> = { userId, read: false };
    if (ids?.length) query.id = { $in: ids };
    const res = await db.collection("notifications").updateMany(query, { $set: { read: true } });
    return res.modifiedCount;
  },
};

export const mongoChatAliasRepository: ChatAliasRepository = {
  async list(): Promise<ChatAlias[]> {
    const db = await getDb();
    const docs = await db.collection("chatAliases").find().toArray();
    return docs.map(({ _id, ...rest }) => rest as unknown as ChatAlias);
  },
  async add(alias: ChatAlias): Promise<void> {
    const db = await getDb();
    await db.collection("chatAliases").insertOne({ ...alias, _id: alias.id as any });
  },
  async delete(id: string): Promise<boolean> {
    const db = await getDb();
    const res = await db.collection("chatAliases").deleteOne({ id });
    return res.deletedCount > 0;
  },
};

// ==================== ANALYTICS & SURVEYS ====================
export const mongoAnalyticsRepository: AnalyticsRepository = {
  async record(day: string, event: FunnelEvent, anonId: string): Promise<void> {
    const db = await getDb();
    await db.collection("analytics").updateOne(
      { day, event },
      { $addToSet: { anonIds: anonId } },
      { upsert: true }
    );
  },
  async summary(from: string, to: string): Promise<Record<FunnelEvent, number>> {
    const db = await getDb();
    const docs = await db.collection("analytics").find({ day: { $gte: from, $lte: to } }).toArray();
    const res: Partial<Record<FunnelEvent, Set<string>>> = {};
    for (const d of docs) {
      const evt = d.event as FunnelEvent;
      if (!res[evt]) res[evt] = new Set();
      for (const id of d.anonIds || []) res[evt]!.add(id);
    }
    const final: Record<string, number> = {};
    for (const [k, v] of Object.entries(res)) {
      final[k] = v.size;
    }
    return final as Record<FunnelEvent, number>;
  },
  async daily(from: string, to: string): Promise<{ day: string; counts: Record<FunnelEvent, number> }[]> {
    const db = await getDb();
    const docs = await db.collection("analytics").find({ day: { $gte: from, $lte: to } }).toArray();
    const dayMap = new Map<string, Record<string, number>>();
    for (const d of docs) {
      if (!dayMap.has(d.day)) dayMap.set(d.day, {});
      const c = dayMap.get(d.day)!;
      c[d.event] = (d.anonIds || []).length;
    }
    return Array.from(dayMap.entries()).map(([day, counts]) => ({ day, counts: counts as Record<FunnelEvent, number> }));
  },
};

export const mongoSurveyRepository: SurveyRepository = {
  async add(r: SusResponse): Promise<void> {
    const db = await getDb();
    await db.collection("surveys").insertOne({ ...r, _id: r.id as any });
  },
  async list(): Promise<SusResponse[]> {
    const db = await getDb();
    const docs = await db.collection("surveys").find().sort({ submittedAt: -1 }).toArray();
    return docs.map(({ _id, ...rest }) => rest as unknown as SusResponse);
  },
};

export const mongoReminderLogRepository: ReminderLogRepository = {
  async sent(keys: string[]): Promise<Set<string>> {
    const db = await getDb();
    const docs = await db.collection("reminderLog").find({ key: { $in: keys } }).toArray();
    return new Set(docs.map((d) => d.key));
  },
  async add(keys: string[]): Promise<void> {
    if (keys.length === 0) return;
    const db = await getDb();
    await db.collection("reminderLog").insertMany(keys.map((k) => ({ key: k, createdAt: new Date().toISOString() })), { ordered: false }).catch(() => {});
  },
};

export const mongoQaRepository: QaRepository = {
  async create(q: QaQuestion): Promise<QaQuestion> {
    const db = await getDb();
    await db.collection("qaQuestions").insertOne({ ...q, _id: q.id as any });
    return q;
  },
  async update(id: string, fn: (q: QaQuestion) => QaQuestion): Promise<QaQuestion | null> {
    const db = await getDb();
    const doc = await db.collection("qaQuestions").findOne({ id });
    if (!doc) return null;
    const { _id, ...cur } = doc;
    const next = fn(cur as unknown as QaQuestion);
    await db.collection("qaQuestions").updateOne({ id }, { $set: next });
    return next;
  },
  async findById(id: string): Promise<QaQuestion | null> {
    const db = await getDb();
    const doc = await db.collection("qaQuestions").findOne({ id });
    if (!doc) return null;
    const { _id, ...rest } = doc;
    return rest as unknown as QaQuestion;
  },
  async listByProgram(programId: string): Promise<QaQuestion[]> {
    const db = await getDb();
    const docs = await db.collection("qaQuestions").find({ programId, status: "approved" }).sort({ createdAt: -1 }).toArray();
    return docs.map(({ _id, ...rest }) => rest as unknown as QaQuestion);
  },
  async list(): Promise<QaQuestion[]> {
    const db = await getDb();
    const docs = await db.collection("qaQuestions").find().sort({ createdAt: -1 }).toArray();
    return docs.map(({ _id, ...rest }) => rest as unknown as QaQuestion);
  },
};

export const mongoClassRepository: ClassRepository = {
  async create(c: TeacherClass): Promise<TeacherClass> {
    const db = await getDb();
    await db.collection("classes").insertOne({ ...c, _id: c.id as any });
    return c;
  },
  async update(id: string, patch: Partial<Omit<TeacherClass, "id" | "teacherId">>): Promise<TeacherClass | null> {
    const db = await getDb();
    const res = await db.collection("classes").findOneAndUpdate({ id }, { $set: patch }, { returnDocument: "after" });
    if (!res) return null;
    const { _id, ...rest } = res as any;
    return rest as unknown as TeacherClass;
  },
  async findById(id: string): Promise<TeacherClass | null> {
    const db = await getDb();
    const doc = await db.collection("classes").findOne({ id });
    if (!doc) return null;
    const { _id, ...rest } = doc;
    return rest as unknown as TeacherClass;
  },
  async findByCode(code: string): Promise<TeacherClass | null> {
    const db = await getDb();
    const doc = await db.collection("classes").findOne({ code });
    if (!doc) return null;
    const { _id, ...rest } = doc;
    return rest as unknown as TeacherClass;
  },
  async listByTeacher(teacherId: string): Promise<TeacherClass[]> {
    const db = await getDb();
    const docs = await db.collection("classes").find({ teacherId }).sort({ createdAt: -1 }).toArray();
    return docs.map(({ _id, ...rest }) => rest as unknown as TeacherClass);
  },
  async listByMember(userId: string): Promise<TeacherClass[]> {
    const db = await getDb();
    const docs = await db.collection("classes").find({ "members.userId": userId }).sort({ createdAt: -1 }).toArray();
    return docs.map(({ _id, ...rest }) => rest as unknown as TeacherClass);
  },
  async delete(id: string, teacherId: string): Promise<boolean> {
    const db = await getDb();
    const res = await db.collection("classes").deleteOne({ id, teacherId });
    return res.deletedCount > 0;
  },
};

export const mongoOutcomeSurveyRepository: OutcomeSurveyRepository = {
  async add(r: OutcomeSurvey): Promise<void> {
    const db = await getDb();
    await db.collection("outcomeSurveys").insertOne({ ...r, _id: r.id as any });
  },
  async listByProgram(programId: string): Promise<OutcomeSurvey[]> {
    const db = await getDb();
    const docs = await db.collection("outcomeSurveys").find({ programId }).sort({ submittedAt: -1 }).toArray();
    return docs.map(({ _id, ...rest }) => rest as unknown as OutcomeSurvey);
  },
  async findByUser(userId: string, programId: string): Promise<OutcomeSurvey | null> {
    const db = await getDb();
    const doc = await db.collection("outcomeSurveys").findOne({ userId, programId });
    if (!doc) return null;
    const { _id, ...rest } = doc;
    return rest as unknown as OutcomeSurvey;
  },
  async list(): Promise<OutcomeSurvey[]> {
    const db = await getDb();
    const docs = await db.collection("outcomeSurveys").find().sort({ submittedAt: -1 }).toArray();
    return docs.map(({ _id, ...rest }) => rest as unknown as OutcomeSurvey);
  },
};

export const mongoImportBatchRepository: ImportBatchRepository = {
  async add(b: ImportBatch): Promise<void> {
    const db = await getDb();
    await db.collection("importBatches").insertOne({ ...b, _id: b.id as any });
  },
  async list(limit = 50): Promise<ImportBatch[]> {
    const db = await getDb();
    const docs = await db.collection("importBatches").find().sort({ importedAt: -1 }).limit(limit).toArray();
    return docs.map(({ _id, ...rest }) => rest as unknown as ImportBatch);
  },
};

export const mongoSchoolSubmissionRepository: SchoolSubmissionRepository = {
  async add(s: SchoolSubmission): Promise<void> {
    const db = await getDb();
    await db.collection("schoolSubmissions").insertOne({ ...s, _id: s.id as any });
  },
  async list(filter?: { schoolId?: string; status?: SchoolSubmission["status"] }): Promise<SchoolSubmission[]> {
    const db = await getDb();
    const query: Record<string, any> = {};
    if (filter?.schoolId) query.schoolId = filter.schoolId;
    if (filter?.status) query.status = filter.status;
    const docs = await db.collection("schoolSubmissions").find(query).sort({ submittedAt: -1 }).toArray();
    return docs.map(({ _id, ...rest }) => rest as unknown as SchoolSubmission);
  },
  async findById(id: string): Promise<SchoolSubmission | null> {
    const db = await getDb();
    const doc = await db.collection("schoolSubmissions").findOne({ id });
    if (!doc) return null;
    const { _id, ...rest } = doc;
    return rest as unknown as SchoolSubmission;
  },
  async update(id: string, patch: Partial<SchoolSubmission>): Promise<SchoolSubmission | null> {
    const db = await getDb();
    const res = await db.collection("schoolSubmissions").findOneAndUpdate({ id }, { $set: patch }, { returnDocument: "after" });
    if (!res) return null;
    const { _id, ...rest } = res as any;
    return rest as unknown as SchoolSubmission;
  },
};

export const mongoAuditRepository: AuditRepository = {
  async append(entry: AuditEntry): Promise<void> {
    const db = await getDb();
    await db.collection("audit").insertOne({ ...entry, _id: entry.id as any });
  },
  async list(limit = 100, filter?: { targetType?: AuditEntry["targetType"]; targetId?: string }): Promise<AuditEntry[]> {
    const db = await getDb();
    const query: Record<string, any> = {};
    if (filter?.targetType) query.targetType = filter.targetType;
    if (filter?.targetId) query.targetId = filter.targetId;
    const docs = await db.collection("audit").find(query).sort({ timestamp: -1 }).limit(limit).toArray();
    return docs.map(({ _id, ...rest }) => rest as unknown as AuditEntry);
  },
};
