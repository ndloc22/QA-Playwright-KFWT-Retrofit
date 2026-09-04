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

---

## 📥 6. Bóc Tách Jira Ticket Tự Động Vào Dự Án (2 Cách Siêu Nhanh)

Dự án cung cấp 2 giải pháp hoàn chỉnh để Tester và Developer đồng bộ nội dung Jira Ticket (kể cả sau tường lửa SSO Azure AD của E.ON) vào thư mục `docs/tickets/`:

### ⚡ Cách 1: 1-Click Chrome Bookmarklet (Dành cho khi đang duyệt Jira)
1. Chạy server local của dự án:
   ```bash
   npm run server
   ```
2. Mở `http://127.0.0.1:3001/bookmarklet.html` trên Chrome, kéo nút **`⚡ Sync to Retrofit`** thả vào thanh Bookmark Bar.
3. Khi đang xem bất kỳ ticket nào trên Jira (ví dụ: `https://jira.eon.com/browse/KFWT-1161`), chỉ cần click nút bookmarklet.
4. Toàn bộ Summary, Description, AC, Sprint, Story Points được lưu ngay lập tức vào:
   - `docs/tickets/<KEY>.md`
   - `docs/tickets/<KEY>.json`

### 🤖 Cách 2: Playwright Browser Automation Từ VS Code / Terminal
Không cần rời khỏi VS Code, bạn có thể chạy dòng lệnh hoặc bảo GitHub Copilot trong VS Code thực thi:
```bash
npm run fetch-ticket KFWT-1161
# hoặc:
npm run fetch-ticket https://jira.eon.com/browse/KFWT-1161
```
Playwright sẽ tự động kết nối hoặc bật Google Chrome với Persistent Session (`.auth/jira-profile`), truy cập trang Jira và bóc tách toàn bộ dữ liệu nội bộ qua REST API, lưu trực tiếp vào `docs/tickets/KFWT-1161.md`!

### 🖼️ Tự động tải ảnh/attachment + chụp diagram (Multimodal-ready)
Từ bản nâng cấp mới, `fetch-jira.js` còn tự động:
- Quét mọi `<img>` và link `/secure/attachment/...` trong Description/AC, **tải file nhị phân thật** (qua authenticated context request, dùng chung session đã đăng nhập) vào `docs/tickets/<KEY>/attachments/`.
- Chụp riêng từng vùng **diagram nhúng** (draw.io, gliffy, canvas, iframe) vào `docs/tickets/<KEY>/screenshots/diagram-N.png`.
- Chụp 1 ảnh **full-page** toàn trang ticket làm bằng chứng tham khảo (`docs/tickets/<KEY>/screenshots/full-page.png`).
- Tự động **nhúng sẵn đường dẫn ảnh tương đối** vào `docs/tickets/<KEY>.md` (mục "🖼️ Attachments & Screenshots") để Copilot đọc file Markdown là thấy luôn ảnh mockup/diagram mà không cần mở Jira lại.

---

## 🧪 7. Phân Tích Xung Đột & Sinh Test Tự Động Từ File Ticket Đã Lưu

Sau khi file ticket (kèm ảnh) đã có trong `docs/tickets/`, quy trình chuẩn gồm 2 bước:

### Bước 1 (khuyến nghị, đặc biệt khi ticket có ảnh/diagram): `/analyze-story`
```markdown
/analyze-story
Hãy phân tích #file:docs/tickets/KFWT-1161.md (kèm toàn bộ ảnh trong docs/tickets/KFWT-1161/) và đối chiếu với #file:docs/specs/codebase/ui_components.yaml + #file:docs/specs/codebase/state_machine.yaml
```
Copilot sẽ **xem trực tiếp ảnh mockup/diagram** (Multimodal Inspection), đối chiếu Description vs AC vs codebase thật, rồi:
- 🔴 Nếu phát hiện **Blocker** (mâu thuẫn nghiêm trọng) → dừng lại, xuất bảng câu hỏi gửi PO/Tester, **chưa sinh spec.ts**.
- 🟡 Nếu chỉ có **Warning** (chi tiết nhỏ chưa chắc chắn) → cho phép sang bước 2, nhưng test sinh ra sẽ có chú thích `// ⚠️ ASSUMPTION:`.

### Bước 2: `/new-test`
```markdown
Dựa vào #file:docs/tickets/KFWT-1161.md và bộ quy trình nén #file:docs/specs/process.yaml, hãy sinh testcase chi tiết tại tests/testcases/TC-KFWT-1161.md và Playwright spec tại tests/e2e/TC-KFWT-1161.spec.ts
```
Copilot sẽ đọc trực tiếp ngữ cảnh từ file Markdown cục bộ mà không lo token phình to hay bị chặn bởi bảo mật SSO, đồng thời tự tra `docs/specs/codebase/ui_components.yaml` để lấy **selector chuẩn xác 100%** thay vì đoán.

---

## 🧩 8. Bộ 14 Axon Ivy Skills Tier-1 (`.github/skills/`)

Dự án tích hợp sẵn 14 **skill chuyên biệt cho Axon Ivy** (đồng bộ 1-click từ dự án nguồn `kleinfernwirktechnik`), giúp GitHub Copilot hiểu đúng quy ước dự án khi phân tích story, review code, hay generate tài liệu liên quan tới Ivy:

| Nhóm | Skills |
| :--- | :--- |
| **Process/Workflow** | `axon-ivy-workflow-guide`, `axon-ivy-process`, `axon-ivy-process-verify`, `axon-ivy-error-handling` |
| **Delivery** | `axon-ivy-verify-story`, `axon-ivy-requirements-creation` |
| **UI** | `axon-ivy-html`, `axon-ivy-primefaces-verify`, `axon-ivy-cms`, `axon-ivy-cms-verify` |
| **Configuration** | `axon-ivy-custom-fields`, `axon-ivy-user-role-config`, `axon-ivy-variable-config` |
| **Integration** | `axon-ivy-rest` |

