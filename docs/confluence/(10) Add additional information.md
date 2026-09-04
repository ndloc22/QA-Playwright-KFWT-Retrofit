# \(10\) Add additional information

## General

|  |  |
| --- | --- |
| **User Story** | As Planner, I want to assign the technical place and add additional missing information to the case. |
| **JIRA** | [EMP-409: Implement Step "Add additional information"](https://axonivy.atlassian.net/browse/EMP-409) |
| **Description** |  |
| **Permission** | Role Planer DigiONS |
| **Preconditions** | DigiONS - <https://confluence.agile.eon.com/wiki/spaces/kfwt22/pages/880247141/8a+DigiONS+Confirm+Source-Sink-Test> with regional center defined - OR: <https://confluence.agile.eon.com/wiki/spaces/kfwt22/pages/880247167/9+Definition+of+Regional+Center>  RetroFit: - <https://confluence.agile.eon.com/wiki/spaces/kfwt22/pages/880247257/Show+stocklist+retrofit+variant+C-Stations> & Pick a RetroFit "In Stock" with Action "Delivery" |
| **State** | FINAL |

  

## User Interface

DigiONS Case:



  

Retrofit variant C-station Case:



  

  

## Task Details

| **Task Name** | **Description** | **Category** |
| --- | --- | --- |
| Detailinformationen für  \<station\> (\<KFWG Name\>) | Bitte prüfen Sie die Detailinformationen und schließen den Vorgang ab. | - |

  

## Input Fields

###  For details see specification here: [UI full view (DigiONS detailled information)](https://eon-energy.atlassian.net/wiki/spaces/kfwt22/pages/880247582/UI+full+view+DigiONS+detailled+information)

| **Name** | **Type** | **Mandatory** | **Visibility** | **Editable** | **Validation** | **Notes** |
| --- | --- | --- | --- | --- | --- | --- |
| **DigiONS Destination / DigiONS Auslieferung** | Fieldset | y | y\* | y | - | \*only visible in case of DigiONS device (s. digiONS Type)options: - Deliver DigiONS (DE: DigiONS Auslieferung)      - default     - planer can proceed the task and start the next task in the process - DigiONS in stock (DE: DigiONS in stock)     - through this option, the station will be moved to the [stocklist ](https://eon-energy.atlassian.net/wiki/spaces/kfwt22/pages/880247648/Search+for+DigiONS+in+stock+process+start)after proceeding the tas |
| **Retrofit variant C-station Destination / Nachrüstvariante C-Station Zielort** | Fieldset | y | y\* | y | - | \*only visible in case of RetroFit device (s. digiONS Type)options: - Deliver Retrofit variant C-Station (DE: Nachrüstvariante C-Station Auslieferung)      - default after picking a retrofit from the stocklist     - selecting this option, the planer can proceed the task and start the next step in the process - Retrofit variant C-Station in stock (DE: Nachrüstvariante C-Station auf Lager)     - through this option, the station will be moved to the[ retrofit stocklist ](https://eon-energy.atlassian.net/wiki/spaces/kfwt22/pages/880247257/Stocklist+retrofit+variant+C-Stations+process+start?src=contextnavpagetreemode)after proceeding the task |
| **Retrofit variant C-Stations - Details** | Fieldset | ymandatory fields: - NS Trafomessung vorhanden / NS transformer measurement available | y\* | y→ s. mandatory fields→ additional optional, editable fields:  - NS Abgangsmessung vorhanden / NS outlet measurement available - Kommunikationsfähige KuRi vorhanden / KuRi with communication available |  | \*only visible in case of RetroFit device (s. digiONS Type) If "NS Abgangsmessung vorhanden / NS outlet measurement available" is selected for Retrofit cases, the field "number of low voltage metering strips" is mandatory. |
| **Übergabestation / Transfer station** | Fieldset | ymandatory fields (in case of delivery) - Technischer Platz /    Technical place - Stationsname / Station name - Name des KFWG / KFWG name - Installation RZ / Installation regional center - ST-Bereich / ST Area - Verteilnetzbetreiber / Distribution system operator - Name des Planers / Name of the planer - Netzbezirk / Network district - Sternpunktbehandlung am Montageort / Star point treatment at the installation location - Netzspannung (kV) / Mains voltage (kV) - Trafogrösse \[kVA\] / Size Transformer \[kVA\] | y | y→ s. mandatory fields→ additional optional, editable fields: - Station nicht gefunden / station not found - Anlagenbauinformation / System status - Netzführende Stelle / Network managing body - Breitengrad / Latitude - Längengrad / Longitude - Bemerkung / Note |  |  |
| ** DigiONS Allgemeine Informationen / DigiONS General Information** | Fieldset | ymandatory fields (in case of delivery) - medium voltage switch config 1-15 - *for Retrofit: At least 1 KuRi checkbox* - Number of low voltage metering strips\* - ront | y | y→ s. mandatory fields→ additional optional, editable fields: - Manufacturer low voltage metering strips |  | - ront editable: |
| **DigiONS Detailinformationen / DigiONS Details** | Fieldset | n | y | n |  |  |
| ****Fernwirkanbindung - Allgemeine Informationen / Telecontrol connection - General information**** | Fieldset | n | y | n |  |  |
| ****Fernwirkanbindung - Leitsystem / Telecontrol connection - Control system**** | Fieldset | n | y | n |  |  |
| ******Detailinformationen - Stromversorgung / Details - Power supply****** | Fieldset | n | y | n |  |  |

  

  

## Actions

| Name | Type (Button, etc.) | Permissions | Action Result |
| --- | --- | --- | --- |
| Weiter / Proceed | button |  | Save the dataDigiONS option: - Delivery → Proceed with next task <https://confluence.agile.eon.com/wiki/spaces/kfwt22/pages/880247147/11+Communication+e.IoT> - In Stock → Push device to stock list (<https://confluence.agile.eon.com/wiki/spaces/kfwt22/pages/880247648/Search+DigiONS+in+stock>) RetroFit option: - Delivery → Proceed with next task <https://confluence.agile.eon.com/wiki/spaces/kfwt22/pages/880247608/10.1+Retrofit+Data+Structure+Maintainer+E-Mail+Notification> & <https://confluence.agile.eon.com/wiki/spaces/kfwt22/pages/880247147/11+Communication+e.IoT> - In Stock → Push device to stock list (<https://confluence.agile.eon.com/wiki/spaces/kfwt22/pages/880247257/Show+stocklist+retrofit+variant+C-Stations>) finish the taskFinish the caseclose the UIreturn to portal home |
| Speichern / Save | button |  | Save the dataclose the UIReturn to portal home |
| Abbrechen / Cancel | button |  | discard changes and return to portal home |
