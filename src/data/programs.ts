import type { AdmissionMethod, Competition, MethodCutoff, Program } from "../domain/types";
import { majors } from "./majors";
import { schools } from "./schools";

/**
 * Chương trình đào tạo & Điểm chuẩn tuyển sinh toàn quốc qua các năm (2023 – 2025/2026).
 * Chuẩn hoá mã ngành cấp IV, tổ hợp môn, chỉ tiêu, học phí và điểm chuẩn các phương thức.
 */
type Seed = {
  school: string;
  major: string;
  code: string;
  cutoffs?: [number, number, number]; // 2025, 2024, 2023
  tuition: [number, number];
  combos: string[];
  quota: number;
  type?: Program["trainingType"];
  years?: number;
  campus?: number;
  name?: string;
  extraMethods?: AdmissionMethod[];
};

const seeds: Seed[] = [
  // ============================================================================
  // 1. MIỀN BẮC – ĐẠI HỌC BÁCH KHOA HÀ NỘI (hust)
  // ============================================================================
  { school: "hust", major: "cong-nghe-thong-tin", code: "IT1", cutoffs: [28.45, 28.53, 29.42], tuition: [28, 35], combos: ["A00", "A01"], quota: 360 },
  { school: "hust", major: "khoa-hoc-may-tinh", code: "IT2", cutoffs: [28.9, 28.75, 29.05], tuition: [28, 35], combos: ["A00", "A01"], quota: 200 },
  { school: "hust", major: "tri-tue-nhan-tao", code: "IT-E10", cutoffs: [28.6, 28.48, 28.8], tuition: [45, 60], combos: ["A00", "A01"], quota: 120, type: "Chất lượng cao" },
  { school: "hust", major: "an-toan-thong-tin", code: "IT-E7", cutoffs: [27.8, 27.65, 27.9], tuition: [35, 45], combos: ["A00", "A01"], quota: 150 },
  { school: "hust", major: "thiet-ke-vi-mach-ban-dan", code: "MS2", cutoffs: [27.9, 27.5, 27.2], tuition: [32, 40], combos: ["A00", "A01"], quota: 100 },
  { school: "hust", major: "ky-thuat-dieu-khien-va-tu-dong-hoa", code: "EE2", cutoffs: [27.4, 27.15, 27.2], tuition: [26, 32], combos: ["A00", "A01"], quota: 350 },
  { school: "hust", major: "ky-thuat-co-dien-tu", code: "ME2", cutoffs: [26.8, 26.5, 26.6], tuition: [26, 32], combos: ["A00", "A01"], quota: 300 },
  { school: "hust", major: "ky-thuat-dien", code: "EE1", cutoffs: [26.35, 25.9, 26.0], tuition: [24, 30], combos: ["A00", "A01"], quota: 480 },
  { school: "hust", major: "ky-thuat-o-to", code: "TE1", cutoffs: [26.7, 26.4, 26.5], tuition: [26, 32], combos: ["A00", "A01"], quota: 250 },
  { school: "hust", major: "ky-thuat-co-khi", code: "ME1", cutoffs: [24.8, 24.5, 24.3], tuition: [24, 30], combos: ["A00", "A01"], quota: 420 },
  { school: "hust", major: "ky-thuat-hoa-hoc", code: "CH1", cutoffs: [24.0, 23.8, 23.5], tuition: [24, 30], combos: ["A00", "D07"], quota: 300 },

  // ============================================================================
  // 2. MIỀN BẮC – ĐẠI HỌC KINH TẾ QUỐC DÂN (neu)
  // ============================================================================
  { school: "neu", major: "marketing", code: "MKT01", cutoffs: [26.75, 27.5, 27.2], tuition: [20, 26], combos: ["A00", "A01", "D01", "D07"], quota: 180 },
  { school: "neu", major: "kinh-doanh-quoc-te", code: "KDQT01", cutoffs: [27.9, 27.75, 27.6], tuition: [20, 26], combos: ["A00", "A01", "D01", "D07"], quota: 160 },
  { school: "neu", major: "logistics-quan-ly-chuoi-cung-ung", code: "LOG01", cutoffs: [27.85, 27.7, 27.5], tuition: [20, 26], combos: ["A00", "A01", "D01", "D07"], quota: 150 },
  { school: "neu", major: "thuong-mai-dien-tu", code: "TMDT01", cutoffs: [27.6, 27.4, 27.2], tuition: [20, 26], combos: ["A00", "A01", "D01", "D07"], quota: 140 },
  { school: "neu", major: "quan-tri-kinh-doanh", code: "QTKD01", cutoffs: [27.2, 27.05, 26.9], tuition: [20, 26], combos: ["A00", "A01", "D01", "D07"], quota: 260 },
  { school: "neu", major: "tai-chinh-ngan-hang", code: "TCNH01", cutoffs: [27.1, 26.9, 26.75], tuition: [20, 26], combos: ["A00", "A01", "D01", "D07"], quota: 300 },
  { school: "neu", major: "kiem-toan", code: "KT02", cutoffs: [27.4, 27.25, 27.1], tuition: [20, 26], combos: ["A00", "A01", "D01", "D07"], quota: 150 },
  { school: "neu", major: "ke-toan", code: "KT01", cutoffs: [26.8, 26.6, 26.5], tuition: [20, 26], combos: ["A00", "A01", "D01", "D07"], quota: 280 },
  { school: "neu", major: "cong-nghe-thong-tin", code: "CNTT01", cutoffs: [26.5, 26.3, 26.1], tuition: [20, 26], combos: ["A00", "A01", "D01", "D07"], quota: 120 },
  { school: "neu", major: "khoa-hoc-du-lieu", code: "KHDL01", cutoffs: [26.9, 26.7, 26.4], tuition: [20, 26], combos: ["A00", "A01", "D01", "D07"], quota: 100 },
  { school: "neu", major: "luat-kinh-te", code: "LKT01", cutoffs: [26.8, 26.6, 26.4], tuition: [20, 26], combos: ["A00", "A01", "D01", "C00"], quota: 120 },

  // ============================================================================
  // 3. MIỀN BẮC – TRƯỜNG ĐẠI HỌC NGOẠI THƯƠNG (ftu)
  // ============================================================================
  { school: "ftu", major: "kinh-doanh-quoc-te", code: "NTH01", cutoffs: [28.3, 28.15, 28.05], tuition: [24, 30], combos: ["A00", "A01", "D01", "D07"], quota: 450 },
  { school: "ftu", major: "marketing", code: "NTH05", cutoffs: [27.9, 27.75, 27.6], tuition: [24, 30], combos: ["A00", "A01", "D01", "D07"], quota: 140, name: "Marketing số" },
  { school: "ftu", major: "tai-chinh-ngan-hang", code: "NTH03", cutoffs: [27.8, 27.65, 27.5], tuition: [24, 30], combos: ["A00", "A01", "D01", "D07"], quota: 320 },
  { school: "ftu", major: "ke-toan", code: "NTH04", cutoffs: [27.5, 27.35, 27.2], tuition: [24, 30], combos: ["A00", "A01", "D01", "D07"], quota: 200, name: "Kế toán - Kiểm toán ACCA" },
  { school: "ftu", major: "luat", code: "NTH07", cutoffs: [27.4, 27.2, 27.0], tuition: [24, 30], combos: ["A00", "A01", "D01", "C00"], quota: 120, name: "Luật thương mại quốc tế" },
  { school: "ftu", major: "ngon-ngu-anh", code: "NTH06", cutoffs: [27.7, 27.5, 27.35], tuition: [24, 30], combos: ["D01"], quota: 180, name: "Tiếng Anh Thương mại" },

  // ============================================================================
  // 4. MIỀN BẮC – ĐẠI HỌC CÔNG NGHỆ – ĐHQGHN (uet)
  // ============================================================================
  { school: "uet", major: "cong-nghe-thong-tin", code: "CN1", cutoffs: [27.95, 27.8, 27.85], tuition: [35, 42], combos: ["A00", "A01"], quota: 480 },
  { school: "uet", major: "khoa-hoc-may-tinh", code: "CN8", cutoffs: [27.8, 27.65, 27.5], tuition: [35, 42], combos: ["A00", "A01"], quota: 240 },
  { school: "uet", major: "tri-tue-nhan-tao", code: "CN12", cutoffs: [27.6, 27.4, 27.25], tuition: [35, 42], combos: ["A00", "A01"], quota: 120 },
  { school: "uet", major: "ky-thuat-phan-mem", code: "CN2", cutoffs: [27.5, 27.3, 27.15], tuition: [35, 42], combos: ["A00", "A01"], quota: 200 },
  { school: "uet", major: "thiet-ke-vi-mach-ban-dan", code: "CN15", cutoffs: [27.2, 26.8, 26.5], tuition: [35, 42], combos: ["A00", "A01"], quota: 100 },
  { school: "uet", major: "ky-thuat-dieu-khien-va-tu-dong-hoa", code: "CN9", cutoffs: [26.8, 26.5, 26.3], tuition: [32, 38], combos: ["A00", "A01"], quota: 150 },
  { school: "uet", major: "ky-thuat-co-dien-tu", code: "CN5", cutoffs: [26.4, 26.1, 26.0], tuition: [32, 38], combos: ["A00", "A01"], quota: 180 },

  // ============================================================================
  // 5. MIỀN BẮC – ĐẠI HỌC Y HÀ NỘI (hmu) & DƯỢC HÀ NỘI (hup)
  // ============================================================================
  { school: "hmu", major: "y-khoa", code: "7720101", cutoffs: [28.3, 28.27, 27.73], tuition: [55, 62], combos: ["B00"], quota: 400, years: 6 },
  { school: "hmu", major: "rang-ham-mat", code: "7720501", cutoffs: [27.9, 27.75, 27.5], tuition: [55, 62], combos: ["B00"], quota: 120, years: 6 },
  { school: "hmu", major: "dieu-duong", code: "7720301", cutoffs: [24.5, 24.2, 24.0], tuition: [24, 28], combos: ["B00"], quota: 250 },
  { school: "hup", major: "duoc-hoc", code: "7720201", cutoffs: [26.0, 25.8, 25.5], tuition: [24, 28], combos: ["A00", "B00"], quota: 750, years: 5 },
  { school: "hup", major: "ky-thuat-hoa-hoc", code: "7520301", cutoffs: [23.8, 23.5, 23.2], tuition: [22, 26], combos: ["A00", "B00", "D07"], quota: 150, name: "Hóa dược" },

  // ============================================================================
  // 6. MIỀN BẮC – KHXH&NV (ussh), KHTN (hus), NGOẠI NGỮ (ulis), KINH TẾ ĐHQG (ueb)
  // ============================================================================
  { school: "ussh", major: "bao-chi", code: "QHX01", cutoffs: [28.2, 28.5, 28.0], tuition: [16, 22], combos: ["C00", "D01", "A01"], quota: 120 },
  { school: "ussh", major: "quan-he-cong-chung", code: "QHX16", cutoffs: [28.5, 28.78, 28.3], tuition: [16, 22], combos: ["A01", "C00", "D01"], quota: 80 },
  { school: "ussh", major: "truyen-thong-da-phuong-tien", code: "QHX18", cutoffs: [28.0, 28.2, 27.8], tuition: [16, 22], combos: ["A01", "C00", "D01"], quota: 100 },
  { school: "ussh", major: "tam-ly-hoc", code: "QHX20", cutoffs: [27.2, 27.4, 26.9], tuition: [16, 22], combos: ["A00", "B00", "C00", "D01"], quota: 140 },
  { school: "hus", major: "khoa-hoc-du-lieu", code: "QHK01", cutoffs: [26.0, 25.8, 25.5], tuition: [20, 25], combos: ["A00", "A01"], quota: 120, name: "Toán - Tin & Khoa học dữ liệu" },
  { school: "hus", major: "khoa-hoc-moi-truong", code: "QHK05", cutoffs: [22.0, 21.5, 21.0], tuition: [18, 22], combos: ["A00", "B00", "D07"], quota: 150 },
  { school: "ulis", major: "ngon-ngu-anh", code: "QHN01", cutoffs: [27.8, 27.6, 27.5], tuition: [20, 25], combos: ["D01"], quota: 400 },
  { school: "ulis", major: "ngoai-ngu-trung", code: "QHN04", cutoffs: [27.5, 27.3, 27.1], tuition: [20, 25], combos: ["D01"], quota: 250 },
  { school: "ulis", major: "ngoai-ngu-nhat", code: "QHN05", cutoffs: [26.8, 26.6, 26.4], tuition: [20, 25], combos: ["D01"], quota: 200 },
  { school: "ueb", major: "kinh-doanh-quoc-te", code: "QHE01", cutoffs: [27.3, 27.1, 26.9], tuition: [28, 35], combos: ["A00", "A01", "D01", "D07"], quota: 220 },
  { school: "ueb", major: "tai-chinh-ngan-hang", code: "QHE02", cutoffs: [26.9, 26.7, 26.5], tuition: [28, 35], combos: ["A00", "A01", "D01", "D07"], quota: 250 },

  // ============================================================================
  // 7. MIỀN BẮC – HỌC VIỆN TÀI CHÍNH (aof), NGÂN HÀNG (bav), NGOẠI GIAO (dav), BÁO CHÍ (ajc)
  // ============================================================================
  { school: "aof", major: "tai-chinh-ngan-hang", code: "HTC01", cutoffs: [26.8, 26.6, 26.4], tuition: [18, 24], combos: ["A00", "A01", "D01", "D07"], quota: 500 },
  { school: "aof", major: "ke-toan", code: "HTC02", cutoffs: [26.4, 26.2, 26.0], tuition: [18, 24], combos: ["A00", "A01", "D01", "D07"], quota: 400 },
  { school: "aof", major: "kiem-toan", code: "HTC03", cutoffs: [26.7, 26.5, 26.3], tuition: [18, 24], combos: ["A00", "A01", "D01", "D07"], quota: 250 },
  { school: "bav", major: "tai-chinh-ngan-hang", code: "NHH01", cutoffs: [26.6, 26.4, 26.2], tuition: [18, 24], combos: ["A00", "A01", "D01", "D07"], quota: 550 },
  { school: "bav", major: "bao-hiem", code: "NHH04", cutoffs: [25.0, 24.8, 24.5], tuition: [18, 24], combos: ["A00", "A01", "D01", "D07"], quota: 150 },
  { school: "dav", major: "quan-he-quoc-te", code: "HQT01", cutoffs: [28.0, 27.8, 27.6], tuition: [22, 28], combos: ["A01", "D01", "C00"], quota: 250 },
  { school: "dav", major: "truyen-thong-da-phuong-tien", code: "HQT04", cutoffs: [28.3, 28.1, 27.9], tuition: [22, 28], combos: ["A01", "D01", "C00"], quota: 150, name: "Truyền thông quốc tế" },
  { school: "dav", major: "luat", code: "HQT03", cutoffs: [27.6, 27.4, 27.2], tuition: [22, 28], combos: ["A00", "A01", "D01", "C00"], quota: 180, name: "Luật quốc tế" },
  { school: "ajc", major: "bao-chi", code: "HBT01", cutoffs: [27.5, 27.3, 27.0], tuition: [16, 22], combos: ["C00", "D01", "A01"], quota: 220 },
  { school: "ajc", major: "quan-he-cong-chung", code: "HBT03", cutoffs: [27.8, 27.6, 27.4], tuition: [16, 22], combos: ["C00", "D01", "A01"], quota: 140 },
  { school: "ajc", major: "truyen-thong-da-phuong-tien", code: "HBT02", cutoffs: [27.2, 27.0, 26.8], tuition: [16, 22], combos: ["C00", "D01", "A01"], quota: 160 },

  // ============================================================================
  // 8. MIỀN BẮC – BƯU CHÍNH (ptit), THƯƠNG MẠI (tmu), CÔNG NGHIỆP (haui), SƯ PHẠM (hnue)
  // ============================================================================
  { school: "ptit", major: "cong-nghe-thong-tin", code: "BVH01", cutoffs: [26.9, 26.7, 26.6], tuition: [24, 30], combos: ["A00", "A01"], quota: 650 },
  { school: "ptit", major: "an-toan-thong-tin", code: "BVH02", cutoffs: [26.4, 26.2, 26.0], tuition: [24, 30], combos: ["A00", "A01"], quota: 250 },
  { school: "ptit", major: "thuong-mai-dien-tu", code: "BVH06", cutoffs: [26.5, 26.3, 26.1], tuition: [24, 30], combos: ["A00", "A01", "D01"], quota: 200 },
  { school: "ptit", major: "thiet-ke-do-hoa", code: "BVH05", cutoffs: [25.8, 25.5, 25.2], tuition: [24, 30], combos: ["A00", "A01", "D01"], quota: 200, name: "Công nghệ Đa phương tiện" },
  { school: "tmu", major: "thuong-mai-dien-tu", code: "TMA01", cutoffs: [26.5, 26.3, 26.0], tuition: [18, 24], combos: ["A00", "A01", "D01", "D07"], quota: 250 },
  { school: "tmu", major: "marketing", code: "TMA02", cutoffs: [26.8, 26.6, 26.4], tuition: [18, 24], combos: ["A00", "A01", "D01", "D07"], quota: 280 },
  { school: "tmu", major: "logistics-quan-ly-chuoi-cung-ung", code: "TMA04", cutoffs: [26.7, 26.5, 26.3], tuition: [18, 24], combos: ["A00", "A01", "D01", "D07"], quota: 220 },
  { school: "tmu", major: "kinh-doanh-thuong-mai", code: "TMA03", cutoffs: [26.0, 25.8, 25.5], tuition: [18, 24], combos: ["A00", "A01", "D01", "D07"], quota: 250 },
  { school: "haui", major: "cong-nghe-thong-tin", code: "DCN01", cutoffs: [25.2, 25.0, 24.8], tuition: [20, 26], combos: ["A00", "A01", "D01"], quota: 450 },
  { school: "haui", major: "ky-thuat-o-to", code: "DCN02", cutoffs: [24.8, 24.5, 24.2], tuition: [20, 26], combos: ["A00", "A01"], quota: 400 },
  { school: "haui", major: "ky-thuat-co-dien-tu", code: "DCN03", cutoffs: [24.2, 24.0, 23.8], tuition: [20, 26], combos: ["A00", "A01"], quota: 350 },
  { school: "hnue", major: "su-pham-toan", code: "SPH01", cutoffs: [27.8, 27.5, 27.0], tuition: [0, 0], combos: ["A00", "A01", "D01"], quota: 150 },
  { school: "hnue", major: "su-pham-tieng-anh", code: "SPH03", cutoffs: [28.0, 27.8, 27.5], tuition: [0, 0], combos: ["D01"], quota: 180 },
  { school: "hnue", major: "tam-ly-hoc", code: "SPH05", cutoffs: [25.8, 25.5, 25.2], tuition: [15, 18], combos: ["B00", "C00", "D01"], quota: 120 },

  // ============================================================================
  // 9. MIỀN BẮC – LUẬT HN (hlu), XÂY DỰNG (huce), KIẾN TRÚC (hau), GTVT (utc), NÔNG NGHIỆP (vnua)
  // ============================================================================
  { school: "hlu", major: "luat", code: "LPH01", cutoffs: [27.8, 27.6, 27.2], tuition: [16, 22], combos: ["A00", "A01", "C00", "D01"], quota: 600 },
  { school: "hlu", major: "luat-kinh-te", code: "LPH02", cutoffs: [28.1, 27.9, 27.5], tuition: [16, 22], combos: ["A00", "A01", "C00", "D01"], quota: 350 },
  { school: "huce", major: "ky-thuat-xay-dung", code: "XDA01", cutoffs: [23.5, 23.2, 23.0], tuition: [18, 24], combos: ["A00", "A01"], quota: 600 },
  { school: "huce", major: "kien-truc", code: "XDA02", cutoffs: [24.0, 23.8, 23.5], tuition: [20, 26], combos: ["V00"], quota: 200, years: 5 },
  { school: "huce", major: "quy-hoach-do-thi", code: "XDA03", cutoffs: [22.5, 22.2, 22.0], tuition: [18, 24], combos: ["V00", "A01"], quota: 120, years: 5 },
  { school: "hau", major: "kien-truc", code: "KTA01", cutoffs: [25.0, 24.7, 24.4], tuition: [20, 26], combos: ["V00"], quota: 350, years: 5 },
  { school: "hau", major: "thiet-ke-noi-that", code: "KTA02", cutoffs: [24.2, 23.9, 23.6], tuition: [20, 26], combos: ["V00", "H00"], quota: 200 },
  { school: "hau", major: "thiet-ke-do-hoa", code: "KTA03", cutoffs: [24.5, 24.2, 24.0], tuition: [20, 26], combos: ["V00", "H00"], quota: 180 },
  { school: "utc", major: "ky-thuat-o-to", code: "GHA02", cutoffs: [25.2, 25.0, 24.8], tuition: [18, 24], combos: ["A00", "A01"], quota: 350 },
  { school: "utc", major: "logistics-quan-ly-chuoi-cung-ung", code: "GHA04", cutoffs: [26.0, 25.8, 25.5], tuition: [18, 24], combos: ["A00", "A01", "D01", "D07"], quota: 220 },
  { school: "utc", major: "cong-nghe-thong-tin", code: "GHA01", cutoffs: [25.0, 24.8, 24.5], tuition: [18, 24], combos: ["A00", "A01"], quota: 250 },
  { school: "vnua", major: "cong-nghe-thuc-pham", code: "HVN02", cutoffs: [21.0, 20.5, 20.0], tuition: [15, 20], combos: ["A00", "B00", "D07"], quota: 300 },
  { school: "vnua", major: "thu-y", code: "HVN01", cutoffs: [22.5, 22.0, 21.5], tuition: [15, 20], combos: ["A00", "B00"], quota: 250, years: 5 },
  { school: "vnua", major: "nong-nghiep-cong-nghe-cao", code: "HVN03", cutoffs: [19.0, 18.5, 18.0], tuition: [15, 20], combos: ["A00", "B00", "D07"], quota: 200 },

  // ============================================================================
  // 10. MIỀN BẮC – FPT, PHENIKAA, VINUNI & CAO ĐẲNG
  // ============================================================================
  {
    school: "fpt", major: "ky-thuat-phan-mem", code: "FPT-SE", cutoffs: [21.0, 21.0, 21.0], tuition: [54, 62], combos: ["A00", "A01", "D01"], quota: 3000,
    extraMethods: [{ name: "Xét học bạ + Kỳ thi riêng", desc: "Top 50 SchoolRank hoặc bài thi sơ tuyển FPT.", requirement: "Top 50 học bạ", tag: "Học bạ" }],
  },
  { school: "fpt", major: "tri-tue-nhan-tao", code: "FPT-AI", cutoffs: [21.0, 21.0, 21.0], tuition: [54, 62], combos: ["A00", "A01", "D01"], quota: 600 },
  { school: "fpt", major: "thiet-ke-do-hoa", code: "FPT-GD", cutoffs: [20.5, 20.0, 20.0], tuition: [54, 62], combos: ["A00", "A01", "D01"], quota: 400, name: "Thiết kế mỹ thuật số" },
  { school: "fpt", major: "marketing", code: "FPT-MKT", cutoffs: [20.0, 20.0, 20.0], tuition: [54, 62], combos: ["A00", "A01", "D01"], quota: 500, name: "Digital Marketing" },
  { school: "phenikaa", major: "thiet-ke-vi-mach-ban-dan", code: "PKA04", cutoffs: [23.5, 23.0, 22.5], tuition: [32, 38], combos: ["A00", "A01"], quota: 150 },
  { school: "phenikaa", major: "cong-nghe-thong-tin", code: "PKA01", cutoffs: [23.0, 22.5, 22.0], tuition: [28, 34], combos: ["A00", "A01", "D01"], quota: 350 },
  { school: "phenikaa", major: "duoc-hoc", code: "PKA02", cutoffs: [21.5, 21.0, 21.0], tuition: [35, 42], combos: ["A00", "B00"], quota: 200, years: 5 },
  {
    school: "vinuni", major: "khoa-hoc-may-tinh", code: "VIN-CS", cutoffs: [26.0, 25.5, 25.0], tuition: [800, 850], combos: ["A00", "A01", "D01"], quota: 80, type: "Quốc tế",
    extraMethods: [{ name: "Xét hồ sơ + Phỏng vấn tiếng Anh", desc: "Bài luận cá nhân, điểm GPA từ 8.0, IELTS 6.5+ và phỏng vấn hội đồng.", requirement: "GPA 8.0, IELTS 6.5", tag: "Học bạ" }],
  },
  {
    school: "vinuni", major: "quan-tri-kinh-doanh", code: "VIN-BA", cutoffs: [25.5, 25.0, 24.5], tuition: [800, 850], combos: ["A01", "D01"], quota: 100, type: "Quốc tế",
  },
  { school: "cd-fpt-hn", major: "cong-nghe-thong-tin", code: "CD-FPT01", cutoffs: [15.0, 15.0, 15.0], tuition: [24, 28], combos: ["A00", "A01", "D01"], quota: 2000, years: 3, name: "Lập trình Web/Mobile" },
  { school: "cd-fpt-hn", major: "thiet-ke-do-hoa", code: "CD-FPT02", cutoffs: [15.0, 15.0, 15.0], tuition: [24, 28], combos: ["A00", "A01", "D01"], quota: 1000, years: 3 },
  { school: "cd-dlhn", major: "quan-tri-du-lich", code: "CD-DL01", cutoffs: [15.0, 15.0, 15.0], tuition: [16, 20], combos: ["C00", "D01"], quota: 600, years: 3, name: "Quản trị Khách sạn & Lữ hành" },
  { school: "cd-hht", major: "ky-thuat-o-to", code: "CD-HHT01", cutoffs: [15.0, 15.0, 15.0], tuition: [16, 20], combos: ["A00", "A01"], quota: 500, years: 3 },
  { school: "cd-yhn", major: "dieu-duong", code: "CD-YHN01", cutoffs: [16.0, 15.5, 15.0], tuition: [18, 22], combos: ["B00"], quota: 400, years: 3 },

  // ============================================================================
  // 11. MIỀN TRUNG – BÁCH KHOA ĐN (dut), KINH TẾ ĐN (due), VIỆT HÀN (vku), Y HUẾ (hump), DUY TÂN (dtu)
  // ============================================================================
  { school: "dut", major: "cong-nghe-thong-tin", code: "DDK01", cutoffs: [26.6, 26.3, 26.4], tuition: [24, 30], combos: ["A00", "A01"], quota: 350 },
  { school: "dut", major: "ky-thuat-dieu-khien-va-tu-dong-hoa", code: "DDK03", cutoffs: [25.5, 25.2, 25.0], tuition: [24, 30], combos: ["A00", "A01"], quota: 250 },
  { school: "dut", major: "ky-thuat-co-dien-tu", code: "DDK04", cutoffs: [25.0, 24.8, 24.6], tuition: [24, 30], combos: ["A00", "A01"], quota: 220 },
  { school: "dut", major: "ky-thuat-dien", code: "DDK02", cutoffs: [24.2, 23.9, 23.7], tuition: [24, 30], combos: ["A00", "A01"], quota: 280 },
  { school: "dut", major: "ky-thuat-o-to", code: "DDK05", cutoffs: [25.2, 25.0, 24.8], tuition: [24, 30], combos: ["A00", "A01"], quota: 200 },
  { school: "dut", major: "kien-truc", code: "DDK06", cutoffs: [23.5, 23.2, 23.0], tuition: [24, 30], combos: ["V00"], quota: 120, years: 5 },
  { school: "due", major: "marketing", code: "DDQ02", cutoffs: [25.8, 25.5, 25.2], tuition: [20, 26], combos: ["A00", "A01", "D01", "D07"], quota: 280 },
  { school: "due", major: "kinh-doanh-quoc-te", code: "DDQ01", cutoffs: [26.0, 25.8, 25.5], tuition: [20, 26], combos: ["A00", "A01", "D01", "D07"], quota: 250 },
  { school: "due", major: "thuong-mai-dien-tu", code: "DDQ03", cutoffs: [25.4, 25.1, 24.8], tuition: [20, 26], combos: ["A00", "A01", "D01", "D07"], quota: 200 },
  { school: "due", major: "tai-chinh-ngan-hang", code: "DDQ04", cutoffs: [25.0, 24.7, 24.5], tuition: [20, 26], combos: ["A00", "A01", "D01", "D07"], quota: 350 },
  { school: "due", major: "ke-toan", code: "DDQ05", cutoffs: [24.5, 24.2, 24.0], tuition: [20, 26], combos: ["A00", "A01", "D01", "D07"], quota: 300 },
  { school: "vku", major: "cong-nghe-thong-tin", code: "VKU01", cutoffs: [24.5, 24.0, 23.5], tuition: [18, 24], combos: ["A00", "A01", "D01"], quota: 400 },
  { school: "vku", major: "tri-tue-nhan-tao", code: "VKU02", cutoffs: [24.8, 24.2, 23.8], tuition: [18, 24], combos: ["A00", "A01", "D01"], quota: 150 },
  { school: "vku", major: "thiet-ke-vi-mach-ban-dan", code: "VKU03", cutoffs: [24.0, 23.5, 23.0], tuition: [18, 24], combos: ["A00", "A01"], quota: 120 },
  { school: "hump", major: "y-khoa", code: "DHY01", cutoffs: [27.2, 26.9, 26.5], tuition: [45, 55], combos: ["B00"], quota: 250, years: 6 },
  { school: "hump", major: "rang-ham-mat", code: "DHY02", cutoffs: [26.8, 26.5, 26.2], tuition: [45, 55], combos: ["B00"], quota: 80, years: 6 },
  { school: "hump", major: "duoc-hoc", code: "DHY03", cutoffs: [24.5, 24.2, 24.0], tuition: [26, 32], combos: ["A00", "B00"], quota: 200, years: 5 },
  { school: "dtu", major: "cong-nghe-thong-tin", code: "DDT01", cutoffs: [20.0, 19.5, 19.0], tuition: [32, 38], combos: ["A00", "A01", "D01"], quota: 600 },
  { school: "dtu", major: "y-khoa", code: "DDT02", cutoffs: [22.5, 22.0, 22.0], tuition: [75, 90], combos: ["B00"], quota: 150, years: 6 },
  { school: "cd-dldn", major: "quan-tri-du-lich", code: "CD-DLDN01", cutoffs: [15.0, 15.0, 15.0], tuition: [14, 18], combos: ["C00", "D01"], quota: 400, years: 3 },

  // ============================================================================
  // 12. MIỀN NAM – BÁCH KHOA TP.HCM (hcmut), KHTN (hcmus), KHXH&NV (ussh-hcm), CNTT (uit), KINH TẾ LUẬT (uel), QUỐC TẾ (iu)
  // ============================================================================
  { school: "ussh-hcm", major: "bao-chi", code: "QSX01", cutoffs: [27.8, 27.5, 27.2], tuition: [20, 26], combos: ["A01", "C00", "D01"], quota: 150 },
  { school: "ussh-hcm", major: "truyen-thong-da-phuong-tien", code: "QSX02", cutoffs: [28.1, 27.9, 27.6], tuition: [20, 26], combos: ["A01", "C00", "D01"], quota: 120 },
  { school: "ussh-hcm", major: "quan-he-quoc-te", code: "QSX03", cutoffs: [27.5, 27.3, 27.0], tuition: [20, 26], combos: ["A01", "D01", "C00"], quota: 180 },
  { school: "ussh-hcm", major: "tam-ly-hoc", code: "QSX04", cutoffs: [26.8, 26.5, 26.2], tuition: [20, 26], combos: ["A00", "B00", "C00", "D01"], quota: 140 },
  { school: "ussh-hcm", major: "ngon-ngu-anh", code: "QSX05", cutoffs: [27.0, 26.8, 26.5], tuition: [20, 26], combos: ["D01"], quota: 250 },
  { school: "hcmut", major: "khoa-hoc-may-tinh", code: "QSB-CS", cutoffs: [28.2, 28.0, 27.8], tuition: [32, 40], combos: ["A00", "A01"], quota: 350 },
  { school: "hcmut", major: "cong-nghe-thong-tin", code: "QSB-IT", cutoffs: [27.9, 27.7, 27.5], tuition: [32, 40], combos: ["A00", "A01"], quota: 400 },
  { school: "hcmut", major: "thiet-ke-vi-mach-ban-dan", code: "QSB-MC", cutoffs: [27.5, 27.2, 27.0], tuition: [32, 40], combos: ["A00", "A01"], quota: 120 },
  { school: "hcmut", major: "ky-thuat-dieu-khien-va-tu-dong-hoa", code: "QSB-TDH", cutoffs: [27.0, 26.8, 26.5], tuition: [30, 38], combos: ["A00", "A01"], quota: 300 },
  { school: "hcmut", major: "ky-thuat-co-dien-tu", code: "QSB-CDT", cutoffs: [26.8, 26.5, 26.3], tuition: [30, 38], combos: ["A00", "A01"], quota: 280 },
  { school: "hcmut", major: "ky-thuat-o-to", code: "QSB-OTO", cutoffs: [26.7, 26.4, 26.2], tuition: [30, 38], combos: ["A00", "A01"], quota: 250 },
  { school: "hcmut", major: "ky-thuat-dien", code: "QSB-EE", cutoffs: [25.8, 25.5, 25.2], tuition: [30, 38], combos: ["A00", "A01"], quota: 350 },
  { school: "hcmut", major: "ky-thuat-hoa-hoc", code: "QSB-CH", cutoffs: [25.0, 24.8, 24.5], tuition: [30, 38], combos: ["A00", "D07"], quota: 300 },
  { school: "hcmus", major: "khoa-hoc-may-tinh", code: "QST-CS", cutoffs: [28.1, 27.9, 27.6], tuition: [32, 40], combos: ["A00", "A01", "D07"], quota: 300 },
  { school: "hcmus", major: "tri-tue-nhan-tao", code: "QST-AI", cutoffs: [27.8, 27.5, 27.2], tuition: [32, 40], combos: ["A00", "A01", "D07"], quota: 120 },
  { school: "hcmus", major: "khoa-hoc-du-lieu", code: "QST-DS", cutoffs: [27.2, 27.0, 26.7], tuition: [32, 40], combos: ["A00", "A01", "D07"], quota: 150 },
  { school: "hcmus", major: "cong-nghe-thong-tin", code: "QST-IT", cutoffs: [27.0, 26.8, 26.5], tuition: [32, 40], combos: ["A00", "A01", "D07"], quota: 400 },
  { school: "hcmus", major: "khoa-hoc-moi-truong", code: "QST-MT", cutoffs: [21.5, 21.0, 20.5], tuition: [26, 32], combos: ["A00", "B00", "D07"], quota: 150 },
  { school: "uit", major: "khoa-hoc-may-tinh", code: "QSC-CS", cutoffs: [27.8, 27.5, 27.2], tuition: [35, 42], combos: ["A00", "A01"], quota: 250 },
  { school: "uit", major: "ky-thuat-phan-mem", code: "QSC-SE", cutoffs: [27.6, 27.4, 27.1], tuition: [35, 42], combos: ["A00", "A01"], quota: 300 },
  { school: "uit", major: "tri-tue-nhan-tao", code: "QSC-AI", cutoffs: [27.7, 27.4, 27.0], tuition: [35, 42], combos: ["A00", "A01"], quota: 120 },
  { school: "uit", major: "an-toan-thong-tin", code: "QSC-ATTT", cutoffs: [27.1, 26.8, 26.5], tuition: [35, 42], combos: ["A00", "A01"], quota: 200 },
  { school: "uit", major: "cong-nghe-thong-tin", code: "QSC-IT", cutoffs: [27.3, 27.0, 26.8], tuition: [35, 42], combos: ["A00", "A01"], quota: 350 },
  { school: "uit", major: "thiet-ke-vi-mach-ban-dan", code: "QSC-MC", cutoffs: [26.9, 26.5, 26.2], tuition: [35, 42], combos: ["A00", "A01"], quota: 100 },
  { school: "uel", major: "kinh-doanh-quoc-te", code: "QSK-KDQT", cutoffs: [27.4, 27.2, 27.0], tuition: [26, 32], combos: ["A00", "A01", "D01", "D07"], quota: 220 },
  { school: "uel", major: "thuong-mai-dien-tu", code: "QSK-TMDT", cutoffs: [27.1, 26.9, 26.7], tuition: [26, 32], combos: ["A00", "A01", "D01", "D07"], quota: 180 },
  { school: "uel", major: "luat-kinh-te", code: "QSK-LKT", cutoffs: [26.9, 26.7, 26.5], tuition: [26, 32], combos: ["A00", "A01", "C00", "D01"], quota: 250 },
  { school: "uel", major: "tai-chinh-ngan-hang", code: "QSK-TCNH", cutoffs: [26.7, 26.5, 26.3], tuition: [26, 32], combos: ["A00", "A01", "D01", "D07"], quota: 280 },
  { school: "iu", major: "logistics-quan-ly-chuoi-cung-ung", code: "QSG-LOG", cutoffs: [25.5, 25.2, 25.0], tuition: [50, 60], combos: ["A00", "A01", "D01"], quota: 150, type: "Quốc tế" },
  { school: "iu", major: "khoa-hoc-may-tinh", code: "QSG-CS", cutoffs: [25.8, 25.5, 25.2], tuition: [50, 60], combos: ["A00", "A01"], quota: 200, type: "Quốc tế" },
  { school: "iu", major: "quan-tri-kinh-doanh", code: "QSG-BA", cutoffs: [24.8, 24.5, 24.2], tuition: [50, 60], combos: ["A00", "A01", "D01"], quota: 250, type: "Quốc tế" },

  // ============================================================================
  // 13. MIỀN NAM – ĐẠI HỌC KINH TẾ TP.HCM (ueh)
  // ============================================================================
  { school: "ueh", major: "marketing", code: "KSA05", cutoffs: [27.2, 27.0, 26.8], tuition: [32, 40], combos: ["A00", "A01", "D01", "D07"], quota: 280 },
  { school: "ueh", major: "kinh-doanh-quoc-te", code: "KSA02", cutoffs: [27.4, 27.2, 27.0], tuition: [32, 40], combos: ["A00", "A01", "D01", "D07"], quota: 300 },
  { school: "ueh", major: "logistics-quan-ly-chuoi-cung-ung", code: "KSA06", cutoffs: [27.3, 27.1, 26.9], tuition: [32, 40], combos: ["A00", "A01", "D01", "D07"], quota: 220 },
  { school: "ueh", major: "thuong-mai-dien-tu", code: "KSA07", cutoffs: [27.0, 26.8, 26.6], tuition: [32, 40], combos: ["A00", "A01", "D01", "D07"], quota: 200 },
  { school: "ueh", major: "quan-tri-kinh-doanh", code: "KSA01", cutoffs: [26.6, 26.4, 26.2], tuition: [32, 40], combos: ["A00", "A01", "D01", "D07"], quota: 400 },
  { school: "ueh", major: "tai-chinh-ngan-hang", code: "KSA03", cutoffs: [26.4, 26.2, 26.0], tuition: [32, 40], combos: ["A00", "A01", "D01", "D07"], quota: 450 },
  { school: "ueh", major: "kiem-toan", code: "KSA08", cutoffs: [26.7, 26.5, 26.3], tuition: [32, 40], combos: ["A00", "A01", "D01", "D07"], quota: 200 },
  { school: "ueh", major: "ke-toan", code: "KSA04", cutoffs: [26.0, 25.8, 25.6], tuition: [32, 40], combos: ["A00", "A01", "D01", "D07"], quota: 350 },
  { school: "ueh", major: "quan-tri-du-lich", code: "KSA09", cutoffs: [25.2, 25.0, 24.6], tuition: [32, 40], combos: ["A00", "A01", "D01", "D07"], quota: 150 },

  // ============================================================================
  // 14. MIỀN NAM – Y DƯỢC TP.HCM (ump) & PHẠM NGỌC THẠCH (pntu)
  // ============================================================================
  { school: "ump", major: "y-khoa", code: "YDS01", cutoffs: [28.2, 28.0, 27.65], tuition: [55, 65], combos: ["B00"], quota: 400, years: 6 },
  { school: "ump", major: "rang-ham-mat", code: "YDS02", cutoffs: [27.7, 27.5, 27.3], tuition: [55, 65], combos: ["B00"], quota: 130, years: 6 },
  { school: "ump", major: "duoc-hoc", code: "YDS03", cutoffs: [26.0, 25.8, 25.5], tuition: [30, 38], combos: ["A00", "B00"], quota: 450, years: 5 },
  { school: "ump", major: "dieu-duong", code: "YDS04", cutoffs: [24.0, 23.8, 23.5], tuition: [24, 30], combos: ["B00"], quota: 300 },
  { school: "pntu", major: "y-khoa", code: "TYS01", cutoffs: [27.5, 27.3, 27.0], tuition: [45, 55], combos: ["B00"], quota: 450, years: 6 },
  { school: "pntu", major: "rang-ham-mat", code: "TYS02", cutoffs: [27.0, 26.8, 26.5], tuition: [45, 55], combos: ["B00"], quota: 100, years: 6 },
  { school: "pntu", major: "duoc-hoc", code: "TYS03", cutoffs: [25.0, 24.8, 24.5], tuition: [28, 35], combos: ["A00", "B00"], quota: 200, years: 5 },

  // ============================================================================
  // 15. MIỀN NAM – SƯ PHẠM KỸ THUẬT (hcmute), SƯ PHẠM (hcmue), NÔNG LÂM (nlu), LUẬT (hcmulaw)
  // ============================================================================
  { school: "hcmute", major: "ky-thuat-o-to", code: "SPK01", cutoffs: [26.8, 26.5, 26.3], tuition: [26, 34], combos: ["A00", "A01"], quota: 450 },
  { school: "hcmute", major: "ky-thuat-co-dien-tu", code: "SPK03", cutoffs: [26.2, 26.0, 25.8], tuition: [26, 34], combos: ["A00", "A01"], quota: 350 },
  { school: "hcmute", major: "ky-thuat-dieu-khien-va-tu-dong-hoa", code: "SPK04", cutoffs: [26.5, 26.2, 26.0], tuition: [26, 34], combos: ["A00", "A01"], quota: 320 },
  { school: "hcmute", major: "cong-nghe-thong-tin", code: "SPK02", cutoffs: [26.6, 26.4, 26.2], tuition: [26, 34], combos: ["A00", "A01"], quota: 400 },
  { school: "hcmute", major: "cong-nghe-thuc-pham", code: "SPK05", cutoffs: [24.5, 24.2, 24.0], tuition: [26, 34], combos: ["A00", "B00", "D07"], quota: 250 },
  { school: "hcmue", major: "su-pham-toan", code: "SPS01", cutoffs: [27.5, 27.2, 26.8], tuition: [0, 0], combos: ["A00", "A01", "D01"], quota: 150 },
  { school: "hcmue", major: "su-pham-tieng-anh", code: "SPS02", cutoffs: [27.8, 27.5, 27.2], tuition: [0, 0], combos: ["D01"], quota: 180 },
  { school: "hcmue", major: "tam-ly-hoc", code: "SPS03", cutoffs: [26.0, 25.8, 25.5], tuition: [16, 20], combos: ["B00", "C00", "D01"], quota: 120 },
  { school: "nlu", major: "thu-y", code: "NLS01", cutoffs: [24.5, 24.2, 24.0], tuition: [18, 24], combos: ["A00", "B00"], quota: 300, years: 5 },
  { school: "nlu", major: "cong-nghe-thuc-pham", code: "NLS02", cutoffs: [23.5, 23.2, 23.0], tuition: [18, 24], combos: ["A00", "B00", "D07"], quota: 300 },
  { school: "nlu", major: "nong-nghiep-cong-nghe-cao", code: "NLS03", cutoffs: [20.5, 20.0, 19.5], tuition: [18, 24], combos: ["A00", "B00", "D07"], quota: 250 },
  { school: "hcmulaw", major: "luat", code: "LPS01", cutoffs: [27.4, 27.2, 26.9], tuition: [20, 28], combos: ["A00", "A01", "C00", "D01"], quota: 650 },
  { school: "hcmulaw", major: "luat-kinh-te", code: "LPS02", cutoffs: [27.8, 27.5, 27.2], tuition: [20, 28], combos: ["A00", "A01", "C00", "D01"], quota: 400 },

  // ============================================================================
  // 16. MIỀN NAM – TÔN ĐỨC THẮNG (tdtu), CÔNG NGHIỆP TP.HCM (iuh), CẦN THƠ (ctu)
  // ============================================================================
  { school: "tdtu", major: "cong-nghe-thong-tin", code: "DTT01", cutoffs: [26.5, 26.2, 26.0], tuition: [28, 36], combos: ["A00", "A01"], quota: 450 },
  { school: "tdtu", major: "thiet-ke-do-hoa", code: "DTT04", cutoffs: [26.0, 25.8, 25.5], tuition: [30, 38], combos: ["V00", "A01", "D01"], quota: 200 },
  { school: "tdtu", major: "marketing", code: "DTT02", cutoffs: [26.4, 26.2, 26.0], tuition: [28, 36], combos: ["A00", "A01", "D01", "D07"], quota: 300 },
  { school: "tdtu", major: "luat", code: "DTT03", cutoffs: [25.5, 25.2, 25.0], tuition: [28, 36], combos: ["A00", "A01", "C00", "D01"], quota: 250 },
  { school: "iuh", major: "cong-nghe-thong-tin", code: "HUI01", cutoffs: [24.8, 24.5, 24.2], tuition: [24, 30], combos: ["A00", "A01", "D01"], quota: 600 },
  { school: "iuh", major: "ky-thuat-o-to", code: "HUI02", cutoffs: [24.5, 24.2, 24.0], tuition: [24, 30], combos: ["A00", "A01"], quota: 500 },
  { school: "iuh", major: "cong-nghe-thuc-pham", code: "HUI03", cutoffs: [23.2, 23.0, 22.8], tuition: [24, 30], combos: ["A00", "B00", "D07"], quota: 400 },
  { school: "ctu", major: "cong-nghe-thong-tin", code: "TCT-IT", cutoffs: [25.2, 24.8, 24.5], tuition: [18, 24], combos: ["A00", "A01", "D07"], quota: 500 },
  { school: "ctu", major: "cong-nghe-thuc-pham", code: "TCT-TP", cutoffs: [22.8, 22.5, 22.0], tuition: [18, 24], combos: ["A00", "B00", "D07"], quota: 300 },
  { school: "ctu", major: "su-pham-toan", code: "TCT-SPT", cutoffs: [26.0, 25.7, 25.3], tuition: [0, 0], combos: ["A00", "A01"], quota: 100 },
  { school: "ctu", major: "thu-y", code: "TCT-TY", cutoffs: [23.0, 22.6, 22.2], tuition: [18, 24], combos: ["A00", "B00"], quota: 250, years: 5 },

  // ============================================================================
  // 17. MIỀN NAM – RMIT, HUTECH, VĂN LANG (vlu-sg), HOA SEN (hsu) & CAO ĐẲNG PHÍA NAM
  // ============================================================================
  {
    school: "rmit", major: "marketing", code: "BP343", cutoffs: [25.5, 25.0, 24.5], tuition: [320, 360], combos: ["A01", "D01"], quota: 600, type: "Quốc tế", name: "Cử nhân Kinh doanh (Marketing)",
    extraMethods: [{ name: "Xét học bạ + IELTS", desc: "GPA lớp 12 từ 7.0 và IELTS 6.5 (không kỹ năng nào dưới 6.0).", requirement: "GPA 7.0, IELTS 6.5", tag: "Học bạ" }],
  },
  {
    school: "rmit", major: "thiet-ke-do-hoa", code: "BP316", cutoffs: [24.5, 24.0, 23.5], tuition: [320, 360], combos: ["A01", "D01", "V00"], quota: 300, type: "Quốc tế", name: "Cử nhân Thiết kế (Truyền thông số)",
  },
  {
    school: "rmit", major: "ky-thuat-phan-mem", code: "BP162", cutoffs: [26.0, 25.5, 25.0], tuition: [330, 370], combos: ["A00", "A01", "D01"], quota: 250, type: "Quốc tế", name: "Cử nhân Kỹ thuật phần mềm",
  },
  { school: "hutech", major: "ky-thuat-o-to", code: "DKC01", cutoffs: [20.0, 19.5, 19.0], tuition: [36, 44], combos: ["A00", "A01", "D01"], quota: 800 },
  { school: "hutech", major: "ky-thuat-phan-mem", code: "DKC02", cutoffs: [20.5, 20.0, 19.5], tuition: [36, 44], combos: ["A00", "A01", "D01"], quota: 600 },
  { school: "hutech", major: "marketing", code: "DKC03", cutoffs: [19.5, 19.0, 18.5], tuition: [36, 44], combos: ["A00", "A01", "D01", "D07"], quota: 500 },
  { school: "vlu-sg", major: "thiet-ke-do-hoa", code: "VLU01", cutoffs: [22.0, 21.5, 21.0], tuition: [45, 55], combos: ["V00", "A01", "D01"], quota: 450 },
  { school: "vlu-sg", major: "kien-truc", code: "VLU02", cutoffs: [21.0, 20.5, 20.0], tuition: [48, 58], combos: ["V00"], quota: 250, years: 5 },
  { school: "vlu-sg", major: "y-khoa", code: "VLU03", cutoffs: [22.5, 22.0, 22.0], tuition: [150, 180], combos: ["B00"], quota: 150, years: 6 },
  { school: "hsu", major: "quan-tri-du-lich", code: "HSU01", cutoffs: [19.5, 19.0, 18.5], tuition: [42, 52], combos: ["A00", "A01", "D01"], quota: 350 },
  { school: "hsu", major: "thiet-ke-do-hoa", code: "HSU02", cutoffs: [20.0, 19.5, 19.0], tuition: [42, 52], combos: ["V00", "A01", "D01"], quota: 250 },
  { school: "cd-ckt", major: "ky-thuat-o-to", code: "CD-CKT01", cutoffs: [16.5, 16.0, 15.5], tuition: [18, 22], combos: ["A00", "A01"], quota: 600, years: 3 },
  { school: "cd-ckt", major: "ky-thuat-co-dien-tu", code: "CD-CKT02", cutoffs: [16.0, 15.5, 15.0], tuition: [18, 22], combos: ["A00", "A01"], quota: 400, years: 3 },
  { school: "cd-fpt-hcm", major: "cong-nghe-thong-tin", code: "CD-FPTS01", cutoffs: [15.0, 15.0, 15.0], tuition: [26, 30], combos: ["A00", "A01", "D01"], quota: 2500, years: 3, name: "Lập trình Web/Mobile" },
  { school: "cd-dlsg", major: "quan-tri-du-lich", code: "CD-DLSG01", cutoffs: [15.0, 15.0, 15.0], tuition: [18, 22], combos: ["C00", "D01"], quota: 500, years: 3 },
  { school: "cd-ltt", major: "ky-thuat-o-to", code: "CD-LTT01", cutoffs: [15.0, 15.0, 15.0], tuition: [16, 20], combos: ["A00", "A01"], quota: 500, years: 3 },
  { school: "cd-tdc", major: "cong-nghe-thong-tin", code: "CD-TDC01", cutoffs: [15.0, 15.0, 15.0], tuition: [16, 20], combos: ["A00", "A01", "D01"], quota: 450, years: 3 },
];

