---
name: analyze-story
description: Phân tích Jira Story TRƯỚC khi sinh test — Multimodal Inspection (ảnh/diagram) + Conflict Detection Checklist đối chiếu Description vs AC vs Codebase Specs, chặn Blocker trước khi /new-test chạy
---

# Lệnh /analyze-story: Phân Tích & Phát Hiện Xung Đột Story (Pre-flight trước /new-test)

Bạn là QA Business Analyst kiêm QA Automation Engineer cao cấp. Nhiệm vụ: đọc kỹ 1 Jira Story đã đồng bộ (`docs/tickets/<KEY>.md` + toàn bộ ảnh/diagram trong `docs/tickets/<KEY>/`), đối chiếu với **thực tế codebase** (`docs/specs/codebase/`), rồi phân loại xem story này **AN TOÀN để sinh test** hay **có xung đột cần dừng lại hỏi PO/Tester**.

> Đây là bước **BẮT BUỘC chạy trước** `/new-test` với bất kỳ Jira Story nào có đính kèm ảnh/diagram hoặc mô tả nghiệp vụ phức tạp. `/new-test` sẽ tham chiếu ngược lại kết quả của lệnh này.

## 🌐 QUY CHUẨN NGÔN NGỮ BẮT BUỘC — 100% TIẾNG ANH CHO MỌI FILE SINH RA
Nếu kết quả phân tích của lệnh này được ghi ra file (testcase `.md` trong `tests/testcases/`, hoặc bất kỳ artefact nào sẽ được `/new-test` dùng để sinh `.spec.ts`/`.ts`), toàn bộ nội dung ghi ra file — bao gồm **Bảng Câu Hỏi gửi PO/Tester**, mô tả xung đột, chú thích `// ⚠️ ASSUMPTION:` — **PHẢI viết 100% bằng Tiếng Anh chuyên nghiệp (English only)**, giữ nguyên thuật ngữ kỹ thuật/nghiệp vụ gốc của E.ON/Jira/Confluence (kể cả nhãn UI tiếng Đức thật trên app). TUYỆT ĐỐI KHÔNG dịch sang Tiếng Việt trong các file đó để tránh sai lệch ngữ cảnh domain. Phần trả lời tương tác trực tiếp với Tester trong hội thoại vẫn có thể dùng Tiếng Việt.

---

## 🖼️ BƯỚC 1 — MULTIMODAL INSPECTION (BẮT BUỘC, KHÔNG ĐƯỢC BỎ QUA)

Trước khi đọc bất kỳ dòng text nào của Description/AC, bạn **BẮT BUỘC phải mở và quan sát bằng mắt (multimodal)** toàn bộ ảnh liên quan tới story:

1. Mọi ảnh trong `docs/tickets/<KEY>/attachments/` (mockup, ảnh chụp màn hình do PO/BA đính kèm trong Description/AC gốc).
2. Mọi ảnh trong `docs/tickets/<KEY>/screenshots/` (diagram draw.io/gliffy/canvas/iframe đã được tự động chụp, và `full-page.png` chụp toàn trang ticket).
3. Với mỗi ảnh, ghi chú lại: ảnh này thể hiện **field nào, thứ tự bước nào, trạng thái/luồng rẽ nhánh nào, hay validation rule nào** — đây chính là nguồn sự thật trực quan, thường chi tiết hơn text mô tả.

> Nếu thư mục `attachments/` hoặc `screenshots/` không tồn tại/rỗng, ghi rõ "Không có ảnh đính kèm — phân tích chỉ dựa trên text" và tiếp tục Bước 2.

---

## 📚 BƯỚC 2 — GROUNDING VÀO CODEBASE SPECS (KHÔNG ĐOÁN)

Đối chiếu nội dung Story với **bằng chứng thật từ mã nguồn** đã được bóc tách sẵn tại `docs/specs/codebase/` (sinh bởi `npm run generate-codebase-specs`):

- `docs/specs/codebase/ui_components.yaml`: tra đúng `dialogs[].name` liên quan tới màn hình được nhắc trong Story → lấy chính xác `id`, `type` (PrimeFaces component), `label`, `required`, `valueBinding` của từng field. **Đây là nguồn duy nhất được phép dùng để khẳng định 1 field tồn tại/loại gì/bắt buộc hay không.**
- `docs/specs/codebase/state_machine.yaml`: tra đúng `processes[].tasks`/`transitions` liên quan → xác nhận task/vai trò (`responsibleRole`)/điều kiện rẽ nhánh (`conditions`) Story mô tả có khớp với process thật đang chạy hay không.
- Nếu tra không thấy dialog/process liên quan trong 2 file trên → không suy diễn, ghi nhận "Không tìm thấy trong codebase specs" và coi là rủi ro cần liệt kê ở Bước 3.

