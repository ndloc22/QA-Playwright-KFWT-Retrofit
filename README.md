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

Từ một Jira Ticket, có **2 cách** để đi tới bộ testcase + Playwright spec hoàn chỉnh. Chọn cách phù hợp với tình huống của bạn:

| Tình huống | Nên dùng |
| --- | --- |
| Muốn xong nhanh gọn cả pipeline, ticket đã rõ ràng hoặc bạn chấp nhận để Copilot tự dừng lại khi có Blocker | ✅ **Cách 1: 1-Click All-in-One** |
| Muốn kiểm soát từng bước, xem kỹ kết quả `/analyze-story` trước khi cho sinh spec, hoặc đang xử lý lại một ticket sau khi PO đã confirm | ✅ **Cách 2: Từng bước qua Copilot Chat** |

### ⚡ Cách 1: Lệnh 1-Click All-in-One (`npm run auto-test <KEY>`)

Chạy trọn gói **4 bước tự động, phân tầng theo model AI** chỉ bằng 1 dòng lệnh, không cần mở Copilot Chat thủ công:

```bash
npm run auto-test KFWT-1161
# hoặc dán thẳng link Jira:
npm run auto-test https://jira.eon.com/browse/KFWT-1161
```

**🏗️ Kiến trúc phân tầng model (tối ưu token/chi phí AI Credits):**

| Bước | Việc làm | Model / Engine | Vì sao |
| :-: | --- | --- | --- |
| `[1/4]` | 📥 Ingest Jira ticket + tải ảnh/diagram (`fetch-jira.js`) | **0 token** (browser scraping) | Không cần AI, chỉ scrape DOM |
| `[2/4]` | 🧾 `/summarize-story`: đọc ticket + ảnh + Jira Comments + đối chiếu `docs/specs/codebase/` → cô đọng thành `docs/tickets/<KEY>.summary.json` | **`claude-sonnet-5`** | Việc trích xuất/đọc nội dung không đòi hỏi suy luận sâu — dùng model rẻ hơn để giảm chi phí |
| `[3/4]` | 🤖 `/analyze-story` (giải quyết conflict) + `/new-test` (thiết kế test matrix + sinh `.spec.ts`) — đọc `summary.json` thay vì raw ảnh/YAML | **`claude-opus-4.8`** (mặc định) | Tận dụng tối đa chiều sâu suy luận và khả năng giải quyết logic phức tạp của dòng Opus, vẫn tối ưu chi phí vì chỉ nạp bản tóm tắt tinh gọn (~30k tokens) thay vì raw ảnh/YAML |
| `[4/4]` | 🧪 Chạy `npx playwright test` verify | **0 token** (Playwright engine local) | Thực thi test không cần AI |
| *(nếu `[4/4]` FAIL)* | 🩺 Self-healing: `/fix-failed-test` chẩn đoán + tự sửa lỗi kỹ thuật (selector/timing) hoặc xuất Bug Report nếu là bug web thật, rồi tự chạy lại test 1 lần để xác nhận | **`claude-sonnet-5`** | Chẩn đoán lỗi kỹ thuật thường không cần mức suy luận cao nhất — dùng model rẻ hơn cho self-healing |

> Có thể override model từng bước qua biến môi trường `AUTO_TEST_SUMMARY_MODEL`, `AUTO_TEST_ANALYSIS_MODEL`, `AUTO_TEST_SELF_HEAL_MODEL` (vd khi cần thử nghiệm nâng/hạ tầng model cho 1 ticket khó) mà không cần sửa `scripts/auto-test.js`.
>
> 🔁 **Muốn hạ xuống model rẻ hơn cho bước `[3/4]`?** Chuyển sang `claude-sonnet-5` bất kỳ lúc nào — qua biến môi trường `AUTO_TEST_ANALYSIS_MODEL=claude-sonnet-5`, hoặc cờ dòng lệnh linh hoạt:
> ```bash
> npm run auto-test KFWT-1161 -- --sonnet
> # hoặc chỉ định model tuỳ ý:
> npm run auto-test KFWT-1161 -- --model claude-sonnet-5
> ```
> Cờ dòng lệnh được ưu tiên cao nhất, kế đến là biến môi trường, cuối cùng mới là mặc định `claude-opus-4.8`.

