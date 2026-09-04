# \(12\) Configure updated technical place

## General

|  |  |
| --- | --- |
| **User Story** | As Central Control Engineer, I want to review the add additional information to a station to confirm it. In addition I need the possibility to change the "Medium voltage field names", |
| **JIRA** | For Retrofit Cases: [\[KFWT-843\] RetroFit: ZLT Tasks should be created in all constellations - JIRA](https://eon-energy.atlassian.net/browse/KFWT-843) |
| **Description** |  |
| **Permission** | Role Central Control Engineer |
| **Preconditions** | <https://confluence.agile.eon.com/wiki/spaces/kfwt22/pages/880247147/11+Communication+e.IoT> |
| **State** | FINAL |

  

## User Interface

DigiONS Case:


  

Retrofit variant C-station Case:



  

  

## Task Details

| **Task Name** | **Description** | **Category** |
| --- | --- | --- |
| Konfiguration der aktualisierten technischen Platzes für \<station\> (\<KFWG Name\>) | Der technische Platz wurde aktualisiert. Bitte prüfen und bestätigen Sie die Information. | - |

  

## Input Fields

###  For details see specification here: [UI full view (DigiONS detailled information)](https://eon-energy.atlassian.net/wiki/spaces/kfwt22/pages/880247582/UI+full+view+DigiONS+detailled+information)

| **Name** | **Type** | **Mandatory** | **Visibility** | **Editable** | **Validation** | **Notes** |
| --- | --- | --- | --- | --- | --- | --- |
| **DigiONS Destination / DigiONS Auslieferung** | Fieldset | - | y | n | only visible for DigiONS cases |  |
| **Retrofit variant C-station Destination / Nachrüstvariante C-Station Zielort** | Fieldset | - | y | n | only visible for retrofit cases |  |
| **Übergabestation / Transfer station** | Fieldset | - | y | y for the following fields: - Bemerkung / Note |  |  |
| ** DigiONS Allgemeine Informationen / DigiONS General Information** | Fieldset | y - medium voltage switch config 1-5Number of low voltage metering strips\*  Only for Retrofit: - KuRi checkboxes | y | y→ s. mandatory fields |  |  |
| **DigiONS Detailinformationen / DigiONS Details** | Fieldset | - | y | n |  |  |
| **Fernwirkanbindung - Allgemeine Informationen / Telecontrol connection - General information** | Fieldset | - | y | n |  |  |
| **Fernwirkanbindung - Leitsystem / Telecontrol connection - Control system** | Fieldset | - | y | n |  |  |
| **Nachrichtentechnik / Communications Engineering** | Fieldset | - | y | n |  |  |
| **Detailinformationen - Stromversorgung / Details - Power supply** | Fieldset | - | y | n |  |  |

  

## Actions

| Name | Type (Button, etc.) | Permissions | Action Result |
| --- | --- | --- | --- |
| Zurück / Back | Button | Central Control Engineer | Display confirmation popup: - DE: Bei Bestätigung dieser Aktion wird der Prozess für die Station \<abstract station number\> auf den Status Detailinformationen ergänzen gesetzt. Der Planer hat anschließend die Möglichkeit, Daten zu ergänzen und den Prozess von diesem Status aus weiter zu führen. - EN: By confirming this action, the process for station \<abstract station number\> is set to the status Add additional information. The planner then has the option of adding data and continuing the process from this status.  Options: - Bestätigen / Confirm:     - Back to add additional information task: <https://confluence.agile.eon.com/wiki/spaces/kfwt22/pages/880247255/10a+Rework+add+additional+information> - Abbrechen / Cancel: Back to task |
| Speichern / Save | Button | Central Control Engineer | Save the dataCheck if the MV fields were changed - yes: Communication to e.IoT - no:     - close the UI     - Return to portal home |
| Weiter ohne E-Mail Benachrichtigung /Proceed without E-Mail notification | Button | Central Control Engineer | Display confirmation popup: - DE:      - Achtung! Durch die Auswahl der Aktion "Weiter ohne E-Mail Benachrichtigung" werden keine E-Mail Benachrichtigungen gesendet!     - Hinweis: Dies gilt nur für diese Aufgabe und müsste für nachfolgende Aufgaben erneut explizit ausgewählt werden. - EN:      - Attention! If you select the “Proceed without e-mail notification” action, no e-mail notifications will be sent in this step!     - Note: This only applies to this task and would have to be explicitly selected again for later tasks.  Same action as Proceed, but without sending e-mail notifications! (s. KFWT-784) |
| Weiter / Proceed | Button | Central Control Engineer | Save the dataFinish the taskCheck if the MV fields were changed - yes: Communication to e.IoT & sending of  - no: proceed with regular digiONS / RetroFit process close the UIreturn to portal home |
| Abbrechen / Cancel | Button | Central Control Engineer | discard changes and return to portal home |
