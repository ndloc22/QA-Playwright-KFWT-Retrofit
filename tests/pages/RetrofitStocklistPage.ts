import { Page, Locator, expect } from '@playwright/test';

export class RetrofitStocklistPage {
  readonly page: Page;
  readonly searchInput: Locator;
  readonly statusFilter: Locator;
  readonly tableRows: Locator;
  readonly btnExecuteSourceSink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchInput = page.getByLabel('Stationssuche');
    this.statusFilter = page.getByLabel('Statusfilter');
    this.tableRows = page.locator('#retrofit-tbody tr');
    this.btnExecuteSourceSink = page.getByRole('button', { name: 'Quelle-Senke-Test ausführen' });
  }

  async goto() {
    await this.page.goto('/');
  }

  async filterByStatus(status: string) {
    await this.statusFilter.selectOption(status);
  }

  async searchStation(tpName: string) {
    await this.searchInput.fill(tpName);
  }
}
