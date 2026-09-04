import { test, expect } from '@playwright/test';
import { RetrofitStocklistPage } from '../pages/RetrofitStocklistPage';
import { RetrofitSourceSinkModal } from '../pages/RetrofitSourceSinkModal';

test.describe('E.ON KFWT - Retrofit Source/Sink Test Feature', () => {
  test('TC-KFWT-RETROFIT-02: Thực hiện Quelle-Senke-Test hoàn tất trạm Retrofit @KFWT-363', async ({ page }) => {
    const stocklistPage = new RetrofitStocklistPage(page);
    const modal = new RetrofitSourceSinkModal(page);

    await test.step('Bước 1 (Given): Mở danh sách trạm Retrofit', async () => {
      await stocklistPage.goto();
      await expect(stocklistPage.btnExecuteSourceSink).toBeVisible();
    });

    await test.step('Bước 2 (When): Mở popup và hoàn tất Quelle-Senke-Test', async () => {
      await stocklistPage.btnExecuteSourceSink.click();
      await expect(modal.modalTitle).toBeVisible();
      await modal.completeTest('IEC_104_TELECONTROL', 'Signalübertragung IEC 104 OK');
    });

    await test.step('Bước 3 (Then): Trạng thái trạm chuyển sang COMPLETED', async () => {
      const statusBadge = page.locator('#status-RETRO-2026-001');
      await expect(statusBadge).toHaveText('COMPLETED');
      const actionButton = page.locator('button[data-id="RETRO-2026-001"]');
      await expect(actionButton).toBeDisabled();
      await expect(actionButton).toHaveText('Abgeschlossen');
    });
  });
});
