# \(9\) Definition of Regional Center

## General

|  |  |
| --- | --- |
| **User Story** | As ZLT, I want to be able to add a regional center to a telecontrol device, if this was not added already during the source sink test (bittest). |
| **JIRA** |  |
| **Description** | Possibility to define a regional center through - a confirmation dialog UI - a REST interface to export and import data using JSON format. The ZLT can export all entries in the right status, so the status will be moved to <https://confluence.agile.eon.com/wiki/spaces/kfwt22/pages/880247145/10+Add+additional+information> - post → sets flag "DEFINE\_REGIONAL\_CENTER" |
| **Permission** | Role ZLT |
| **Preconditions** | Source sink test was confirmed from the ZLT without adding a regional center (<https://confluence.agile.eon.com/wiki/spaces/kfwt22/pages/880247141/8a+DigiONS+Confirm+Source-Sink-Test>) |
| **State** | FINAL |

  

## User Interface


  

## Task Details

| **Task Name** | **Description** | **Category** |
| --- | --- | --- |
| Definition des Regionalzentrums für \<station\> (\<KFWG Name\>) | Regionalzentrum hinzufügen. | - |

  

## Information

### REST Service

The ZLT has the possibility to get all the telecontrol devices, where the Source-Sink-Test was confirmed, but the regional center was not defined yet through the GET {system}/v1/kleinfernwirktechnik/telecontrol-devices?status=DEFINE\_REGIONAL\_CENTER

and can confirm the status "defineRegionalCenterDone": truethrough the PUT {system}/v1/kleinfernwirktechnik/telecontrol-devices/status/DEFINE\_REGIONAL\_CENTER

  

### UI Task

All the information is displayed as read only, except of the regional center in the panel Transfer station and the flag to confirm, that the Regional center was added, to confirm the status "DEFINE\_REGIONAL\_CENTER".


  

## Input Fields

**Fieldset: Übergabestation / Transfer station**

Same as [(6) Connection control system](https://eon-energy.atlassian.net/wiki/display/kfwt22/%286%29+Connection+control+system), except of the installation regional center:

| Name DE /Name EN | Type | mandatory | visibility | editable | Notes |
| --- | --- | --- | --- | --- | --- |
| Installations RZ / Installation regional center | drop downtriggerRegionalCenter.areaName | y | y | y | - mandatory field for this step in the panel transfer station |

**Fieldset: DigiONS - Allgemeine Informationen / DigiONS - general information**

- Read Only

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

| Name DE /Name EN | Type | mandatory | visibilty | editable | Notes |
| --- | --- | --- | --- | --- | --- |
| Regionalzentrum hinzugefügt / Regional center added | boolean | y | y | y | flag to set status DEFINE\_REGIONAL\_CENTER |

  

  

## Actions

| Name DE /Name EN | Type | Permissions | Action Result |
| --- | --- | --- | --- |
| Weiter /Proceed | button |  | Save the datafinish the taskclose the UIreturn to portal home |
| Speichern /Save | button |  | Save the dataclose the UIReturn to portal home |
| Abbrechen /Cancel | button |  | discard changes and return to portal home |
