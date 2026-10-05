/**
 * SERVICE LAYER — danh mục trường, ngành, tổ hợp môn.
 */
import type { Major, MajorGroup, School } from "../domain/types";
import { repositories } from "../repositories";
import { firstLetterVi, matchesQuery } from "../lib/text";

export interface MajorListItem {
  major: Major;
  group: MajorGroup;
  programCount: number;
}

export const catalogService = {
  async getCombos() {
    return repositories.catalog.findCombos();
  },

  async getSubjects() {
    return repositories.catalog.findSubjects();
  },

  async getFaqGroups() {
    return repositories.catalog.findFaq();
  },

  async getGroupsWithCounts() {
    const [groups, majors] = await Promise.all([repositories.majors.findGroups(), repositories.majors.findAll()]);
    return groups.map((g) => ({ group: g, majorCount: majors.filter((m) => m.groupId === g.id).length }));
  },

  async listMajors(opts: { group?: string; q?: string; letter?: string } = {}): Promise<MajorListItem[]> {
    const [groups, majors, programs] = await Promise.all([
      repositories.majors.findGroups(),
      repositories.majors.findAll(),
      repositories.programs.findAll(),
    ]);
    const groupMap = new Map(groups.map((g) => [g.id, g]));
    return majors
      .filter((m) => !opts.group || m.groupId === opts.group)
      .filter((m) => !opts.q || matchesQuery(opts.q, m.name, m.code, m.summary))
      .filter((m) => !opts.letter || firstLetterVi(m.name) === opts.letter)
      .map((major) => ({
        major,
        group: groupMap.get(major.groupId)!,
        programCount: programs.filter((p) => p.majorId === major.id).length,
      }))
      .sort((a, b) => a.major.name.localeCompare(b.major.name, "vi"));
  },

  async getMajorBySlug(slug: string) {
    const major = await repositories.majors.findBySlug(slug);
    if (!major) return null;
    const groups = await repositories.majors.findGroups();
    return { major, group: groups.find((g) => g.id === major.groupId)! };
  },

  async listSchools(): Promise<School[]> {
    return repositories.schools.findAll();
  },

  async getSchoolBySlug(slug: string) {
    return repositories.schools.findBySlug(slug);
  },
};
