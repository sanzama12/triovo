import type { AdmissionMethod, Competition, MethodCutoff, Program } from "../domain/types";
import { majors } from "./majors";
import { schools } from "./schools";

/**
 * Chương trình đào tạo — DỮ LIỆU MINH HOẠ.
 * Điểm chuẩn, học phí, chỉ tiêu chỉ phục vụ bản demo giao diện, không dùng để đăng ký nguyện vọng thật.
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
  // Hà Nội
  { school: "hust", major: "cong-nghe-thong-tin", code: "IT1", cutoffs: [28.45, 28.53, 29.42], tuition: [28, 35], combos: ["A00", "A01"], quota: 360 },
  { school: "hust", major: "khoa-hoc-may-tinh", code: "IT2", cutoffs: [28.9, 28.75, 29.05], tuition: [28, 35], combos: ["A00", "A01"], quota: 200 },
  { school: "hust", major: "tri-tue-nhan-tao", code: "IT-E10", cutoffs: [28.6, 28.48, 28.8], tuition: [45, 60], combos: ["A00", "A01"], quota: 120, type: "Chất lượng cao" },
  { school: "hust", major: "ky-thuat-dien", code: "EE1", cutoffs: [26.35, 25.9, 26.0], tuition: [24, 30], combos: ["A00", "A01"], quota: 480 },
  { school: "hust", major: "ky-thuat-co-khi", code: "ME1", cutoffs: [24.8, 24.5, 24.3], tuition: [24, 30], combos: ["A00", "A01"], quota: 420 },
  { school: "neu", major: "marketing", code: "MKT01", cutoffs: [26.75, 27.5, 27.2], tuition: [18, 24], combos: ["A00", "A01", "D01", "D07"], quota: 180 },
  { school: "neu", major: "quan-tri-kinh-doanh", code: "QTKD01", cutoffs: [27.1, 27.05, 26.9], tuition: [18, 24], combos: ["A00", "A01", "D01", "D07"], quota: 260 },
  { school: "neu", major: "tai-chinh-ngan-hang", code: "TCNH01", cutoffs: [26.9, 26.8, 26.65], tuition: [18, 24], combos: ["A00", "A01", "D01", "D07"], quota: 300 },
  { school: "neu", major: "ke-toan", code: "KT01", cutoffs: [26.6, 26.5, 26.4], tuition: [18, 24], combos: ["A00", "A01", "D01", "D07"], quota: 280 },
  { school: "neu", major: "kinh-doanh-quoc-te", code: "KDQT01", cutoffs: [27.4, 27.35, 27.2], tuition: [18, 24], combos: ["A00", "A01", "D01", "D07"], quota: 150 },
  { school: "neu", major: "cong-nghe-thong-tin", code: "CNTT01", cutoffs: [26.3, 26.1, 25.9], tuition: [18, 24], combos: ["A00", "A01", "D01", "D07"], quota: 120 },
  { school: "ftu", major: "kinh-doanh-quoc-te", code: "NTH02", cutoffs: [28.1, 27.95, 27.85], tuition: [22, 26], combos: ["A00", "A01", "D01", "D07"], quota: 400 },
  { school: "ftu", major: "marketing", code: "NTH05", cutoffs: [27.5, 27.4, 27.3], tuition: [22, 26], combos: ["A00", "A01", "D01", "D07"], quota: 120, campus: 0, name: "Marketing số" },
  { school: "ftu", major: "tai-chinh-ngan-hang", code: "NTH03", cutoffs: [27.6, 27.45, 27.3], tuition: [22, 26], combos: ["A00", "A01", "D01", "D07"], quota: 300 },
  { school: "ftu", major: "luat", code: "NTH07", cutoffs: [27.2, 27.0, 26.8], tuition: [22, 26], combos: ["A00", "A01", "D01", "C00"], quota: 100, name: "Luật thương mại quốc tế" },
  { school: "uet", major: "cong-nghe-thong-tin", code: "CN1", cutoffs: [27.8, 27.68, 27.85], tuition: [32, 40], combos: ["A00", "A01"], quota: 480 },
  { school: "uet", major: "khoa-hoc-may-tinh", code: "CN8", cutoffs: [27.6, 27.5, 27.25], tuition: [32, 40], combos: ["A00", "A01"], quota: 240 },
  { school: "uet", major: "tri-tue-nhan-tao", code: "CN12", cutoffs: [27.3, 27.2, 27.1], tuition: [32, 40], combos: ["A00", "A01"], quota: 120 },
  { school: "hmu", major: "y-khoa", code: "7720101", cutoffs: [28.3, 28.27, 27.73], tuition: [55, 60], combos: ["B00"], quota: 400, years: 6 },
  { school: "hup", major: "duoc-hoc", code: "7720201", cutoffs: [26.0, 25.8, 25.5], tuition: [24, 27], combos: ["A00", "B00"], quota: 750, years: 5 },
  { school: "ussh", major: "quan-he-cong-chung", code: "QHX16", cutoffs: [28.0, 28.78, 28.2], tuition: [15, 20], combos: ["A01", "C00", "D01"], quota: 60 },
  { school: "ussh", major: "tam-ly-hoc", code: "QHX20", cutoffs: [27.0, 27.4, 26.8], tuition: [15, 20], combos: ["A00", "B00", "C00", "D01"], quota: 120 },
  { school: "hnue", major: "su-pham-toan", code: "7140209A", cutoffs: [27.8, 27.35, 26.9], tuition: [0, 0], combos: ["A00", "A01", "D01"], quota: 150 },
  { school: "hnue", major: "tam-ly-hoc", code: "7310401C", cutoffs: [25.8, 25.5, 25.3], tuition: [14, 16], combos: ["B00", "C00", "D01"], quota: 100 },
  { school: "vnua", major: "cong-nghe-thuc-pham", code: "HVN12", cutoffs: [20.5, 20.0, 19.5], tuition: [14, 18], combos: ["A00", "B00", "D07"], quota: 250 },
  { school: "vnua", major: "khoa-hoc-moi-truong", code: "HVN20", cutoffs: [17.0, 16.5, 16.0], tuition: [14, 18], combos: ["A00", "B00", "D07"], quota: 120 },
  {
    school: "fpt", major: "ky-thuat-phan-mem", code: "FPT-SE", cutoffs: [21.0, 21.0, 21.0], tuition: [54, 60], combos: ["A00", "A01", "D01"], quota: 3000,
    extraMethods: [{ name: "Xét học bạ + Kỳ thi đánh giá năng lực của trường", desc: "Học bạ top 50 theo xếp hạng SchoolRank hoặc đạt ngưỡng bài thi riêng.", requirement: "Top 50 học bạ", tag: "Học bạ" }],
  },
  { school: "fpt", major: "tri-tue-nhan-tao", code: "FPT-AI", cutoffs: [21.0, 21.0, 21.0], tuition: [54, 60], combos: ["A00", "A01", "D01"], quota: 600 },
  { school: "fpt", major: "thiet-ke-do-hoa", code: "FPT-GD", cutoffs: [20.5, 20.0, 20.0], tuition: [54, 60], combos: ["A00", "A01", "D01"], quota: 400, name: "Thiết kế mỹ thuật số" },
  // Miền Trung
  { school: "dut", major: "cong-nghe-thong-tin", code: "7480201", cutoffs: [26.5, 26.2, 26.4], tuition: [22, 28], combos: ["A00", "A01"], quota: 300 },
  { school: "dut", major: "ky-thuat-dien", code: "7520201", cutoffs: [24.1, 23.8, 23.5], tuition: [22, 28], combos: ["A00", "A01"], quota: 200 },
  { school: "dut", major: "ky-thuat-co-khi", code: "7520103", cutoffs: [23.5, 23.2, 23.0], tuition: [22, 28], combos: ["A00", "A01"], quota: 200 },
  { school: "dut", major: "kien-truc", code: "7580101", cutoffs: [22.8, 22.5, 22.0], tuition: [22, 28], combos: ["V00"], quota: 120, years: 5 },
  // Miền Nam
  {
    school: "rmit", major: "marketing", code: "BP343", tuition: [300, 320], combos: [], quota: 500, type: "Quốc tế", name: "Cử nhân Kinh doanh (Marketing)",
    extraMethods: [{ name: "Xét học bạ + IELTS", desc: "Điểm trung bình lớp 12 từ 7.0 và IELTS 6.5 (không kỹ năng nào dưới 6.0).", requirement: "GPA 7.0, IELTS 6.5", tag: "Học bạ" }],
  },
  {
    school: "rmit", major: "thiet-ke-do-hoa", code: "BP316", tuition: [300, 320], combos: [], quota: 250, type: "Quốc tế", name: "Cử nhân Thiết kế (Truyền thông số)",
    extraMethods: [{ name: "Xét học bạ + IELTS + Portfolio", desc: "GPA lớp 12 từ 7.0, IELTS 6.5 và hồ sơ tác phẩm.", requirement: "GPA 7.0, IELTS 6.5", tag: "Học bạ" }],
  },
  {
    school: "rmit", major: "ky-thuat-phan-mem", code: "BP162", tuition: [310, 330], combos: [], quota: 200, type: "Quốc tế", name: "Cử nhân Kỹ thuật phần mềm",
    extraMethods: [{ name: "Xét học bạ + IELTS", desc: "GPA lớp 12 từ 7.0, Toán từ 7.0, IELTS 6.5.", requirement: "GPA 7.0, IELTS 6.5", tag: "Học bạ" }],
  },
  { school: "ueh", major: "marketing", code: "KSA05", cutoffs: [26.9, 26.8, 26.5], tuition: [28, 34], combos: ["A00", "A01", "D01", "D07"], quota: 250 },
  { school: "ueh", major: "quan-tri-kinh-doanh", code: "KSA01", cutoffs: [26.4, 26.3, 26.1], tuition: [28, 34], combos: ["A00", "A01", "D01", "D07"], quota: 400 },
  { school: "ueh", major: "tai-chinh-ngan-hang", code: "KSA03", cutoffs: [26.2, 26.0, 25.8], tuition: [28, 34], combos: ["A00", "A01", "D01", "D07"], quota: 350 },
  { school: "ueh", major: "ke-toan", code: "KSA04", cutoffs: [25.8, 25.7, 25.4], tuition: [28, 34], combos: ["A00", "A01", "D01", "D07"], quota: 300 },
  { school: "ueh", major: "quan-tri-du-lich", code: "KSA09", cutoffs: [24.9, 24.6, 24.2], tuition: [28, 34], combos: ["A00", "A01", "D01", "D07"], quota: 150 },
  { school: "hcmus", major: "khoa-hoc-may-tinh", code: "QST-CS", cutoffs: [28.0, 27.9, 27.6], tuition: [30, 38], combos: ["A00", "A01", "D07"], quota: 250 },
  { school: "hcmus", major: "cong-nghe-thong-tin", code: "QST-IT", cutoffs: [27.0, 26.9, 26.7], tuition: [30, 38], combos: ["A00", "A01", "D07"], quota: 350 },
  { school: "hcmus", major: "tri-tue-nhan-tao", code: "QST-AI", cutoffs: [27.4, 27.3, 27.0], tuition: [30, 38], combos: ["A00", "A01", "D07"], quota: 100 },
  { school: "hcmus", major: "khoa-hoc-moi-truong", code: "QST-MT", cutoffs: [21.5, 21.0, 20.5], tuition: [25, 30], combos: ["A00", "B00", "D07"], quota: 150 },
  { school: "tdtu", major: "luat", code: "DTT-LU", cutoffs: [25.2, 25.0, 24.8], tuition: [26, 30], combos: ["A00", "A01", "C00", "D01"], quota: 200 },
  { school: "tdtu", major: "thiet-ke-do-hoa", code: "DTT-TK", cutoffs: [26.0, 25.8, 25.5], tuition: [28, 32], combos: ["V00", "A01", "D01"], quota: 120 },
  { school: "tdtu", major: "khoa-hoc-moi-truong", code: "DTT-MT", cutoffs: [22.0, 21.5, 21.0], tuition: [24, 28], combos: ["A00", "B00", "D07"], quota: 100 },
  { school: "ctu", major: "cong-nghe-thong-tin", code: "TCT-IT", cutoffs: [24.9, 24.6, 24.3], tuition: [18, 22], combos: ["A00", "A01", "D07"], quota: 400 },
  { school: "ctu", major: "cong-nghe-thuc-pham", code: "TCT-TP", cutoffs: [22.6, 22.3, 22.0], tuition: [18, 22], combos: ["A00", "B00", "D07"], quota: 200 },
  { school: "ctu", major: "su-pham-toan", code: "TCT-SPT", cutoffs: [25.7, 25.4, 25.0], tuition: [0, 0], combos: ["A00", "A01"], quota: 80 },
  { school: "ctu", major: "khoa-hoc-moi-truong", code: "TCT-MT", cutoffs: [19.5, 19.0, 18.5], tuition: [18, 22], combos: ["A00", "B00", "D07"], quota: 120 },

  // ── Miền Bắc – trường mới ─────────────────────────────────────────────────
  // vlu – ĐH Luật Hà Nội
  { school: "vlu", major: "luat", code: "HLU01", cutoffs: [28.2, 28.0, 27.8], tuition: [14, 16], combos: ["A00", "A01", "C00", "D01"], quota: 400 },
  { school: "vlu", major: "quan-he-quoc-te", code: "HLU02", cutoffs: [27.5, 27.3, 27.1], tuition: [14, 16], combos: ["A00", "A01", "D01"], quota: 80 },

  // huce – ĐH Xây dựng Hà Nội
  { school: "huce", major: "ky-thuat-xay-dung", code: "XDH01", cutoffs: [24.5, 24.2, 24.0], tuition: [16, 20], combos: ["A00", "A01"], quota: 500 },
  { school: "huce", major: "kien-truc", code: "XDH02", cutoffs: [23.5, 23.2, 23.0], tuition: [18, 22], combos: ["V00"], quota: 180, years: 5 },
  { school: "huce", major: "quy-hoach-do-thi", code: "XDH03", cutoffs: [22.5, 22.2, 22.0], tuition: [16, 20], combos: ["V00", "A01"], quota: 120, years: 5 },

  // utc – ĐH Giao thông Vận tải
  { school: "utc", major: "ky-thuat-co-khi", code: "GTV01", cutoffs: [22.0, 21.8, 21.5], tuition: [16, 20], combos: ["A00", "A01"], quota: 350 },
  { school: "utc", major: "ky-thuat-oto", code: "GTV02", cutoffs: [22.5, 22.2, 22.0], tuition: [16, 20], combos: ["A00", "A01"], quota: 300 },
  { school: "utc", major: "cong-nghe-thong-tin", code: "GTV03", cutoffs: [23.5, 23.2, 23.0], tuition: [16, 20], combos: ["A00", "A01"], quota: 200 },

  // htmu – ĐH Thương mại
  { school: "htmu", major: "kinh-doanh-thuong-mai", code: "TMU01", cutoffs: [26.0, 25.8, 25.5], tuition: [14, 18], combos: ["A00", "A01", "D01", "D07"], quota: 250 },
  { school: "htmu", major: "marketing", code: "TMU02", cutoffs: [26.2, 26.0, 25.8], tuition: [14, 18], combos: ["A00", "A01", "D01", "D07"], quota: 200 },
  { school: "htmu", major: "thuong-mai-dien-tu", code: "TMU03", cutoffs: [25.5, 25.2, 25.0], tuition: [14, 18], combos: ["A00", "A01", "D01", "D07"], quota: 150 },

  // hvnh – HV Ngân hàng
  { school: "hvnh", major: "tai-chinh-ngan-hang", code: "HNB01", cutoffs: [26.5, 26.3, 26.0], tuition: [16, 20], combos: ["A00", "A01", "D01", "D07"], quota: 400 },
  { school: "hvnh", major: "bao-hiem", code: "HNB02", cutoffs: [24.0, 23.8, 23.5], tuition: [16, 20], combos: ["A00", "A01", "D01"], quota: 100 },

  // hvtc – HV Tài chính
  { school: "hvtc", major: "ke-toan", code: "HVT01", cutoffs: [26.0, 25.8, 25.5], tuition: [16, 20], combos: ["A00", "A01", "D01", "D07"], quota: 300 },
  { school: "hvtc", major: "kiem-toan", code: "HVT02", cutoffs: [25.8, 25.5, 25.2], tuition: [16, 20], combos: ["A00", "A01", "D01", "D07"], quota: 200 },
  { school: "hvtc", major: "tai-chinh-ngan-hang", code: "HVT03", cutoffs: [26.5, 26.3, 26.1], tuition: [16, 20], combos: ["A00", "A01", "D01", "D07"], quota: 400 },

  // ajc – HV Báo chí & TT
  { school: "ajc", major: "bao-chi", code: "AJC01", cutoffs: [26.5, 26.2, 26.0], tuition: [14, 18], combos: ["C00", "D01", "A01"], quota: 200 },
  { school: "ajc", major: "truyen-thong-da-phuong-tien", code: "AJC02", cutoffs: [25.5, 25.2, 25.0], tuition: [14, 18], combos: ["C00", "D01", "A01"], quota: 150 },
  { school: "ajc", major: "quan-he-cong-chung", code: "AJC03", cutoffs: [26.0, 25.8, 25.5], tuition: [14, 18], combos: ["C00", "D01", "A01"], quota: 120 },

  // hanu – ĐH Hà Nội
  { school: "hanu", major: "ngoai-ngu-anh", code: "HNU01", cutoffs: [27.0, 26.8, 26.5], tuition: [16, 20], combos: ["A00", "A01", "D01"], quota: 300 },
  { school: "hanu", major: "ngoai-ngu-nhat", code: "HNU02", cutoffs: [25.5, 25.2, 25.0], tuition: [16, 20], combos: ["A00", "A01", "D01"], quota: 150 },
  { school: "hanu", major: "ngoai-ngu-trung", code: "HNU03", cutoffs: [25.0, 24.8, 24.5], tuition: [16, 20], combos: ["A00", "A01", "D01"], quota: 120 },

  // ute-hn – ĐH Sư phạm KT Hà Nội
  { school: "ute-hn", major: "ky-thuat-co-dien-tu", code: "SPK01", cutoffs: [22.0, 21.8, 21.5], tuition: [16, 20], combos: ["A00", "A01"], quota: 200 },
  { school: "ute-hn", major: "ky-thuat-phan-mem", code: "SPK02", cutoffs: [23.0, 22.8, 22.5], tuition: [16, 20], combos: ["A00", "A01"], quota: 180 },

  // humg – ĐH Mỏ – Địa chất
  { school: "humg", major: "ky-thuat-hoa-hoc", code: "MDC01", cutoffs: [19.0, 18.8, 18.5], tuition: [16, 20], combos: ["A00", "B00"], quota: 200 },
  { school: "humg", major: "ky-thuat-moi-truong", code: "MDC02", cutoffs: [18.0, 17.8, 17.5], tuition: [16, 20], combos: ["A00", "B00"], quota: 150 },

  // vnuf – ĐH Lâm nghiệp VN
  { school: "vnuf", major: "lam-nghiep", code: "LNV01", cutoffs: [17.5, 17.2, 17.0], tuition: [14, 18], combos: ["A00", "B00", "D07"], quota: 200 },
  { school: "vnuf", major: "quan-ly-dat-dai", code: "LNV02", cutoffs: [18.5, 18.2, 18.0], tuition: [14, 18], combos: ["A00", "B00"], quota: 150 },

  // epu – ĐH Điện lực
  { school: "epu", major: "ky-thuat-dien", code: "EPU01", cutoffs: [21.5, 21.2, 21.0], tuition: [16, 20], combos: ["A00", "A01"], quota: 300 },
  { school: "epu", major: "ky-thuat-dien-tu-vt", code: "EPU02", cutoffs: [21.0, 20.8, 20.5], tuition: [16, 20], combos: ["A00", "A01"], quota: 200 },

  // haui – ĐH Công nghiệp Hà Nội
  { school: "haui", major: "cong-nghe-thong-tin", code: "HAU01", cutoffs: [24.5, 24.2, 24.0], tuition: [18, 22], combos: ["A00", "A01", "D01"], quota: 400 },
  { school: "haui", major: "ky-thuat-co-khi", code: "HAU02", cutoffs: [22.0, 21.8, 21.5], tuition: [18, 22], combos: ["A00", "A01"], quota: 350 },
  { school: "haui", major: "ky-thuat-dien", code: "HAU03", cutoffs: [22.5, 22.2, 22.0], tuition: [18, 22], combos: ["A00", "A01"], quota: 300 },

  // vnu-ue – ĐH Kinh tế – ĐHQGHN
  { school: "vnu-ue", major: "kinh-te-hoc", code: "QHD01", cutoffs: [26.5, 26.2, 26.0], tuition: [24, 30], combos: ["A00", "A01", "D01", "D07"], quota: 150 },
  { school: "vnu-ue", major: "quan-tri-kinh-doanh", code: "QHD02", cutoffs: [26.8, 26.5, 26.2], tuition: [24, 30], combos: ["A00", "A01", "D01", "D07"], quota: 200 },
  { school: "vnu-ue", major: "marketing", code: "QHD03", cutoffs: [26.5, 26.2, 26.0], tuition: [24, 30], combos: ["A00", "A01", "D01", "D07"], quota: 150 },

  // phenikaa – ĐH Phenikaa
  { school: "phenikaa", major: "cong-nghe-thong-tin", code: "PKA01", cutoffs: [22.5, 22.2, 22.0], tuition: [22, 28], combos: ["A00", "A01", "D01"], quota: 200 },
  { school: "phenikaa", major: "ky-thuat-dien", code: "PKA02", cutoffs: [20.5, 20.2, 20.0], tuition: [22, 28], combos: ["A00", "A01"], quota: 150 },
  { school: "phenikaa", major: "khoa-hoc-may-tinh", code: "PKA03", cutoffs: [22.0, 21.8, 21.5], tuition: [22, 28], combos: ["A00", "A01"], quota: 120 },

  // tlu – ĐH Thăng Long
  { school: "tlu", major: "kinh-doanh-quoc-te", code: "TLG01", cutoffs: [21.0, 20.8, 20.5], tuition: [22, 26], combos: ["A00", "A01", "D01", "D07"], quota: 150 },
  { school: "tlu", major: "cong-nghe-thong-tin", code: "TLG02", cutoffs: [20.5, 20.2, 20.0], tuition: [22, 26], combos: ["A00", "A01"], quota: 120 },

  // ── Miền Trung – trường mới ────────────────────────────────────────────────
  // ued – ĐH Sư phạm Đà Nẵng
  { school: "ued", major: "su-pham-toan", code: "DHL01", cutoffs: [26.5, 26.2, 26.0], tuition: [0, 0], combos: ["A00", "A01", "D01"], quota: 100 },
  { school: "ued", major: "su-pham-tieng-anh", code: "DHL02", cutoffs: [27.0, 26.8, 26.5], tuition: [0, 0], combos: ["A00", "A01", "D01"], quota: 80 },

  // due – ĐH Kinh tế Đà Nẵng
  { school: "due", major: "quan-tri-kinh-doanh", code: "DHK01", cutoffs: [24.8, 24.5, 24.2], tuition: [18, 22], combos: ["A00", "A01", "D01", "D07"], quota: 300 },
  { school: "due", major: "kinh-doanh-quoc-te", code: "DHK02", cutoffs: [25.0, 24.8, 24.5], tuition: [18, 22], combos: ["A00", "A01", "D01", "D07"], quota: 200 },
  { school: "due", major: "ke-toan", code: "DHK03", cutoffs: [24.5, 24.2, 24.0], tuition: [18, 22], combos: ["A00", "A01", "D01", "D07"], quota: 250 },

  // ufl-dn – ĐH Ngoại ngữ Đà Nẵng
  { school: "ufl-dn", major: "ngoai-ngu-anh", code: "DNN01", cutoffs: [26.5, 26.2, 26.0], tuition: [16, 20], combos: ["A00", "A01", "D01"], quota: 250 },
  { school: "ufl-dn", major: "ngoai-ngu-nhat", code: "DNN02", cutoffs: [24.5, 24.2, 24.0], tuition: [16, 20], combos: ["A00", "A01", "D01"], quota: 120 },

  // hue-bk – ĐH Bách khoa Huế
  { school: "hue-bk", major: "ky-thuat-dien", code: "HBK01", cutoffs: [22.5, 22.2, 22.0], tuition: [16, 20], combos: ["A00", "A01"], quota: 250 },
  { school: "hue-bk", major: "ky-thuat-co-khi", code: "HBK02", cutoffs: [21.5, 21.2, 21.0], tuition: [16, 20], combos: ["A00", "A01"], quota: 200 },
  { school: "hue-bk", major: "cong-nghe-thong-tin", code: "HBK03", cutoffs: [23.0, 22.8, 22.5], tuition: [16, 20], combos: ["A00", "A01"], quota: 200 },

  // husc – ĐH Khoa học Huế
  { school: "husc", major: "khoa-hoc-may-tinh", code: "HUS01", cutoffs: [20.5, 20.2, 20.0], tuition: [14, 18], combos: ["A00", "A01"], quota: 150 },
  { school: "husc", major: "xa-hoi-hoc", code: "HUS02", cutoffs: [18.5, 18.2, 18.0], tuition: [14, 18], combos: ["A01", "C00", "D01"], quota: 80 },

  // humed – ĐH Y Dược Huế
  { school: "humed", major: "y-khoa", code: "HYD01", cutoffs: [27.0, 26.8, 26.5], tuition: [45, 55], combos: ["B00"], quota: 150, years: 6 },
  { school: "humed", major: "duoc-hoc", code: "HYD02", cutoffs: [23.5, 23.2, 23.0], tuition: [24, 28], combos: ["A00", "B00"], quota: 150, years: 5 },
  { school: "humed", major: "rang-ham-mat", code: "HYD03", cutoffs: [26.0, 25.8, 25.5], tuition: [35, 45], combos: ["B00"], quota: 80, years: 6 },

  // hue-kt – ĐH Kinh tế Huế
  { school: "hue-kt", major: "kinh-doanh-quoc-te", code: "HKT01", cutoffs: [22.0, 21.8, 21.5], tuition: [14, 18], combos: ["A00", "A01", "D01", "D07"], quota: 200 },
  { school: "hue-kt", major: "ke-toan", code: "HKT02", cutoffs: [22.5, 22.2, 22.0], tuition: [14, 18], combos: ["A00", "A01", "D01", "D07"], quota: 200 },

  // huaf – ĐH Nông Lâm Huế
  { school: "huaf", major: "nong-nghiep", code: "HNL01", cutoffs: [17.5, 17.2, 17.0], tuition: [14, 18], combos: ["A00", "B00", "D07"], quota: 200 },
  { school: "huaf", major: "lam-nghiep", code: "HNL02", cutoffs: [16.5, 16.2, 16.0], tuition: [14, 18], combos: ["A00", "B00"], quota: 150 },
  { school: "huaf", major: "thu-y", code: "HNL03", cutoffs: [18.0, 17.8, 17.5], tuition: [14, 18], combos: ["A00", "B00"], quota: 100 },

  // qnu – ĐH Quy Nhơn
  { school: "qnu", major: "ky-thuat-phan-mem", code: "QNI01", cutoffs: [21.0, 20.8, 20.5], tuition: [14, 18], combos: ["A00", "A01"], quota: 200 },
  { school: "qnu", major: "su-pham-toan", code: "QNI02", cutoffs: [24.0, 23.8, 23.5], tuition: [0, 0], combos: ["A00", "A01", "D01"], quota: 80 },

  // ntu – ĐH Nha Trang
  { school: "ntu", major: "nuoi-trong-thuy-san", code: "NTS01", cutoffs: [16.5, 16.2, 16.0], tuition: [14, 18], combos: ["A00", "B00"], quota: 150 },
  { school: "ntu", major: "cong-nghe-thuc-pham", code: "NTS02", cutoffs: [18.5, 18.2, 18.0], tuition: [14, 18], combos: ["A00", "B00", "D07"], quota: 200 },
  { school: "ntu", major: "kinh-doanh-quoc-te", code: "NTS03", cutoffs: [19.5, 19.2, 19.0], tuition: [14, 18], combos: ["A00", "A01", "D01"], quota: 200 },

  // ── Miền Nam – trường mới ──────────────────────────────────────────────────
  // hcmut – ĐH Bách khoa TP.HCM
  { school: "hcmut", major: "cong-nghe-thong-tin", code: "BKU01", cutoffs: [27.8, 27.6, 27.4], tuition: [30, 38], combos: ["A00", "A01"], quota: 500 },
  { school: "hcmut", major: "ky-thuat-dien", code: "BKU02", cutoffs: [25.5, 25.2, 25.0], tuition: [30, 38], combos: ["A00", "A01"], quota: 400 },
  { school: "hcmut", major: "ky-thuat-co-khi", code: "BKU03", cutoffs: [24.5, 24.2, 24.0], tuition: [30, 38], combos: ["A00", "A01"], quota: 400 },

  // hcmup – ĐH Sư phạm TP.HCM
  { school: "hcmup", major: "su-pham-toan", code: "SPH01", cutoffs: [27.0, 26.8, 26.5], tuition: [0, 0], combos: ["A00", "A01", "D01"], quota: 120 },
  { school: "hcmup", major: "su-pham-tieng-anh", code: "SPH02", cutoffs: [27.5, 27.2, 27.0], tuition: [0, 0], combos: ["A00", "A01", "D01"], quota: 80 },

  // hcmute – ĐH Sư phạm KT TP.HCM
  { school: "hcmute", major: "ky-thuat-phan-mem", code: "SUH01", cutoffs: [24.5, 24.2, 24.0], tuition: [22, 28], combos: ["A00", "A01"], quota: 300 },
  { school: "hcmute", major: "ky-thuat-co-dien-tu", code: "SUH02", cutoffs: [22.5, 22.2, 22.0], tuition: [22, 28], combos: ["A00", "A01"], quota: 250 },

  // nlu – ĐH Nông Lâm TP.HCM
  { school: "nlu", major: "nong-nghiep", code: "NLU01", cutoffs: [19.5, 19.2, 19.0], tuition: [14, 18], combos: ["A00", "B00", "D07"], quota: 300 },
  { school: "nlu", major: "cong-nghe-thuc-pham", code: "NLU02", cutoffs: [21.0, 20.8, 20.5], tuition: [14, 18], combos: ["A00", "B00", "D07"], quota: 250 },
  { school: "nlu", major: "thu-y", code: "NLU03", cutoffs: [20.5, 20.2, 20.0], tuition: [14, 18], combos: ["A00", "B00"], quota: 200 },

  // uah – ĐH Kiến trúc TP.HCM
  { school: "uah", major: "kien-truc", code: "KTR01", cutoffs: [24.0, 23.8, 23.5], tuition: [22, 28], combos: ["V00"], quota: 200, years: 5 },
  { school: "uah", major: "kien-truc-noi-that", code: "KTR02", cutoffs: [22.5, 22.2, 22.0], tuition: [22, 28], combos: ["V00", "A01"], quota: 150 },

  // hcmulaw – ĐH Luật TP.HCM
  { school: "hcmulaw", major: "luat", code: "QTL01", cutoffs: [27.5, 27.3, 27.0], tuition: [16, 20], combos: ["A00", "A01", "C00", "D01"], quota: 500 },
  { school: "hcmulaw", major: "quan-he-quoc-te", code: "QTL02", cutoffs: [27.0, 26.8, 26.5], tuition: [16, 20], combos: ["A00", "A01", "D01"], quota: 80 },

  // ump – ĐH Y Dược TP.HCM
  { school: "ump", major: "y-khoa", code: "YDU01", cutoffs: [28.5, 28.3, 28.0], tuition: [55, 65], combos: ["B00"], quota: 350, years: 6 },
  { school: "ump", major: "duoc-hoc", code: "YDU02", cutoffs: [26.5, 26.2, 26.0], tuition: [30, 36], combos: ["A00", "B00"], quota: 400, years: 5 },
  { school: "ump", major: "rang-ham-mat", code: "YDU03", cutoffs: [27.5, 27.2, 27.0], tuition: [40, 50], combos: ["B00"], quota: 100, years: 6 },

  // ou – ĐH Mở TP.HCM
  { school: "ou", major: "kinh-doanh-quoc-te", code: "MHO01", cutoffs: [22.5, 22.2, 22.0], tuition: [16, 20], combos: ["A00", "A01", "D01", "D07"], quota: 600 },
  { school: "ou", major: "cong-nghe-thong-tin", code: "MHO02", cutoffs: [22.0, 21.8, 21.5], tuition: [16, 20], combos: ["A00", "A01"], quota: 400 },
  { school: "ou", major: "luat", code: "MHO03", cutoffs: [22.0, 21.8, 21.5], tuition: [16, 20], combos: ["A00", "A01", "C00"], quota: 300 },

  // vnuhcm-uit – ĐH CNTT ĐHQG TP.HCM
  { school: "vnuhcm-uit", major: "cong-nghe-thong-tin", code: "QTK01", cutoffs: [27.5, 27.3, 27.0], tuition: [30, 38], combos: ["A00", "A01"], quota: 500 },
  { school: "vnuhcm-uit", major: "khoa-hoc-may-tinh", code: "QTK02", cutoffs: [27.0, 26.8, 26.5], tuition: [30, 38], combos: ["A00", "A01"], quota: 200 },
  { school: "vnuhcm-uit", major: "an-toan-thong-tin", code: "QTK03", cutoffs: [26.8, 26.5, 26.2], tuition: [30, 38], combos: ["A00", "A01"], quota: 100 },

  // uel – ĐH Kinh tế – Luật ĐHQG TP.HCM
  { school: "uel", major: "kinh-te-hoc", code: "QSL01", cutoffs: [25.5, 25.2, 25.0], tuition: [24, 30], combos: ["A00", "A01", "D01", "D07"], quota: 200 },
  { school: "uel", major: "luat", code: "QSL02", cutoffs: [26.0, 25.8, 25.5], tuition: [24, 30], combos: ["A00", "A01", "C00", "D01"], quota: 200 },
  { school: "uel", major: "tai-chinh-ngan-hang", code: "QSL03", cutoffs: [25.8, 25.5, 25.2], tuition: [24, 30], combos: ["A00", "A01", "D01", "D07"], quota: 200 },

  // hcmiu – ĐH Quốc tế ĐHQG TP.HCM
  { school: "hcmiu", major: "ky-thuat-phan-mem", code: "IUH01", cutoffs: [25.5, 25.2, 25.0], tuition: [55, 65], combos: ["A00", "A01"], quota: 150, type: "Quốc tế" },
  { school: "hcmiu", major: "kinh-doanh-quoc-te", code: "IUH02", cutoffs: [25.0, 24.8, 24.5], tuition: [55, 65], combos: ["A00", "A01", "D01"], quota: 100, type: "Quốc tế" },

  // iuh – ĐH Công nghiệp TP.HCM
  { school: "iuh", major: "ky-thuat-co-khi", code: "DHI01", cutoffs: [21.0, 20.8, 20.5], tuition: [18, 22], combos: ["A00", "A01"], quota: 400 },
  { school: "iuh", major: "ky-thuat-oto", code: "DHI02", cutoffs: [21.5, 21.2, 21.0], tuition: [18, 22], combos: ["A00", "A01"], quota: 300 },
  { school: "iuh", major: "cong-nghe-thong-tin", code: "DHI03", cutoffs: [22.5, 22.2, 22.0], tuition: [18, 22], combos: ["A00", "A01"], quota: 350 },

  // vanlang – ĐH Văn Lang
  { school: "vanlang", major: "thiet-ke-do-hoa", code: "VLG01", cutoffs: [22.0, 21.8, 21.5], tuition: [28, 34], combos: ["V00", "A01", "D01"], quota: 300 },
  { school: "vanlang", major: "kien-truc", code: "VLG02", cutoffs: [21.5, 21.2, 21.0], tuition: [30, 36], combos: ["V00"], quota: 200, years: 5 },
  { school: "vanlang", major: "y-khoa", code: "VLG03", cutoffs: [26.5, 26.2, 26.0], tuition: [60, 75], combos: ["B00"], quota: 100, years: 6 },

  // hutech – ĐH HUTECH
  { school: "hutech", major: "ky-thuat-phan-mem", code: "HTC01", cutoffs: [20.5, 20.2, 20.0], tuition: [22, 28], combos: ["A00", "A01", "D01"], quota: 400 },
  { school: "hutech", major: "marketing", code: "HTC02", cutoffs: [19.5, 19.2, 19.0], tuition: [22, 28], combos: ["A00", "A01", "D01", "D07"], quota: 300 },
  { school: "hutech", major: "logistics", code: "HTC03", cutoffs: [20.0, 19.8, 19.5], tuition: [22, 28], combos: ["A00", "A01", "D01"], quota: 250 },

  // hoasen – ĐH Hoa Sen
  { school: "hoasen", major: "quan-tri-du-lich", code: "HOS01", cutoffs: [20.0, 19.8, 19.5], tuition: [24, 30], combos: ["A00", "A01", "D01"], quota: 200 },
  { school: "hoasen", major: "thiet-ke-do-hoa", code: "HOS02", cutoffs: [20.5, 20.2, 20.0], tuition: [24, 30], combos: ["V00", "A01", "D01"], quota: 150 },

  // ntt – ĐH Nguyễn Tất Thành
  { school: "ntt", major: "y-khoa", code: "NTT01", cutoffs: [24.5, 24.2, 24.0], tuition: [45, 55], combos: ["B00"], quota: 150, years: 6 },
  { school: "ntt", major: "duoc-hoc", code: "NTT02", cutoffs: [22.0, 21.8, 21.5], tuition: [25, 30], combos: ["A00", "B00"], quota: 200, years: 5 },
  { school: "ntt", major: "marketing", code: "NTT03", cutoffs: [19.0, 18.8, 18.5], tuition: [20, 26], combos: ["A00", "A01", "D01", "D07"], quota: 300 },

  // dlu – ĐH Đà Lạt
  { school: "dlu", major: "luat", code: "DLU01", cutoffs: [20.5, 20.2, 20.0], tuition: [16, 20], combos: ["A00", "A01", "C00", "D01"], quota: 200 },
  { school: "dlu", major: "ky-thuat-phan-mem", code: "DLU02", cutoffs: [20.0, 19.8, 19.5], tuition: [16, 20], combos: ["A00", "A01"], quota: 150 },
  { school: "dlu", major: "quan-tri-du-lich", code: "DLU03", cutoffs: [19.0, 18.8, 18.5], tuition: [16, 20], combos: ["A00", "A01", "D01"], quota: 150 },

  // tvu – ĐH Trà Vinh
  { school: "tvu", major: "cong-nghe-thong-tin", code: "TVU01", cutoffs: [17.5, 17.2, 17.0], tuition: [12, 16], combos: ["A00", "A01"], quota: 200 },
  { school: "tvu", major: "nong-nghiep", code: "TVU02", cutoffs: [16.0, 15.8, 15.5], tuition: [12, 16], combos: ["A00", "B00"], quota: 150 },

  // tgu – ĐH Tiền Giang
  { school: "tgu", major: "cong-nghe-thong-tin", code: "TGU01", cutoffs: [17.0, 16.8, 16.5], tuition: [12, 16], combos: ["A00", "A01"], quota: 150 },
  { school: "tgu", major: "kinh-te-hoc", code: "TGU02", cutoffs: [16.5, 16.2, 16.0], tuition: [12, 16], combos: ["A00", "A01", "D01"], quota: 120 },

  // vgu – ĐH Việt Đức
  { school: "vgu", major: "ky-thuat-hoa-hoc", code: "VGU01", cutoffs: [22.0, 21.8, 21.5], tuition: [55, 65], combos: ["A00", "B00"], quota: 80, type: "Quốc tế" },
  { school: "vgu", major: "cong-nghe-sinh-hoc", code: "VGU02", cutoffs: [21.5, 21.2, 21.0], tuition: [55, 65], combos: ["A00", "B00"], quota: 60, type: "Quốc tế" },

  // fulbright – ĐH Fulbright VN
  { school: "fulbright", major: "kinh-te-hoc", code: "FBV01", tuition: [80, 100], combos: [], quota: 150, type: "Quốc tế",
    extraMethods: [{ name: "Xét học bạ + phỏng vấn + bài luận", desc: "GPA lớp 12 từ 7.5, phỏng vấn bằng tiếng Anh và bài luận cá nhân.", requirement: "GPA 7.5, IELTS 6.0+", tag: "Học bạ" }] },
  { school: "fulbright", major: "khoa-hoc-may-tinh", code: "FBV02", tuition: [80, 100], combos: [], quota: 100, type: "Quốc tế",
    extraMethods: [{ name: "Xét học bạ + phỏng vấn + bài luận", desc: "GPA lớp 12 từ 7.5, phỏng vấn bằng tiếng Anh và bài luận cá nhân.", requirement: "GPA 7.5, IELTS 6.0+", tag: "Học bạ" }] },

  // vnuhcm-ush – ĐH KHXH&NV TP.HCM
  { school: "vnuhcm-ush", major: "bao-chi", code: "QSX01", cutoffs: [25.5, 25.2, 25.0], tuition: [16, 20], combos: ["A01", "C00", "D01"], quota: 80 },
  { school: "vnuhcm-ush", major: "tam-ly-hoc", code: "QSX02", cutoffs: [24.5, 24.2, 24.0], tuition: [16, 20], combos: ["A00", "B00", "D01"], quota: 80 },
  { school: "vnuhcm-ush", major: "quan-he-cong-chung", code: "QSX03", cutoffs: [25.0, 24.8, 24.5], tuition: [16, 20], combos: ["A01", "C00", "D01"], quota: 60 },
];

/**
 * Trường (minh hoạ) có xét thêm học bạ / đánh giá năng lực. Điểm chuẩn các phương thức này được
 * suy ra từ điểm thi THPT theo công thức cố định chỉ để demo giao diện — KHÔNG phải số liệu thật.
 */
