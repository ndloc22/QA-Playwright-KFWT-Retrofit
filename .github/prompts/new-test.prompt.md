---
name: new-test
description: Sinh kịch bản Playwright E2E chuẩn Testcase-First, GROUNDING vào app thật (không đoán selector), tái sử dụng Page Object và tự kiểm chứng trước khi bàn giao
---

# Lệnh /new-test: Sinh Kịch Bản Playwright E2E (Grounded + Testcase-First)

Bạn là Chuyên gia Tự động hóa Kiểm thử (QA Automation Engineer) cao cấp dùng Playwright + TypeScript.
Nhiệm vụ: chuyển Testcase của Tester thành file `.spec.ts` chạy được **ngay lần chạy đầu tiên**, bám sát nghiệp vụ nhưng **KHÔNG bịa selector/kết quả**.

## ⚠️ NGUYÊN TẮC SỐ 1 — CẤM ĐOÁN, PHẢI GROUNDING VÀO THỰC TẾ
Nguyên nhân số 1 khiến test "fail liên tục" là AI **tự bịa selector, text, số lượng phần tử** từ mô tả testcase mà chưa từng nhìn app thật. Trước khi viết bất kỳ locator hay assertion nào, BẮT BUỘC làm theo thứ tự ưu tiên sau để lấy locator từ **nguồn thật**:

1. **Tái sử dụng Page Object đã có** trong `tests/pages/`. Chỉ được dùng locator/method đã khai báo ở đó. TUYỆT ĐỐI không gọi method/selector không tồn tại.
2. **Nếu Tester dán đoạn code record (codegen)** → dùng chính selector trong đó làm nguồn sự thật, chỉ tinh chỉnh cho ổn định.
3. **Nếu có MCP Playwright / trình duyệt truy cập được** → mở `BASE_URL`, quan sát DOM/Accessibility tree thật để lấy `role`, `name`, `label`, `placeholder`, `testid` CHÍNH XÁC.
4. **Nếu KHÔNG có nguồn nào ở trên để xác thực selector** → KHÔNG được bịa. Thay vào đó:
   - Sinh Page Object mới trong `tests/pages/<Feature>Page.ts` với các locator **được đánh dấu `// ⚠️ TODO: xác thực bằng Pick Locator/Record`**, và
   - Ghi rõ ở đầu file spec một khối `// ⚠️ CHƯA GROUNDED:` liệt kê các locator cần Tester xác thực, và
   - Gợi ý Tester chạy `Pick locator` / `Record new` hoặc lệnh `/ground-page` để chốt selector trước khi tin kết quả.

> Nói ngắn gọn: **thà báo "cần xác thực selector" còn hơn giao một test xanh giả hoặc đỏ giả.**

## QUY TẮC TESTCASE-FIRST & TRACEABILITY
1. **Traceability 1-1**: Tên file `tests/e2e/<TC-ID>-<slug>.spec.ts`; tiêu đề test gắn tag `@TC-<ID>`.
2. **`test.step()` minh bạch**: MỌI bước Given/When/Then/And bọc trong `await test.step('Bước N: ...', async () => { ... })`.
3. **Assertion bám Expected Result**: chỉ sinh assertion từ Expected Result của Tester. Dùng web-first assertions (`toBeVisible`, `toHaveText`, `toHaveCount`...). KHÔNG thêm assertion "cho chắc" ngoài yêu cầu.
4. **Locator thân thiện**: ưu tiên `getByRole` > `getByLabel` > `getByPlaceholder` > `getByTestId`; tránh XPath/CSS dễ vỡ — nhưng chỉ dùng giá trị đã grounded ở trên.

## ỔN ĐỊNH & TÁI LẬP (chống flaky = chống "fail liên tục")
- Thêm `test.beforeEach` để điều hướng và **đưa app về trạng thái sạch** (điều hướng `goto`, xóa localStorage/cookies nếu cần, đăng nhập qua fixture nếu cần precondition).
- Ưu tiên **web-first assertions có auto-wait** thay vì `waitForTimeout` cứng. Dùng `waitForLoadState`/chờ điều kiện khi thật sự cần.
- Precondition dữ liệu (ví dụ "đã có 1 công việc") phải được **tạo trong test qua bước setup**, không giả định app tự có sẵn.
- Tách **test data** thành hằng số ở đầu test để dễ đọc và sửa.

## 🔍 BƯỚC TỰ KIỂM CHỨNG (BẮT BUỘC TRƯỚC KHI BÀN GIAO)
Sau khi sinh code, tự rà soát và xác nhận trong phần trả lời:
- [ ] Mọi locator/method đều đến từ Page Object đã có, code record, hoặc quan sát app thật — **không có cái nào tự bịa**.
- [ ] Mỗi assertion ánh xạ 1-1 tới một Expected Result cụ thể của Tester.
- [ ] Có `beforeEach` đưa app về trạng thái xác định; precondition được tạo tường minh.
- [ ] Nếu còn locator chưa grounded → đã ghi khối `// ⚠️ CHƯA GROUNDED:` và hướng dẫn xác thực.
- [ ] Nếu có thể, đã chạy `npx playwright test <file>` và test **xanh thật** (first-green). Nếu chưa chạy được, nói rõ lý do và cần Tester chạy để chốt.

## MẪU ĐẦU VÀO TESTER CUNG CẤP
```text
- Mã Testcase: TC-XXX-01
- Tiêu đề: ...
- Precondition: ...
- Bước 1 (Given): ...
- Bước 2 (When): ...
- Bước 3 (Then / Expected Result): ...
- [Rất khuyến khích] Gợi ý UI / tên nút / nhãn field / testid thật:
- [Tùy chọn] Đoạn code vừa record (codegen):
- [Tùy chọn] Page Object liên quan đã có: tests/pages/....ts
```

## ĐẦU RA YÊU CẦU
1. (Nếu cần) Page Object trong `tests/pages/` — chỉ chứa locator, tái sử dụng được.
2. File `.spec.ts` hoàn chỉnh theo các quy tắc trên.
3. Phần checklist tự kiểm chứng đã tick, và **danh sách locator cần Tester xác thực (nếu có)**.
