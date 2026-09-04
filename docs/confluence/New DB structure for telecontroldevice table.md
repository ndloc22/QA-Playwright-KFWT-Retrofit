# New DB structure for telecontroldevice table

Split the telecontrol device information into three tables in DB:

- telecontroldevice: General information for all types of devices. This information does not depend on the type of telecontrol device.
- telecontroldevice\_digions: Information specific to digiONS
- telecontroldevice\_wngw: Information specific to Westnetz Gateways

  

## ER Modell (17.01.2023)


  

## Mapping of fields

### Table telecontrolDevice

Contains general telecontrol device data.

| **Field name** | **Type** | **DB field** | **UI-Panel** | **Pflichtfeld in Schritt (digiONS-Prozess)** | **Pflichtfeld in Schritt (WNGW-Prozess)** | **Notes** |
| --- | --- | --- | --- | --- | --- | --- |
| Abstrakte Stationsnummer /Abstract station number | str | stationNumber | Übergabestation |  | CreateWNGW | key, filled automatically by Ivy |
| Name des KFWG /KFWG Name | str | smallTelecontrolDeviceName | Übergabestation |  | CreateWNGW | relevant for both digiONS and WNGW  |
| Name des Planers /Name of the planer | str | kidOfThePlaner | Übergabestation |  | CreateWNGW |  |
| Stationsname /Station name | str | station.stationName / stationNameManual | Übergabestation |  | CreateWNGW |  |
| Station nicht gefunden /Station not found | boolean | stationNotFound | Übergabestation |  |  |  |
| Auslösendes RZ /Triggering regional center | str | triggerRegionalCenterId | Übergabestation |  |  | not visible in WNGW-Process |
| RZ der Installation / Installation regional center | str | installationRegionalCenter | Übergabestation |  | CreateWNGW |  |
| KFWG-Typ /KFWG Type | str | smallTelecontrolDeviceType | Übergabestation |  | CreateWNGW | Mögliche Werte: digiONS (nicht auswählbar), Westnetz-Gateway, NMS, WBR, WS, PK, NB4.0 |
| Technischer Platz /Technical place | str | station.technicalPlace /technicalPlaceManual | Übergabestation |  | CreateWNGW |  |
| Straße /street | str | station.street /  streetManual | Übergabestation |  | CreateWNGW |  |
| PLZ / Ort /ZIP / City |  | station.zip / zipManualstation.location / locationManual | Übergabestation |  | CreateWNGW |  |
| Netzbezirk /Network district | str | station.networkDistrict / networkDistrictManual | Übergabestation |  | CreateWNGW |  |
| ST-Bereich /ST Area | str | stArea.areaName / stAreaId | Übergabestation |  | CreateWNGW |  |
| Netzspannung /Mains voltage |  | station.mainsVoltage / mainsVoltageManual | Übergabestation |  | CreateWNGW |  |
| Anlagenstatus /System status | str | assetStatus | Übergabestation |  | CreateWNGW | - STATIONSNEUBAU - VORHANDENESTATION |
| Netzführende Stelle /Network managing body | str | networkManagingBodyId | Übergabestation |  | CreateWNGW |  |
| Hersteller Niederspannungsmessleisten / Manufacturer low voltage metering strips |  | lowVoltageMeteringManufacturerId | Übergabestation |  |  |  |
| Anzahl Niederspannungsmessleisten /Number of low voltage metering strips |  | lowVoltageMeteringStrips | Übergabestation |  |  |  |
| Verteilnetzbetreiber / Distribution system operator |  | distributionSystemOperator | Übergabestation |  |  |  |
| Bemerkung /Comment | str | noteOfTransferStation | Übergabestation |  |  |  |
| SAP Auftragsnummer /SAP Order | str | sapOrder | Übergabestation |  |  |  |
| Baujahr / Manufacturing year | int | manufacturingYear | Übergabestation |  | WNGW parametrization |  |
| Verbindungsart /Connection type |  | connectionTypeId | Fernwirkanbindung - Allgemein |  | CreateWNGW |  |
| Anbindungsziel MSP /Connection target MSP |  | connectionTargetMSPid | Fernwirkanbindung - Allgemein |  | CreateWNGW |  |
| Lieferziel /Deliverytarget |  | deliveryTarget | Fernwirkanbindung - Allgemein |  |  |  |
| Anbindungsziel weitere Leitstelle / Connection target further control station |  | connectionTargetFurtherid | Fernwirkanbindung - Allgemein |  | CreateWNGW |  |
| ASDU / ASDU |  | connectionTarget.ASDU | Fernwirkanbindung - Leitsystem |  | Define IP and ASDU | autofill from table connectionTarget |
| Name Konzentrator MSP /Name of concentrator MSP |  | connectionTarget.concentrator | Fernwirkanbindung - Leitsystem |  | Define IP and ASDU | autofill from table connectionTarget |
| IP-Adresse 1  Konzentrator MSP /IP-Address 1 concentrator MSP |  | connectionTarget.IP1 | Fernwirkanbindung - Leitsystem |  | Define IP and ASDU | autofill from table connectionTarget |
| IP-Adresse 2  Konzentrator MSP /IP-Address 2 concentrator MSP |  | connectionTarget.IP2 | Fernwirkanbindung - Leitsystem |  | Define IP and ASDU | autofill from table connectionTarget |
| KanalNr Konzentrator MSP /Channel no. concentrator MSP |  | connectionTarget.channel | Fernwirkanbindung - Leitsystem |  | Define IP and ASDU | autofill from table connectionTarget |
| Name Konzentrator NSP /Name of concentrator NSP |  | concentratorNSP | Fernwirkanbindung - Leitsystem |  |  |  |
| IP-Adresse 1 Konzentrator NSP /IP-Address 1 concentrator NSP |  | IP1concentratorNSP | Fernwirkanbindung - Leitsystem |  |  |  |
| IP-Adresse 2 Konzentrator NSP /IP-Address 2 concentrator NSP |  | IP2concentratorNSP | Fernwirkanbindung - Leitsystem |  |  |  |
| KanalNr Konzentrator NSP /Channel no. concentrator NSP |  | channelConcentratorNSP | Fernwirkanbindung - Leitsystem |  |  |  |
| Herkunftsadresse (IEC104) / Origin Address (IEC104) | Integer | originAddressIEC104 |  |  |  | Default: 11 |
| IP-Adresse der FWA in der Station /IP from telecontrol device in the station |  | ipSmallTelecontrolDevice | Nachrichtentechnik |  | Assign router information | autofill from table routerInformation |
| IP-Adresse S-Gateway /IP Adress S-Gateway |  | ipGateway | Nachrichtentechnik |  | Assign router information | autofill from table routerInformation |
| Subnetz-Maske /Subnet-Mask |  | localIpSubnetwork | Nachrichtentechnik |  | Assign router information | autofill from table routerInformation |
| Klasse / class |  | telecontrolDeviceClass | Nachrichtentechnik |  | Assign router information | autofill from table routerInformation |
| Projekt / project |  | project | Nachrichtentechnik |  | Assign router information | autofill from table routerInformation |
| IP-Adresse NTP-Server 1 /IP-Adress NTP-Server 1 |  | ipNTPServer1 | Nachrichtentechnik |  | Assign router information | autofill from table routerInformation |
| IP-Adresse NTP-Server 2 /IP-Adress NTP-Server 2 |  | ipNTPServer2 | Nachrichtentechnik |  | Assign router information | autofill from table routerInformation |
| Preshared-Key LAN /Preshared-Key LAN |  | presharedKeyLan | Nachrichtentechnik |  | Assign router information | autofill from table routerInformation |
| Hostname Router /Hostname Router |  | routerHostname | Nachrichtentechnik |  | Assign router information | autofill from table routerInformation |
| Geräteklasse Router /Device class router |  | routerDeviceClass | Routerinformationen |  | Assign router information | autofill from table routerInformation |
| Seriennummer Router /Serial number router |  | routerSerialNumber | Routerinformationen |  | Assign router information | autofill from table routerInformation |
| IMSI Router /IMSI Router |  | routerIMSI | Routerinformationen |  | Assign router information | autofill from table routerInformation |
| IMSI Router 2/IMSI Router 2 |  | routerIMSI2 | Routerinformationen |  | Assign router information | autofill from table routerInformation |
| Hersteller Router /Manufacturer router |  | routerManufacturer | Routerinformationen |  | Assign router information | autofill from table routerInformation |
| Gerätetyp Router /Device type router |  | routerDeviceType | Routerinformationen |  | Assign router information | autofill from table routerInformation |
| Herstelldatum Router /Date of manufacture |  | routerDateOfManufacture | Routerinformationen |  | Assign router information | autofill from table routerInformation |
| Tunnel-IP / Tunnel IP |  | tunnelIP | Routerinformationen |  | Assign router information | autofill from table routerInformation |
| Peer-IP / Peer IP |  | peerIP | Routerinformationen |  | Assign router information | autofill from table routerInformation |
| Herstellerkürzel KFWG /Manufacturer code telecontrol device |  | manufacturerCode | DigiONS - DetailinformationenWestnetz Gateway - Detailinformationen |  | WNGW parametrization |  |
| Hardwareversion /Hardware version |  | hardwareVersion | DigiONS - DetailinformationenWestnetz Gateway - Detailinformationen |  | WNGW parametrization |  |
| Kernel-/Firmwareversion /Kernel/Firmware version |  | firmwareVersion | DigiONS - DetailinformationenWestnetz Gateway - Detailinformationen |  | WNGW parametrization |  |
| Typgenaue Produktbezeichung /Exact type product designation |  | exactProductDesignation | DigiONS - DetailinformationenWestnetz Gateway - Detailinformationen |  | WNGW parametrization |  |
| Artikelnummer Fernwirkgerät /Part number telecontrol device |  | partNumber | DigiONS - DetailinformationenWestnetz Gateway - Detailinformationen |  |  |  |
| Primäre MAC Adresse /Primary MAC Adress |  | primaryMacAddress | DigiONS - DetailinformationenWestnetz Gateway - Detailinformationen |  | WNGW parametrization |  |
| Seriennummer Fernwirkgerät (CPU) /Serial number telecontrol device (CPU) |  | serialNumberCPU | DigiONS - DetailinformationenWestnetz Gateway - Detailinformationen |  |  |  |
| Hersteller Stromversorgung /Manufacturer power supply |  | powerSupplyManufacturer | Detailinformationen - Stromversorgung |  | WNGW parametrization |  |
| Typbezeichnung Stromversorgung /Type description power supply |  | powerSupplyDesignation | Detailinformationen - Stromversorgung |  | WNGW parametrization |  |
| Artikelnummer Stromversorgung /Part number power supply |  | powerSupplyPartNumber | Detailinformationen - Stromversorgung |  |  |  |
| Seriennummer Stromversorgung /Serial number power supply |  | powerSupplySerialNumber | Detailinformationen - Stromversorgung |  | WNGW parametrization |  |
| Typbezeichnung USV /Type description USV |  | upsDesignation | Detailinformationen - Stromversorgung |  | WNGW parametrization |  |
| Artikelnummer USV /Part number USV |  | upsPartNumber | Detailinformationen - Stromversorgung |  |  |  |
| Seriennummer USV /Serial number USV |  | upsSerialNumber | Detailinformationen - Stromversorgung |  | WNGW parametrization |  |
| Typbezeichnung Puffermodul /Type description Buffer module |  | bufferDesignation | Detailinformationen - Stromversorgung |  |  |  |
| Artikelnummer Puffermodul /Part number buffer module |  | bufferPartNumber | Detailinformationen - Stromversorgung |  |  |  |
| Seriennummer Puffermodul /Serial number buffer module |  | bufferSerialNumber | Detailinformationen - Stromversorgung |  |  |  |
| Hersteller Batterie /Manufacturer battery |  | batteryManufacturer | Detailinformationen - Stromversorgung |  | WNGW parametrization |  |
| Typbezeichnung Batterie /Type description battery |  | batteryDesignation | Detailinformationen - Stromversorgung |  | WNGW parametrization |  |
| Eigentum /Ownership | str | property | DigiONS - Allgemeine InformationenWestnetzgateway - Allgemeine Informationen |  | Create WNGW |     WESTNETZ,     KUNDE,     STADTWERKE; |
| Steuerbare Felder /Controllable fields | table | records from “FieldDetail” table | DigiONS - Allgemeine InformationenWestnetzgateway - Allgemeine Informationen |  |  | FK should refer to id in telecontrolDevice |
| Lieferanschrift\_Name |  | nameLieferanschrift | Lieferanschrift |  | Create WNGW |  |
| Lieferanschrift\_Firma |  | companyDeliveryAddress | Lieferanschrift |  | Create WNGW | should be companyLieferanschrift |
| Lieferanschrift\_Strasse |  | streetLieferanschrift | Lieferanschrift |  | Create WNGW |  |
| Lieferanschrift\_PLZ |  | zipLieferanschrift | Lieferanschrift |  | Create WNGW |  |
| Lieferanschrift\_Ort |  | locationLieferanschrift | Lieferanschrift |  | Create WNGW |  |
| Telefon |  | phoneNumber | Lieferanschrift |  |  |  |
| Projektnr. Kunde |  | projectNumberCustomer | Lieferanschrift |  |  |  |
| Der Quelle Senke Test ist durchgeführt /Source Sink Test done | boolean | confirmSourceSinkTest |  |  |  |  |
| KFWG Abgerüstet am / Telecontrol device shut down on | date | shutDownDate |  |  |  | NEW |
| Freigabe der Firewall beantragt am / Firewall clearance requested on | date | firewallClosedDate |  |  |  |  |
| StationId | int | stationId | *not visible* |  | CreateWNGW |  |
| DigiONS Destination / DigiONS Zielort | String | destination | * * |  |  | - DigiONS in stock  - Deliver DigiONS |
| Status |  | status | *not visible* |  |  | **// DigiONS status**     CREATE\_TELECONTROL\_DEVICE(0),     FIREWALL\_CHANGE(1),     BUILD\_TELECONTROL\_DEVICE(2),     PARAMETRIZE\_TELECONTROL\_DEVICE(3),     CONNECTION\_TEST\_TELECONTROL\_DEVICE(4),     SOURCE\_SINK\_PLAN(5),     SOURCE\_SINK\_TEST(6),     ADD\_ADDITIONAL\_INFO(7),     DONE(8),      **// WNGW status**     WNGW\_CREATE(0),     WNGW\_DEFINE\_IP\_ASDU(1),     WNGW\_SIGNAL\_LIST\_AND\_ROUTER\_INFORMATION(2),     WNGW\_FIREWALL\_CHANGE(3),     WNGW\_INSTALLATION\_IN\_CONTROL\_SYSTEM(4),     WNGW\_PARAMETRIZATION\_AND\_CONNECTION\_TEST(5),     WNGW\_SEND\_DEVICE\_TO\_CUSTOMER(6),     WNGW\_CONFIRM\_CUSTOMER\_CONNECTION\_TEST(7),     WNGW\_CONFIRM\_SOURCE\_SINK\_TEST(8),     WNGW\_ACTIVATION\_OF\_TELECONTROL\_DEVICE(9),     WNGW\_CONFIRM\_ROUTER\_ACTIVATION\_IN\_MYCMDB(10),     WNGW\_CONFIRM\_ACTIVATION\_ON\_CUSTOMER\_SIDE(11),     WNGW\_DZE\_FUNCTIONAL\_TEST(12),     WNGW\_DONE(13); |
| Supplier role |  | SupplierRole | *not visible* |  |  |  |

  