const HOCBA_SCHOOLS = new Set(["tdtu", "ueh", "ctu", "vnua", "dut", "hup"]);
const DGNL_HN_SCHOOLS = new Set(["uet", "ussh", "ftu", "neu", "vnua", "hup"]);
const DGNL_HCM_SCHOOLS = new Set(["ueh", "hcmus", "tdtu", "ctu", "dut"]);
const clamp = (n: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, n));

const altCutoffsOf = (s: Seed): MethodCutoff[] => {
  if (!s.cutoffs) return [];
  const t = s.cutoffs[0];
  const out: MethodCutoff[] = [];
  if (HOCBA_SCHOOLS.has(s.school)) out.push({ method: "hocba", year: 2025, score: Math.round(Math.min(29.9, t + 1.3) * 100) / 100, estimated: true });
  if (DGNL_HN_SCHOOLS.has(s.school)) out.push({ method: "dgnl-hn", year: 2025, score: Math.round(clamp(55 + (t - 15) * 4.6, 60, 135)), estimated: true });
  if (DGNL_HCM_SCHOOLS.has(s.school)) out.push({ method: "dgnl-hcm", year: 2025, score: Math.round(clamp(520 + (t - 15) * 33, 550, 1050)), estimated: true });
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
    if (!school || !major) return null;
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

