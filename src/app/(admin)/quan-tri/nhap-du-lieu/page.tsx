import type { Metadata } from "next";
import { LuFileText } from "react-icons/lu";
import { adminPage } from "@/lib/admin-page";
import { importService } from "@/services/import.service";
import { AdminHeader } from "@/components/admin/admin-header";
import { AdminBody, fmtDate, Panel } from "@/components/admin/ui";
import { ImportManager } from "@/components/admin/import-manager";
import { buttonClass } from "@/components/ui/button";

import { CronSyncButton } from "@/components/admin/cron-sync-button";

export const metadata: Metadata = { title: "Nhập & Kiểm duyệt dữ liệu", robots: { index: false, follow: false } };

export default async function AdminImportPage() {
  const user = await adminPage("/quan-tri/nhap-du-lieu");
  const history = await importService.history(10);
  return (
    <>
      <AdminHeader title="Nhập & Kiểm duyệt dữ liệu hàng loạt" crumb="Nhập & Kiểm duyệt" updatedAt={history[0]?.at ?? null} />
      <AdminBody>
        <CronSyncButton />

        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-[15px] text-slate-500">Nhập điểm chuẩn, học phí, chỉ tiêu hàng loạt từ file Excel/CSV mẫu của hệ thống.</p>
          <a href="/api/admin/import" download className={buttonClass({ variant: "outline", size: "sm" })}>
            <LuFileText className="size-4" aria-hidden /> Tải mẫu CSV
          </a>
        </div>
        <ImportManager userName={user.name} />
        <Panel className="p-5 sm:p-6" aria-labelledby="hist-h">
          <h2 id="hist-h" className="text-lg font-bold text-slate-900">
            Lịch sử nhập
          </h2>
          {history.length === 0 ? (
            <p className="mt-3 text-sm text-slate-500">Chưa có lần nhập nào.</p>
          ) : (
            <ul className="mt-3 divide-y divide-slate-100 text-sm">
              {history.map((b) => (
                <li key={b.id} className="flex flex-wrap items-center gap-x-4 gap-y-1 py-2.5">
                  <span className="font-semibold text-slate-900">{b.fileName}</span>
                  <span className="text-slate-500">
                    {b.byName} · {fmtDate(b.at)}
                  </span>
                  <span className="ml-auto text-slate-700">
                    <b className="text-success-700">{b.created}</b> mới · <b className="text-primary-700">{b.updated}</b> cập nhật · {b.errors} dòng lỗi bỏ qua
                  </span>
                </li>
              ))}
            </ul>
          )}
        </Panel>
      </AdminBody>
    </>
  );
}
