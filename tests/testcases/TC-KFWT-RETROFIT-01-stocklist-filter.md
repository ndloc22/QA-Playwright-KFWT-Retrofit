# Testcase: TC-KFWT-RETROFIT-01 — Lọc danh sách trạm Retrofit theo trạng thái

- **Mã Testcase:** `TC-KFWT-RETROFIT-01`
- **Jira Issue:** `KFWT-472` / `KFWT-527`
- **Module:** Retrofit Stocklist (Nachrüstvariante)
- **Role:** Planer digiONS/Retrofit

## Các Bước Thực Hiện:
1. **Bước 1 (Given):** Truy cập trang Retrofit Stocklist (`/`).
2. **Bước 2 (When):** Chọn bộ lọc trạng thái "Quelle-Senke-Test (Retrofit)".
3. **Bước 3 (Then):** Bảng chỉ hiển thị các trạm có trạng thái `SOURCE_SINK_TEST_RETROFIT` và hiển thị nút "Quelle-Senke-Test ausführen".
