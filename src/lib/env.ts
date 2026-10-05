/**
 * Cờ môi trường dùng chung phía server.
 *
 * Chế độ demo (mặc định khi `npm run dev`, hoặc đặt TROVIO_DEMO=true):
 * - mã OTP cố định 592841, link đặt lại mật khẩu hiện ngay trên màn hình (mô phỏng email);
 * - tạo sẵn tài khoản demo (kể cả quản trị viên).
 * Khi chạy production mà không bật TROVIO_DEMO, các "lối tắt" này bị tắt.
 */
export function isDemoMode(): boolean {
  if (process.env.TROVIO_DEMO === "true") return true;
  if (process.env.TROVIO_DEMO === "false") return false;
  return process.env.NODE_ENV !== "production";
}

/** Email được cấp quyền quản trị (phân tách bằng dấu phẩy), VD: ADMIN_EMAILS=ban@gmail.com */
export function adminEmails(): string[] {
  return (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);
}
