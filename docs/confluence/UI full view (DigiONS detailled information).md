# UI full view \(DigiONS detailled information\)

## General

|  |  |
| --- | --- |
| **User Story** | As user, I want to view all the DigiONS / RetroFit information in one screen. |
| **JIRA** |  |
| **Description** | A user can search for a device via "KFWG search" and open the device to display all available information about the device. |
| **Permission** | Anyone |
| **Preconditions** | User has access to portal |
| **State** | FINAL |

  

## User Interface

Show all panels of the DigiONS process.

  

## Input fields

All panels are shown in READ-ONLY mode.

| Name DE /Name EN | UI Widget &DB Mapping | Mandatory | Visibility | Editable | Validation & Notes |
| --- | --- | --- | --- | --- | --- |
| **Fieldset: ****DigiONS Zielort / DigiONS Destination***only visible for DigiONS cases* |  |  |  |  |  |
| DigiONS Zielort /  | dropdown | y | y | n | Options: - DigiONS Auslieferung (EN: Deliver DigiONS) - DigiONS auf Lager (EN: DigiONS in stock) |
| **Fieldset: Retrofit variant C-station Destination (DE: Nachrüstvariante C-Station Zielort)***only visible for Retrofit cases* |  |  |  |  |  |
| Nachrüstvariante C-Station Zielort /Retrofit variant C-station destination | radiobuttons | y | y | n | options: - Deliver Retrofit variant C-Station (DE: Nachrüstvariante C-Station Auslieferung)      - default after picking a retrofit from the stocklist     - selecting this option, the planer can proceed the task and start the next step in the process - Retrofit variant C-Station in stock (DE: Nachrüstvariante C-Station auf Lager)     - through this option, the station will be moved to the retrofit stocklist after proceeding the task |
| **Fieldset: Retrofit variant C-Stations - Details***only visible for Retrofit cases* |  |  |  |  |  |
| NS Trafomessung vorhanden /NS transformer measurement available | checkbox | y | y | y |  |
| NS Abgangsmessung vorhanden /NS outlet measurement available | checkbox | n | y | y |  |
| Kommunikationsfähige KuRi vorhanden /KuRi with communication available | checkbox | n | y | y |  |
| **Fieldset: Übergabestation / Transfer station** |  |  |  |  |  |
| Abstrakte Stationsnummer /Abstract station number | stringstationNumber | y | y | n | has to be unique.format: \<DSO\>-\<jj\>\_\<0001\>\_digiONS - DSO: Abbreviation text depending on "Anbindungsziel MSP" / "Connection target MSP"     - Leitsystem: WES     - Leitsystem Nord → WNN     - Leitsystem Süd → WNS - jj: year 22,23,24 - 0001: an increasing number starting with 0001 every year - "digiONS": Text to be added |
| KFWG Typ /KFWG Type | dropdownsmallTelecontrolDeviceType | y | y | n | Values: - digiONS - RetroFit (set automatically for initial digiONS case, in case technology supplier returns "SM", "SO", "LM", "LO" as digiONS type in connection test) - Westnetz-Gateway 1.0 - NMS (Special Projects) - WBR (Special Projects) - WS (Special Projects) - PK (Special Projects) - NB4.0 - Westnetz-Gateway Light - Westnetz-Gateway 2.0 → Default value: "digiONS" |
| Suche Station /Search station | dropdown | n | y | n | select one of the available stations through Technical place, old technical place (only as search param), Station name and/or CityReturns result list with the following information - technical place - station name - city |
| Station nicht gefunden /station not found | checkbox | n | y | n | If this checkbox is enabled, station data can be manually entered. FK stationId will be set NULL and fields of station data are getting editable by the user. - customer center - street - ZIP / City - City district - Installation status - Latest change - Station function - Activated communication - Grid district |
| Technischer Platz /Technical place | dropdownstation.technicalPlace / technicalPlaceManual | y | y | n | select one of the available stations through technical place (uploaded through POST station) |
| Alter technischer Platz /Old technical place | string | n | y | n | value is set through the EAM migration of the technical places ([KFWT-713](https://eon-energy.atlassian.net/browse/KFWT-713) - Database update routine or EAM migration Done) |
| Amtlicher Gemeindeschlüssel (AGS) / Official municipality key | string | n\* | y | n | was added to all processes with KFWT-794 - uploaded through POST station - can also be updated through EAM migration of technical places (KFWT-713) \*Mandatory, if station not found is selected () |
| Stationsname /Station name | dropdownstation.stationName / stationNameManual | y | y | n | - select one of the available stations through the station name (uploaded through POST station) - possibility to type a station name & search for it |
| Name des KFWG /KFWG name | stringsmallTelecontrolDeviceName | y | y | y | Default value = take over station namepossibility to adapt this text with a freetext |
| Kundencenter/Meisterbetrieb / Customer center | string | n | y | n | display info: - DE: Vorgabe aus dem e.on Prozess. Momentan nicht relevant für die Westnetz. - EN: Enforced through the e.on process. At the moment not relevant for the Westnetz. |
| Straße /street | stringstation.street / streetManual | y | y | n | set automatically through selected technical place / station  |
| PLZ / Ort /ZIP / City | stringstation.zip / zipManualstation.location / locationManual | y | y | n | set automatically through selected technical place / station  |
| Ortsteil / city district | string | n | y | n | set automatically through selected technical place / station  |
| Montagestatus /Installation status | string | n | y | n | display info: - DE: Vorgabe aus dem e.on Prozess. Momentan nicht relevant für die Westnetz. - EN: Enforced through the e.on process. At the moment not relevant for the Westnetz. |
| Letzter Wechsel / Latest change | string | n | y | n | display info: - DE: Vorgabe aus dem e.on Prozess. Momentan nicht relevant für die Westnetz. - EN: Enforced through the e.on process. At the moment not relevant for the Westnetz. |
| Stationsfunktion / Station Function | string | n | y | n | display info: - DE: Vorgabe aus dem e.on Prozess. Momentan nicht relevant für die Westnetz. - EN: Enforced through the e.on process. At the moment not relevant for the Westnetz. |
| Aktivierte Kommunikation / Activated communication | string | n | y | n | display info: - DE: Vorgabe aus dem e.on Prozess. Momentan nicht relevant für die Westnetz. - EN: Enforced through the e.on process. At the moment not relevant for the Westnetz. |
|  |  |  |  |  |  |
| Installation RZ /Installation regional center | dropdowninstallationRegionalCenter | y | y | y | Use value list maintained through Area Administration |
| ST-Bereich /ST Area | dropdownstArea.areaName | y | y | y | Use value list of active ST areas (maintained in Area Administration) |
| Anlagenbauinformation /System status |  | y | y | y | display info: - DE: Vorgabe aus dem e.on Prozess. Momentan nicht relevant für die Westnetz. - EN: Enforced through the e.on process. At the moment not relevant for the Westnetz. |
| Verteilnetzbetreiber /Distribution system operator | stringdistributionSystemOperator | y | y | y | Value list maintained in area administration → distribution system operator |
| Name des Planers /Name of the planer | autocompletekidOfThePlaner | y | y | y | Default value: Current userDisplay info: - DE: Hier steht der Name des Planers (dein Name), der den Case gerade bearbeitet. Dein Name an dieser Stelle bedeutet nicht, dass die Station zu dir gehört bzw. du hier ein toDo hast.  Vielmehr hast du den abstrakten Stationsnamen für den Zeitraum, in dem du ihn bearbeitest, reserviert. - EN: In this field you see the name of the Planer (your name), who is currently working on this case. Your name in this field does not mean, that this station belongs to you or that you have a todo. Rather your name is a place holder for the time of the session. |
| Netzbezirk /Network district | stringstation.networkDistrict / networkDistrictManual | y | y | n | Related to RZ; relation and values maintained in Area Administration → Grid Operations → Grid District |
| Sternpunktbehandlung am Montageort /Star point treatment at the installation location | dropdownSTAR\_POINT\_TREATMENT\_INSTALLATION\_LOCATION |  |  |  | Values maintained in selection list |
| Netzspannung /Mains voltage | stringstation.mainsVoltage / mainsVoltageManual | y | y | n | - Use value list from digiONS process (MAINS\_VOLTAGE) |
| Netzführende Stelle /Network managing body | dropdownnetworkManagingBody.displayName | y | y | n | - Use value list maintained in Area Administration → Network managing body - Prefilter values:     - If mains voltage \<= 30,0 kV -\> only entries beginning with "NLS...."     - if mains voltage \> 30,0 kV -\> only entries beginning with "SL..." |
| Trafogrösse \[kVA\] / Size Transformer \[kVA\] | number | n | y | y |   |
| Breitengrad /Lattitude | string | n | y | y |  Display info:  - DE: Für den Breitengrad sind nur Werte zwischen -90 und 90 gültig. Darüber hinaus sind nicht mehr als 14 Dezimalstellen erlaubt. - EN:  |
| Längengrad /Longitude | string | n | y | y | Display info:  - DE: Für den Längengrad sind nur Werte zwischen -180 und 180 gültig. Darüber hinaus sind nicht mehr als 14 Dezimalstellen erlaubt. - EN:  |
|  |  |  |  |  |   |
| Bemerkung /Note | multilinenoteOfTransferStation | n | y | y |  Editable in all tasks (s. ) |
| **Fieldset: DigiONS Allgemeine Informationen / DigiONS General Information** |  |  |  |  |  |
| MS-Schaltanlagen-Konfiguration /MS-Switchgear Configuration | DropdownmidVoltageSwitchConfig.displayName | n | y | n | This selection is relevant to assign the KFWG Object to the right “Fernwirklieferant”:Add new value list with domain “MID\_VOLTAGE\_SWITCH\_CONFIG“.Use these values for records of the value list: - KKT - KKKT - KT - KKKKT - KKTT - KKKTT - KKK - KKKK - KKKKK   Display info:  - DE: Falls die MS-Schaltanlagen-Konfigruation ein oder mehrere "T"s enthält, muss in eine bzw. mehrere Mittelspannungs-Feldbezeichnung ein "Trafo" eingetragen werden. Beispiel: KKTT → Feld 3 Trafo, Feld 4 Trafo  - EN: If the MS-Switchgear Configuration contains one or mutliple "T", the Medium voltage field name needs to contain one or multiple "Trafos". Example: KKTT → Field 3 Trafo, Field 4 Trafo  Update 11.09.2025 with [KFWT-903](https://eon-energy.atlassian.net/browse/KFWT-903):The value for the MS-Switchgear Configuration can have up to 15 CHAR. |
| Mittelspannungs-Feldbezeichnung 1 - 15 /Medium voltage field name 1-15 | string | n | y | n | Flexible UI fieldsDepending on the value selected through the MS-Switchgear Configuration, the fields 1 until 15 are displayed (e.g. KKKT → display only field 1-4) |
| Anzahl Niederspannungsmessleisten /Number of low voltage metering strips | numberlowVoltageMeteringStrips | n | y | n | Add new value list with domain “LOW\_VOLTAGE\_MEASUREMENT“.values: - NS(n) Add new FK lowVoltageMeasurementId to table ValueListItem |
| Hersteller Niederspannungsmessleisten / Manufacturer low voltage metering strips | DropdownlowVoltageMeteringManufacturer.displayName | n | y | n | The values for this dropdown will be added inside the application - Please make them configurableAdd new value list with domain “MANUFACTURER\_LOW\_VOLTAGE\_METERING“Add new FK lowVoltageMeteringManufacturerId to table ValueListItem.values: (only test values at the moment, real values provided later) - Manufacturer A - Manufacturer B - Manufacturer C |
| Drehfeld Netzspannung /Rotary field Mains voltage | dropdownrotaryFieldMainsVoltage | n | y | n | Enumeration RotaryFieldMainsVoltage |
| Ansprechwert Kurzschlussanzeiger /Response value short circuit indicator | numberresponseValue | n | y | n |   |
| Resonanzpunkt /resonance point | numberresonancePoint | n | y | n |  |
| Dämpfungsfaktor /Damping factor | numberdampingFactor | n | y | n |   |
|  |  |  |  |  |   |
| Eigentum /Ownership | dropdownproperty | n | y | n | Dropdown list from CMS? |
| digiONS-Typ /digiONS-Type | dropdowndigionsType.displayName | n | y | n | Value list with domain “DIGIONS\_TYPE“.Values: - FS - NS  Value list with domain “DIGIONS\_TYPE\_RETRO\_FIT“.Values: - LM - LO - SM - SO  Add new FK digionsTypeId to table ValueListItem |
| Fernwirklieferant /Supplier | autocomplete | n | y | n |   |
| rONT /rONT | boolean | n | y | n |   |
| Stationshersteller /Station Manufacturer | dropdownstationManufacturer.displayName | n | y | n | Create new value list domain “STATION\_MANUFACTURER“ to handle list of station manufacturers. |
| Lieferanschrift Stationshersteller / Delivery address station manufacturer | multilinestationManufacturer.description | n | y | n | Old attribute deliveryAddressManufacturer is not needed any more in DB, because we load address from value list item, now. Please delete old attribute from TelecontrolDevice entity. |
| Projektnummer Stationshersteller /Project number station manufacturer | stringprojectNumberstation | n | y | n |   |
| Netzform /Net shape | dropdownnetShape | n | y | n | Values from CMS without enumeration |
| E-Strom der E-Spule /E-coil current | numbereCoilCurrent | n | y | n |   |
| **Fieldset: DigiONS Detailinformationen / DigiONS Details** |  |  |  |  |  |
| Herstellerkürzel KFWG /Manufacturer code telecontrol device | string | n | y | n |   |
| Hardwareversion /Hardware version | dropdown | n | y | n | Update 15.04.2025: - changed with  - selection list HARDWARE\_VERSION\_DIGIONS |
| Kernel-/Firmwareversion /Kernel/Firmware version | dropdown | n | y | n |  |
| Parametriersoftware Version /Parameterization software version | dropdown | n | y | n | Update 15.04.2025: - changed with  - selection list SOFTWARE\_VERSION\_DIGIONS |
| ~~Version Typical Grund-Parametrisierung /~~~~Version Typical basic parameterization~~Grundparameterstand /Basic parameter level | dropdown | n | y | n | Update 15.04.2025: - changed with  - rename UI fields - selection lists     - DigiONS: BASIC\_PARAMETER\_LEVEL\_DIGIONS     - RetroFit: BASIC\_PARAMETER\_LEVEL\_RETROFIT |
| Typgenaue Produktbezeichung /Exact type product designation | dropdown | n | y | n | Update 15.04.2025: - changed with  - selection list EXACT\_TYPE\_PRODUCT\_DESIGNATION\_DIGIONS |
| Artikelnummer Fernwirkgerät /Part number telecontrol device | string | n | y | n |  |
| Primäre MAC Adresse /Primary MAC Address | string | n | y | n |  |
| Seriennummer Fernwirkgerät (CPU) /Serial number telecontrol device (CPU) | string | n | y | n |  |
| *Part of Fieldset: Zusatzbaugruppen 1-4 / Additional module 1-4* |  |  |  |  |  |
| Typbezeichnung / Type designation | string | n | y | n |  |
| Artikelnummer / Part number | string | n | y | n |  |
| Seriennummer / Serial number | string | n | y | n |  |
| **Fieldset: Fernwirkanbindung - Allgemeine Informationen / Telecontrol connection - General information ** |  |  |  |  |  |
| Verbindungsart /Connection type | dropdown | n | y | n |  |
| Lieferziel (ST-Bereich) /Target (ST-Area) | dropdown | n | y | n |  Display info to the field:  - DE: Vorgabe aus dem e.on Prozess. Momentan nicht relevant für die Westnetz.  - EN: Enforced through the e.on process. At the moment not relevant for the Westnetz. |
| Anbindungsziel weiterer Leitsysteme e.IoT /Connection target additional control system e.IoT | checkbox | n | y | n |  |
| Verbindung zur e.IoT möglich (elektronischer Lieferschein) /Connection to e.IoT available (electronical delivery note) | checkbox | n | y | n |  |
| **Fieldset: Fernwirkanbindung - Leitsystem / Telecontrol connection - Control system ** |  |  |  |  |  |
| ASDU / ASDU |  | n | y | n |  |
| Name Konzentrator MSP /Name of concentrator MSP | string | n | y | n |  |
| IP-Adresse 1 Konzentrator MSP /IP-Address 1 concentrator MSP | string | n | y | n |   |
| IP-Adresse 2 Konzentrator MSP /IP-Address 2 concentrator MSP | string | n | y | n |   |
| KanalNr Konzentrator MSP /Channel no. concentrator MSP | string | n | y | n |   |
|  |  |  |  |  |   |
| Herkunftsadresse (IEC104) /Origin Address (IEC104) | dropdown | n | y | n |   |
| Anbindungsziel MSP / Connection target MSP | dropdown | n | y | n |   |
| Name Konzentrator NSP /Name of concentrator NSP  | string | n | y | n |  Display info to the field:  - DE: Vorgabe aus dem e.on Prozess. Momentan nicht relevant für die Westnetz.  - EN: Enforced through the e.on process. At the moment not relevant for the Westnetz. |
| IP-Adresse 1 Konzentrator NSP /IP-Address 1 concentrator NSP | string | n | y | n |  Display info to the field:  - DE: Vorgabe aus dem e.on Prozess. Momentan nicht relevant für die Westnetz.  - EN: Enforced through the e.on process. At the moment not relevant for the Westnetz. |
| IP-Adresse 2 Konzentrator NSP /IP-Address 2 concentrator NSP | string | n | y | n |  Display info to the field:  - DE: Vorgabe aus dem e.on Prozess. Momentan nicht relevant für die Westnetz.  - EN: Enforced through the e.on process. At the moment not relevant for the Westnetz. |
| KanalNr Konzentrator NSP /Channel no. concentrator NSP | string | n | y | n |  Display info to the field:  - DE: Vorgabe aus dem e.on Prozess. Momentan nicht relevant für die Westnetz.  - EN: Enforced through the e.on process. At the moment not relevant for the Westnetz. |
| **Fieldset: Nachrichtentechnik / Communications Engineering ** |  |  |  |  |  |
| Router Hostname / Router Hostname | string | n | y | n |   |
| Klasse / Class | string | n | y | n |   |
| Projekt /Project | string | n | y | n |   |
| Tunnel-IP / Tunnel IP | string | n | y | n |   |
| Peer-IP / Peer IP | string | n | y | n |   |
| Preshared-Key LAN  | string | n | y | n | - only visible for Role ST / Admin - initially hidden in UI:  |
|  |  |  |  |  |   |
| Subnetz-Maske / Subnet-Mask | string | n | y | n |   |
| IP-Adresse der FWA in der Station / IP address of the telecontrol connection in station | string | n | y | n |   |
| IP-Adresse S-Gateway / IP-Address S-Gateway | string | n | y | n |   |
| IP-Adresse NTP-Server 1 / IP-Address NTP-Server 1 | string | n | y | n |  |
| IP-Address NTP-Server 2 / IP-Address NTP-Server 2 | string | n | y | n |   |
| **Fieldset: Routerinformation / Router Information** |  |  |  |  |  |
| Geräteklasse Router | string | n | y | n | ** ** |
| Seriennummer Router | string | n | y | n | ** ** |
| IMSI Router | string | n | y | n | ** ** |
| IMSI2 Router | string | n | y | n | ** ** |
|  | ** ** | ** ** | ** ** | ** ** | ** ** |
| Hersteller Router | string | n | y | n | ** ** |
| Gerätetyp Router | string | n | y | n | ** ** |
| Herstelldatum Router | string | n | y | n | ** ** |
| Line ID | string | n | y | n | ** ** |
| **Fieldset: Detailinformationen - Stromversorgung / Details - Power supply** |  |  |  |  |  |
| Hersteller Stromversorgung /Manufacturer power supply | string | n | y | n |  |
| Typbezeichnung /Type description | dropdown | n | y | n | Update 15.04.2025: - changed with   - selection list TYPE\_DESCRIPTION\_POWER\_SUPPLY |
| Artikelnummer /Part number | string | n | y | n |   |
| Seriennummer /Serial number | string | n | y | n |   |
| Typbezeichnung USV /Type description USV | dropdown | n | y | n | Update 15.04.2025: - changed with  - selection list TYPE\_DESCRIPTION\_USV\_POWER\_SUPPLY |
| Artikelnummer USV /Part number USV | string | n | y | n |   |
| Seriennummer USV /Serial number USV | string | n | y | n |   |
|  |  |  |  |  |   |
| Typbezeichnung Puffermodul /Type description Buffer module | dropdown | n | y | n | Update 15.04.2025: - changed with  - selection list TYPE\_DESCRIPTION\_BUFFER\_MODULE\_POWER\_SUPPLY |
| Artikelnummer Puffermodul /Part number buffer module | string | n | y | n |   |
| Seriennummer Puffermodul /Serial number buffer module | string | n | y | n |   |
| Hersteller Batterie /Manufacturer battery | dropdown | n | y | n | Update 15.04.2025: - changed with  - selection list MANUFACTURER\_BATTERY\_POWER\_SUPPLY |
| Typbezeichnung Batterie /Type description battery | dropdown | n | y | n | Update 15.04.2025: - changed with  - selection list TYPE\_DESCRIPTION\_BATTERY\_POWER\_SUPPLY |
| Serien-Nr. Schrank /Cabinet serial number | string | n | y | n |   |
| Schaltplannummer /Circuit diagram number | string | n | y | n |   |
