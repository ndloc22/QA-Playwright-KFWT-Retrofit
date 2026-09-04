# Testcase: TC-KFWT-RETROFIT-02 — Thực hiện Quelle-Senke-Test Retrofit

- **Mã Testcase:** `TC-KFWT-RETROFIT-02`
- **Jira Issue:** `KFWT-363` / `KFWT-664`
- **Module:** Quelle-Senke-Test Retrofit Endpoint
- **Role:** ST area (Retrofit) / Planer

## Các Bước Thực Hiện:
1. **Bước 1 (Given):** Đang ở danh sách trạm Retrofit, trạm `RETRO-2026-001` có trạng thái `SOURCE_SINK_TEST_RETROFIT`.
2. **Bước 2 (When):** Nhấp nút "Quelle-Senke-Test ausführen", nhập ghi chú "Signalübertragung IEC 104 OK" và xác nhận hoàn tất.
3. **Bước 3 (Then):** Trạng thái trạm chuyển sang `COMPLETED`, nút hành động chuyển sang "Abgeschlossen" và bị vô hiệu hóa.
