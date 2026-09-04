# \(6\) Connection control system

## General

|  |  |
| --- | --- |
| **User Story** | As central control system, I want to connect DigiONS to the control system.This should be possible through the UI or through the REST interface to export and import data using JSON format |
| **JIRA** | [EMP-434: Connection to control system also to be done with json Export and import](https://axonivy.atlassian.net/browse/EMP-434) |
| **Description** | Possiblity to confirm the connection to the control system through - a confirmation dialog UI <https://confluence.agile.eon.com/wiki/spaces/kfwt22/pages/880246878/5+Connection+to+control+system+digiONS> - a REST interface to export and import data using JSON format. The ZLT can export all entries in the right status, so the status will be moved to <https://confluence.agile.eon.com/wiki/spaces/kfwt22/pages/880247139/7+Connection+test> - post → sets flag "connectionTestDone" |
| **Permission** | Role ZLT |
| **Preconditions** | DigiONS has been imported by telecontrol supplier (<https://confluence.agile.eon.com/wiki/spaces/kfwt22/pages/880247135/5+Build+telecontrol+device>)Update through : The telecontrol supplier has to report back the midVoltageSwitchConfig and digiONS type combinaton already in the task  (<https://confluence.agile.eon.com/wiki/spaces/kfwt22/pages/880247135/5+Build+telecontrol+device>), as the Central Control Engineering needs to know if the device is a digiONS or a RetroFit while executing their connection test. |
| **State** | FINAL |

  

## User Interface


  

## Task Details

| **Task Name** | **Description** | **Category** |
| --- | --- | --- |
| Parametrierung für \<abstract station number\> (\<KFWG name\>) | Bitte bestätigen Sie, dass das Leitsystem erfolgreich parametriert wurde. | - |

  

## Information

### REST Service

The ZLT has the possilibty to get all the telecontrol devices in the status "PARAMETRIZE\_CENTRAL\_CONTROL\_SYSTEM" through the GET {system}/v1/kleinfernwirktechnik/telecontrol-devices?status=PARAMETRIZE\_CENTRAL\_CONTROL\_SYSTEM

and can confirm the status "connectionControlSystemDone": true through the PUT {system}/v1/kleinfernwirktechnik/telecontrol-devices/status/PARAMETRIZE\_CENTRAL\_CONTROL\_SYSTEM.

  

### UI Task

All the information is displayed as read only, except the Parametrize central control system - Panel, where the status "PARAMETRIZE\_CENTRAL\_CONTROL\_SYSTEM" can be confirmed.


  

## Input Fields

###  For details see specification here: <https://confluence.agile.eon.com/wiki/spaces/kfwt22/pages/880247582/UI+full+view+DigiONS+detailled+information>

| **Name** | **Type** | **Mandatory** | **Visibility** | **Editable** | **Validation** | **Notes** |
| --- | --- | --- | --- | --- | --- | --- |
| **DigiONS Zielort / DigiONS Destination** | Fieldset | - | n | n | - |  |
| **Übergabestation / Transfer station** | Fieldset | - | y | y for the following fields: - Bemerkung / Note |  - |  |
| **DigiONS Allgemeine Informationen / DigiONS General Information** | Fieldset | - | y | n |  - |  |
| **DigiONS Detailinformationen / ****DigiONS Details** | Fieldset | - | y | n |  - |  |
| **Fernwirkanbindung - Allgemeine Informationen / Telecontrol connection - General information** | Fieldset | - | n | n |  - |  |
| **Fernwirkanbindung - Leitsystem / Telecontrol connection - Control system** | Fieldset | - | y | n |  - |  |
| **Nachrichtentechnik / Communications Engineering** | Fieldset | - | y (hide field "Preshared-Key LAN") | n |  - |  |
| **Routerinformationen / Router information** | Fieldset | - | y | n | - |  |
| **Detailinformationen - Stromversorgung / Details - Power supply** | Fieldset | - | y | n | - |  |
| **⚠️ *New fieldset (which is not part of the full view)*** |  |  |  |  |  |  |
| **Parametrierung des Leitsystems / Parametrize central control system** | Fieldset | - | y | n |  | This is the header of the new fieldset |
| Das Leitsystem wurde erfolgreich parametriert /The controlsystem was parametrized successfully | Boolean | y | y | y | Only if this checkbox is set, the task can be done create new attribute, type boolean |  |

  

## Actions

| Name DE / Name EN | Type | Permissions | Action Result |
| --- | --- | --- | --- |
| Weiter /Proceed | button |  | Save the datafinish the taskclose the UIreturn to portal home |
| Speichern /Save | button |  | Save the dataclose the UIRetourn to portal home |
| Abbrechen /Cancel | button |  | discard changes and return to portal home |
