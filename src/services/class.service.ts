/**
 * SERVICE LAYER — trang giáo viên chủ nhiệm (bản gọn).
 * - Giáo viên tạo lớp → có mã mời 6 ký tự.
 * - Học sinh tự nhập mã để tham gia = đồng ý chia sẻ TIẾN ĐỘ (đã làm trắc nghiệm, mã RIASEC, đã nhập điểm,
 *   số nguyện vọng, có nguyện vọng An toàn chưa). Giáo viên KHÔNG thấy điểm, tên trường hay ghi chú.
 * - Nhắc cả lớp: tạo thông báo trong web cho mọi thành viên (giới hạn 1 lần / 6 giờ / lớp).
 */
import { randomInt, randomUUID } from "node:crypto";
import type { PublicUser, RiasecType, TeacherClass } from "../domain/types";
import { repositories } from "../repositories";
import { notificationService } from "./notification.service";
import { fitForProfile } from "./scoring.service";
import { opaqueId } from "./session.service";

type Fail = { ok: false; status: number; field?: string; message: string };

const CODE_ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
export const REMIND_COOLDOWN_HOURS = 6;
export const MEMBER_REMIND_HOURS = 24;
const memberKey = (classId: string, memberId: string) => opaqueId(`class:${classId}:${memberId}`);
const clean = (v: unknown, max: number) =>
  String(v ?? "")
    .replace(/[\u0000-\u001F\u007F]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, max);

export const newClassCode = () => Array.from({ length: 6 }, () => CODE_ALPHABET[randomInt(CODE_ALPHABET.length)]).join("");
export const normalizeCode = (v: unknown) => String(v ?? "").toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 6);

export interface MemberProgress {
  /** Mã mờ để giáo viên "Gửi nhắc" riêng (không lộ id tài khoản). */
  key: string;
  /** Tên hiển thị rút gọn (VD "An N."). */
  name: string;
  remindedAt: string | null;
  quizDone: boolean;
  riasec: RiasecType[] | null;
  hasScore: boolean;
  wishlistCount: number;
  hasSafe: boolean | null;
}

export interface ClassDashboard {
  cls: PublicClass;
  members: MemberProgress[];
  summary: { total: number; quiz: number; score: number; wishlist: number; noSafe: number; riasecTop: Record<RiasecType, number> };
}

const shortName = (full: string) => {
  const p = full.trim().split(/\s+/).filter(Boolean);
  return p.length <= 1 ? (p[0] ?? "Học sinh") : `${p[p.length - 1]} ${p[0].charAt(0).toUpperCase()}.`;
};

/** Thông tin lớp gửi về trình duyệt: bỏ danh sách id nội bộ của học sinh. */
export type PublicClass = Omit<TeacherClass, "memberIds" | "teacherId"> & { memberCount: number };
export const toPublicClass = (c: TeacherClass): PublicClass => ({ id: c.id, name: c.name, school: c.school, code: c.code, createdAt: c.createdAt, lastRemindAt: c.lastRemindAt, memberCount: c.memberIds.length });