/**
 * Các trường có áp dụng xét tuyển học bạ hoặc ĐGNL (ĐHQGHN HSA / ĐHQG TP.HCM).
 */
const HOCBA_SCHOOLS = new Set(["tdtu", "ueh", "ctu", "vnua", "dut", "hup", "hutech", "vlu-sg", "hsu", "phenikaa", "fpt"]);
const DGNL_HN_SCHOOLS = new Set(["uet", "ussh", "ftu", "neu", "vnua", "hup", "hust", "ptit", "tmu", "aof", "bav"]);
const DGNL_HCM_SCHOOLS = new Set(["ueh", "hcmus", "hcmut", "uit", "uel", "iu", "tdtu", "ctu", "dut", "iuh", "hcmute", "nlu"]);
const clamp = (n: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, n));

const altCutoffsOf = (s: Seed): MethodCutoff[] => {
  if (!s.cutoffs) return [];
  const t = s.cutoffs[0];
  const out: MethodCutoff[] = [];
  if (HOCBA_SCHOOLS.has(s.school)) {
    out.push({ method: "hocba", year: 2025, score: Math.round(Math.min(29.9, t + 1.2) * 100) / 100, estimated: true });
  }
  if (DGNL_HN_SCHOOLS.has(s.school)) {
    out.push({ method: "dgnl-hn", year: 2025, score: Math.round(clamp(55 + (t - 15) * 4.6, 60, 135)), estimated: true });
  }
  if (DGNL_HCM_SCHOOLS.has(s.school)) {
    out.push({ method: "dgnl-hcm", year: 2025, score: Math.round(clamp(520 + (t - 15) * 33, 550, 1080)), estimated: true });
  }
  return out;
};

