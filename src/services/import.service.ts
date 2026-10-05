/**
 * SERVICE LAYER — A07 Nhập & Kiểm duyệt dữ liệu.
 * Tải CSV/XLSX → kiểm tra từng dòng → sửa trực tiếp → xác nhận → công bố các dòng hợp lệ (dòng lỗi bị bỏ qua, cảnh báo không chặn).
 * Bước công bố luôn kiểm tra lại trên server; dòng trùng chương trình có sẵn = cập nhật, còn lại = tạo mới.
 */
import { randomUUID } from "node:crypto";
import type { Program, PublicUser } from "../domain/types";
import { repositories } from "../repositories";
import { MAX_SHEET_ROWS, parseCsv, parseXlsx } from "../lib/sheet";
import { catalogAdminService } from "./catalog-admin.service";

type Fail = { ok: false; status: number; field?: string; message: string };
const now = () => new Date().toISOString();

export const IMPORT_COLUMNS = ["ma_xet_tuyen", "ten_chuong_trinh", "ma_truong", "ma_nganh", "nam", "diem_chuan", "hoc_phi_min", "hoc_phi_max", "chi_tieu", "to_hop", "nguon"] as const;
export type ImportColumn = (typeof IMPORT_COLUMNS)[number];
export type ImportRowData = Record<ImportColumn, string>;
export const REQUIRED_COLUMNS: ImportColumn[] = ["ma_xet_tuyen", "ma_truong", "nam", "diem_chuan"];

export interface ImportRow {
  line: number;
  data: ImportRowData;
  errors: { field: ImportColumn | "row"; message: string }[];
  warnings: { field: ImportColumn | "row"; message: string }[];
  action: "create" | "update" | null;
  programId: string | null;
  label: string | null;
}

export interface ImportPreview {
  fileName: string;
  rows: ImportRow[];
  summary: { total: number; valid: number; errors: number; warnings: number; create: number; update: number };
}

const clean = (v: unknown) => String(v ?? "").replace(/[\u0000-\u001F\u007F]/g, " ").replace(/\s+/g, " ").trim().slice(0, 300);
const num = (v: string) => (v.trim() === "" ? null : Number(v.trim().replace(/\s/g, "").replace(",", ".")));

/** Đọc file thành dòng dữ liệu theo tên cột (không phân biệt hoa thường, bỏ dấu cách). */
export function readSheet(fileName: string, content: string): { ok: true; rows: ImportRowData[] } | Fail {
  const lower = fileName.toLowerCase();
  let table: string[][];
  try {
    if (lower.endsWith(".xlsx")) table = parseXlsx(Buffer.from(content, "base64"));
    else if (lower.endsWith(".csv") || lower.endsWith(".txt")) table = parseCsv(content);
    else return { ok: false, status: 400, field: "file", message: "Chỉ hỗ trợ file .csv hoặc .xlsx." };
  } catch {
    return { ok: false, status: 400, field: "file", message: "Không đọc được file. Kiểm tra định dạng (CSV UTF-8 hoặc Excel .xlsx)." };
  }
  if (table.length < 2) return { ok: false, status: 400, field: "file", message: "File không có dòng dữ liệu." };
  if (table.length - 1 > MAX_SHEET_ROWS) return { ok: false, status: 400, field: "file", message: `Tối đa ${MAX_SHEET_ROWS} dòng mỗi lần nhập.` };
  const header = table[0].map((h) => h.trim().toLowerCase().replace(/\s+/g, "_"));
  const missing = REQUIRED_COLUMNS.filter((c) => !header.includes(c));
  if (missing.length) return { ok: false, status: 400, field: "file", message: `Thiếu cột bắt buộc: ${missing.join(", ")}.` };
  const rows = table.slice(1).map((r) => Object.fromEntries(IMPORT_COLUMNS.map((c) => [c, clean(r[header.indexOf(c)] ?? "")])) as ImportRowData);
  return { ok: true, rows };
}

async function context() {
  const [schools, majors, programs, combos] = await Promise.all([
    repositories.catalogAdmin.listSchools(),
    repositories.catalogAdmin.listMajors(),
    repositories.catalogAdmin.listPrograms(),
    repositories.catalog.findCombos(),
  ]);
  return { schools, majors, programs, comboCodes: new Set(combos.map((c) => c.code)) };
}

type Ctx = Awaited<ReturnType<typeof context>>;