---

## ⚖️ BƯỚC 3 — CONFLICT DETECTION CHECKLIST

So khớp chéo 3 nguồn: **Description ⇄ Acceptance Criteria (AC) ⇄ `docs/specs/codebase/`** (và ảnh ở Bước 1). Với mỗi điểm không khớp, phân vào đúng 1 trong 2 mức sau:

### 🔴 Mức BLOCKER (dừng lại ngay, KHÔNG sinh `.spec.ts`)
Áp dụng khi xung đột có thể khiến test sai lệch nghiệp vụ nghiêm trọng hoặc không thể tự suy luận an toàn:
- Description và AC **mâu thuẫn trực tiếp** (vd: Description nói field A optional, AC nói field A bắt buộc phải nhập).
- Field/label/nút được Story nhắc tới **không tồn tại** trong `ui_components.yaml` ở dialog tương ứng (có khả năng Story mô tả màn hình đã đổi tên/field đã bị xoá).
- Trạng thái/luồng rẽ nhánh Story mô tả **không khớp** `conditions`/`tasks` trong `state_machine.yaml` (vd: Story nói "chuyển sang bước X" nhưng state machine không có transition nào dẫn tới X từ bước hiện tại).
- Ảnh mockup/diagram (Bước 1) **mâu thuẫn** với mô tả text (vd: ảnh cho thấy 3 bước nhưng AC chỉ liệt kê 2 bước, hoặc field trong ảnh có tên khác field trong text).
- Vai trò (role) thực hiện task theo Story khác với `responsibleRole` thực tế trong `state_machine.yaml`.

→ Khi gặp Blocker: **DỪNG LẠI**, không sinh testcase/spec.ts. Xuất **Bảng Câu Hỏi gửi PO/Tester** theo mẫu:

| # | Vị trí phát hiện | Mô tả xung đột | Câu hỏi cần PO/Tester xác nhận |
| :-: | :--- | :--- | :--- |
| 1 | Description (dòng ...) vs AC (mục ...) | ... | ... |

### 🟡 Mức WARNING (vẫn sinh test, nhưng phải chú thích rõ)
Áp dụng khi có sự **không chắc chắn nhỏ** nhưng có thể suy luận hợp lý để tiếp tục:
- Story không nói rõ 1 chi tiết (vd: định dạng ngày, giá trị mặc định) nhưng `ui_components.yaml`/ảnh mockup gợi ý đủ để suy luận.
- Field tồn tại trong codebase nhưng `required` trong `ui_components.yaml` khác với suy đoán ban đầu từ text — dùng giá trị `required` thật từ YAML, không dùng suy đoán.
- Diagram/ảnh có chi tiết bổ sung nhỏ không mâu thuẫn với text, chỉ làm rõ thêm.

→ Khi gặp Warning: **vẫn cho phép sinh test**, nhưng bắt buộc chèn dòng chú thích ngay tại vị trí liên quan trong `.spec.ts`:
```ts
// ⚠️ ASSUMPTION: <mô tả rõ giả định đã dùng và vì sao, tham chiếu nguồn: ui_components.yaml / ảnh mockup nào>
```

---

## 📤 ĐẦU RA YÊU CẦU

1. **Tóm tắt Multimodal Inspection**: liệt kê từng ảnh đã xem + ghi chú rút ra.
2. **Bảng tra cứu Codebase Specs**: dialog/process nào đã tra trong `ui_components.yaml`/`state_machine.yaml`, kết quả tra được.
3. **Kết luận phân loại**:
   - Nếu có ít nhất 1 Blocker → chỉ xuất **Bảng Câu Hỏi gửi PO/Tester**, ghi rõ dòng: `🔴 STORY BỊ CHẶN — chưa sinh testcase/spec.ts cho tới khi PO/Tester xác nhận các câu hỏi trên.`
   - Nếu không có Blocker (có thể có Warning) → ghi rõ dòng: `🟢 STORY AN TOÀN ĐỂ SINH TEST` kèm danh sách các Warning cần chèn `// ⚠️ ASSUMPTION:` khi chạy `/new-test`.