**Khi gặp Blocker:** nếu Copilot phát hiện mâu thuẫn nghiêm trọng (Description ⇄ AC ⇄ Codebase Specs ⇄ Ảnh) ở bước `[3/4]`, pipeline **chủ động dừng lại** (không phải lỗi kỹ thuật) — thoát với **exit code 2** — và in ra **Bảng Câu Hỏi** cần gửi PO ngay trên terminal (xem chi tiết đầy đủ tại `docs/tickets/<KEY>.md`, mục `## 🔴 Open Questions & Blockers`). Cách xử lý:
1. Gửi nguyên văn Bảng Câu Hỏi cho PO/BA (Jira comment hoặc Slack).
2. Chờ PO chốt phương án. Nếu PO sửa trực tiếp trên Jira → chạy `npm run fetch-ticket <KEY>` để re-sync bản ticket mới nhất; nếu PO chốt qua chat → ghi nhận câu trả lời vào `docs/tickets/<KEY>.md` ngay dưới câu hỏi tương ứng.
3. Chạy lại `npm run auto-test <KEY>` để pipeline chạy lại từ đầu với thông tin đã được làm rõ.

> Xem đầy đủ quy trình 2 giai đoạn xử lý Blocker tại **mục 11**.

### 🧩 Cách 2: Chạy Từng Bước Linh Hoạt Qua Copilot Chat

Dùng khi muốn tự kiểm tra kết quả phân tích trước khi sinh spec, hoặc đang xử lý lại 1 ticket sau khi PO đã confirm.

**Bước 0 (tùy chọn, khuyến nghị để tiết kiệm token khi ticket có nhiều ảnh/comment dài): `/summarize-story`**
```markdown
/summarize-story
Hãy cô đọng #file:docs/tickets/KFWT-1161.md (kèm ảnh trong docs/tickets/KFWT-1161/ và Jira Comments) thành docs/tickets/KFWT-1161.summary.json
```
Nên chạy lệnh này với model rẻ (`claude-sonnet-5`) — trong Copilot CLI: `copilot --model claude-sonnet-5 -p "..."`. Kết quả `docs/tickets/<KEY>.summary.json` sẽ được `/analyze-story` và `/new-test` tự động ưu tiên đọc ở bước sau.

**Bước 1 (khuyến nghị, đặc biệt khi ticket có ảnh/diagram): `/analyze-story`**
```markdown
/analyze-story
Hãy phân tích #file:docs/tickets/KFWT-1161.md (ưu tiên đọc docs/tickets/KFWT-1161.summary.json nếu đã có) và đối chiếu với #file:docs/specs/codebase/ui_components.yaml + #file:docs/specs/codebase/state_machine.yaml
```
Nên chạy lệnh này với model mặc định (`claude-opus-4.8`) — trong Copilot CLI: `copilot --model claude-opus-4.8 -p "..."`. Copilot sẽ đối chiếu Description vs AC vs codebase thật (dựa trên `summary.json` nếu có, hoặc tự **xem trực tiếp ảnh mockup/diagram** nếu chưa có summary), rồi:
- 🔴 Nếu phát hiện **Blocker** (mâu thuẫn nghiêm trọng) → dừng lại, xuất bảng câu hỏi gửi PO/Tester, **chưa sinh spec.ts**. Gửi bảng câu hỏi cho PO, chờ PO confirm, sau đó chạy `npm run fetch-ticket <KEY>` để re-sync ticket rồi chạy lại `/analyze-story`.
- 🟡 Nếu chỉ có **Warning** (chi tiết nhỏ chưa chắc chắn) → cho phép sang bước 2, nhưng test sinh ra sẽ có chú thích `// ⚠️ ASSUMPTION:`.

> 🔁 Ticket đơn giản, muốn tiết kiệm chi phí? Hạ xuống `claude-sonnet-5`: `copilot --model claude-sonnet-5 -p "..."` (hoặc, khi chạy qua pipeline, `npm run auto-test KFWT-1161 -- --sonnet`).

