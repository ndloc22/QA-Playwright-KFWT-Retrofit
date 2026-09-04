import { test, expect } from '@playwright/test';
import { RetrofitStocklistPage } from '../pages/RetrofitStocklistPage';

test.describe('E.ON KFWT - Retrofit Stocklist Feature', () => {
  test('TC-KFWT-RETROFIT-01: Lọc danh sách trạm Retrofit theo trạng thái @KFWT-472', async ({ page }) => {
    const stocklistPage = new RetrofitStocklistPage(page);

    await test.step('Bước 1 (Given): Truy cập trang Retrofit Stocklist', async () => {
      await stocklistPage.goto();
      await expect(stocklistPage.statusFilter).toBeVisible();
      await expect(stocklistPage.tableRows).toHaveCount(3);
    });

    await test.step('Bước 2 (When): Lọc theo trạng thái SOURCE_SINK_TEST_RETROFIT', async () => {
      await stocklistPage.filterByStatus('SOURCE_SINK_TEST_RETROFIT');
    });

    await test.step('Bước 3 (Then): Chỉ hiển thị trạm cần thực hiện Quelle-Senke-Test', async () => {
      const visibleRows = page.locator('#retrofit-tbody tr:visible');
      await expect(visibleRows).toHaveCount(1);
      await expect(visibleRows.first()).toContainText('RETRO-2026-001');
      await expect(stocklistPage.btnExecuteSourceSink).toBeVisible();
    });
  });
});