function validateRows(input: ImportRowData[], ctx: Ctx): ImportRow[] {
  const seen = new Map<string, number>();
  const year = new Date().getFullYear();
  return input.map((raw, i) => {
    const data = Object.fromEntries(IMPORT_COLUMNS.map((c) => [c, clean(raw?.[c])])) as ImportRowData;
    const errors: ImportRow["errors"] = [];
    const warnings: ImportRow["warnings"] = [];
    const code = data.ma_xet_tuyen.toUpperCase();
    if (!code) errors.push({ field: "ma_xet_tuyen", message: "Thiếu mã xét tuyển" });
    else if (!/^[A-Z0-9-]{2,20}$/.test(code)) errors.push({ field: "ma_xet_tuyen", message: "Mã xét tuyển chỉ gồm chữ, số, dấu gạch (2–20 ký tự)" });
    const school = ctx.schools.find((s) => s.code.toUpperCase() === data.ma_truong.toUpperCase());
    if (!data.ma_truong) errors.push({ field: "ma_truong", message: "Thiếu mã trường" });
    else if (!school) errors.push({ field: "ma_truong", message: `Không tìm thấy trường mã "${data.ma_truong}"` });
    const y = num(data.nam);
    if (y == null || !Number.isInteger(y) || y < 2015 || y > year + 1) errors.push({ field: "nam", message: "Năm không hợp lệ" });
    const score = num(data.diem_chuan);
    if (score == null) errors.push({ field: "diem_chuan", message: "Thiếu điểm chuẩn" });
    else if (!Number.isFinite(score) || score <= 0) errors.push({ field: "diem_chuan", message: "Điểm chuẩn không hợp lệ" });
    else if (score > 30) errors.push({ field: "diem_chuan", message: "Điểm chuẩn > 30 (thang 30)" });
    const existing = school && code ? ctx.programs.find((p) => p.schoolId === school.id && p.admissionCode.toUpperCase() === code) : undefined;
    const key = `${school?.id ?? data.ma_truong}::${code}::${y}`;
    if (code && seen.has(key)) errors.push({ field: "row", message: `Trùng với dòng ${seen.get(key)} (cùng trường, mã, năm)` });
    else seen.set(key, i + 2);

    const tMin = num(data.hoc_phi_min);
    const tMax = num(data.hoc_phi_max) ?? tMin;
    if (tMin == null) {
      if (existing) warnings.push({ field: "hoc_phi_min", message: "Thiếu học phí — giữ mức hiện tại" });
      else errors.push({ field: "hoc_phi_min", message: "Chương trình mới cần học phí" });
    } else if (!Number.isFinite(tMin) || tMin < 0 || tMin > 2000 || tMax == null || !Number.isFinite(tMax) || tMax < tMin || tMax > 2000) {
      errors.push({ field: "hoc_phi_min", message: "Học phí (triệu/năm) không hợp lệ" });
    }
    const quota = num(data.chi_tieu);
    if (quota != null && (!Number.isInteger(quota) || quota < 1 || quota > 100000)) errors.push({ field: "chi_tieu", message: "Chỉ tiêu phải là số nguyên dương" });
    const combos = data.to_hop ? data.to_hop.toUpperCase().split(/[\s,;/]+/).filter(Boolean) : [];
    const unknownCombo = combos.filter((c) => !ctx.comboCodes.has(c));
    if (unknownCombo.length) errors.push({ field: "to_hop", message: `Tổ hợp không có trong danh mục: ${unknownCombo.join(", ")}` });

    let major = null as Ctx["majors"][number] | null;
    if (!existing) {
      major = ctx.majors.find((m) => m.code === data.ma_nganh.trim()) ?? null;
      if (!data.ma_nganh) errors.push({ field: "ma_nganh", message: "Chương trình mới cần mã ngành" });
      else if (!major) errors.push({ field: "ma_nganh", message: `Không tìm thấy ngành mã "${data.ma_nganh}"` });
      if (quota == null) errors.push({ field: "chi_tieu", message: "Chương trình mới cần chỉ tiêu" });
      if (!combos.length) errors.push({ field: "to_hop", message: "Chương trình mới cần tổ hợp" });
    }
    if (!data.nguon) warnings.push({ field: "nguon", message: "Chưa ghi nguồn" });
    else if (!/^https:\/\/[^\s/]+\.edu\.vn(\/|$)/i.test(data.nguon)) warnings.push({ field: "nguon", message: "Nguồn chưa chính thức (không phải https .edu.vn)" });
    if (existing && score != null && Number.isFinite(score)) {
      const prev = existing.cutoffs.find((c) => c.year === (y ?? 0) - 1)?.score;
      if (prev != null && Math.abs(score - prev) > 2) warnings.push({ field: "diem_chuan", message: `Chênh ${(score - prev).toFixed(2)} điểm so với năm trước` });
    }
    const ok = errors.length === 0;
    return {
      line: i + 2,
      data: { ...data, ma_xet_tuyen: code, to_hop: combos.join(" ") },
      errors,
      warnings,
      action: ok ? (existing ? "update" : "create") : null,
      programId: existing?.id ?? null,
      label: existing ? `${existing.name} – ${school?.shortName ?? ""}` : major && school ? `${data.ten_chuong_trinh || major.name} – ${school.shortName}` : null,
    };
  });
}