**Bước 2: `/new-test`**
```markdown
Dựa vào #file:docs/tickets/KFWT-1161.md và bộ quy trình nén #file:docs/specs/process.yaml, hãy sinh testcase chi tiết tại tests/testcases/TC-KFWT-1161.md và Playwright spec tại tests/e2e/TC-KFWT-1161.spec.ts
```
Nên chạy với model mặc định `claude-opus-4.8` (cùng tầng với `/analyze-story` — tận dụng tối đa chiều sâu suy luận của dòng Opus). Copilot sẽ đọc trực tiếp ngữ cảnh từ file Markdown cục bộ mà không lo token phình to hay bị chặn bởi bảo mật SSO, đồng thời tự tra `docs/specs/codebase/ui_components.yaml` để lấy **selector chuẩn xác 100%** thay vì đoán. Muốn hạ xuống model rẻ hơn? Chuyển sang `claude-sonnet-5` theo cùng cách ở Bước 1.

**Bước 3: Chạy verify test**
```bash
npx playwright test tests/e2e/TC-KFWT-1161.spec.ts
```

**Bước 4 (nếu test FAIL): `/fix-failed-test`**
```markdown
/fix-failed-test
Test tests/e2e/TC-KFWT-1161.spec.ts vừa fail, đây là log lỗi: ...
```
Nên chạy với model rẻ hơn (`claude-sonnet-5`) — chẩn đoán lỗi kỹ thuật/selector/timing thường không cần mức suy luận sâu nhất.

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

Trước khi sinh `.spec.ts` từ 1 Jira Story, pipeline chạy qua 2 tầng model:
1. **`/summarize-story`** (model `claude-sonnet-5`) — trích xuất & cô đọng: xem trực tiếp mọi ảnh trong `docs/tickets/<KEY>/attachments/` + `docs/tickets/<KEY>/screenshots/`, đọc Jira Comments, đối chiếu `docs/specs/codebase/ui_components.yaml` + `state_machine.yaml`, ghi kết quả vào `docs/tickets/<KEY>.summary.json`. Bước này **không kết luận** Blocker/Warning.
2. **`/analyze-story`** (model mặc định `claude-opus-4.8`, có thể hạ xuống `claude-sonnet-5` khi cần, `.github/prompts/analyze-story.prompt.md`) — đọc `summary.json` (ưu tiên) rồi **so khớp chéo** Description ⇄ AC ⇄ Codebase Specs ⇄ Ảnh, phân loại:
   - 🔴 **Blocker** → dừng lại, xuất bảng câu hỏi gửi PO/Tester, không sinh spec.
   - 🟡 **Warning** → vẫn sinh test, kèm chú thích `// ⚠️ ASSUMPTION:` tại vị trí liên quan.

Prompt `/new-test` (cũng chạy ở model mặc định `claude-opus-4.8`) đã được cập nhật để **tự động gọi bước này trước** khi có Jira Ticket đính kèm (xem mục 7).

> 💡 Bước tốn nhiều token đầu vào (đọc ảnh/comment/YAML) chạy ở `/summarize-story` (`claude-sonnet-5`), còn `/analyze-story` + `/new-test` mặc định dùng `claude-opus-4.8` — tận dụng tối đa chiều sâu suy luận và khả năng giải quyết logic phức tạp của dòng Opus trên bản tóm tắt tinh gọn (~30k tokens). Khi ticket đơn giản, muốn tiết kiệm chi phí, Tester có thể hạ 2 bước này xuống `claude-sonnet-5` qua biến môi trường `AUTO_TEST_ANALYSIS_MODEL=claude-sonnet-5` hoặc cờ dòng lệnh `npm run auto-test KFWT-1161 -- --sonnet` (hoặc `--model claude-sonnet-5`) mà vẫn giữ nguyên chất lượng phân tích, vì model vẫn tự mở lại raw file nếu `summary.json` thiếu chi tiết cần thiết.

---

## 🔴 11. Quy Trình Xử Lý Blocker & Open Questions (2 Giai Đoạn)

Khi `/analyze-story` phát hiện **Blocker** (mâu thuẫn nghiêm trọng giữa Description ⇄ AC ⇄ Codebase Specs ⇄ Ảnh), story **KHÔNG được phép** sinh `.spec.ts` cho tới khi PO/BA chốt phương án. Quy trình chuẩn gồm **2 Giai đoạn** bắt buộc:

### 🚩 Giai đoạn 1 — Khi phát hiện Blocker / Open Question

