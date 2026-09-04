# TC-KFWT-1161: Primary and Secondary Commissioning

**Jira Ticket**: [KFWT-1161](https://jira.eon.com/browse/KFWT-1161) — Primary and Secondary Commissioning
**Status**: Code Review
**Priority**: Critical

## Analyze-Story Pre-flight Summary

### Multimodal Inspection
- `story-overview.png` (full-page ticket capture): confirms Description/AC text — new role "Betrieb" (operation technician) must document primary/secondary commissioning status in a dedicated process task before the process continues to EAM update. No additional fields beyond the text description were visible.
- `4064324_higher_res.png` (BPMN excerpt): shows a new "Primary and Secondary" task (tagged `KFWT-1161`, assignee "Ottinger, Fabian") introduced right after the existing task lane, followed by a gateway branching on "Primary + Secondary commissioning" (continues to "Update eIOT" → "Update EAM + iBet information" → End Event) vs. "Only primary commissioning checked" (loops back to a separate "Update EAM" task). Both the new task and the surrounding "Update eIOT"/"Update EAM" tasks are marked **Skippable** and one path shows annotation "Mit REST Endpunkt" (with REST endpoint) — confirms AC bullet "task can be skipped" and "updateable via endpoint".
- `4099165_NewFlow_confirm.png` (process diagram excerpt, DigiONS/RetroFit swimlane): shows the new task "Primary and Secondary Commissioning" (green highlight) inserted directly after "Configure updated technical place (UI)" and before the existing hidden system task "Update status" / "EAM" step, matching AC bullet "new task introduced after task 'Configure updated technical Type (UI)'". Confirms placement in the real 17-step process (see `docs/specs/process.yaml`, step `id: 12` = "Configure updated technical place").

### Codebase Specs Lookup
- `docs/specs/process.yaml`: step `12` ("Configure updated technical place", responsible Central-Control-Engineering (ZLT)) exists and is followed today by steps `13` (Communication e.IoT) / `14a` / `16` / `17` (Transfer to EAM). **No step for "Primäre und Sekundäre Inbetriebnahme" / "Primary and Secondary Commissioning" exists yet** in the 17-step process definition.
- `docs/specs/codebase/state_machine.yaml`: no task/transition named "Primäre Inbetriebnahme", "Sekundäre Inbetriebnahme", or "Primary and Secondary Commissioning" found.
- `docs/specs/codebase/ui_components.yaml`: no dialog with the data card "Primary and secondary commissioning" / "Primäre und Sekundäre IBN" or the fields (`Primärtechnisch in Betrieb genommen`, `Sekundärtechnisch in Betrieb genommen`, `Datum der primärtechnischen Inbetriebnahme`, `Datum der sekundärtechnischen Inbetriebnahme`, `Kommentar Inbetriebnahme`) found.
- `demo-app/` (mocked BASE_URL app served by `demo-server.js`) is a Jira-ticket sync/demo tool, not the real DigiONS/Retrofit workflow UI — the described task/dialog cannot be observed there.

### Conclusion
🟢 **STORY SAFE TO GENERATE TEST** (no business-logic Blocker — Description, AC, and diagrams are consistent with each other). However, the feature is **not yet implemented/deployed** on the codebase specs nor on `BASE_URL` (`Code Review` status confirms it is still in development). Per the `test.fixme` safeguard rule, the generated spec must guard with `test.fixme('Feature not yet deployed on test server')` instead of asserting against a non-existent UI, to avoid a false-red failure.

⚠️ WARNING items to keep in mind once the feature is deployed and this test is re-enabled:
- ⚠️ ASSUMPTION: exact locator ids/labels for the new data card fields are not yet grounded in `ui_components.yaml` — must be re-verified via Pick Locator/Record once the feature ships (see `// ⚠️ TODO` markers in `PrimarySecondaryCommissioningPage.ts`).
- ⚠️ ASSUMPTION: per the implementation hint, DigiONS + Retrofit flows have **two** tasks ("Primäre Inbetriebnahme" then "Sekundäre Inbetriebnahme") with the option to skip the second task if all commissioning data is already provided; for pure Retrofit, the first task + EAM Update step is skipped entirely (primary commissioning checkbox pre-checked, date empty).

---

## Test Cases (Modular)

Per the Modular Test Cases standard, this story is decomposed into 4 independent sub test cases,
each covering exactly one business aspect. Common precondition shared by all sub test cases below.

### Common Precondition
- A DigiONS/Retrofit process instance has reached the task "Configure updated technical place (UI)" and completed it.
- The next task in the process is "Primäre und Sekundäre Inbetriebnahme" / "Primary and Secondary Commissioning", assigned to role "Betrieb" (operation technician).

---

### TC-KFWT-1161-01: UI & Default State verification

- **Title**: Task "Primäre und Sekundäre Inbetriebnahme" opens with all station fields read-only and both commissioning checkboxes unchecked by default
- **Jira Ticket**: KFWT-1161

**Given** the user (role "Betrieb") opens the task "Primäre und Sekundäre Inbetriebnahme" for a station.

**When** the task view is rendered.

**Then / Expected Result**:
- The task opens in full view — all existing station fields are visible but disabled (read-only, not editable).
- A new data card "Primary and secondary commissioning" / "Primäre und Sekundäre IBN" is shown at the bottom with:
  - Checkbox "Primärtechnisch in Betrieb genommen" (Primary commissioning done), default **unchecked**.
  - Checkbox "Sekundärtechnisch in Betrieb genommen" (Secondary commissioning done), default **unchecked**.
  - Date field "Datum der primärtechnischen Inbetriebnahme" (Primary commissioning date), optional.
  - Date field "Datum der sekundärtechnischen Inbetriebnahme" (Secondary commissioning date), optional.
  - Comment field "Kommentar Inbetriebnahme" (Comment commissioning), optional.

---

### TC-KFWT-1161-02: Negative / Validation verification

- **Title**: Completing the task is blocked when the two required commissioning checkboxes are not both checked
- **Jira Ticket**: KFWT-1161

**Given** the user (role "Betrieb") has opened the task "Primäre und Sekundäre Inbetriebnahme" for a station, with both commissioning checkboxes still unchecked.

**When** the user attempts to complete the task ("Weiter"/Complete) without checking either "Primärtechnisch in Betrieb genommen" or "Sekundärtechnisch in Betrieb genommen".

**Then / Expected Result**:
- The task cannot be completed — the "Complete"/"Weiter" action is blocked (button disabled or validation error shown), because AC requires both "Primärtechnisch in Betrieb genommen" and "Sekundärtechnisch in Betrieb genommen" to be checked.

---

### TC-KFWT-1161-03: Positive / Happy Path verification

- **Title**: Checking both commissioning checkboxes and completing the task proceeds to "Update eIOT"
- **Jira Ticket**: KFWT-1161

**Given** the user (role "Betrieb") has opened the task "Primäre und Sekundäre Inbetriebnahme" for a station.

**When** the user checks "Primärtechnisch in Betrieb genommen" and "Sekundärtechnisch in Betrieb genommen", then completes the task.

**Then / Expected Result**:
- The task completes successfully.
- The process view/timeline shows the next active step as "Update eIOT" (per AC: "After completing the task, the process shall continue with the next step 'Update eIOT'").

---

### TC-KFWT-1161-04: Configuration / Skippable verification

- **Title**: Task "Primäre und Sekundäre Inbetriebnahme" can be configured as skippable in Workflow Administration
- **Jira Ticket**: KFWT-1161

**Given** an administrator opens "Workflow Administration" for the process containing the task "Primäre und Sekundäre Inbetriebnahme".

**When** the administrator locates the task's configuration entry and toggles/enables the "Skippable" option.

**Then / Expected Result**:
- The task "Primäre und Sekundäre Inbetriebnahme" is shown/confirmed as configurable to be skipped, matching AC + BPMN diagram (`4064324_higher_res.png`) which mark this task as **Skippable**.

---

### Notes (apply to all TC-KFWT-1161-0X above)
- ⚠️ ASSUMPTION: per implementation hint, this flow can also be completed via REST endpoint with status name `PRIMARY_SECONDARY_COMMISSIONING` (not covered by these UI-based test cases; would require a separate API-level test case once the endpoint is deployed).
- These tests are currently guarded with `test.fixme(...)` in `tests/e2e/TC-KFWT-1161.spec.ts` (one guard per TC-KFWT-1161-0X block) because the feature is not yet present on `BASE_URL` / in `docs/specs/codebase/`. Remove the corresponding `test.fixme` line once the feature is deployed and locators have been re-grounded.