### Table telecontrolDevice\_digions

Contains data specific to devices of type digiONS. Fields from current telecontrolDevice table should be moved here.

| **Field name** | **Type** | **DB field** | **UI Panel** | **Pflichtfeld in Schritt (digiONS-Prozess)** | **Pflichtfeld in Schritt (WNGW-Prozess)** | **Notes** |
| --- | --- | --- | --- | --- | --- | --- |
| Abstrakte Stationsnummer /Abstract station number |  | stationNumber |  |  | / | Refers back to telecontrolDevice table |
| MS-Schaltanlagen-Konfiguration /MS-Switchgear Configuration |  | midVoltageSwitchConfigId | DigiONS - Allgemeine Informationen |  | / |  |
| rONT /rONT |  | rontId | DigiONS - Allgemeine Informationen |  | / |  |
| digiONS-Typ /digiONS-Type |  | digionsTypeId | DigiONS - Allgemeine Informationen |  | / |  |
| NS-Messung /NS measurement |  | lowVoltageMeasurementId | DigiONS - Allgemeine Informationen |  | / |  |
| Stationshersteller /Station Manufacturer |  | stationManufacturerId | DigiONS - Allgemeine Informationen |  | / |  |
| Projektnummer Stationshersteller /Project number station manufacturer |  | projectNumberstation | DigiONS - Allgemeine Informationen |  | / |  |
| Lieferanschrift Stationshersteller /Delivery address station manufacturer |  | stationManufacturer.description | DigiONS - Allgemeine Informationen |  | / |  |
| Drehfeld Netzspannung /Rotary field Mains voltage |  | rotaryFieldMainsVoltage | DigiONS - Allgemeine Informationen |  | / |  |
| Netzform /Net shape |  | netShape | DigiONS - Allgemeine Informationen |  | / | - ISOLIERT - INDUKTIV - NIEDEROHMIGGEERDET |
| Ansprechwert Kurzschlussanzeiger /Response value short circuit indicator |  | responseValue | DigiONS - Allgemeine Informationen |  | / |  |
| E-Strom der E-Spule /E-coil current |  | eCoilCurrent | DigiONS - Allgemeine Informationen |  | / |  |
| Resonanzpunkt /resonance point |  | resonancePoint | DigiONS - Allgemeine Informationen |  | / |  |
| Dämpfungsfaktor /Damping factor |  | dampingFactor | DigiONS - Allgemeine Informationen |  | / |  |
| Parametriersoftware Version /Parameterization software version |  | parameterizationVersion | DigiONS - Detailinformationen |  | / |  |
| Version Typical Grund-Parametrisierung /Version Typical basic parameterization |  | basicParamVersion | DigiONS - Detailinformationen |  | / |  |
| Typbezeichnung Zusatzbaugruppe 1 /Type designation additional module 1 |  | mod1Designation | DigiONS - Detailinformationen |  | / |  |
| Artikelnummer Zusatzbaugruppe 1 /Part number additional module 1 |  | mod1PartNumber | DigiONS - Detailinformationen |  | / |  |
| Seriennummer Zusatzbaugruppe 1 /Serial number additional module 1 |  | mod1SerialNumber | DigiONS - Detailinformationen |  | / |  |
| Typbezeichnung Zusatzbaugruppe 2 /Type designation additional module 2 |  | mod2Designation | DigiONS - Detailinformationen |  | / |  |
| Artikelnummer Zusatzbaugruppe 2 /Part number additional module 2 |  | mod2PartNumber | DigiONS - Detailinformationen |  | / |  |
| Seriennummer Zusatzbaugruppe 2 /Serial number additional module 2 |  | mod2SerialNumber | DigiONS - Detailinformationen |  | / |  |
| Typbezeichnung Zusatzbaugruppe 3 /Type designation additional module 3 |  | mod3Designation | DigiONS - Detailinformationen |  | / |  |
| Artikelnummer Zusatzbaugruppe 3 /Part number additional module 3 |  | mod3PartNumber | DigiONS - Detailinformationen |  | / |  |
| Seriennummer Zusatzbaugruppe 3 /Serial number additional module 3 |  | mod3SerialNumber | DigiONS - Detailinformationen |  | / |  |
| Typbezeichnung Zusatzbaugruppe 4 /Type designation additional module 4 |  | mod4Designation | DigiONS - Detailinformationen |  | / |  |
| Artikelnummer Zusatzbaugruppe 4 /Part number additional module 4 |  | mod4PartNumber | DigiONS - Detailinformationen |  | / |  |
| Seriennummer Zusatzbaugruppe 4 /Serial number additional module 4 |  | mod4SerialNumber | DigiONS - Detailinformationen |  | / |  |
| Seriennummer Schrank /Serial number cabinet |  | batteryPartNumber | Detailinformationen - Stromversorgung (digiONS only) |  | / |  |
| Schaltplannummer /Circuit diagram number |  | batterySerialNumber | Detailinformationen - Stromversorgung (digiONS only) |  | / |  |
|  |  |  |  |  |  |  |

  