1. **Dừng sinh mã `.spec.ts`** ngay lập tức để tránh rác mã nguồn và test sai nghiệp vụ (test sẽ fail hoặc kiểm thử nhầm hành vi chưa được xác nhận).
2. **Xuất Bảng Câu Hỏi chuẩn 4 cột** gửi PO/BA, gồm đúng các cột:

   | Vị trí xung đột | Bản chất xung đột | Câu hỏi chốt phương án cho PO | Tác động kiểm thử |
   | --- | --- | --- | --- |
   | (VD: AC #3 vs `state_machine.yaml`) | (Mô tả ngắn gọn mâu thuẫn) | (Câu hỏi Yes/No hoặc chọn phương án A/B rõ ràng) | (Test nào bị chặn / có nguy cơ sai nếu không làm rõ) |

3. **Lưu vết tại local**: ghi Bảng Câu Hỏi vào file `docs/tickets/<KEY>.md`, dưới mục `## 🔴 Open Questions & Blockers` (tạo mục này nếu chưa có).
4. **Thông báo cho người chốt phương án**: comment nguyên văn Bảng Câu Hỏi lên Jira ticket và/hoặc Slack cho PO/BA để chờ phản hồi. **Không tự suy đoán** thay PO.

> ⛔ Trong Giai đoạn 1, pipeline `npm run auto-test <KEY>` sẽ **dừng đúng quy trình** (không phải lỗi kỹ thuật) và hiển thị thông báo yêu cầu Tester gửi Bảng Câu Hỏi cho PO/BA trước khi tiếp tục.

### ✅ Giai đoạn 2 — Sau khi PO/BA giải quyết / phản hồi

1. **Cập nhật "Nguồn chân lý" (Single Source of Truth)** trước tiên — đây là bước bắt buộc, không được sinh test dựa trên trí nhớ của Copilot:
   - Nếu PO **sửa trực tiếp trên Jira** (Description/AC) → chạy lại:
     ```bash
     npm run fetch-ticket <KEY>
     ```
     để re-sync bản ticket sạch, mới nhất vào `docs/tickets/<KEY>.md`.
   - Nếu PO **chốt qua comment/chat** (không sửa Jira) → ghi nhận nguyên văn câu trả lời vào `docs/tickets/<KEY>.md`, ngay dưới Bảng Câu Hỏi tương ứng (mục `## 🔴 Open Questions & Blockers` → đổi thành `## ✅ Resolved Questions` hoặc thêm phần trả lời bên dưới mỗi câu hỏi).
2. **Chạy lại `/analyze-story`** để Copilot đối chiếu lại Description ⇄ AC ⇄ Codebase Specs ⇄ Ảnh với thông tin mới, xác nhận **Clear Gate** (không còn Blocker nào tồn đọng). Nếu vẫn còn mâu thuẫn → quay lại Giai đoạn 1.
3. **Chạy `/new-test`** để sinh:
   - Testcase phân rã modular: `tests/testcases/TC-<KEY>.md` (TC-<KEY>-01, -02, -03, ...).
   - Playwright spec: `tests/e2e/TC-<KEY>.spec.ts`.
4. **Cập nhật Page Object** (`tests/pages/<Feature>Page.ts`) nếu story phát sinh task/dialog/component mới chưa có selector.
5. **Chạy verify syntax & smoke test** trước khi bàn giao:
   ```bash
   npx playwright test tests/e2e/TC-<KEY>.spec.ts
   ```
   Nếu test FAIL, chạy `/fix-failed-test` (model `claude-sonnet-5`) để tự chẩn đoán/sửa lỗi kỹ thuật hoặc xuất Bug Report nếu là bug web thật (xem mục 7, Bước 4). Khi chạy qua `npm run auto-test <KEY>`, bước này tự động kích hoạt và tự re-run 1 lần.
6. **Commit và bàn giao**: commit `docs/tickets/<KEY>.md` (đã cập nhật, có thể kèm `docs/tickets/<KEY>.summary.json`), `tests/testcases/TC-<KEY>.md`, `tests/e2e/TC-<KEY>.spec.ts` và Page Object liên quan (nếu có).

> 💡 Ghi nhớ: **Giai đoạn 1 = Dừng đúng lúc** (bảo vệ chất lượng), **Giai đoạn 2 = Đồng bộ nguồn chân lý trước khi sinh lại** (bảo đảm test luôn khớp với quyết định mới nhất của PO/BA).

---

## 🧬 12. Nhân Bản (Clone) Template Này Sang Dự Án Khác (vd: ASAP)

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

