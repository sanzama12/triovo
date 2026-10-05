/**
 * Điểm "cắm" repository duy nhất của ứng dụng (composition root cho lớp dữ liệu).
 * Sử dụng kiến trúc phân lớp chuẩn mực với JSON File / Memory Repositories & PostgreSQL (Neon).
 */
import {
  jsonAnalyticsRepository,
  jsonChatAliasRepository,
  jsonDataReportRepository,
  jsonNotificationRepository,
  jsonReminderLogRepository,
  jsonSurveyRepository,
  jsonTimelineConfigRepository,
  jsonAuditRepository,
  jsonChatLogRepository,
  jsonCommentRepository,
  jsonOutcomeRepository,
  jsonReviewRepository,
  jsonProgramAdminRepository,
  jsonProgramRepository,
  jsonShareRepository,
  jsonUserDataRepository,
  jsonUserRepository,
  jsonQaRepository,
  jsonClassRepository,
  jsonOutcomeSurveyRepository,
  jsonSchoolRepository,
  jsonMajorRepository,
  jsonQuizRepository,
  jsonCatalogAdminRepository,
  jsonQuizConfigRepository,
  jsonRecommendConfigRepository,
  jsonImportBatchRepository,
  jsonSchoolSubmissionRepository,
} from "./json-file";
import { memoryCatalogRepository, memoryTimelineRepository } from "./memory";

export const repositories = {
  get schools() {
    return jsonSchoolRepository;
  },
  get majors() {
    return jsonMajorRepository;
  },
  get programs() {
    return jsonProgramRepository;
  },
  get programAdmin() {
    return jsonProgramAdminRepository;
  },
  get catalog() {
    return memoryCatalogRepository;
  },
  get quiz() {
    return jsonQuizRepository;
  },
  get catalogAdmin() {
    return jsonCatalogAdminRepository;
  },
  get quizConfig() {
    return jsonQuizConfigRepository;
  },
  get recommendConfig() {
    return jsonRecommendConfigRepository;
  },
  get importBatches() {
    return jsonImportBatchRepository;
  },
  get schoolSubmissions() {
    return jsonSchoolSubmissionRepository;
  },
  get timeline() {
    return memoryTimelineRepository;
  },
  get users() {
    return jsonUserRepository;
  },
  get userData() {
    return jsonUserDataRepository;
  },
  get shares() {
    return jsonShareRepository;
  },
  get comments() {
    return jsonCommentRepository;
  },
  get audit() {
    return jsonAuditRepository;
  },
  get outcomes() {
    return jsonOutcomeRepository;
  },
  get reviews() {
    return jsonReviewRepository;
  },
  get chatLogs() {
    return jsonChatLogRepository;
  },
  get dataReports() {
    return jsonDataReportRepository;
  },
  get notifications() {
    return jsonNotificationRepository;
  },
  get timelineConfig() {
    return jsonTimelineConfigRepository;
  },
  get chatAliases() {
    return jsonChatAliasRepository;
  },
  get analytics() {
    return jsonAnalyticsRepository;
  },
  get surveys() {
    return jsonSurveyRepository;
  },
  get reminderLog() {
    return jsonReminderLogRepository;
  },
  get qa() {
    return jsonQaRepository;
  },
  get classes() {
    return jsonClassRepository;
  },
  get outcomeSurveys() {
    return jsonOutcomeSurveyRepository;
  },
};

export type Repositories = typeof repositories;
export type {
  AuditRepository,
  CatalogRepository,
  ChatLogRepository,
  OutcomeRepository,
  ReviewRepository,
  CommentRepository,
  MajorRepository,
  ProgramAdminRepository,
  ProgramRepository,
  QuizRepository,
  SchoolRepository,
  ShareRepository,
  TimelineRepository,
  UserDataRepository,
  UserRepository,
} from "./types";