function summarize(fileName: string, rows: ImportRow[]): ImportPreview {
  return {
    fileName,
    rows,
    summary: {
      total: rows.length,
      valid: rows.filter((r) => !r.errors.length).length,
      errors: rows.filter((r) => r.errors.length).length,
      warnings: rows.filter((r) => !r.errors.length && r.warnings.length).length,
      create: rows.filter((r) => r.action === "create").length,
      update: rows.filter((r) => r.action === "update").length,
    },
  };
}

const safeName = (v: unknown) => clean(v).replace(/[\\/:*?"<>|]/g, "_").slice(0, 120) || "du-lieu.csv";

export const importService = {
  /** Đọc file và kiểm tra (không ghi gì). */
  async previewFile(fileNameInput: unknown, content: unknown): Promise<{ ok: true; preview: ImportPreview } | Fail> {
    const fileName = safeName(fileNameInput);
    if (typeof content !== "string" || content.length === 0) return { ok: false, status: 400, field: "file", message: "Chọn file để tải lên." };
    const read = readSheet(fileName, content);
    if (!read.ok) return read;
    return { ok: true, preview: summarize(fileName, validateRows(read.rows, await context())) };
  },

  /** Kiểm tra lại sau khi sửa trực tiếp trên bảng xem trước. */
  async revalidate(fileNameInput: unknown, rowsInput: unknown): Promise<{ ok: true; preview: ImportPreview } | Fail> {
    if (!Array.isArray(rowsInput) || rowsInput.length === 0) return { ok: false, status: 400, message: "Không có dòng dữ liệu." };
    if (rowsInput.length > MAX_SHEET_ROWS) return { ok: false, status: 400, message: `Tối đa ${MAX_SHEET_ROWS} dòng.` };
    return { ok: true, preview: summarize(safeName(fileNameInput), validateRows(rowsInput as ImportRowData[], await context())) };
  },

  /** Công bố các dòng hợp lệ (dòng lỗi bị bỏ qua). Ghi đè/tạo chương trình + nhật ký + lô nhập. */
  async publish(actor: PublicUser, fileNameInput: unknown, rowsInput: unknown): Promise<{ ok: true; created: number; updated: number; batchId: string } | Fail> {
    const check = await this.revalidate(fileNameInput, rowsInput);
    if (!check.ok) return check;
    const { preview } = check;
    if (preview.summary.valid === 0) return { ok: false, status: 400, message: "Không có dòng hợp lệ để công bố — sửa các dòng lỗi trước." };
    let created = 0;
    let updated = 0;
    // Gộp các dòng cùng chương trình (nhiều năm) rồi ghi một lần.
    const updates = new Map<string, ImportRow[]>();
    const creates = new Map<string, ImportRow[]>();
    for (const r of preview.rows) {
      if (r.errors.length || !r.action) continue; // dòng lỗi bị bỏ qua
      const key = r.programId ?? `${r.data.ma_truong.toUpperCase()}::${r.data.ma_xet_tuyen}`;
      (r.action === "update" ? updates : creates).set(key, [...((r.action === "update" ? updates : creates).get(key) ?? []), r]);
    }
    for (const [programId, rows] of updates) {
      const p = await repositories.catalogAdmin.getProgram(programId);
      if (!p) continue;
      const patch: Partial<Program> = {};
      const changes: { field: string; before: string; after: string }[] = [];
      let cutoffs = [...p.cutoffs];
      for (const r of rows) {
        const year = Number(r.data.nam);
        const score = Math.round(Number(r.data.diem_chuan.replace(",", ".")) * 100) / 100;
        const before = cutoffs.find((c) => c.year === year)?.score;
        if (before !== score) changes.push({ field: `Điểm chuẩn ${year}`, before: before == null ? "—" : String(before), after: String(score) });
        cutoffs = [...cutoffs.filter((c) => c.year !== year), { year, score }];
      }
      patch.cutoffs = cutoffs.sort((a, b) => b.year - a.year);
      const last = rows[rows.length - 1].data;
      const tMin = num(last.hoc_phi_min);
      if (tMin != null) {
        const tMax = num(last.hoc_phi_max) ?? tMin;
        if (tMin !== p.tuitionMin || tMax !== p.tuitionMax) changes.push({ field: "Học phí", before: `${p.tuitionMin}–${p.tuitionMax}`, after: `${tMin}–${tMax}` });
        patch.tuitionMin = tMin;
        patch.tuitionMax = tMax;
      }
      const quota = num(last.chi_tieu);
      if (quota != null && quota !== p.quota) {
        changes.push({ field: "Chỉ tiêu", before: String(p.quota), after: String(quota) });
        patch.quota = quota;
      }
      if (last.to_hop) {
        const combos = last.to_hop.split(" ");
        if (combos.join(",") !== p.combos.join(",")) changes.push({ field: "Tổ hợp", before: p.combos.join(", "), after: combos.join(", ") });
        patch.combos = combos;
      }
      if (last.nguon) {
        if (/^https:\/\//i.test(last.nguon)) patch.sourceUrl = last.nguon;
        else patch.source = last.nguon;
      }
      if (changes.length === 0 && !last.nguon) continue;
      const existing = (await repositories.programAdmin.getOverride(programId)) ?? {};
      await repositories.programAdmin.setOverride(programId, { ...existing, ...patch, updatedAt: now().slice(0, 7) }, {
        id: randomUUID(),
        at: now(),
        actorId: actor.id,
        actorEmail: actor.email,
        programId,
        targetType: "program",
        action: "update",
        changes: changes.length ? changes.map((c) => ({ ...c, field: `[Nhập file] ${c.field}` })) : [{ field: "[Nhập file] Nguồn", before: p.source, after: last.nguon }],
      });
      updated++;
    }
    const schools = await repositories.catalogAdmin.listSchools();
    for (const rows of creates.values()) {
      const first = rows[0].data;
      const school = schools.find((s) => s.code.toUpperCase() === first.ma_truong.toUpperCase());
      const major = (await repositories.catalogAdmin.listMajors()).find((m) => m.code === first.ma_nganh.trim());
      if (!school || !major) continue;
      const cutoffs = Object.fromEntries(rows.map((r) => [Number(r.data.nam), r.data.diem_chuan.replace(",", ".")]));
      const res = await catalogAdminService.createProgram(actor, {
        schoolId: school.id,
        majorId: major.id,
        name: first.ten_chuong_trinh,
        admissionCode: first.ma_xet_tuyen,
        combos: first.to_hop.split(" ").filter(Boolean),
        quota: first.chi_tieu,
        tuitionMin: first.hoc_phi_min,
        tuitionMax: first.hoc_phi_max || first.hoc_phi_min,
        cutoffs,
        source: first.nguon || `Nhập từ file ${preview.fileName}`,
      });
      if (res.ok) {
        created++;
        if (/^https:\/\//i.test(first.nguon)) {
          const existing = (await repositories.programAdmin.getOverride(res.id)) ?? {};
          await repositories.programAdmin.setOverride(res.id, { ...existing, sourceUrl: first.nguon }, { id: randomUUID(), at: now(), actorId: actor.id, actorEmail: actor.email, programId: res.id, action: "update", changes: [{ field: "Nguồn (URL)", before: "—", after: first.nguon }] });
        }
      }
    }
    const batch = {
      id: randomUUID(),
      fileName: preview.fileName,
      byId: actor.id,
      byName: actor.name,
      at: now(),
      valid: preview.summary.valid,
      errors: preview.summary.errors,
      warnings: preview.summary.warnings,
      created,
      updated,
    };
    await repositories.importBatches.add(batch);
    await repositories.audit.append({ id: randomUUID(), at: now(), actorId: actor.id, actorEmail: actor.email, programId: batch.id, targetType: "import", action: "create", changes: [{ field: `Công bố "${batch.fileName}"`, before: `${preview.summary.total} dòng`, after: `${created} mới, ${updated} cập nhật` }] });
    return { ok: true, created, updated, batchId: batch.id };
  },

  history: (limit = 20) => repositories.importBatches.list(limit),

  /** File mẫu (CSV UTF-8 có BOM). */
  templateCsv() {
    return `﻿${IMPORT_COLUMNS.join(",")}\n7480201,Công nghệ thông tin,BKA,7480201,2025,28.5,28,35,300,A00 A01,https://ts.hust.edu.vn/\n`;
  },
};
