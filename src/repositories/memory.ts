/**
 * Implementation dùng dữ liệu mock trong `src/data` (in-memory, chỉ đọc) cho danh mục trường/ngành/CTĐT.
 * Tài khoản & dữ liệu người dùng nằm ở `json-file.ts` (ghi xuống đĩa).
 */
import { combos, subjects } from "../data/combos";
import { faqGroups } from "../data/faq";
import { majorGroups } from "../data/major-groups";
import { majors } from "../data/majors";
import { programs } from "../data/programs";
import { riasecQuestions } from "../data/riasec";
import { schools } from "../data/schools";
import { admissionTimeline } from "../data/admission-timeline";
import type {
  CatalogRepository,
  MajorRepository,
  ProgramRepository,
  QuizRepository,
  SchoolRepository,
  TimelineRepository,
} from "./types";

const clone = <T>(v: T): T => structuredClone(v);

export const memorySchoolRepository: SchoolRepository = {
  async findAll() {
    return clone(schools);
  },
  async findById(id) {
    return clone(schools.find((s) => s.id === id) ?? null);
  },
  async findBySlug(slug) {
    return clone(schools.find((s) => s.slug === slug) ?? null);
  },
};

export const memoryMajorRepository: MajorRepository = {
  async findAll() {
    return clone(majors);
  },
  async findById(id) {
    return clone(majors.find((m) => m.id === id) ?? null);
  },
  async findBySlug(slug) {
    return clone(majors.find((m) => m.slug === slug) ?? null);
  },
  async findGroups() {
    return clone(majorGroups);
  },
};

export const memoryProgramRepository: ProgramRepository = {
  async findAll() {
    return clone(programs);
  },
  async findById(id) {
    return clone(programs.find((p) => p.id === id) ?? null);
  },
  async findBySlug(slug) {
    return clone(programs.find((p) => p.slug === slug) ?? null);
  },
  async findByIds(ids) {
    return clone(ids.map((id) => programs.find((p) => p.id === id)).filter((p): p is (typeof programs)[number] => !!p));
  },
  async findBySchool(schoolId) {
    return clone(programs.filter((p) => p.schoolId === schoolId));
  },
  async findByMajor(majorId) {
    return clone(programs.filter((p) => p.majorId === majorId));
  },
};

export const memoryCatalogRepository: CatalogRepository = {
  async findSubjects() {
    return clone(subjects);
  },
  async findCombos() {
    return clone(combos);
  },
  async findFaq() {
    return clone(faqGroups);
  },
};

export const memoryQuizRepository: QuizRepository = {
  async findQuestions() {
    return clone(riasecQuestions);
  },
};

export const memoryTimelineRepository: TimelineRepository = {
  async findAll() {
    return clone(admissionTimeline).sort((a, b) => a.start.localeCompare(b.start));
  },
};
