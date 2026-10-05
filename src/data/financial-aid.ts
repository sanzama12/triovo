import type { SchoolType } from "../domain/types";

/**
 * TIỀN HỌC: chính sách hỗ trợ & ký túc xá — DỮ LIỆU MINH HOẠ / MÔ TẢ CHUNG.
 * Mức hỗ trợ cụ thể thay đổi theo văn bản hiện hành và từng trường; giao diện luôn nhắc đối chiếu nguồn chính thức.
 */
export type AidCondition = "ho-ngheo" | "dan-toc" | "khuyet-tat" | "nguoi-co-cong" | "hoc-luc-tot" | "o-xa";

export const AID_CONDITIONS: { key: AidCondition; label: string }[] = [
  { key: "ho-ngheo", label: "Gia đình thuộc hộ nghèo hoặc cận nghèo" },
  { key: "dan-toc", label: "Là người dân tộc thiểu số" },
  { key: "khuyet-tat", label: "Có khuyết tật" },
  { key: "nguoi-co-cong", label: "Con của người có công với cách mạng" },
  { key: "hoc-luc-tot", label: "Học lực tốt, muốn giành học bổng" },
  { key: "o-xa", label: "Nhà xa trường, cần chỗ ở" },
];

export interface AidPolicy {
  id: string;
  title: string;
  /** Đủ điều kiện xem xét nếu có ÍT NHẤT một điều kiện trong danh sách. */
  when: AidCondition[];
  summary: string;
  how: string;
  source: string;
}

export const AID_POLICIES: AidPolicy[] = [
  {
    id: "mien-giam",
    title: "Miễn, giảm học phí theo đối tượng",
    when: ["ho-ngheo", "dan-toc", "khuyet-tat", "nguoi-co-cong"],
    summary: "Sinh viên thuộc đối tượng chính sách được miễn hoặc giảm học phí; mức miễn/giảm tuỳ từng đối tượng.",
    how: "Nộp hồ sơ (giấy xác nhận đối tượng) tại phòng công tác sinh viên sau khi nhập học.",
    source: "Quy định của Chính phủ về học phí và miễn, giảm học phí (Nghị định 81/2021/NĐ-CP và văn bản sửa đổi)",
  },
  {
    id: "vay-von",
    title: "Vay vốn sinh viên — Ngân hàng Chính sách xã hội",
    when: ["ho-ngheo"],
    summary: "Gia đình khó khăn có thể vay để trả học phí và sinh hoạt phí, lãi suất ưu đãi, trả nợ sau khi ra trường. Mức vay tối đa theo quy định hiện hành.",
    how: "Gia đình làm hồ sơ tại tổ tiết kiệm & vay vốn ở địa phương, kèm giấy xác nhận của trường.",
    source: "Chương trình tín dụng học sinh, sinh viên của Ngân hàng Chính sách xã hội",
  },
  {
    id: "ho-tro-chi-phi",
    title: "Hỗ trợ chi phí học tập",
    when: ["dan-toc", "ho-ngheo"],
    summary: "Sinh viên dân tộc thiểu số thuộc hộ nghèo/cận nghèo có thể được hỗ trợ thêm chi phí học tập hằng tháng.",
    how: "Hỏi phòng công tác sinh viên của trường về hồ sơ và thời hạn nộp.",
    source: "Chính sách hỗ trợ chi phí học tập cho sinh viên dân tộc thiểu số",
  },
  {
    id: "hoc-bong-kk",
    title: "Học bổng khuyến khích học tập & học bổng của trường",
    when: ["hoc-luc-tot"],
    summary: "Xét theo kết quả học tập, rèn luyện từng học kỳ; nhiều trường có thêm học bổng tài năng, học bổng doanh nghiệp.",
    how: "Không cần nộp hồ sơ với học bổng khuyến khích; học bổng doanh nghiệp thường mở đơn theo đợt.",
    source: "Quy chế học bổng của từng trường",
  },
  {
    id: "ktx",
    title: "Ký túc xá",
    when: ["o-xa"],
    summary: "Ở ký túc xá thường rẻ hơn thuê trọ nhiều; tân sinh viên ở xa và đối tượng chính sách thường được ưu tiên.",
    how: "Đăng ký ngay khi làm thủ tục nhập học — chỗ thường có hạn.",
    source: "Thông báo ký túc xá của từng trường",
  },
];

/** Giá ký túc xá ước tính (nghìn đồng/tháng/người) theo loại trường — minh hoạ. */
export const DORM_ESTIMATE: Record<SchoolType, { min: number; max: number } | null> = {
  "cong-lap": { min: 300, max: 800 },
  "tu-thuc": { min: 1200, max: 2500 },
  "quoc-te": null,
};

/** Chi phí thuê trọ ước tính (nghìn đồng/tháng/người) — để so với ký túc xá. */
export const RENT_ESTIMATE = 2500;
