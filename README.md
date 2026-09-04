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

---

## 🧠 5. Quy Trình Spec-Driven Testing (Siêu Tiết Kiệm Token)

Toàn bộ nghiệp vụ DigiONS/Retrofit gốc nằm ở **34 file Confluence** (`docs/confluence/`, ~143 KB). Đọc thẳng các file này vào AI rất tốn token và dễ nhiễu. Vì vậy dự án nén chúng thành **bộ đặc tả OpenSpec máy đọc được** (YAML) trong `docs/specs/`:

| File | Nội dung nén | Kích thước |
| --- | --- | --- |
| `docs/specs/index.yaml` | Điểm vào định tuyến + mã khóa (digiONS-Type, station-number, DSO) | ~1.3 KB |
| `docs/specs/process.yaml` | 17 bước quy trình DigiONS & Retrofit, trạng thái, REST, điều kiện rẽ nhánh | ~11 KB |
| `docs/specs/roles.yaml` | Role Concept, vùng ST-Area, ma trận visible/editable theo vai trò | ~2.7 KB |
| `docs/specs/fields.yaml` | Từ điển trường dữ liệu: KuRi, NS, Technical Place, VNB/DSO, MS-Switchgear... + mapping DB | ~5 KB |

**Mức tiết kiệm token:**
- Tải cả bộ spec thay vì cả thư mục Confluence: **giảm ~86%** (20 KB thay vì 143 KB).
- Tra cứu theo **từng Jira Ticket** (đọc `index.yaml` + grep đúng 1 mục): **vượt >95%** token so với đọc tài liệu gốc.

### 5.1. Cách Tester dùng (khi viết testcase / sinh test)
1. Tìm **Jira Ticket** hoặc bước nghiệp vụ bạn đang kiểm thử (vd `KFWT-664`, `EMP-409`).
2. Mở `docs/specs/index.yaml` để định tuyến sang spec con phù hợp.
3. Dùng tìm kiếm (grep) trong `docs/specs/`:
   - Bước/trạng thái/REST/rẽ nhánh → `process.yaml` (khóa `id:`, `jira:`, tên trạng thái như `SOURCE_SINK_TEST`).
   - Vai trò/quyền hiển thị-sửa → `roles.yaml`.
   - Trường dữ liệu & mapping DB → `fields.yaml`.
4. Chỉ mở file gốc trong `docs/confluence/` khi cần chi tiết mà spec chưa có — mỗi mục spec có trường `src:` chỉ đúng file nguồn.

### 5.2. Khi dùng Copilot / lệnh `/new-test`
Chỉ cần đính kèm **Jira Ticket** vào phần mô tả testcase. Prompt `.github/prompts/new-test.prompt.md` đã được cấu hình để AI **ưu tiên tra cứu `docs/specs/` trước** (index → grep spec liên quan), tránh nạp toàn bộ Confluence vào ngữ cảnh.

### 5.3. Cập nhật spec khi tài liệu đổi
Nếu tài liệu Confluence thay đổi, chỉ cần cập nhật mục tương ứng trong `docs/specs/*.yaml` (theo trường `src:`). Sau khi sửa, kiểm tra YAML hợp lệ:
```bash
python -c "import yaml,glob; [yaml.safe_load(open(f,encoding='utf-8')) for f in glob.glob('docs/specs/*.yaml')]"
```
