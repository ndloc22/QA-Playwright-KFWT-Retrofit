import { Page, Locator } from '@playwright/test';

/**
 * Page Object for the new "Primäre und Sekundäre Inbetriebnahme" / "Primary and Secondary
 * Commissioning" process task introduced by KFWT-1161.
 *
 * ⚠️ CHÚA GROUNDED / NOT YET GROUNDED:
 * None of the locators below could be verified against `docs/specs/codebase/ui_components.yaml`
 * or a live BASE_URL screen, because the feature is not yet implemented/deployed (ticket status:
 * "Code Review"). All selectors are best-effort guesses derived from the AC field labels and MUST
 * be re-verified with Playwright "Pick locator" / "Record new" (or a refreshed
 * `npm run generate-codebase-specs`) before this Page Object is trusted for real assertions.
 */
export class PrimarySecondaryCommissioningPage {
  readonly page: Page;

  // Data card "Primary and secondary commissioning" / "Primäre und Sekundäre IBN"
  readonly dataCard: Locator;
  // ⚠️ TODO: verify real accessible name once field is grounded in ui_components.yaml
  readonly primaryCommissioningDoneCheckbox: Locator;
  readonly secondaryCommissioningDoneCheckbox: Locator;
  readonly primaryCommissioningDateInput: Locator;
  readonly secondaryCommissioningDateInput: Locator;
  readonly commentCommissioningInput: Locator;

  // Task actions
  readonly completeTaskButton: Locator;
  readonly skipTaskButton: Locator;

  // TC-KFWT-1161-01: existing station fields must be read-only while this task is open
  readonly stationFieldsContainer: Locator;

  // TC-KFWT-1161-02: validation feedback when required checkboxes are not checked
  readonly commissioningValidationError: Locator;

  // TC-KFWT-1161-03: next process step indicator after successful completion
  readonly nextStepIndicator: Locator;

  // TC-KFWT-1161-04: Workflow Administration screen — configure this task as skippable
  // ⚠️ TODO: verify real navigation link/label once Workflow Administration screen exists on BASE_URL
  readonly workflowAdministrationLink: Locator;
  readonly taskSkippableToggle: Locator;

  constructor(page: Page) {
    this.page = page;

    // ⚠️ TODO: confirm exact data card heading/testid once dialog exists on BASE_URL
    this.dataCard = page.getByRole('region', { name: 'Primäre und Sekundäre IBN' });

    this.primaryCommissioningDoneCheckbox = page.getByLabel('Primärtechnisch in Betrieb genommen');
    this.secondaryCommissioningDoneCheckbox = page.getByLabel('Sekundärtechnisch in Betrieb genommen');
    this.primaryCommissioningDateInput = page.getByLabel('Datum der primärtechnischen Inbetriebnahme');
    this.secondaryCommissioningDateInput = page.getByLabel('Datum der sekundärtechnischen Inbetriebnahme');
    this.commentCommissioningInput = page.getByLabel('Kommentar Inbetriebnahme');

    this.completeTaskButton = page.getByRole('button', { name: 'Weiter' });
    this.skipTaskButton = page.getByRole('button', { name: 'Überspringen' });

    // ⚠️ TODO: confirm exact container role/testid for the read-only station fields section
    this.stationFieldsContainer = page.getByRole('region', { name: 'Station' });

    // ⚠️ TODO: confirm exact validation error selector/testid once dialog exists on BASE_URL
    this.commissioningValidationError = page.getByRole('alert');

    this.nextStepIndicator = page.getByText('Update eIOT');

    // ⚠️ TODO: confirm exact Workflow Administration nav link label and admin screen locators
    this.workflowAdministrationLink = page.getByRole('link', { name: 'Workflow Administration' });
    this.taskSkippableToggle = page.getByRole('checkbox', { name: 'Skippable' });
  }

  async openTask() {
    // ⚠️ ASSUMPTION: navigation path to the task is not yet defined in ui_components.yaml;
    // using a placeholder route until the real process task URL/deep-link is grounded.
    await this.page.goto('/');
  }

  async checkPrimaryCommissioningDone() {
    await this.primaryCommissioningDoneCheckbox.check();
  }

  async checkSecondaryCommissioningDone() {
    await this.secondaryCommissioningDoneCheckbox.check();
  }

  async completeTask() {
    await this.completeTaskButton.click();
  }

  async openWorkflowAdministration() {
    await this.workflowAdministrationLink.click();
  }

  async enableTaskSkippable() {
    await this.taskSkippableToggle.check();
  }
}
