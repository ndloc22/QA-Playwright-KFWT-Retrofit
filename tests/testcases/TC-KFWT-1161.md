# TC-KFWT-1161: Primary and Secondary Commissioning

**Jira Ticket**: [KFWT-1161](https://jira.eon.com/browse/KFWT-1161) — Primary and Secondary Commissioning
**Source**: `docs/tickets/KFWT-1161.md` / `docs/tickets/KFWT-1161.summary.json`

---

## 📋 Pre-flight Analysis Summary (`/analyze-story`)

### Multimodal Inspection
- `4064324_higher_res.png`: BPMN excerpt of the new "Primary and Secondary" user task, marked `Mit REST Endpunkt` (with REST endpoint) and `Skippable`. Confirms the task only truly progresses once **both** primary and secondary commissioning flags are `true` (retry loop back to `Update EAM` while only primary is done), and every downstream EAM/eIOT step is individually skippable.
- `4099165_NewFlow_confirm.png`: Retrofit placement diagram. Confirms the new "Primary and Secondary Commissioning" node is inserted right after `Source/Sink Test Retrofit` completes (`is RetrofitStation Incomplete? = complete`), and `Communication EIOT` is removed from its old position next to `Configure updated technical place`.

### Comment Resolution Authority (resolved via Jira comments — supersede Description/AC where noted)
| # | Topic | Resolved by | Date | Decision used for tests |
| :-: | :--- | :--- | :--- | :--- |
| 1 | Split combined date field | Jäger, Svenja | 13/7/2026 | Separate `Datum der primärtechnischen Inbetriebnahme` and `Datum der sekundärtechnischen Inbetriebnahme` fields exist (not one combined date field). |
| 2 | Meaning of "keep first info if one true/one false" | Ottinger, Fabian / El Aamouchi, Mohamed | 13/7/2026 | Task cannot proceed until **both** primary and secondary statuses are `true`; data from either side is stored as soon as received. |
| 3 | Number of tasks / skip of 2nd task | Ottinger, Fabian | 19/8/2026 | Exactly two tasks (Primary IBN, Secondary IBN, EAM update counted as part of these tasks); fixed order primary → secondary; **skip-if-all-data-provided proposal for the 2nd task is REJECTED**. |
| 4 | Skip secondary task if data already available | Ottinger, Fabian | 19/8/2026 | Not possible — secondary IBN always arrives via PUT from the operation technician app or central grid control UI. |
| 5 | Placement in Retrofit flow | Ottinger, Fabian | 26/8/2026 | Step sits right after `Source/Sink Test (Retrofit)` completes. |
| 6 | e.IoT update placement | Ottinger, Fabian | 28/8/2026 | e.IoT update happens after `Source/Sink Test` in Retrofit (not right after primary commissioning). |

**Open questions NOT resolved (excluded from test scope, no TC created for these until PO/Tester confirms):**
- Behavior when commissioning is set `true` then later `false` again via a subsequent call.
- Whether the `Betrieb` role can only view (read-only) vs edit in Search/UI, and whether "Nachrichtentechnik und Fernwirkanbindung - Leitsystem" must be hidden for that role.
- EAM field mapping for the new commissioning fields (requested from El Aamouchi, Mohamed, not confirmed as provided).
- What happens if EAM data is missing when the Primary/Secondary Commissioning step is reached (Ottinger's idea to ask central grid control to manually enter a date was **not confirmed as final**).

### Codebase Grounding (`docs/specs/codebase/*.yaml`)
- `ui_components.yaml`: `SearchTelecontrolDevices` dialog exists today with a real `statusFilterMenu` field — reused as the grounded selector base for TC-09. **No** dialog/data card exists yet for "Primary and secondary commissioning" (checkboxes/date/comment fields) — this UI is entirely new.
- `state_machine.yaml`: `CreateTelecontrolDeviceDigiOnsRetrofit` process exists with `S51-f17 Configure updated technical place`, `S50-f17 Source/Sink Test Retrofit`, etc. **No** task node named `Primäre und Sekundäre Inbetriebnahme` / `Primäre Inbetriebnahme` / `Sekundäre Inbetriebnahme` / `Update eIOT`, and **no** status enum `PRIMARY_SECONDARY_COMMISSIONING`, and **no** role `Betrieb` exist in the modeled process yet.

### Conclusion
🟢 **STORY SAFE TO GENERATE TESTS** (no unresolved Blocker after applying Comment Resolution Authority — the only remaining ambiguity items above are explicitly out of scope / not tested).

⚠️ However, per **codebase grounding**, the feature's dedicated UI (new task, new data card, new status filter option, new REST status) is **not yet present** on the codebase/test server (`notFound` in `docs/specs/codebase/`). Per the Feature-not-deployed safeguard, every test below carries `test.fixme(true, 'Feature not yet deployed on test server')` as its first statement so the pipeline reports a neutral "fixme" instead of a false failure, while the full Given/When/Then steps are still written out ready to be enabled once the feature ships.

`// ⚠️ ASSUMPTION:` markers are used throughout for details inferred from the Comment Resolution Authority rather than from Description/AC text directly (see spec file).

---

## Test Design Analysis — Independent Business Aspects Identified

| TC | Aspect | Why independent |
| :-- | :--- | :--- |
| TC-KFWT-1161-01 | Happy path — Primary Commissioning task completion triggers EAM update | Core happy-path flow for the first of the two tasks |
| TC-KFWT-1161-02 | Happy path — Secondary Commissioning task completion advances process to "Update eIOT" | Distinct happy-path flow for the second task and its downstream transition |
| TC-KFWT-1161-03 | Negative/Validation — task blocked unless both commissioning checkboxes are checked | Validation/business rule distinct from the happy path |
| TC-KFWT-1161-04 | UI & default state — new "Primary and secondary commissioning" data card fields | UI-only aspect (default values), independent of task completion logic |
| TC-KFWT-1161-05 | UI — task shows full read-only station view | Distinct UI aspect: visibility vs editability of unrelated station fields |
| TC-KFWT-1161-06 | Admin configuration — step must be configurable/skippable via Workflow Administration | Configuration/admin aspect, independent of the task's own UI |
| TC-KFWT-1161-07 | REST/API — commissioning done-flags/dates updatable via endpoint status `PRIMARY_SECONDARY_COMMISSIONING` | API behavior, distinct channel from UI |
| TC-KFWT-1161-08 | Retrofit-specific rule — first task + EAM update skipped, primary pre-checked with empty date | Business-rule variant specific to the Retrofit flow, not applicable to DigiONS |
| TC-KFWT-1161-09 | Search — new commissioning status filter added to telecontrol device search | Independent screen (Search Telecontrol Devices), not part of the task/data card at all |

---

## TC-KFWT-1161-01: Primary Commissioning task completion triggers EAM update (DigiONS)

**Precondition**: A telecontrol device process (DigiONS flow) has reached the task `Primäre Inbetriebnahme` / "Primary Commissioning" (right after `Configure updated technical Type (UI)`). The task is assigned to the `Central Control Engineering` role. The data card "Primary and secondary commissioning" / "Primäre und Sekundäre IBN" shows both checkboxes unchecked by default.

| Step | Type | Description |
| :-- | :-- | :--- |
| 1 | Given | The tester is logged in as `Central Control Engineering` and opens the open task `Primäre Inbetriebnahme` / "Primary Commissioning" for the telecontrol device. |
| 2 | When | The tester checks the checkbox "Primary commissioning done" / "Primärtechnisch in Betrieb genommen" and fills the date field "Primary commissioning date" / "Datum der primärtechnischen Inbetriebnahme" (mandatory for this task per Implementation Hint), then submits/completes the task. |
| 3 | Then | The task "Primäre Inbetriebnahme" is completed and an EAM update is triggered/recorded. |
| 4 | And | The next task "Sekundäre Inbetriebnahme" / "Secondary Commissioning" becomes available in the process. |

**Expected Result**: Primary commissioning checkbox + date are accepted as mandatory input, the task completes, EAM is updated, and the process moves to the Secondary Commissioning task.

---

## TC-KFWT-1161-02: Secondary Commissioning task completion advances process to "Update eIOT"

**Precondition**: Primary Commissioning task is already completed (TC-01). The process is now at task `Sekundäre Inbetriebnahme` / "Secondary Commissioning", where the primary checkbox/date are shown but disabled (read-only), and the secondary checkbox/date are mandatory.

| Step | Type | Description |
| :-- | :-- | :--- |
| 1 | Given | The tester opens the task `Sekundäre Inbetriebnahme` / "Secondary Commissioning" for the telecontrol device. |
| 2 | Then (pre-check) | The fields "Primary commissioning done" and "Primary commissioning date" are visible but disabled (read-only), reflecting the values set in TC-01. |
| 3 | When | The tester checks the checkbox "Secondary commissioning done" / "Sekundärtechnisch in Betrieb genommen" and fills "Secondary commissioning date" / "Datum der sekundärtechnischen Inbetriebnahme", then submits/completes the task. |
| 4 | Then | The task "Sekundäre Inbetriebnahme" is completed and the process continues to the next step "Update eIOT". |

**Expected Result**: Primary fields remain disabled/read-only during the second task; secondary checkbox + date are accepted; upon completion the process advances to "Update eIOT" as specified by the AC.

---

## TC-KFWT-1161-03: Task cannot be completed unless both commissioning checkboxes are checked

**Precondition**: The overall "Primary and Secondary Commissioning" step is only considered fully done once both status flags are `true` (per Comment Resolution #2, Ottinger/El Aamouchi 13/7/2026).

| Step | Type | Description |
| :-- | :-- | :--- |
| 1 | Given | The tester is on the task `Sekundäre Inbetriebnahme` / "Secondary Commissioning" where "Primary commissioning done" is already `true` (read-only) but "Secondary commissioning done" is still unchecked. |
| 2 | When | The tester attempts to submit/complete the task without checking "Secondary commissioning done" / "Sekundärtechnisch in Betrieb genommen". |
| 3 | Then | The task submission is blocked with a validation message, and the process does NOT advance to "Update eIOT". |

**Expected Result**: The system enforces that both "Primary commissioning done" and "Secondary commissioning done" must be `true` before the task/step can be completed; data already entered (e.g. primary status) is preserved/stored even while the step is incomplete.

---

## TC-KFWT-1161-04: New "Primary and secondary commissioning" data card shows correct default field states

**Precondition**: A station view is opened where the "Primary and secondary commissioning" / "Primäre und Sekundäre IBN" data card has never been edited before.

| Step | Type | Description |
| :-- | :-- | :--- |
| 1 | Given | The tester opens the station view containing the data card "Primary and secondary commissioning" / "Primäre und Sekundäre IBN" at the bottom of the page. |
| 2 | When | The tester inspects the 5 fields of the data card without changing anything. |
| 3 | Then | Checkbox "Primary commissioning done" / "Primärtechnisch in Betrieb genommen" is unchecked by default. |
| 4 | And | Checkbox "Secondary commissioning done" / "Sekundärtechnisch in Betrieb genommen" is unchecked by default. |
| 5 | And | Date field "Primary commissioning date" / "Datum der primärtechnischen Inbetriebnahme" is empty and optional. |
| 6 | And | Date field "Secondary commissioning date" / "Datum der sekundärtechnischen Inbetriebnahme" is empty and optional. |
| 7 | And | Comment field "Comment commissioning" / "Kommentar Inbetriebnahme" is empty and optional. |

**Expected Result**: All 5 fields render with the documented default/optional states, matching the AC exactly.

---

## TC-KFWT-1161-05: "Primary and Secondary Commissioning" task shows the full station view as read-only

**Precondition**: The process is at the combined "Primäre und Sekundäre Inbetriebnahme" task node (as named in the Description AC).

| Step | Type | Description |
| :-- | :-- | :--- |
| 1 | Given | The tester opens the "Primäre und Sekundäre Inbetriebnahme" task for a telecontrol device. |
| 2 | When | The tester reviews the full set of station fields shown on the task screen. |
| 3 | Then | All existing station fields are visible on the screen. |
| 4 | And | None of the pre-existing station fields (outside of the new commissioning data card) are editable — the task is a full read-only view of the station. |

**Expected Result**: The task renders the complete station data set for review, with every field outside the new commissioning data card disabled/non-editable.

---

## TC-KFWT-1161-06: "Primary and Secondary Commissioning" step is configurable/skippable via Workflow Administration

**Precondition**: The tester has `KFWG_ADMIN` access to the `Workflow Administration` configuration tab (existing dialog, grounded in `ui_components.yaml` as `WorkflowAdministration.xhtml`).

| Step | Type | Description |
| :-- | :-- | :--- |
| 1 | Given | The tester, logged in as an administrator, opens `Workflow Administration` configuration tab. |
| 2 | When | The tester locates the new "Primary and Secondary Commissioning" step in the list of skippable workflow features and enables the skip strategy for it. |
| 3 | Then | The configuration is saved successfully. |
| 4 | And | A subsequent process run for a telecontrol device skips the "Primäre und Sekundäre Inbetriebnahme" task entirely, proceeding directly to the next step. |

**Expected Result**: The new step appears as a configurable/skippable entry in Workflow Administration, and enabling the skip actually bypasses the task at runtime.

---

## TC-KFWT-1161-07: Commissioning status/date updatable via REST endpoint (`PRIMARY_SECONDARY_COMMISSIONING`)

**Precondition**: A telecontrol device process is at the "Primäre und Sekundäre Inbetriebnahme" step. A valid REST client credential exists for calling the status update endpoint.
`// ⚠️ ASSUMPTION: exact endpoint path/method not specified in the ticket; test targets the documented status name PRIMARY_SECONDARY_COMMISSIONING via the existing telecontrol-device status update endpoint pattern referenced in comment #7 ("New status for telecontrol-devices/status/").`

| Step | Type | Description |
| :-- | :-- | :--- |
| 1 | Given | The tester prepares a PUT request to the telecontrol device status endpoint with status name `PRIMARY_SECONDARY_COMMISSIONING`, including the primary commissioning done-flag and date. |
| 2 | When | The tester sends the PUT request. |
| 3 | Then | The API responds with a success status code, and the primary commissioning done-flag/date are persisted on the station. |
| 4 | And | Sending a second PUT request with the secondary commissioning done-flag and date (after primary is already `true`) is accepted, and the process advances only once both flags are `true`. |

**Expected Result**: The endpoint accepts partial updates (primary-only, then secondary-only) and the process/task completion logic still requires both flags to be `true` before continuing, consistent with TC-03.

---

## TC-KFWT-1161-08: Retrofit-specific rule — primary commissioning pre-checked, first task and EAM update skipped

**Precondition**: A telecontrol device process follows the **Retrofit** flow (DigiONS Type = LM/LO/SM/SO), and has reached the point right after `Source/Sink Test Retrofit` completes (per Comment Resolution #5, Ottinger 26/8/2026), where "Primäre und Sekundäre Inbetriebnahme" is inserted.

| Step | Type | Description |
| :-- | :-- | :--- |
| 1 | Given | The tester opens the "Primary and secondary commissioning" data card for a Retrofit telecontrol device at this point in the process. |
| 2 | Then (pre-check) | Checkbox "Primary commissioning done" / "Primärtechnisch in Betrieb genommen" is already checked, and "Primary commissioning date" / "Datum der primärtechnischen Inbetriebnahme" is empty. |
| 3 | And | No separate first task ("Primäre Inbetriebnahme") or standalone EAM update for the primary status is presented to the tester — the process goes directly to the secondary commissioning task. |
| 4 | When | The tester checks "Secondary commissioning done" / "Sekundärtechnisch in Betrieb genommen" and fills "Secondary commissioning date" / "Datum der sekundärtechnischen Inbetriebnahme", then completes the task. |
| 5 | Then | Only the secondary commissioning date and checkbox are sent to EAM; the primary commissioning date/checkbox are NOT re-sent to EAM. |

**Expected Result**: For Retrofit, the primary commissioning checkbox is pre-checked with an empty date, the first task and its EAM update are skipped, and only secondary commissioning data is transmitted to EAM.

---

## TC-KFWT-1161-09: New commissioning status filter available in Search Telecontrol Device

**Precondition**: The tester opens the existing `Search Telecontrol Devices` screen (grounded dialog `SearchTelecontrolDevices.xhtml`, field `statusFilterMenu`).

| Step | Type | Description |
| :-- | :-- | :--- |
| 1 | Given | The tester opens the `Search Telecontrol Devices` screen. |
| 2 | When | The tester opens the status filter dropdown (`statusFilterMenu`). |
| 3 | Then | A new status option corresponding to "Primary and Secondary Commissioning" / "Primäre und Sekundäre IBN" is present in the list of selectable statuses. |
| 4 | When | The tester selects this new status option and executes the search. |
| 5 | Then | Only telecontrol devices currently at the "Primäre und Sekundäre Inbetriebnahme" step are returned in the result list. |

**Expected Result**: The status filter dropdown includes the new commissioning status, and filtering by it returns only matching devices.
