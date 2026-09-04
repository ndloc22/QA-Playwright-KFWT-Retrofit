# \(15\) Retrofit: Fulfill source\-sink\-test

## General

|  |  |
| --- | --- |
| **User Story** | As Central Control Engineer I want to confirm a retrofit case, as soon as the KuRi information are available, |
| **JIRA** | [\[KFWT-526\] Pick incomplete retrofit variant C-Station from list - Jira](https://eon-energy.atlassian.net/browse/KFWT-526) |
| **Description** | Confirmation of Source-Sink-Test for Retrofit device |
| **Permission** | Central Control Engineering |
| **Preconditions** | Confirmation of <https://confluence.agile.eon.com/wiki/spaces/kfwt22/pages/880247149/to+be+deleted+14b+Retrofit+RTU+Parametrized> with 'KuRi with communication available' set |
| **State** | FINAL |

  

## User Interface


  

## Task Details

| **Task Name** | **Description** | **Category** |
| --- | --- | --- |
| Quelle-Senke-Test für Station \<abstract station number\> (\<KFWG Name\>) | Bitte bestätigen Sie die Durchführung des Quelle-Senke-Tests. | - |

  

## Input Fields

###  For details see specification here: [UI full view (DigiONS detailled information)](https://eon-energy.atlassian.net/wiki/spaces/kfwt22/pages/880247582/UI+full+view+DigiONS+detailled+information)

| **Name** | **Type** | **Mandatory** | **Visibility** | **Editable** | **Validation** | **Notes** |
| --- | --- | --- | --- | --- | --- | --- |
| **Übergabestation / Transfer station** | Fieldset | - | y | y for the following fields: - Bemerkung / Note |  |  |
| **DigiONS Allgemeine Informationen / DigiONS General Information** | Fieldset | - medium voltage switch config & field names 1-15 - KuRi checkbox/es - ront | y | n | - At least 1 KuRi checkbox is set | - ront added:  - midVoltageSwitchConfig:  |
| **DigiONS Detailinformationen / DigiONS Details** | Fieldset | - | y | n |  |  |
| **Fernwirkanbindung - Allgemeine Informationen / Telecontrol connection - General information** | Fieldset | - | y | n |  |  |
| **Fernwirkanbindung - Leitsystem / Telecontrol connection - Control system** | Fieldset | - | y | n |  |  |
| **Nachrichtentechnik / Communications Engineering** | Fieldset | - | y | n |  |  |
| **Detailinformationen - Stromversorgung / Details - Power supply** | Fieldset | - | y | n |  |  |
| **New fieldset (which is not part of the full view)** |  |  |  |  |  |  |
| Quelle-Senke-Test erfolgreich abgeschlossen /Source-Sink-Test successfully done | Fieldset | - | y | - | - | This is the header of the new fieldset |
| Quelle-Senke-Test erfolgreich abgeschlossen / Source-Sink-Test successfully done | checkbox | y | y | y | - |  |

  

## Actions

| Name | Type (Button, etc.) | Permissions | Action Result |
| --- | --- | --- | --- |
| Speichern / Save | Button | Central Control Engineering | Save the data |
| Weiter / Proceed | Button | Central Control Engineering | Save the dataFinish the taskclose the UIreturn to portal home |
| Abbrechen / Cancel | Button | Central Control Engineering | discard changes and return to portal home |
