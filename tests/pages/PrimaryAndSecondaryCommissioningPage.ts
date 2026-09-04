import { Page, Locator } from '@playwright/test';

/**
 * Page Object for the new "Primary and Secondary Commissioning" feature (KFWT-1161).
 *
 * ⚠️ CHƯA GROUNDED / NOT YET GROUNDED:
 * None of the locators below exist in `docs/specs/codebase/ui_components.yaml` yet
 * (see `codebaseGrounding.notFound` in docs/tickets/KFWT-1161.summary.json) — the
 * dedicated task screen, the "Primary and secondary commissioning" data card, the
 * Workflow Administration entry for this step, and the REST endpoint are all new
 * UI/API that has not been built/deployed on BASE_URL yet.
 *
 * Every locator below is marked with `// ⚠️ TODO: verify with Pick Locator/Record`
 * and MUST be confirmed against the real application (or an updated
 * ui_components.yaml) once the feature is deployed, before removing the
 * `test.fixme(...)` guards in tests/e2e/TC-KFWT-1161.spec.ts.
 */
export class PrimaryAndSecondaryCommissioningPage {
  readonly page: Page;

  // --- "Primary and secondary commissioning" / "Primäre und Sekundäre IBN" data card ---
  readonly primaryCommissioningDoneCheckbox: Locator; // ⚠️ TODO: verify with Pick Locator/Record — "Primary commissioning done" / "Primärtechnisch in Betrieb genommen"
  readonly secondaryCommissioningDoneCheckbox: Locator; // ⚠️ TODO: verify with Pick Locator/Record — "Secondary commissioning done" / "Sekundärtechnisch in Betrieb genommen"
  readonly primaryCommissioningDateInput: Locator; // ⚠️ TODO: verify with Pick Locator/Record — "Primary commissioning date" / "Datum der primärtechnischen Inbetriebnahme"
  readonly secondaryCommissioningDateInput: Locator; // ⚠️ TODO: verify with Pick Locator/Record — "Secondary commissioning date" / "Datum der sekundärtechnischen Inbetriebnahme"
  readonly commentCommissioningInput: Locator; // ⚠️ TODO: verify with Pick Locator/Record — "Comment commissioning" / "Kommentar Inbetriebnahme"

  // --- Task actions ---
  readonly completeTaskButton: Locator; // ⚠️ TODO: verify with Pick Locator/Record — submit/complete task button
  readonly validationMessage: Locator; // ⚠️ TODO: verify with Pick Locator/Record — validation message shown when task cannot be completed

  // --- Workflow Administration (existing dialog per ui_components.yaml, new entry inside it) ---
  readonly workflowFeatureStrategyType: Locator; // Grounded: docs/specs/codebase/ui_components.yaml -> WorkflowAdministration.xhtml -> id "workflowFeatureStrategyType"
  readonly primarySecondaryCommissioningSkipToggle: Locator; // ⚠️ TODO: verify with Pick Locator/Record — new skip entry for "Primary and Secondary Commissioning"

  constructor(page: Page) {
    this.page = page;

    this.primaryCommissioningDoneCheckbox = page.getByLabel('Primary commissioning done');
    this.secondaryCommissioningDoneCheckbox = page.getByLabel('Secondary commissioning done');
    this.primaryCommissioningDateInput = page.getByLabel('Primary commissioning date');
    this.secondaryCommissioningDateInput = page.getByLabel('Secondary commissioning date');
    this.commentCommissioningInput = page.getByLabel('Comment commissioning');

    this.completeTaskButton = page.getByRole('button', { name: 'Complete Task' });
    this.validationMessage = page.getByRole('alert');

    this.workflowFeatureStrategyType = page.locator('#workflowFeatureStrategyType');
    this.primarySecondaryCommissioningSkipToggle = page.getByLabel('Primary and Secondary Commissioning');
  }

  async checkPrimaryCommissioningDone() {
    await this.primaryCommissioningDoneCheckbox.check();
  }

  async checkSecondaryCommissioningDone() {
    await this.secondaryCommissioningDoneCheckbox.check();
  }

  async fillPrimaryCommissioningDate(date: string) {
    await this.primaryCommissioningDateInput.fill(date);
  }

  async fillSecondaryCommissioningDate(date: string) {
    await this.secondaryCommissioningDateInput.fill(date);
  }

  async submitTask() {
    await this.completeTaskButton.click();
  }
}

/**
 * Page Object for the existing "Search Telecontrol Devices" screen, extended with
 * the new commissioning status filter option required by KFWT-1161.
 *
 * Grounded base: docs/specs/codebase/ui_components.yaml -> SearchTelecontrolDevices.xhtml
 * (`statusFilterMenu`, `globalFilter`). The new status OPTION itself
 * ("Primäre und Sekundäre IBN") is NOT yet present in that grounded dialog spec —
 * see `// ⚠️ TODO` below.
 */
export class SearchTelecontrolDevicesPage {
  readonly page: Page;

  readonly statusFilterMenu: Locator; // Grounded: ui_components.yaml -> SearchTelecontrolDevices.xhtml -> id "statusFilterMenu"
  readonly globalFilter: Locator; // Grounded: ui_components.yaml -> SearchTelecontrolDevices.xhtml -> id "globalFilter"
  readonly primarySecondaryCommissioningStatusOption: Locator; // ⚠️ TODO: verify with Pick Locator/Record — new status option once added to statusFilterMenu
  readonly resultsTable: Locator; // ⚠️ TODO: verify with Pick Locator/Record — search results data table

  constructor(page: Page) {
    this.page = page;

    this.statusFilterMenu = page.locator('#statusFilterMenu');
    this.globalFilter = page.locator('#globalFilter');
    this.primarySecondaryCommissioningStatusOption = page.getByRole('option', {
      name: 'Primäre und Sekundäre IBN',
    });
    this.resultsTable = page.getByRole('table');
  }

  async openStatusFilter() {
    await this.statusFilterMenu.click();
  }

  async selectPrimarySecondaryCommissioningStatus() {
    await this.primarySecondaryCommissioningStatusOption.click();
  }
}
