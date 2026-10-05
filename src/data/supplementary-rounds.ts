/**
 * ĐỢT XÉT TUYỂN BỔ SUNG — DỮ LIỆU MINH HOẠ cho mùa tuyển sinh trong `admission-timeline.ts`.
 * Thực tế các trường công bố chỉ tiêu và điểm nhận hồ sơ bổ sung sau khi có kết quả đợt 1;
 * quản trị viên cần nhập số liệu thật từ thông báo của trường trước khi dùng.
 */
export interface SupplementaryRound {
  id: string;
  programId: string;
  /** Chỉ tiêu còn lại. */
  quota: number;
  /** Điểm nhận hồ sơ (điểm thi THPT, thang 30). */
  minScore: number;
  combos: string[];
  opens: string; // YYYY-MM-DD
  closes: string; // YYYY-MM-DD
  note: string;
}

export const supplementaryRounds: SupplementaryRound[] = [
  { id: "bs-2027-ctu-cntt", programId: "ctu-cong-nghe-thong-tin", quota: 40, minScore: 24.5, combos: ["A00", "A01", "D07"], opens: "2027-08-25", closes: "2027-09-05", note: "Xét điểm thi THPT, nộp hồ sơ trực tuyến." },
  { id: "bs-2027-dut-dien", programId: "dut-ky-thuat-dien", quota: 25, minScore: 23.5, combos: ["A00", "A01"], opens: "2027-08-24", closes: "2027-09-03", note: "Ưu tiên thí sinh khu vực miền Trung." },
  { id: "bs-2027-dut-co-khi", programId: "dut-ky-thuat-co-khi", quota: 30, minScore: 22.5, combos: ["A00", "A01"], opens: "2027-08-24", closes: "2027-09-03", note: "" },
  { id: "bs-2027-fpt-ai", programId: "fpt-tri-tue-nhan-tao", quota: 60, minScore: 21, combos: ["A00", "A01", "D01"], opens: "2027-08-22", closes: "2027-09-15", note: "Có học bổng đầu vào theo điểm thi." },
  { id: "bs-2027-hcmus-mt", programId: "hcmus-khoa-hoc-moi-truong", quota: 35, minScore: 20.5, combos: ["A00", "B00", "D07"], opens: "2027-08-26", closes: "2027-09-08", note: "" },
  { id: "bs-2027-vnua-tp", programId: "vnua-cong-nghe-thuc-pham", quota: 50, minScore: 20, combos: ["A00", "B00", "D07"], opens: "2027-08-23", closes: "2027-09-10", note: "" },
  { id: "bs-2027-hnue-tl", programId: "hnue-tam-ly-hoc", quota: 15, minScore: 25.3, combos: ["B00", "C00", "D01"], opens: "2027-08-28", closes: "2027-09-06", note: "" },
  { id: "bs-2027-ctu-tp", programId: "ctu-cong-nghe-thuc-pham", quota: 45, minScore: 22, combos: ["A00", "B00", "D07"], opens: "2027-08-25", closes: "2027-09-05", note: "" },
];

/** Ngày mô phỏng "đang giữa mùa công bố" để xem thử trang theo dõi (dùng khi trình bày/kiểm thử). */
export const SEASON_DEMO_DATE = "2027-08-26";
