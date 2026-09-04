# \(1\) Create DigiONS

  

## General

|  |  |
| --- | --- |
| **User Story** | As planer (Planung) I want to have the possiblity to create a number n of DigiONS cases with the same master data. |
| **JIRA** | [EMP-385: Trigger multipe processes](https://axonivy.atlassian.net/browse/EMP-385) |
| **Description** | Trigger one or multiple cases for KFWG with type DigiONS with some common data. |
| **Permission** | Administrator |
| **Preconditions** |  |
| **State** | FINAL |

## User Interface


### Input Fields

| Name DE / EN | UI Widget & DB Mapping | Mandatory | Visible | Editable | Validation & Notes |
| --- | --- | --- | --- | --- | --- |
| Anzahl der DigiONS /Number of DigiONS | Number(not saved to DB) | yes | yes | yes | This is the number of (business) cases to be created after finishing this task.Initial value is empty.Validation to allow number 1 .. 99 |
| Anbindungsziel weiterer Leitstelle e.IoT /Connection target additional control system e.IoT | Checkbox | no | no | no | Details see [(1a) Create KFWG (DigiONS)](https://eon-energy.atlassian.net/wiki/pages/viewpage.action?pageId=880246868) |

  

## Actions

|  |  |  |  |
| --- | --- | --- | --- |
| Erstellen / Create | button |  | - Close this ui - Trigger the number of independent business cases according to the selection - Each of these cases will Assign automatically:     - abstract station number     - ASDU and IP related to the connection target. - Set the status “Order Router / Router bestellen” |
| Abbrechen / cancel | Button |  | Close the current UIreturn to portal home. |