Chi tiết nguồn gốc + ngày đồng bộ gần nhất: xem [`docs/IVY-SKILLS-MANIFEST.md`](./docs/IVY-SKILLS-MANIFEST.md).

### Đồng bộ lại (khi dự án nguồn có cập nhật)
```powershell
.\scripts\sync-ivy-skills.ps1
```
Script tự động: quét dự án nguồn (`D:\Projects\kleinfernwirktechnik\.github\skills`), copy phẳng 14 skill vào `.github\skills\<skill-name>\`, và cập nhật lại `docs/IVY-SKILLS-MANIFEST.md`.

---

## 🗺️ 9. Bộ Bóc Tách OpenSpecs Codebase (`docs/specs/codebase/`)

Ngoài spec nghiệp vụ (Confluence) ở mục 5, dự án còn có **bộ đặc tả bóc tách trực tiếp từ mã nguồn Axon Ivy thật** (`D:\Projects\kleinfernwirktechnik`), giúp Copilot lấy selector/state-machine **chuẩn xác 100%** thay vì suy đoán từ ảnh/text:

| File | Nội dung |
| --- | --- |
| `docs/specs/codebase/ui_components.yaml` | Từng dialog `*.xhtml`: tên, đường dẫn, danh sách component (id, PrimeFaces type, label, required, value binding) |
| `docs/specs/codebase/state_machine.yaml` | Từng process `*.p.json`: task, role phụ trách (`responsibleRole`), transition + điều kiện rẽ nhánh (`conditions`) |

### Sinh lại OpenSpecs (khi codebase Ivy có thay đổi)
```bash
npm run generate-codebase-specs
# hoặc chỉ định nguồn khác:
node scripts/generate-codebase-specs.js --source "D:\Projects\<other-ivy-project>"
```
Script quét **READ-ONLY** toàn bộ `*.xhtml` + `*.p.json` trong thư mục nguồn, không sửa/ghi gì vào dự án Ivy gốc.

---

## 🛡️ 10. Cơ Chế Phát Hiện Xung Đột (Conflict Detection) Khi Sinh Test

Trước khi sinh `.spec.ts` từ 1 Jira Story, lệnh `/analyze-story` (`.github/prompts/analyze-story.prompt.md`) bắt buộc:
1. **Multimodal Inspection**: xem trực tiếp mọi ảnh trong `docs/tickets/<KEY>/attachments/` + `docs/tickets/<KEY>/screenshots/`.
2. **Grounding**: đối chiếu với `docs/specs/codebase/ui_components.yaml` + `state_machine.yaml`.
3. **So khớp chéo** Description ⇄ AC ⇄ Codebase Specs ⇄ Ảnh, phân loại:
   - 🔴 **Blocker** → dừng lại, xuất bảng câu hỏi gửi PO/Tester, không sinh spec.
   - 🟡 **Warning** → vẫn sinh test, kèm chú thích `// ⚠️ ASSUMPTION:` tại vị trí liên quan.

Prompt `/new-test` đã được cập nhật để **tự động gọi bước này trước** khi có Jira Ticket đính kèm (xem mục 7).

---

## 🧬 11. Nhân Bản (Clone) Template Này Sang Dự Án Khác (vd: ASAP)

Bộ khung này được thiết kế để **tái sử dụng cho bất kỳ hệ thống Axon Ivy nào khác** (không chỉ KFWT), ví dụ dự án `ASAP`. Các bước nhân bản:

1. **Clone repo này** làm điểm khởi đầu cho repo test mới (vd `QA-Playwright-ASAP`):
   ```bash
   git clone https://github.com/ndloc22/QA-Playwright-KFWT-Retrofit.git QA-Playwright-ASAP
   cd QA-Playwright-ASAP
   npm install
   ```
2. **Trỏ lại nguồn Skills & Codebase Specs** sang dự án Ivy mới:
   ```powershell
   .\scripts\sync-ivy-skills.ps1 -Source "D:\Projects\asap\.github\skills"
   ```
   ```bash
   node scripts/generate-codebase-specs.js --source "D:\Projects\asap"
   ```
3. **Thay `BASE_URL`** trong `.env` trỏ về môi trường ASAP (`BASE_URL=https://bpm-dev.eon.com/ivy_ASAP_DEV/`).
4. **Sinh lại spec nghiệp vụ nén** (`docs/specs/index.yaml`, `process.yaml`, `roles.yaml`, `fields.yaml`) từ tài liệu Confluence của ASAP — tham khảo cấu trúc file đã có trong `docs/specs/` làm mẫu.
5. **Xoá dữ liệu cũ của KFWT** không còn phù hợp:
   - `docs/tickets/*` (ticket cũ của KFWT).
   - `tests/pages/`, `tests/e2e/` mẫu demo (giữ lại làm ví dụ tham khảo cấu trúc nếu muốn).
6. Prompt (`.github/prompts/*.prompt.md`) và skill (`.github/skills/*`) **giữ nguyên** — đây chính là phần logic tái sử dụng được, không gắn cứng với KFWT.

> Nhờ tách bạch rõ: **Prompts/Skills (logic tái sử dụng)** ⇄ **Specs/Tickets/Tests (dữ liệu đặc thù từng dự án)**, việc nhân bản template sang dự án Ivy khác chỉ mất vài phút thay vì viết lại từ đầu.

