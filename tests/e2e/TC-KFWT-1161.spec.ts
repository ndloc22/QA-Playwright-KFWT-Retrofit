import { test, expect } from '@playwright/test';
import { PrimarySecondaryCommissioningPage } from '../pages/PrimarySecondaryCommissioningPage';

// ⚠️ CHƯA GROUNDED / NOT YET GROUNDED:
// The task "Primäre und Sekundäre Inbetriebnahme" / "Primary and Secondary Commissioning"
// (KFWT-1161) is not present in `docs/specs/codebase/ui_components.yaml` or
// `docs/specs/codebase/state_machine.yaml`, and the mocked BASE_URL app (demo-server.js /
// demo-app) does not implement the DigiONS/Retrofit workflow UI at all. The ticket is still in
// "Code Review" status, confirming the feature has not shipped yet. All locators in
// `PrimarySecondaryCommissioningPage.ts` are unverified placeholders and must be re-grounded via
// Playwright "Pick locator" / "Record new" once the feature is deployed on the test server.

test.describe('TC-KFWT-1161: Primary and Secondary Commissioning', () => {
  test('TC-KFWT-1161-01: UI & Default State verification — task opens with read-only station fields and both commissioning checkboxes unchecked', async ({ page }) => {
    // Skipped: "Primäre und Sekundäre Inbetriebnahme" task from KFWT-1161 is not available on
    // BASE_URL yet (feature still in Code Review, absent from docs/specs/codebase/*).
    test.fixme(true, 'Feature not yet deployed on test server');

    const commissioningTask = new PrimarySecondaryCommissioningPage(page);

    await test.step('Given the user (role "Betrieb") opens the task "Primäre und Sekundäre Inbetriebnahme" for a station', async () => {
      await commissioningTask.openTask();
    });

    await test.step('Then all existing station fields are visible but disabled (read-only)', async () => {
      await expect(commissioningTask.stationFieldsContainer).toBeVisible();
      await expect(commissioningTask.primaryCommissioningDateInput).toBeDisabled();
    });

    await test.step('And the new data card "Primary and secondary commissioning" / "Primäre und Sekundäre IBN" is shown with both checkboxes unchecked by default', async () => {
      await expect(commissioningTask.dataCard).toBeVisible();
      await expect(commissioningTask.primaryCommissioningDoneCheckbox).not.toBeChecked();
      await expect(commissioningTask.secondaryCommissioningDoneCheckbox).not.toBeChecked();
    });
  });

  test('TC-KFWT-1161-02: Negative / Validation verification — completing the task is blocked when both commissioning checkboxes are not checked', async ({ page }) => {
    // Skipped: "Primäre und Sekundäre Inbetriebnahme" task from KFWT-1161 is not available on
    // BASE_URL yet (feature still in Code Review, absent from docs/specs/codebase/*).
    test.fixme(true, 'Feature not yet deployed on test server');

    const commissioningTask = new PrimarySecondaryCommissioningPage(page);

    await test.step('Given the user (role "Betrieb") has opened the task "Primäre und Sekundäre Inbetriebnahme" with both commissioning checkboxes unchecked', async () => {
      await commissioningTask.openTask();
      await expect(commissioningTask.primaryCommissioningDoneCheckbox).not.toBeChecked();
      await expect(commissioningTask.secondaryCommissioningDoneCheckbox).not.toBeChecked();
    });

    await test.step('When the user attempts to complete the task without checking either commissioning checkbox', async () => {
      // Expected Result: the "Weiter" (complete) action is blocked because AC requires both
      // "Primärtechnisch in Betrieb genommen" and "Sekundärtechnisch in Betrieb genommen" to be checked.
      await expect(commissioningTask.completeTaskButton).toBeDisabled();
      await expect(commissioningTask.commissioningValidationError).toBeVisible();
    });
  });

  test('TC-KFWT-1161-03: Positive / Happy Path verification — checking both commissioning checkboxes and completing the task proceeds to "Update eIOT"', async ({ page }) => {
    // Skipped: "Primäre und Sekundäre Inbetriebnahme" task from KFWT-1161 is not available on
    // BASE_URL yet (feature still in Code Review, absent from docs/specs/codebase/*).
    test.fixme(true, 'Feature not yet deployed on test server');

    const commissioningTask = new PrimarySecondaryCommissioningPage(page);

    await test.step('Given the user (role "Betrieb") has opened the task "Primäre und Sekundäre Inbetriebnahme" for a station', async () => {
      await commissioningTask.openTask();
    });

    await test.step('When the user checks "Primärtechnisch in Betrieb genommen" and "Sekundärtechnisch in Betrieb genommen", then completes the task', async () => {
      await commissioningTask.checkPrimaryCommissioningDone();
      await commissioningTask.checkSecondaryCommissioningDone();

      // Expected Result: with both checkboxes checked, the task can now be completed.
      await expect(commissioningTask.completeTaskButton).toBeEnabled();
      await commissioningTask.completeTask();
    });

    await test.step('Then the process continues with the next step "Update eIOT"', async () => {
      // Expected Result: per AC, after completing the task the process proceeds to "Update eIOT".
      await expect(commissioningTask.nextStepIndicator).toBeVisible();
    });
  });

  test('TC-KFWT-1161-04: Configuration / Skippable verification — task can be configured as skippable in Workflow Administration', async ({ page }) => {
    // Skipped: Workflow Administration configuration for "Primäre und Sekundäre Inbetriebnahme"
    // from KFWT-1161 is not available on BASE_URL yet (feature still in Code Review, absent from
    // docs/specs/codebase/*).
    test.fixme(true, 'Feature not yet deployed on test server');

    const commissioningTask = new PrimarySecondaryCommissioningPage(page);

    await test.step('Given an administrator opens "Workflow Administration" for the process containing the task "Primäre und Sekundäre Inbetriebnahme"', async () => {
      await commissioningTask.openTask();
      await commissioningTask.openWorkflowAdministration();
    });

    await test.step('When the administrator locates the task\'s configuration entry and enables the "Skippable" option', async () => {
      await commissioningTask.enableTaskSkippable();
    });

    await test.step('Then the task "Primäre und Sekundäre Inbetriebnahme" is confirmed as configurable to be skipped', async () => {
      // Expected Result: matches AC + BPMN diagram (4064324_higher_res.png) which mark this
      // task as Skippable.
      await expect(commissioningTask.taskSkippableToggle).toBeChecked();
    });
  });
});
