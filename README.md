# ⚡ E.ON KFWT — Playwright E2E Automation for Retrofit (Nachrüstvariante)

> Dự án kiểm thử tự động hóa E2E chuyên biệt cho quy trình nghiệp vụ **Retrofit C-Station / Nachrüstvariante** thuộc hệ thống **Kleinfernwirktechnik (KFWT)** của **E.ON**.
> Xây dựng trên nền tảng **Playwright + TypeScript + Page Object Model + GitHub Copilot**.

---

## 📌 1. Bối Cảnh Nghiệp Vụ KFWT Retrofit (E.ON)

Trong hệ thống KFWT (Kleinfernwirktechnik), thiết bị **Retrofit** (Nachrüstvariante) là các trạm biến áp / trạm vi điều khiển được nâng cấp hiện đại hóa viễn thông mà không cần thay mới toàn bộ trạm:

* **Retrofit Stocklist (KFWT-472, KFWT-527):** Quản lý tồn kho và trạng thái các trạm Retrofit C-Station (`INCOMPLETE_RETROFIT`, `SOURCE_SINK_TEST_RETROFIT`, `COMPLETED`).
* **Quelle-Senke-Test Retrofit (KFWT-363, KFWT-664):** Quy trình kiểm thử tín hiệu đầu nguồn - cuối nguồn (Source-Sink Test) giữa trạm hiện trường và hệ thống điều độ trung tâm (ZLT).
* **Phân quyền (KFWT-749):** Tách bạch giữa vai trò `Planer WNGW` và `Planer digiONS/Retrofit`.

---

## ⚡ 2. Cài Đặt 1-Click Cho Tester

### 2.1. Clone repo về máy:
```bash
git clone https://github.com/ndloc22/QA-Playwright-KFWT-Retrofit.git
cd QA-Playwright-KFWT-Retrofit
```

### 2.2. Cài đặt tự động:
- **🪟 Windows:** Nhấp đúp chuột vào file **`setup-tester.bat`**.
- **🍎 macOS / 🐧 Linux:** `./setup-tester.sh`.

---

## 🚀 3. Chạy Kiểm Thử

### Cách 1: Chạy trực tiếp trong VSCode (Khuyên dùng)
1. Mở thư mục dự án trong VSCode.
2. Bấm phím **`F5`** (hoặc bấm vào tab 🧪 Testing ➔ Bấm nút Play).

### Cách 2: Chạy qua dòng lệnh Terminal
```bash
# Chạy xem trình duyệt tự động thực thi
npx playwright test --headed

# Mở giao diện Studio tua thời gian (UI Mode)
npx playwright test --ui
```

---

## 🌐 4. Cấu Hình Chuyển Đổi Môi Trường

Dự án tích hợp sẵn Web App Mockup KFWT chạy ngầm tự động tại cổng `3000`. Khi cần chạy kiểm thử trên môi trường thật của E.ON, chỉ cần tạo file `.env`:

```ini
# Chạy trên môi trường BPM E.ON thật:
BASE_URL=https://bpm-dev.eon.com/ivy_DEV/
```