### Table telecontrolDevice\_wngw 

Contains data specific to devices of type Westnetz Gateway.

| **Field name** | **Type** | **DB field** | **UI-Panel** | **Pflichtfeld in Schritt (digiONS-Prozess)** | **Pflichtfeld in Schritt (WNGW-Prozess)** | **Notes** |
| --- | --- | --- | --- | --- | --- | --- |
| Abstrakte Stationsnummer /Abstract station number | string | stationNumber |  |  |  | Refers back to telecontrolDevice table |
| Anlagentyp / Plant type | string | plantType | Westnetzgateway - Allgemeine Informationen |  | CreateWNGW | Mögliche Werte: Bezugsanlage, Erzeugeranlage, Mischanlage, Bezugsanlage mit Ladestation |
| Name der Bezugs-/Erzeugeranlage/ Name of the reference plant | string | referencePlantName | Westnetzgateway - Allgemeine Informationen |  |  |  |
| Hersteller der Bezugs-/Erzeugeranlage / Power generation system manufacturer | string | powerGenerationSystemManufacturer | Westnetzgateway - Allgemeine Informationen |  |  |  |
| Leistung der Bezugs-/Erzeugeranlage / Power generation system performance | float | powerGenerationSystemPerformance | Westnetzgateway - Allgemeine Informationen |  |  |  |
| WNGW zum Kunden versendet am / WNGW sent to the customer on | date | sentToCustomerDate | Westnetzgateway - Allgemeine Informationen |  | send device to the customer | To be added for WNGW process |
| Sekundärtechn. Inbetriebnahme am / Secondary technical activation on | date | secondarySystemActivationDate | Westnetzgateway - Allgemeine Informationen |  | confirm Quelle/Senke Test | To be added for WNGW process |
| Primärtechn. Inbetriebnahme am / Operational activation on | date | primarySystemActivationDate | Westnetzgateway - Allgemeine Informationen |  | activation of telecontrol device | To be added for WNGW process |
| Hochlaufprüfung erfolgreich am / connection test successful on | date | connectionTestDate | Westnetzgateway - Allgemeine Informationen |  | Confirm Hochlaufprüfung | To be added for WNGW process |
| Prüfprotokoll versendet am / Inspection protocol sent on | date | inspectionProtocolSent | Westnetzgateway - Allgemeine Informationen |  | DZE Funktionsprüfung |  |
| SR-Ids / SR-ids | table |  | Westnetzgateway - Allgemeine Informationen |  |  | store ids in additional table (each WNGW can have 1..n SR-IDs assigned to it) |
| Grundparameterstand / Basic parameter level | string | basicParameterLevel | Westnetzgateway - Detailinformationen |  | parametrization and connection test  | PARA\_WNGW\_WAGO\_210421 |
| Softwareversion / Software version | string | softwareVersion | Westnetzgateway - Detailinformationen |  | parametrization and connection test  |  |
| Feldnummer Übergabefeld /  Field number transfer field | string | fieldNumberTransfer | Westnetzgateway - Detailinformationen |  |  |  |
| Leistungsschalter / Circuit breaker | boolean | circuitBreaker | Westnetzgateway - Detailinformationen |  |  |  |
| Endschlusserfassung im Übergabefeld / End-of-line recording in the transfer field | boolean | endOfLineRecording | Westnetzgateway - Detailinformationen |  |  |  |
| Netz-/Eingangsfelder steuerbar /  Mains/input field controllable | boolean | mainsFieldControllable | Westnetzgateway - Detailinformationen |  |  |  |
| Betreiber Name / Operator name | string | operatorName | Westnetzgateway - Detailinformationen |  |  |  |
| Betreiber Mail / Operator mail | string | operatorMail | Westnetzgateway - Detailinformationen |  |  |  |
| Betreiber Telefon / Operator phone number | string | operatorPhoneNumber | Westnetzgateway - Detailinformationen |  |  |  |
| Seriennummer vom Parkregler / Serial number of regulator | string | regulatorSerialNumber | Westnetzgateway - Detailinformationen |  |  |  |
| Status connection test / Status Hochlaufprüfung | string | connectionTestStatus | Westnetzgateway - Detailinformationen |  |  | - Eingeschränkt erfolgreich - Erfolgreich - Fehler: Keine Verbindung zum WNGW - Fehler: IEC Qualifier - Fehler: GA unvollständig - Fehler: sonstiges |
| Hersteller der Fernwirkanlage / Manufacturer of the telecontrol device | string | telecontrolDeviceManufacturer | Westnetzgateway - Detailinformationen |  |  | - SAE - Wago |
| Herstellertyp / Manufacturer type | string | manufacturerType | Westnetzgateway - Detailinformationen |  |  | - SAE\_FW\_5\_GATE\_SERIES\_5E, - SAE\_FW\_5\_GATE\_SERIES\_5\_PLUS, - SAE\_FW\_5\_GATE\_CL\_SERIES\_5\_PLUS, - WAGO\_750\_8202\_040\_001, - WAGO\_750\_880\_25\_002, - WAGO\_750\_8212\_040\_001; |
