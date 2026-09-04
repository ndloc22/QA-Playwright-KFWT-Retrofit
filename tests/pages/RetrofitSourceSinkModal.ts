import { Page, Locator } from '@playwright/test';

export class RetrofitSourceSinkModal {
  readonly page: Page;
  readonly modalTitle: Locator;
  readonly signalTypeSelect: Locator;
  readonly resultInput: Locator;
  readonly submitButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.modalTitle = page.locator('#modal-title');
    this.signalTypeSelect = page.locator('#test-signal-type');
    this.resultInput = page.locator('#test-result-input');
    this.submitButton = page.getByRole('button', { name: 'Test erfolgreich abschließen' });
  }

  async completeTest(signalType: string, note: string) {
    await this.signalTypeSelect.selectOption(signalType);
    await this.resultInput.fill(note);
    await this.submitButton.click();
  }
}
