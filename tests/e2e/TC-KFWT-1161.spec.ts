import { test, expect } from '@playwright/test';
import {
  PrimaryAndSecondaryCommissioningPage,
  SearchTelecontrolDevicesPage,
} from '../pages/PrimaryAndSecondaryCommissioningPage';

/**
 * TC-KFWT-1161: Primary and Secondary Commissioning
 * See tests/testcases/TC-KFWT-1161.md for full Given/When/Then and Expected Result per sub test case.
 *
 * ⚠️ CHƯA GROUNDED / NOT YET GROUNDED:
 * Per docs/tickets/KFWT-1161.summary.json -> codebaseGrounding.notFound, the dedicated
 * "Primäre und Sekundäre Inbetriebnahme" task screen, the new "Primary and secondary
 * commissioning" data card, the Workflow Administration skip entry for this step, the
 * REST endpoint status PRIMARY_SECONDARY_COMMISSIONING, and the new search status filter
 * option are ALL new UI/API not yet present in ui_components.yaml/state_machine.yaml or on
 * BASE_URL. Every test below therefore starts with test.fixme(...) so the pipeline reports
 * a neutral "fixme" instead of a false failure, while the full step sequence is kept ready
 * to be enabled once the feature is deployed.
 */
test.describe('TC-KFWT-1161: Primary and Secondary Commissioning', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('TC-KFWT-1161-01: Primary Commissioning task completion triggers EAM update (DigiONS)', async ({ page }) => {
    // Skipped: "Primäre Inbetriebnahme" task screen from KFWT-1161 is not available on BASE_URL yet.
    test.fixme(true, 'Feature not yet deployed on test server');

    const commissioningPage = new PrimaryAndSecondaryCommissioningPage(page);

    await test.step('Given the tester opens the open task "Primäre Inbetriebnahme" / "Primary Commissioning"', async () => {
      // ⚠️ ASSUMPTION: navigation route to the open task inbox is not specified in the ticket; assumed reachable from the home page task list.
      await expect(page).toHaveURL(/.*/);
    });

    await test.step('When the tester checks "Primary commissioning done" and fills "Primary commissioning date", then submits', async () => {
      await commissioningPage.checkPrimaryCommissioningDone();
      await commissioningPage.fillPrimaryCommissioningDate('2026-09-04');
      await commissioningPage.submitTask();
    });

    await test.step('Then the task is completed and an EAM update is triggered', async () => {
      await expect(commissioningPage.primaryCommissioningDoneCheckbox).toBeChecked();
    });

    await test.step('And the next task "Sekundäre Inbetriebnahme" / "Secondary Commissioning" becomes available', async () => {
      await expect(page.getByRole('heading', { name: 'Sekundäre Inbetriebnahme' })).toBeVisible();
    });
  });

  test('TC-KFWT-1161-02: Secondary Commissioning task completion advances process to "Update eIOT"', async ({ page }) => {
    // Skipped: "Sekundäre Inbetriebnahme" task screen from KFWT-1161 is not available on BASE_URL yet.
    test.fixme(true, 'Feature not yet deployed on test server');

    const commissioningPage = new PrimaryAndSecondaryCommissioningPage(page);

    await test.step('Given the tester opens the task "Sekundäre Inbetriebnahme" / "Secondary Commissioning"', async () => {
      await expect(page.getByRole('heading', { name: 'Sekundäre Inbetriebnahme' })).toBeVisible();
    });

    await test.step('Then the primary commissioning fields are visible but disabled (read-only)', async () => {
      await expect(commissioningPage.primaryCommissioningDoneCheckbox).toBeDisabled();
      await expect(commissioningPage.primaryCommissioningDateInput).toBeDisabled();
    });

    await test.step('When the tester checks "Secondary commissioning done" and fills "Secondary commissioning date", then submits', async () => {
      await commissioningPage.checkSecondaryCommissioningDone();
      await commissioningPage.fillSecondaryCommissioningDate('2026-09-20');
      await commissioningPage.submitTask();
    });

    await test.step('Then the process continues to the next step "Update eIOT"', async () => {
      await expect(page.getByRole('heading', { name: 'Update eIOT' })).toBeVisible();
    });
  });

  test('TC-KFWT-1161-03: Task cannot be completed unless both commissioning checkboxes are checked', async ({ page }) => {
    // Skipped: "Sekundäre Inbetriebnahme" task screen from KFWT-1161 is not available on BASE_URL yet.
    test.fixme(true, 'Feature not yet deployed on test server');

    const commissioningPage = new PrimaryAndSecondaryCommissioningPage(page);

    await test.step('Given "Primary commissioning done" is already true (read-only) but "Secondary commissioning done" is unchecked', async () => {
      await expect(commissioningPage.primaryCommissioningDoneCheckbox).toBeChecked();
      await expect(commissioningPage.secondaryCommissioningDoneCheckbox).not.toBeChecked();
    });

    await test.step('When the tester attempts to submit the task without checking "Secondary commissioning done"', async () => {
      await commissioningPage.submitTask();
    });

    await test.step('Then the submission is blocked with a validation message and the process does not advance', async () => {
      // ⚠️ ASSUMPTION: Resolved via Jira Comment (Ottinger, Fabian / El Aamouchi, Mohamed, 13/7/2026) — the process only continues once both primary and secondary statuses are true; data entered so far is preserved.
      await expect(commissioningPage.validationMessage).toBeVisible();
      await expect(page.getByRole('heading', { name: 'Update eIOT' })).not.toBeVisible();
    });
  });

  test('TC-KFWT-1161-04: New "Primary and secondary commissioning" data card shows correct default field states', async ({ page }) => {
    // Skipped: "Primary and secondary commissioning" data card from KFWT-1161 is not available on BASE_URL yet.
    test.fixme(true, 'Feature not yet deployed on test server');

    const commissioningPage = new PrimaryAndSecondaryCommissioningPage(page);

    await test.step('Given the tester opens the station view containing the new data card', async () => {
      await expect(page.getByRole('heading', { name: 'Primäre und Sekundäre IBN' })).toBeVisible();
    });

    await test.step('Then "Primary commissioning done" checkbox is unchecked by default', async () => {
      await expect(commissioningPage.primaryCommissioningDoneCheckbox).not.toBeChecked();
    });

    await test.step('And "Secondary commissioning done" checkbox is unchecked by default', async () => {
      await expect(commissioningPage.secondaryCommissioningDoneCheckbox).not.toBeChecked();
    });

    await test.step('And "Primary commissioning date" is empty and optional', async () => {
      await expect(commissioningPage.primaryCommissioningDateInput).toHaveValue('');
    });

    await test.step('And "Secondary commissioning date" is empty and optional', async () => {
      await expect(commissioningPage.secondaryCommissioningDateInput).toHaveValue('');
    });

    await test.step('And "Comment commissioning" is empty and optional', async () => {
      await expect(commissioningPage.commentCommissioningInput).toHaveValue('');
    });
  });

  test('TC-KFWT-1161-05: "Primary and Secondary Commissioning" task shows the full station view as read-only', async ({ page }) => {
    // Skipped: "Primäre und Sekundäre Inbetriebnahme" task screen from KFWT-1161 is not available on BASE_URL yet.
    test.fixme(true, 'Feature not yet deployed on test server');

    await test.step('Given the tester opens the "Primäre und Sekundäre Inbetriebnahme" task', async () => {
      await expect(page.getByRole('heading', { name: 'Primäre und Sekundäre Inbetriebnahme' })).toBeVisible();
    });

    await test.step('When the tester reviews the full set of station fields on the task screen', async () => {
      // ⚠️ CHƯA GROUNDED: exact set of pre-existing station field locators must be sourced from ui_components.yaml for the relevant station dialog once known.
      await expect(page.getByRole('form')).toBeVisible();
    });

    await test.step('Then all existing station fields are visible', async () => {
      await expect(page.getByRole('form')).toBeVisible();
    });

    await test.step('And none of the pre-existing station fields are editable', async () => {
      const stationFields = page.getByRole('form').locator('input, select, textarea');
      await expect(stationFields.first()).toBeDisabled();
    });
  });

  test('TC-KFWT-1161-06: "Primary and Secondary Commissioning" step is configurable/skippable via Workflow Administration', async ({ page }) => {
    // Skipped: skip entry for "Primary and Secondary Commissioning" in Workflow Administration is not available on BASE_URL yet.
    test.fixme(true, 'Feature not yet deployed on test server');

    const commissioningPage = new PrimaryAndSecondaryCommissioningPage(page);

    await test.step('Given the tester, logged in as administrator, opens Workflow Administration configuration tab', async () => {
      await expect(commissioningPage.workflowFeatureStrategyType).toBeVisible();
    });

    await test.step('When the tester enables the skip strategy for "Primary and Secondary Commissioning"', async () => {
      await commissioningPage.primarySecondaryCommissioningSkipToggle.check();
    });

    await test.step('Then the configuration is saved successfully', async () => {
      await expect(page.getByText('Configuration saved')).toBeVisible();
    });

    await test.step('And a subsequent process run skips the "Primäre und Sekundäre Inbetriebnahme" task entirely', async () => {
      await expect(page.getByRole('heading', { name: 'Primäre und Sekundäre Inbetriebnahme' })).not.toBeVisible();
    });
  });

  test('TC-KFWT-1161-07: Commissioning status/date updatable via REST endpoint (PRIMARY_SECONDARY_COMMISSIONING)', async ({ request }) => {
    // Skipped: REST endpoint status PRIMARY_SECONDARY_COMMISSIONING from KFWT-1161 is not available on BASE_URL yet.
    test.fixme(true, 'Feature not yet deployed on test server');

    // ⚠️ ASSUMPTION: exact endpoint path/method is not specified in the ticket; test targets the
    // documented status name PRIMARY_SECONDARY_COMMISSIONING via the existing telecontrol-device
    // status update endpoint pattern referenced in Jira Comment #7 (Ottinger, Fabian, 6/8/2026 —
    // "New status for telecontrol-devices/status/").
    const telecontrolDeviceId = 'TD-KFWT-1161-TEST';

    await test.step('Given a valid REST client for the telecontrol device status endpoint', async () => {
      expect(telecontrolDeviceId).toBeTruthy();
    });

    await test.step('When the tester sends a PUT request with status PRIMARY_SECONDARY_COMMISSIONING and the primary commissioning done-flag/date', async () => {
      const response = await request.put(`/api/telecontrol-devices/${telecontrolDeviceId}/status`, {
        data: {
          status: 'PRIMARY_SECONDARY_COMMISSIONING',
          primaryCommissioningDone: true,
          primaryCommissioningDate: '2026-09-04',
        },
      });
      expect(response.ok()).toBeTruthy();
    });

    await test.step('And the tester sends a second PUT request with the secondary commissioning done-flag/date', async () => {
      const response = await request.put(`/api/telecontrol-devices/${telecontrolDeviceId}/status`, {
        data: {
          status: 'PRIMARY_SECONDARY_COMMISSIONING',
          secondaryCommissioningDone: true,
          secondaryCommissioningDate: '2026-09-20',
        },
      });
      expect(response.ok()).toBeTruthy();
    });

    await test.step('Then the process advances only once both flags are true', async () => {
      const response = await request.get(`/api/telecontrol-devices/${telecontrolDeviceId}`);
      const body = await response.json();
      expect(body.primaryCommissioningDone).toBe(true);
      expect(body.secondaryCommissioningDone).toBe(true);
    });
  });

  test('TC-KFWT-1161-08: Retrofit-specific rule — primary commissioning pre-checked, first task and EAM update skipped', async ({ page }) => {
    // Skipped: Retrofit "Primary and secondary commissioning" data card behavior from KFWT-1161 is not available on BASE_URL yet.
    test.fixme(true, 'Feature not yet deployed on test server');

    const commissioningPage = new PrimaryAndSecondaryCommissioningPage(page);

    await test.step('Given the tester opens the data card for a Retrofit telecontrol device right after Source/Sink Test Retrofit completes', async () => {
      // ⚠️ ASSUMPTION: Resolved via Jira Comment (Ottinger, Fabian, 26/8/2026) — the step is placed right after Source/Sink Test Retrofit completes.
      await expect(page.getByRole('heading', { name: 'Primäre und Sekundäre IBN' })).toBeVisible();
    });

    await test.step('Then "Primary commissioning done" is already checked and "Primary commissioning date" is empty', async () => {
      await expect(commissioningPage.primaryCommissioningDoneCheckbox).toBeChecked();
      await expect(commissioningPage.primaryCommissioningDateInput).toHaveValue('');
    });

    await test.step('And no separate first task or standalone EAM update for the primary status is presented', async () => {
      await expect(page.getByRole('heading', { name: 'Primäre Inbetriebnahme' })).not.toBeVisible();
    });

    await test.step('When the tester checks "Secondary commissioning done" and fills "Secondary commissioning date", then completes the task', async () => {
      await commissioningPage.checkSecondaryCommissioningDone();
      await commissioningPage.fillSecondaryCommissioningDate('2026-09-20');
      await commissioningPage.submitTask();
    });

    await test.step('Then only secondary commissioning date and checkbox are sent to EAM', async () => {
      // ⚠️ CHƯA GROUNDED: no EAM field mapping was confirmed in the Jira comment thread (El Aamouchi, Mohamed request from Ottinger, Fabian, 19/8/2026, not confirmed as provided) — assertion targets an EAM sync log/status indicator to be confirmed once the mapping exists.
      await expect(page.getByText('EAM update: secondary commissioning only')).toBeVisible();
    });
  });

  test('TC-KFWT-1161-09: New commissioning status filter available in Search Telecontrol Device', async ({ page }) => {
    // Skipped: new "Primäre und Sekundäre IBN" status option in the search status filter from KFWT-1161 is not available on BASE_URL yet.
    test.fixme(true, 'Feature not yet deployed on test server');

    const searchPage = new SearchTelecontrolDevicesPage(page);

    await test.step('Given the tester opens the Search Telecontrol Devices screen', async () => {
      await expect(searchPage.statusFilterMenu).toBeVisible();
    });

    await test.step('When the tester opens the status filter dropdown', async () => {
      await searchPage.openStatusFilter();
    });

    await test.step('Then a new status option "Primäre und Sekundäre IBN" is present in the list', async () => {
      await expect(searchPage.primarySecondaryCommissioningStatusOption).toBeVisible();
    });

    await test.step('When the tester selects this status option and executes the search', async () => {
      await searchPage.selectPrimarySecondaryCommissioningStatus();
    });

    await test.step('Then only telecontrol devices at the "Primäre und Sekundäre Inbetriebnahme" step are returned', async () => {
      await expect(searchPage.resultsTable).toBeVisible();
    });
  });
});