export const classService = {
  async listMine(user: PublicUser): Promise<PublicClass[]> {
    return user.role === "teacher" ? (await repositories.classes.listByTeacher(user.id)).map(toPublicClass) : [];
  },

  async create(user: PublicUser, input: Record<string, unknown>): Promise<{ ok: true; cls: PublicClass } | Fail> {
    if (user.role !== "teacher") return { ok: false, status: 403, message: "Chọn vai trò “Giáo viên” trong Hồ sơ để tạo lớp." };
    const name = clean(input.name, 40);
    const school = clean(input.school, 80);
    if (name.length < 2) return { ok: false, status: 400, field: "name", message: "Nhập tên lớp, VD 12A1." };
    let code = newClassCode();
    for (let i = 0; i < 5 && (await repositories.classes.findByCode(code)); i++) code = newClassCode();
    try {
      const cls = await repositories.classes.create({ id: `cls-${randomUUID()}`, teacherId: user.id, name, school, code, createdAt: new Date().toISOString(), memberIds: [], lastRemindAt: null });
      return { ok: true, cls: toPublicClass(cls) };
    } catch {
      return { ok: false, status: 429, message: "Bạn đã tạo quá nhiều lớp." };
    }
  },

  async join(user: PublicUser, rawCode: unknown): Promise<{ ok: true; cls: Pick<TeacherClass, "id" | "name" | "school"> } | Fail> {
    const code = normalizeCode(rawCode);
    if (code.length !== 6) return { ok: false, status: 400, field: "code", message: "Mã lớp gồm 6 ký tự." };
    const cls = await repositories.classes.findByCode(code);
    if (!cls) return { ok: false, status: 404, field: "code", message: "Không tìm thấy lớp với mã này." };
    if (cls.teacherId === user.id) return { ok: false, status: 400, field: "code", message: "Bạn là giáo viên của lớp này." };
    if (!cls.memberIds.includes(user.id)) {
      if (cls.memberIds.length >= 80) return { ok: false, status: 409, message: "Lớp đã đủ thành viên." };
      await repositories.classes.update(cls.id, { memberIds: [...cls.memberIds, user.id] });
    }
    return { ok: true, cls: { id: cls.id, name: cls.name, school: cls.school } };
  },

  async leave(user: PublicUser, classId: string): Promise<boolean> {
    const cls = await repositories.classes.findById(classId);
    if (!cls || !cls.memberIds.includes(user.id)) return false;
    await repositories.classes.update(cls.id, { memberIds: cls.memberIds.filter((m) => m !== user.id) });
    return true;
  },

  async joined(user: PublicUser) {
    const list = await repositories.classes.listByMember(user.id);
    const teachers = await Promise.all(list.map((c) => repositories.users.findById(c.teacherId)));
    return list.map((c, i) => ({ id: c.id, name: c.name, school: c.school, teacher: teachers[i] ? shortName(teachers[i]!.name) : "Giáo viên" }));
  },

  async dashboard(user: PublicUser, classId: string): Promise<ClassDashboard | null> {
    const cls = await repositories.classes.findById(classId);
    if (!cls || cls.teacherId !== user.id) return null;
    const programs = await repositories.programs.findAll();
    const members: MemberProgress[] = [];
    for (const id of cls.memberIds) {
      const [u, data] = await Promise.all([repositories.users.findById(id), repositories.userData.get(id)]);
      if (!u) continue;
      const wish = data?.wishlist ?? [];
      const profile = data?.profile ?? null;
      let hasSafe: boolean | null = null;
      if (profile && wish.length) {
        hasSafe = wish.some((w) => {
          const p = programs.find((x) => x.id === w.id);
          return p ? fitForProfile(profile, p).fit?.level === "an-toan" : false;
        });
      }
      members.push({ key: memberKey(cls.id, id), remindedAt: cls.memberRemindAt?.[id] ?? null, name: shortName(u.name), quizDone: !!data?.quiz, riasec: data?.quiz ? [...data.quiz.result.code] : null, hasScore: !!profile, wishlistCount: wish.length, hasSafe });
    }
    const riasecTop = { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 } as Record<RiasecType, number>;
    for (const m of members) if (m.riasec) riasecTop[m.riasec[0]]++;
    return {
      cls: toPublicClass(cls),
      members,
      summary: {
        total: members.length,
        quiz: members.filter((m) => m.quizDone).length,
        score: members.filter((m) => m.hasScore).length,
        wishlist: members.filter((m) => m.wishlistCount > 0).length,
        noSafe: members.filter((m) => m.hasSafe === false || (m.wishlistCount > 0 && m.hasSafe === null)).length,
        riasecTop,
      },
    };
  },

  /** Nhắc cả lớp (thông báo trong web). */
  async remind(user: PublicUser, classId: string, input: Record<string, unknown>, now = Date.now()): Promise<{ ok: true; sent: number } | Fail> {
    const cls = await repositories.classes.findById(classId);
    if (!cls || cls.teacherId !== user.id) return { ok: false, status: 404, message: "Không tìm thấy lớp." };
    if (cls.lastRemindAt && now - Date.parse(cls.lastRemindAt) < REMIND_COOLDOWN_HOURS * 3600_000) {
      return { ok: false, status: 429, message: `Mỗi lớp chỉ nhắc ${REMIND_COOLDOWN_HOURS} giờ một lần.` };
    }
    const msg = clean(input.message, 200) || "Nhớ hoàn thành trắc nghiệm sở thích và lập danh sách nguyện vọng trước hạn đăng ký nhé.";
    for (const id of cls.memberIds) {
      await notificationService.notify({ userId: id, kind: "class-reminder", title: `GVCN lớp ${cls.name} nhắc bạn`, body: msg, href: "/moc-tuyen-sinh" });
    }
    await repositories.classes.update(cls.id, { lastRemindAt: new Date(now).toISOString() });
    return { ok: true, sent: cls.memberIds.length };
  },

  /** Nhắc riêng một học sinh (thông báo trong web), tối đa 1 lần / 24 giờ / học sinh. */
  async remindMember(user: PublicUser, classId: string, input: Record<string, unknown>, now = Date.now()): Promise<{ ok: true; sent: 1 } | Fail> {
    const cls = await repositories.classes.findById(classId);
    if (!cls || cls.teacherId !== user.id) return { ok: false, status: 404, message: "Không tìm thấy lớp." };
    const key = typeof input.memberKey === "string" ? input.memberKey : "";
    const memberId = cls.memberIds.find((id) => memberKey(cls.id, id) === key);
    if (!memberId) return { ok: false, status: 404, message: "Học sinh không còn trong lớp." };
    const last = cls.memberRemindAt?.[memberId];
    if (last && now - Date.parse(last) < MEMBER_REMIND_HOURS * 3600_000) return { ok: false, status: 429, message: `Đã nhắc học sinh này trong ${MEMBER_REMIND_HOURS} giờ qua.` };
    const msg = clean(input.message, 200) || "Thầy/cô nhắc em hoàn thành trắc nghiệm sở thích và danh sách nguyện vọng (nhớ có ít nhất 1 nguyện vọng An toàn) nhé.";
    await notificationService.notify({ userId: memberId, kind: "class-reminder", title: `GVCN lớp ${cls.name} nhắc riêng bạn`, body: msg, href: "/da-luu" });
    await repositories.classes.update(cls.id, { memberRemindAt: { ...(cls.memberRemindAt ?? {}), [memberId]: new Date(now).toISOString() } });
    return { ok: true, sent: 1 };
  },

  async remove(user: PublicUser, classId: string) {
    return repositories.classes.delete(classId, user.id);
  },
};
