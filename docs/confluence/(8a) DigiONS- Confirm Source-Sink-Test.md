# \(8a\) DigiONS: Confirm Source\-Sink\-Test

## General

|  |  |
| --- | --- |
| **User Story** | As ZLT, I want to confirm that the connection test was successful as well as assign the station to a technical place |
| **JIRA** | [EMP-408: Implement Step "Fulfill Source/Sink Test"](https://axonivy.atlassian.net/browse/EMP-408) |
| **Description** | Possibility to confirm the connection to the control system through - a confirmation dialog UI - a REST interface to export and import data using JSON format. The ZLT can export all entries in the right status, so the status will be moved to <https://confluence.agile.eon.com/wiki/spaces/kfwt22/pages/880247167/9+Definition+of+Regional+Center> or <https://confluence.agile.eon.com/wiki/spaces/kfwt22/pages/880247145/10+Add+additional+information> (depends on whether the info of the regional center was specified) - post → sets flag "SOURCE\_SINK\_TEST" |
| **Permission** | Role ZLT |
| **Preconditions** | DigiONS has been connected through the telecontrol supplier with digiONS type FS or NS (<https://confluence.agile.eon.com/wiki/spaces/kfwt22/pages/880247139/7+Connection+test>) |
| **State** | FINAL |

  

## User Interface


  

## Task Details

| **Task Name** | **Description** | **Category** |
| --- | --- | --- |
| Quelle-Senke-Test bestätigen für Definition des Regionalzentrums für Station \<station\> (\<KFWG Name\>) | Bitte bestätigen Sie die Durchführung des Quelle-Senke-Tests. | - |

  

## Information

### REST Service

The ZLT has the possilibty to get all the telecontrol devices in the status "SOURCE\_SINK\_TEST" through the GET {system}/v1/kleinfernwirktechnik/telecontrol-devices?status=SOURCE\_SINK\_TEST

and can confirm the status "sourceSinkTestDone": truethrough the PUT {system}/v1/kleinfernwirktechnik/telecontrol-devices/status/SOURCE\_SINK\_TEST

  

Hint: New endpoints:

- {{baseURL}}/v1/kleinfernwirktechnik/telecontrol-devices?status=SOURCE\_SINK\_TEST
- {{baseURL}}/v1/kleinfernwirktechnik/telecontrol-devices/status/SOURCE\_SINK\_TEST

  

### UI Task

All the information is displayed as read only, except the Source-Sink-Test successfully done - Panel, where the status "SOURCE\_SINK\_TEST" can be confirmed.


  

### Regional center information  

The regional center can be added when confirming the source sink test (bittest) through the UI or the REST interface as an optional parameter.

This information is important to assign the task "add additional information" to the correct group of Grid Planers.

Therefore the next process step depends on the regional center information:

- Regional center was not added:  
    - <https://confluence.agile.eon.com/wiki/spaces/kfwt22/pages/880247167/9+Definition+of+Regional+Center>
- Regional center was added:  
    - <https://confluence.agile.eon.com/wiki/spaces/kfwt22/pages/880247145/10+Add+additional+information> 
    - this task is created for the corresponding Grid Planer subrole depending on the regional center

  

## Input Fields

**Fieldset: Übergabestation / Transfer station**

Same as <https://confluence.agile.eon.com/wiki/spaces/kfwt22/pages/880247137/6+Connection+control+system>, except of the installation regional center:

| Name DE /Name EN | Type | mandatory | visibility | editable | Notes |
| --- | --- | --- | --- | --- | --- |
| Installations RZ / Installation regional center | drop downtriggerRegionalCenter.areaName | n | y | y | - optional field for this step in the panel transfer station |

**Fieldset: DigiONS - Allgemeine Informationen / DigiONS - general information**

| Name DE /Name EN | Type | mandatory | visibility | editable | Notes |
| --- | --- | --- | --- | --- | --- |
| MS-Schaltanlagen-Konfiguration /MS-Switchgear Configuration | DropdownmidVoltageSwitchConfig.displayName | y | y | y | added as editable & mandatory with is set by the telecontrol device supplier in step BUILD\_TELECONTROL\_DEVICE, but should be adaptable from Central Control Engineer lateron |
| Mittelspannungs-Feldbezeichnung 1 - 15 /Medium voltage field name 1-15 | string | y | y | y | Flexible UI fieldsDepending on the value selected through the MS-Switchgear Configuration |
| rONT /rONT | boolean | y | y | y | added as editable & mandatory with is set by the telecontrol device supplier in step BUILD\_TELECONTROL\_DEVICE, but should be adaptable from Central Control Engineer lateron |

**Fieldset: DigiONS - Detailinformationen / DigiONS - Details**

- Read Only

**Fieldset: Fernwirkanbindung - Allgemeine Informationen / Telecontrol connection - General Information  
**

- Read Only

**Fieldset: Fernwirkanbindung - Leitsystem / Telecontrol connection - Control system  
**

- Read Only

**Fieldset: Nachrichtentechnik / Communication Engineering  
**

- Read Only

**Fieldset: Detailinformationen - Stromversorgung / Details - Power supply **

- Read Only

**Fieldset: Parametrierung des Leitsystems / Parametrize central control system **

| Name DE /Name EN | type | mandatory | visibility | editable | Notes |
| --- | --- | --- | --- | --- | --- |
| Quelle-Senke-Test erfolgreich abgeschlossen / Source-Sink-Test successfully done | boolean | y | y | y | flag to set status SOURCE\_SINK\_TEST |

  

  

## Actions

| Name DE /Name EN | Type | Permissions | Action Result |
| --- | --- | --- | --- |
| Weiter /Proceed | button |  | Save the datafinish the taskclose the UIreturn to portal home |
| Speichern /Save | button |  | Save the dataclose the UIReturn to portal home |
| Abbrechen /Cancel | button |  | discard changes and return to portal home |
