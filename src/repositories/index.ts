/**
 * Điểm "cắm" repository duy nhất của ứng dụng (composition root cho lớp dữ liệu).
 * Hỗ trợ tự động chuyển đổi giữa MongoDB (khi cấu hình MONGODB_URI) và JSON file/Memory.
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
import {
  mongoAnalyticsRepository,
  mongoAuditRepository,
  mongoCatalogAdminRepository,
  mongoCatalogRepository,
  mongoChatAliasRepository,
  mongoChatLogRepository,
  mongoClassRepository,
  mongoCommentRepository,
  mongoDataReportRepository,
  mongoImportBatchRepository,
  mongoMajorRepository,
  mongoNotificationRepository,
  mongoOutcomeRepository,
  mongoOutcomeSurveyRepository,
  mongoProgramAdminRepository,
  mongoProgramRepository,
  mongoQaRepository,
  mongoQuizConfigRepository,
  mongoQuizRepository,
  mongoRecommendConfigRepository,
  mongoReminderLogRepository,
  mongoReviewRepository,
  mongoSchoolRepository,
  mongoSchoolSubmissionRepository,
  mongoShareRepository,
  mongoSurveyRepository,
  mongoTimelineConfigRepository,
  mongoTimelineRepository,
  mongoUserDataRepository,
  mongoUserRepository,
} from "./mongodb";
import { isMongoConfigured } from "../lib/mongodb";

const useMongo = () => isMongoConfigured() || process.env.TROVIO_REPO_DRIVER === "mongo";

export const repositories = {
  get schools() {
    return useMongo() ? mongoSchoolRepository : jsonSchoolRepository;
  },
  get majors() {
    return useMongo() ? mongoMajorRepository : jsonMajorRepository;
  },
  get programs() {
    return useMongo() ? mongoProgramRepository : jsonProgramRepository;
  },
  get programAdmin() {
    return useMongo() ? mongoProgramAdminRepository : jsonProgramAdminRepository;
  },
  get catalog() {
    return useMongo() ? mongoCatalogRepository : memoryCatalogRepository;
  },
  get quiz() {
    return useMongo() ? mongoQuizRepository : jsonQuizRepository;
  },
  get catalogAdmin() {
    return useMongo() ? mongoCatalogAdminRepository : jsonCatalogAdminRepository;
  },
  get quizConfig() {
    return useMongo() ? mongoQuizConfigRepository : jsonQuizConfigRepository;
  },
  get recommendConfig() {
    return useMongo() ? mongoRecommendConfigRepository : jsonRecommendConfigRepository;
  },
  get importBatches() {
    return useMongo() ? mongoImportBatchRepository : jsonImportBatchRepository;
  },
  get schoolSubmissions() {
    return useMongo() ? mongoSchoolSubmissionRepository : jsonSchoolSubmissionRepository;
  },
  get timeline() {
    return useMongo() ? mongoTimelineRepository : memoryTimelineRepository;
  },
  get users() {
    return useMongo() ? mongoUserRepository : jsonUserRepository;
  },
  get userData() {
    return useMongo() ? mongoUserDataRepository : jsonUserDataRepository;
  },
  get shares() {
    return useMongo() ? mongoShareRepository : jsonShareRepository;
  },
  get comments() {
    return useMongo() ? mongoCommentRepository : jsonCommentRepository;
  },
  get audit() {
    return useMongo() ? mongoAuditRepository : jsonAuditRepository;
  },
  get outcomes() {
    return useMongo() ? mongoOutcomeRepository : jsonOutcomeRepository;
  },
  get reviews() {
    return useMongo() ? mongoReviewRepository : jsonReviewRepository;
  },
  get chatLogs() {
    return useMongo() ? mongoChatLogRepository : jsonChatLogRepository;
  },
  get dataReports() {
    return useMongo() ? mongoDataReportRepository : jsonDataReportRepository;
  },
  get notifications() {
    return useMongo() ? mongoNotificationRepository : jsonNotificationRepository;
  },
  get timelineConfig() {
    return useMongo() ? mongoTimelineConfigRepository : jsonTimelineConfigRepository;
  },
  get chatAliases() {
    return useMongo() ? mongoChatAliasRepository : jsonChatAliasRepository;
  },
  get analytics() {
    return useMongo() ? mongoAnalyticsRepository : jsonAnalyticsRepository;
  },
  get surveys() {
    return useMongo() ? mongoSurveyRepository : jsonSurveyRepository;
  },
  get reminderLog() {
    return useMongo() ? mongoReminderLogRepository : jsonReminderLogRepository;
  },
  get qa() {
    return useMongo() ? mongoQaRepository : jsonQaRepository;
  },
  get classes() {
    return useMongo() ? mongoClassRepository : jsonClassRepository;
  },
  get outcomeSurveys() {
    return useMongo() ? mongoOutcomeSurveyRepository : jsonOutcomeSurveyRepository;
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
