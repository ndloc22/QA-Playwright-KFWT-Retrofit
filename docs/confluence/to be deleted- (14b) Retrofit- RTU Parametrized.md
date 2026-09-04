# \*to be deleted\* \(14b\) Retrofit: RTU Parametrized

## General

|  |  |
| --- | --- |
| **User Story** | As Secondary Technician I want to confirm, that the retrofit is parametrized correctly |
| **JIRA** | [\[KFWT-526\] Pick incomplete retrofit variant C-Station from list - Jira](https://eon-energy.atlassian.net/browse/KFWT-526)[\[KFWT-843\] RetroFit: ZLT Tasks should be created in all constellations - JIRA](https://eon-energy.atlassian.net/browse/KFWT-843) |
| **Description** | Task for retrofit cases (digiONS type LM, LO, SM, SO) |
| **Permission** | Corresponding Secondary Technician Role *(detected through assigned RZ)* |
| **Preconditions** | Confirmation of <https://confluence.agile.eon.com/wiki/spaces/kfwt22/pages/880247151/12+Configure+updated+technical+place> for a Retrofit Case OR: <https://confluence.agile.eon.com/wiki/spaces/kfwt22/pages/880247610/13+Communication+e.IoT> for a Retrofit Case, where the MV field names were adapted in <https://confluence.agile.eon.com/wiki/spaces/kfwt22/pages/880247151/12+Configure+updated+technical+place> |
| **State** | FINAL |

  

## User Interface


  

## Task Details

| **Task Name** | **Description** | **Category** |
| --- | --- | --- |
| NS-/MS-Abgänge für \<abstract station name\> (\<KFWG Name\>) aktivieren | Bitte bestätigen Sie, dass die NS-/MS-Abgänge erfolgreich aktiviert wurden. | - |

  

## Input Fields

###  For details see specification here: [UI full view (DigiONS detailled information)](https://eon-energy.atlassian.net/wiki/spaces/kfwt22/pages/880247582/UI+full+view+DigiONS+detailled+information)

| **Name** | **Type** | **Mandatory** | **Visibility** | **Editable** | **Validation** | **Notes** |
| --- | --- | --- | --- | --- | --- | --- |
| **Übergabestation / Transfer station** | Fieldset | - | y | n |  |  |
| **DigiONS Allgemeine Informationen / DigiONS General Information** | Fieldset | - | y | n |  |  |
| **DigiONS Detailinformationen / DigiONS Details** | Fieldset | - | y | n |  |  |
| **Fernwirkanbindung - Allgemeine Informationen / Telecontrol connection - General information** | Fieldset | - | y | n |  |  |
| **Fernwirkanbindung - Leitsystem / Telecontrol connection - Control system** | Fieldset | - | y | n |  |  |
| **Nachrichtentechnik / Communications Engineering** | Fieldset | - | y | n |  |  |
| **Detailinformationen - Stromversorgung / Details - Power supply** | Fieldset | - | y | n |  |  |
| ****New fieldset (which is not part of the full view)**** |  |  |  |  |  |  |
| Parametrierung Fernirkgerät /Parametrize RTU | Fieldset | - | y | - | - | This is the header of the new fieldset |
| Das Fernwirkgerät wurde erfolgreich parametriert / Remote Terminal Unit was parametrized successfully | checkbox | y | y | y | - |  |

  

## Actions

| Name | Type (Button, etc.) | Permissions | Action Result |
| --- | --- | --- | --- |
| Speichern / Save | Button | Secondary Technician | Save the data |
| Weiter / Proceed | Button | Secondary Technician | Save the dataFinish the taskclose the UIreturn to portal home |
| Abbrechen / Cancel | Button | Secondary Technician | discard changes and return to portal home |
