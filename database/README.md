# Cơ sở dữ liệu Trovio (MongoDB Atlas & PostgreSQL)

Hệ thống cơ sở dữ liệu Trovio được thiết kế và đồng bộ hoá toàn diện theo chuẩn **Bộ Giáo dục & Đào tạo (MOET)**.
Toàn bộ dữ liệu web hoạt động trực tiếp trên **MongoDB Atlas** (hỗ trợ Serverless trên Vercel) đồng thời có lược đồ quan hệ **PostgreSQL 16** chuẩn hoá cao (3NF).

| Tệp / Database | Mô tả |
| :--- | :--- |
| **MongoDB Atlas** | Database đám mây chính thức của website (61 trường, 53 ngành, 87 chương trình, 60 RIASEC, 28 collections). |
| `database/schema.sql` | 79 bảng, 4 view, 2 hàm nghiệp vụ, trigger kiểm tra dữ liệu (PostgreSQL schema `trovio`). |
| `database/seed.sql` | Toàn bộ dữ liệu tuyển sinh, điểm chuẩn nhiều năm, trắc nghiệm RIASEC và tài khoản demo (kèm password băm scrypt). |
| `database/seed-prod.sql` | Dữ liệu nạp môi trường Production (loại bỏ dữ liệu cộng đồng minh hoạ). |

```bash
# 1. Đồng bộ và Cron toàn bộ dữ liệu vào MongoDB Atlas:
npm run sync:moet

# 2. Kiểm tra nhanh danh sách bảng và số lượng bản ghi trên MongoDB Atlas:
npm run check:mongo

# 3. Xuất toàn bộ dữ liệu ra file database/seed.sql và database/seed-prod.sql (PostgreSQL):
npm run db:export

# 4. Đồng bộ tất cả (cả MongoDB Atlas và PostgreSQL seeds):
npm run db:sync
```

Đã kiểm tra trên PostgreSQL 16: nạp không lỗi. `admission_score()` và `fit_level()` cho kết quả giống `scoring.service.ts` (VD 24 điểm, KV1 + UT1 → ưu tiên 2,20, tổng 26,20). `v_verification_progress` cho 2 / 47 / 3, khớp màn A01. Test `tests/sql-schema.test.ts` báo lỗi nếu code thêm giá trị mới mà SQL chưa cập nhật.

## Nhóm bảng

1. **Danh mục tham chiếu:** `regions` (miền của trường), `priority_regions` (KV1…KV3, điểm cộng), `priority_groups` (UT1/UT2), `admission_methods` (thang 30/150/1200), `subjects`, `combos`, `combo_subjects`, `riasec_types`, `work_axes`, `system_roles`.
2. **Tuyển sinh:** `major_groups`, `schools`, `school_campuses`, `majors`, `major_riasec`, `major_curriculum_blocks/items`, `major_careers`, `programs`, `program_combos`, `program_admission_methods`, `program_cutoffs`, `program_verified_fields`.
3. **Tài khoản:** `users`, `user_system_roles`, `school_staff`, `user_sessions`.
4. **Dữ liệu cá nhân (đồng bộ đa thiết bị):** `score_profiles` (+ `_subjects`, `_regions`, `_school_types`, `_major_groups`), `saved_programs`, `wishlist_items`, `quiz_results`, `quiz_result_scores`, `goals`, `goal_regions`, `work_styles`, `mbti_codes`.
5. **Trắc nghiệm:** `riasec_questions`, `riasec_type_weights`, `work_style_questions`, `major_group_work_styles`, `major_work_styles`.
6. **Gợi ý (A09):** `recommend_weights`, `recommend_rules`, `recommend_rule_params`.
7. **Việc làm:** `data_sources`, `major_outcomes`, `school_outcomes`, `benchmarks`.
8. **Mốc tuyển sinh:** `timeline_config`, `timeline_events`, `deadline_reminders`, `reminder_log`.
9. **Cộng đồng:** `school_reviews`, `review_flags`, `review_helpful_votes`, `review_reports`, `qa_questions`, `qa_answers`, `qa_answer_helpful_votes`, `qa_answer_reports`, `outcome_surveys`.
10. **Chia sẻ & lớp học:** `shares`, `share_comments`, `teacher_classes`, `class_members`.
11. **Vận hành:** `data_reports`, `notifications`, `audit_logs`, `audit_changes`, `import_batches`, `school_submissions`, `chat_aliases`, `chat_logs`, `analytics_events`, `sus_responses`.

## Đối chiếu với ERD cũ

| ERD cũ | Bảng mới | Thay đổi |
| --- | --- | --- |
| `truong` | `schools` (+ `school_campuses`) | thêm `slug`, `type`, `short_name`, `hidden`; `khu_vuc_id` → `region_code` (miền) |
| `khu_vuc` | `regions` + `priority_regions` | tách **miền của trường** và **khu vực ưu tiên của thí sinh** |
| `nganh`, `nhom_nganh` | `majors`, `major_groups` | mã ngành 7 số, `demand`, `growth`, `hidden` |
| `riasec_nhom_nganh` | `major_riasec` | RIASEC gắn **theo ngành** (3 nhóm có thứ tự), không theo nhóm ngành |
| `truong_nganh` | `programs` | thêm chỉ tiêu, số năm, cơ sở, nguồn https, ngày xác minh |
| — | `program_combos`, `program_admission_methods` | tổ hợp và phương thức của từng chương trình |
| `diem_chuan` | `program_cutoffs` | khoá (chương trình, phương thức, năm), cờ `is_estimated`, trigger chặn vượt thang |
| `hoc_phi` | `programs.tuition_min/max` | web dùng khoảng học phí/năm theo chương trình |
| `phuong_thuc_xet_tuyen` | `admission_methods` | thêm thang điểm, hệ số quy đổi ưu tiên |
| `doi_tuong_uu_tien` | `priority_groups` | theo quy chế: UT1 +2, UT2 +1 |
| `thi_sinh` | `users` (+ `score_profiles`) | không thu giới tính / ngày sinh; có năm tốt nghiệp, tỉnh, cờ dưới 16 tuổi |
| `diem_thi`, `ket_qua_to_hop` | `score_profile_subjects`, `score_profiles` | lưu phương thức, tổng, điểm ưu tiên, `reduced` |
| `nguyen_vong` | `wishlist_items` | thứ tự + ghi chú, luôn nằm trong `saved_programs` |
| `yeu_thich_truong_nganh` | `saved_programs` | |
| `so_sanh`, `chi_tiet_so_sanh` | (không lưu) | so sánh tối đa 3 chương trình, chỉ lưu trên trình duyệt |
| `lan_lam_test`, `cau_tra_loi`, `dap_an_test` | (không lưu) | bài làm dở lưu trên trình duyệt; server chỉ lưu kết quả |
| `ket_qua_riasec`, `ket_qua_riasec_chi_tiet` | `quiz_results`, `quiz_result_scores` | |
| `ket_qua_tu_van`, `chi_tiet_tu_van` | (không lưu) | gợi ý tính trực tiếp từ hồ sơ + `recommend_weights` / `recommend_rules` |
| `lich_su_xem`, `yeu_thich_truong`, `thi_sinh_mon_yeu_thich` | (bỏ) | web không có chức năng này |
| `roles`, `permissions`, `admins` | `system_roles`, `user_system_roles`, `school_staff` | quyền trong code: admin, kiểm duyệt viên, cán bộ tuyển sinh |
