# Description UI Input Fields DigiONS / Retro\-Fit \(to be updated with new fields\)

## User Interface


### Input Fields

  

| Name DE / Name EN | UI Widget &DB Mapping | Mandatory | Visibility | Editable | Validation & Notes |
| --- | --- | --- | --- | --- | --- |
| **Fieldset: Übergabestation / Transfer station** |  |  |  |  |  |
| Abstrakte Stationsnummer /Abstract station number | stringstationNumber | auto generated | yes | no | has to be unique.format: \<DSO\>-\<jj\>.\<0001\>-digiONSDSO: WENjj: year 22,23,240001: an increasing number starting with 0001digiONS: Text to be added DSO atm only WEN, but basically it is the “short name” of a vendor. This could be extended to a dynamic value in the future, if the solution gets relevant for other vendors in the eon enviornment. |
| Name des Planers /Name of the planer | autocompletekidOfThePlaner | n | y | y | Default value: Current userUse E.ON Componets LdapPerson to edit this field. remove “nameOfThePlaner” as it’s redundant. Display name and KID in usual format, but resolve KID by LDAP and display data from LDAP. When sending the form, add validation. Selected username (KID) must be member of role Planer. Show error messsage in case validation fails. |
| Stationsname /Station name | stringstation.stationName / stationNameManual | n | y | y | This UI element will select Station object and set FK stationIdMandatory in the last process step. In Create KFWG step it’s optional. mapping to 2 field, depeding whether stationId is set or stationNotFound is set rename station to stationId. Because FK should always have Id postfix! |
| Station nicht gefunden /Station not found | checkboxstationNotFound | n | y | y | If this checkbox is enabled, station data can be manually entered. FK stationId will be set NULL and fields of station data are getting editable by the user. |
| Auslösendes RZ /Triggering regional center | DropdowntriggerRegionalCenter.areaName new | y | y | y | Displays all available “regions/areas” (these are the same like ST-Areas).this selection is important for future visibilities and task assignments add triggerRegionalCenterId as FK to StArea table |
| Straße /street | stringstation.street /  streetManual | n | y | n | loaded by choosing station name or technical place mapping to 2 field, depeding whether stationId is set or stationNotFound is set |
| Technischer Platz /Technical place | stringstation.technicalPlace / technicalPlaceManual | n | y | n | This UI element will select Station object and set FK stationId mapping to 2 field, depeding whether stationId is set or stationNotFound is set |
| PLZ / Ort /ZIP / City | stringstation.zip / zipManualstation.location / locationManual | n | y | n | loaded by choosing station name or technical place mapping to 2 field, depeding whether stationId is set or stationNotFound is set change type of station.zip and stationManualZipto string 10, because ZIP can have 0 at the beginning and saving it as number will always remove 0 |
| Netzbezirk /Network district | stringstation.networkDistrict / networkDistrictManual | n | y | n | loaded by choosing station name or technical place mapping to 2 field, depeding whether stationId is set or stationNotFound is set |
| ST-Bereich /ST Area | stringstArea.areaName | n | y | y | This UI element will select STArea object and set FK stAreaId |
| Netzspannung /Mains voltage | stringstation.mainsVoltage / mainsVoltageManual | n | y | n | mapping to 2 field, depeding whether stationId is set or stationNotFound is set rename station.netzspannungStation to station.mainsVoltage to have proper English names in DB |
| Anlagenstatus /System status | reuse from pocassetStatus | n | y | y | Was “Asset Status” before and has been renamed. |
| Netzführende Stelle /Network managing body | dropdownnetworkManagingBody.displayName | n | y | y | rename networkManagingBody to networkManagingBodyId. Because FK should always have Id postfix! |
| Stationstyp /Station Type | DropdownsmallTelecontrolDeviceType | y | y | y | this field was the field “KFWG Type” in the pocValues (Enumeration) - DigiONS - Westnetz Gateway  The UI will switch depending on selected value in this field. This feature should be kept. Atm, we only modify the UI when digiONS is selected and we keep current implementation of the other one. |
| Hersteller Niederspannungsmessleisten / Manufacturer low voltage metering strips | DropdownlowVoltageMeteringManufacturer.displayName new | n | y | y | The values for this dropdown will be added inside the application - Please make them configurableAdd new value list with domain “MANUFACTURER\_LOW\_VOLTAGE\_METERING“Add new FK lowVoltageMeteringManufacturerId to table ValueListItem.values: (only test values at the moment, real values provided later) - Manufacturer A - Manufacturer B - Manufacturer C |
| SAP Auftragsnummer /SAP Order | stringsapOrder | n | y | y |  |
| Anzahl Niederspannungsmessleisten /Number of low voltage metering strips | numberlowVoltageMeteringStrips new | see notes | y | y | This field is mandatory, in case manufacturerLowVoltageMetering is not null. |
| Verteilnetzbetreiber / Distribution system operator | stringdistributionSystemOperator new | n | y | y |  |
| Bemerkung /Comment | multilinenoteOfTransferStation | n | y | y |  |
| **Fieldset: Fernwirkanbindung - Allgemeine Informationen / Telecontrol connection - General information** |  |  |  |  |  |
| Verbindungsart /Connection type | dropdownconnectionType.displayName | n | y | y | rename connectionType to connectionTypeId, because FK should always have Id postfix! |
| Anbindungsziel MSP /Connection target MSP | DropdownconnectionTargetMSP.displayName | y | y | y | Displays the possible connection targets from value list “CONNECTION\_TARGET”.This selection defines which ASDU and IPs in [Define IP and ASDU](https://axonivy.atlassian.net/wiki/spaces/EON/pages/47038104613) are assigned to each KFWG. rename connectionTarget1 to connectionTargetMspId (add Id postfix and adapt to new business field name) |
| Lieferziel /target | dropdowndeliveryTarget | n | y | y | keep the current logic atm. This will change soon but is not finally decided yet |
| Anbindungsziel weitere Leitstelle / Connection target further control station | dropdownconnectionTargetFurther.displayName | n | y | n | Out of scope in v1. This was “Leitsystem 2” in poc. rename connectionTarget2 to connectionTargetFurtherId (add Id postfix and adapt to new business field name) |
| **Fieldset: DigiONS - Allgemeine Informationen / DigiONS - General Information ** |  |  |  |  |  |
| Name des KFWG /KFWG Name | stringsmallTelecontrolDeviceName | n | y | y |  |
| Eigentum /Ownership | dropdownproperty | n | n | y | Dropdown list from CMS? |
| MS-Schaltanlagen-Konfiguration /MS-Switchgear Configuration | DropdownmidVoltageSwitchConfig.displayName new | y | y | y | This selection is relevant to assign the KFWG Object to the right “Fernwirklieferant”:Add new value list with domain “MID\_VOLTAGE\_SWITCH\_CONFIG“.Use these values for records of the value list: - KKT - KKKT - KT - KKKKT - KKTT - KKKTT - KKK - KKKK - KKKKK  Add new FK midVoltageSwitchConfigId to table ValueListItem  Rule: (out of scope at the moment)\<= 3 letters (e.g. KKT, KKK) → KFWGs are assigned to WAGO\>= 4 letters (e.g. KKKT, KKKKK) → KFWGs are assigned to SPRECHER |
| digiONS-Typ /digiONS-Type | dropdowndigionsType.displayName new | n | y | y | Add new value list with domain “DIGIONS\_TYPE“.Values: - FS - NS Add new FK digionsTypeId to table ValueListItem |
| rONT /rONT | Dropdownront.displayName new | n | y | y | Add new value list with domain “RONT“.Values: - rONT Add new FK rontId to table ValueListItem |
| NS-Messung /NS measurement | DropdownlowVoltageMeasurement.displayName new | n | y | y | Add new value list with domain “LOW\_VOLTAGE\_MEASUREMENT“.values: - NS(n) Add new FK lowVoltageMeasurementId to table ValueListItem |
| Stationshersteller /Station Manufacturer | dropdownstationManufacturer.displayName | n | y | y | Manufaturers and related addresses (deliveryAddressManufacturer) are currently hardcoded. Manufacturer are loaded from CMS and address is hardcoded in Ivy Script. This was good for PoC and must be improved, now.Create new value list domain “STATION\_MANUFACTURER“ to handle list of station manufacturers.As station manufacturer will now be saved as FK to ValueListItem, rename attribute in DB from stationManufacturer to stationManufacturerId Record 1 to be added to value list:displayName = GräperAddress of manufacturer: (put in description field, take care of line feeds) Unternehmensgruppe Gräper Ida-Gräper-Weg 1 26197 Ahlhorn Record 2 to be added to value list:displayName = SGBSächsisch-Bayerische Starkstrom-Gerätebau GmbH Compactstationsbau Auftragsnummer 242 XXX XXX Ohmstraße 1 D-08496 Neumark Deutschland |
| Projektnummer Stationshersteller /Project number station manufacturer | stringprojectNumberstation | n | y | y |  |
| Lieferanschrift Stationshersteller / Delivery address station manufacturer | multilinestationManufacturer.description | n | y | n | Old attribute deliveryAddressManufacturer is not needed any more in DB, because we load address from value list item, now. Please delete old attribute from TelecontrolDevice entity. |
| Steuerbare Felder /Controllable fields | tablerecords from “FieldDetail” | n | y | y | In table “FieldDetail”, rename FK to TelecontrolDevice from telecontrolDevice to telecontrolDeviceId, because all FK should have prefix Id in DB. Columns of table and edit dialog is not descibed here. It should be kept as currently implemented. |
| Drehfeld Netzspannung /Rotary field Mains voltage | dropdownrotaryFieldMainsVoltage | n | y | y | Enumeration RotaryFieldMainsVoltage |
| Netzform /Net shape | dropdownnetShape | n | y | y | Values from CMS without enumeration? |
| Ansprechwert Kurzschlussanzeiger /Response value short circuit indicator | numberresponseValue | n | y | y |  |
| E-Strom der E-Spule /E-coil current | numbereCoilCurrent | n | y | y |  |
| Resonanzpunkt /resonance point | numberresonancePoint | n | y | y |  |
| Dämpfungsfaktor /Damping factor | numberdampingFactor | n | y | y |  |
| **Fieldset: Lieferanschrift / Delivery Adress** |  |  |  |  |  |
|  |  |  |  |  | This section is not descibed in detail. It should be kept as currently implemented. |