export const competitionOf = (cutoff: number | undefined, quota: number): Competition => {
  if (cutoff === undefined) return "Trung bình";
  if (cutoff >= 27 || quota <= 100) return "Cao";
  if (cutoff >= 24) return "Trung bình";
  return "Thấp";
};

/** Phần "Yêu cầu" của phương thức có `key` được trang chi tiết tính lại từ điểm chuẩn hiện hành. */
const baseMethods = (s: Seed, alt: MethodCutoff[]): AdmissionMethod[] => {
  if (!s.cutoffs) return [];
  const has = (m: MethodCutoff["method"]) => alt.some((a) => a.method === m);
  return [
    { name: "Xét tuyển thẳng", desc: "Áp dụng theo quy chế tuyển thẳng của Bộ Giáo dục & Đào tạo cho các đối tượng ưu tiên.", requirement: "Theo quy định", tag: "Ưu tiên" },
    { key: "thpt", name: "Xét điểm thi tốt nghiệp THPT", desc: `Theo tổng điểm tổ hợp (${s.combos.join(", ")}) cộng điểm ưu tiên.`, requirement: `${s.cutoffs[0].toFixed(2)} điểm`, tag: "Điểm thi" },
    ...(has("hocba")
      ? [{ key: "hocba" as const, name: "Xét học bạ THPT", desc: `Tổng điểm trung bình 3 môn theo tổ hợp (${s.combos.join(", ")}) lớp 10–12, cộng điểm ưu tiên.`, requirement: "Theo điểm chuẩn học bạ", tag: "Học bạ" }]
      : []),
    ...(has("dgnl-hn")
      ? [{ key: "dgnl-hn" as const, name: "Xét kết quả thi ĐGNL ĐHQG Hà Nội (HSA)", desc: "Điểm bài thi đánh giá năng lực HSA (thang 150), cộng điểm ưu tiên quy đổi.", requirement: "Theo điểm chuẩn HSA", tag: "ĐGNL" }]
      : []),
    ...(has("dgnl-hcm")
      ? [{ key: "dgnl-hcm" as const, name: "Xét kết quả thi ĐGNL ĐHQG TP.HCM", desc: "Điểm bài thi đánh giá năng lực (thang 1200), cộng điểm ưu tiên quy đổi.", requirement: "Theo điểm chuẩn ĐGNL", tag: "ĐGNL" }]
      : []),
    { name: "Xét tuyển kết hợp", desc: "Kết hợp chứng chỉ ngoại ngữ quốc tế (IELTS từ 5.5) với điểm thi THPT hoặc học bạ.", requirement: "IELTS 5.5+", tag: "Ngoại ngữ" },
  ];
};

