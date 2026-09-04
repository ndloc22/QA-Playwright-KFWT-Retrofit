# \(1b\) Create Retrofit variant C\-Stations \(Process start for Logistics\)

## General

|  |  |
| --- | --- |
| **User Story** | As Logistics, I want to have the possiblity to create a number n of Retrofit variant C-Stations cases with the same master data. |
| **JIRA** |  |
| **Description** | This process start can be triggered only by the Role Logistics and created one or more digiONS (depending on the defined number).If a digiONS is a digiONS or a RetroFit is decided later in the process through the supplier (s. <https://confluence.agile.eon.com/wiki/spaces/kfwt22/pages/880247135/5+Build+telecontrol+device> & <https://confluence.agile.eon.com/wiki/spaces/kfwt22/pages/880247139/7+Connection+test>) |
| **Permission** | Logistics |
| **Preconditions** |  |
| **State** | FINAL |

## User Interface


  

### Input Fields

|  |  |  |  |  |  |
| --- | --- | --- | --- | --- | --- |
| Name DE / EN | UI Widget & DB Mapping | Mandatory | Visible | Editable | Validation & Notes |
| Anzahl der Nachrüstvariante C-Stationen /Number of Retrofit variant C-Stations | Number(not saved to DB) | yes | yes | yes | This is the number of (business) cases to be created after finishing this task.Initial value is empty.Validation to allow number 1 .. 99 |
| ~~Anbindungsziel MSP /~~~~Connection Target MSP~~ | ~~Dropdown~~~~connectionTargetMSP.displayName~~ | ~~yes~~ | ~~yes~~ | ~~yes~~ | ~~Details see [(1a) Create KFWG (DigiONS)](https://eon-energy.atlassian.net/wiki/pages/viewpage.action?pageId=880246868)~~ |
| ~~Auslösendes RZ /~~~~Triggering regional center~~ | ~~dropdown~~~~triggerRegionalCenter.areaName~~ | ~~yes~~ | ~~yes~~ | ~~yes~~ | ~~Details see [(1a) Create KFWG (DigiONS)](https://eon-energy.atlassian.net/wiki/pages/viewpage.action?pageId=880246868)~~~~→ Relevant for visibility (regional roles)~~ |
| Anbindungsziel weiterer Leitstelle e.IoT /Connection target additional control system e.IoT | Checkbox | no | no | no | Details see [(1a) Create KFWG (DigiONS)](https://eon-energy.atlassian.net/wiki/pages/viewpage.action?pageId=880246868) |

  

## Actions

|  |  |  |  |
| --- | --- | --- | --- |
| Erstellen / Create | button |  | - Close this ui - Trigger the number of independent business cases according to the selection - Each of these cases will Assign automatically:     - abstract station number     - ASDU and IP related to the connection target. - Set the status “Order Router / Router bestellen” |
| Abbrechen / cancel | Button |  | Close the current UIreturn to portal home. |