export const programs: Program[] = seeds
  .map((s) => {
    const school = schools.find((x) => x.id === s.school);
    const major = majors.find((x) => x.id === s.major);
    if (!school || !major) {
      console.warn(`[WARN] Program seed invalid: school=${s.school}, major=${s.major}`);
      return null;
    }
    const name = s.name ?? major.name;
    const altCutoffs = altCutoffsOf(s);
    return {
      id: `${s.school}-${s.major}`,
      slug: `${major.slug}-${school.code.toLowerCase()}`,
      schoolId: s.school,
      majorId: s.major,
      name,
      admissionCode: s.code,
      trainingType: s.type ?? "Chính quy",
      campus: school.campuses?.[s.campus ?? 0] ?? school.city,
      combos: s.combos,
      cutoffs: s.cutoffs ? [2025, 2024, 2023].map((year, i) => ({ year, score: s.cutoffs![i] })) : [],
      altCutoffs,
      tuitionMin: s.tuition[0],
      tuitionMax: s.tuition[1],
      durationYears: s.years ?? 4,
      quota: s.quota,
      competition: competitionOf(s.cutoffs?.[0], s.quota),
      methods: [...baseMethods(s, altCutoffs), ...(s.extraMethods ?? [])],
      overview: `Chương trình ${name} của ${school.name} đào tạo theo định hướng: ${major.summary.charAt(0).toLowerCase()}${major.summary.slice(1)} Sinh viên học lý thuyết nền tảng kết hợp thực hành qua dự án và thực tập tại doanh nghiệp đối tác.`,
      updatedAt: "2026-09",
      source: `Đề án tuyển sinh 2026 – ${school.name}`,
    };
  })
  .filter((p): p is Program => p !== null);

console.log(`✓ Generated programs: Total ${programs.length} accredited university & college programs across Vietnam.`);
