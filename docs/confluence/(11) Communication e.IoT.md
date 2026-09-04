# \(11\) Communication e\.IoT

## General

|  |  |
| --- | --- |
| **User Story** | As a Planer DigiONS I want that the technical place information are communicated to the e.IoT platform so I reduce manual work. Therefore specific key values, which are added in the add additional information by the Planer DigiONS to our data base, must be communicated afterwards to a specific endpoint. |
| **JIRA** | - [\[KFWT-342\] Communication of TP-Infos for e.IoT - Jira](https://eon-energy.atlassian.net/browse/KFWT-342) - [\[KFWT-494\] Label should be transferred according new guidlines to e.IoT - Jira](https://eon-energy.atlassian.net/browse/KFWT-494) |
| **Description** | Transfer of defined digiONS / retrofit data to e.IoT |
| **Business contact person customer** | *@El Aamouchi, Mohamed* |
| **Technical contact person customer** | *@Gierse, Dominik * |
| **Contact person Axon Ivy** | @Papanakos, Lydia @Hipp, Johannes  |
| **Permission** | System |
| **Preconditions** | <https://confluence.agile.eon.com/wiki/spaces/kfwt22/pages/880247145/10+Add+additional+information> |
| **State** | FINAL |

## Interface Basic data

|  | **Value** | **Comments** |
| --- | --- | --- |
| **Technology** | *REST API* |  |
| **Test environment information** | <https://api.iot.eon.com/gateways/v2> - ipen\_westnetz\_dev - ipen\_westnetz\_qas |  |
| **Prod environment information** | <https://api.iot.eon.com/gateways/v2> - ipen\_westnetz\_run |  |
| **Authentication method** | OAuth | Get Bearer Token through<https://login.microsoftonline.com/03e6c03e-074e-474c-8d40-3eac96d82a77/oauth2/v2.0/token>authentication server URI: [api://eiot-api-prod/.default]()global variables: -  de\_eon\_kfwg\_core\_rest\_client\_eiot\_client\_id -  de\_eon\_kfwg\_core\_rest\_client\_eiot\_client\_secret |
| **Development approach / access** | - *DEVX → ipen\_westnetz\_dev* - *QA → ipen\_westnetz\_qas* |  |
| **Documentation and ressources (if available)** | - Rest Api Doku e.IoT please use this doku for the api creation: <https://eon-energy.atlassian.net/wiki/display/kfwt22/e.IoT+Api+Doku> - Swagger UI: <https://docs.iot.eon.com/swagger-ui/#overview> - Web UI: <https://grpc-ui.iot.eon.com/> |  |

## Interface detail information

| **Service Name** | **Description** | **Sync type (On demand / Master data / Cache)** | **Required Params** | **Examples / Test data** |
| --- | --- | --- | --- | --- |
| get /gateways/v2/{gatewayId} | detect the correct id to our abstract station number | *on demand* | - gatewayId: wago-060203040506     - supplier + mac address - group: WN\_25\_0123\_digiONS     - abstract station number | Example Data in DEV System: [https://app.iot.eon.com/tenants/ipen\_westnetz\_dev/gateways/wago-060203040506](https://app.iot.eon.com/tenants/ipen_westnetz_dev/gateways/wago-060203040506) |
|  patch /gateways/v2/{[gateway.device.id](http://gateway.device.id)} | defined data is added to the selected gateway through the service "Update gateway by id" |  *on demand* | - [gateway.device.id](http://gateway.device.id): \<id received from the get call\> |  |

  

## Transferred data

| e.ioT label | KFWG label | Example / Test data |
| --- | --- | --- |
| label.stationName | station.stationName | Demmin Hanseufer 1 |
| label.group | abstractStationName | WN\_25\_0123\_digiONS |
| label.digiOnsType | digionsType | FS |
| label.mvSwitchgearType | digionsData.midVoltageSwitchConfig | KKT |
| label.mainsVoltage | mainsVoltage | 11,0 |
| label.ratedCapacity\_kVA | transformerCapacity |  |
| label.ront | ront | Nein |
| label.lvSwitchgearType | digionsData.lowVoltageMeasurement | NS(7) |
| label.dsoStationNumber | station.technicalPlace |  |
| label.msBranch1-5 | nameMidVoltageOutlet1-5 |  |
| labels.assetType | - value: **digiONS**     - set if, a telecontrol device is a from type digiONS - value: **retrofitFeeder**     - set, if a Retrofit has the checkboxes “NS transformer measurement available” + “NS outlet measurement available" set - value: **retrofitTransformer**     - set, if a Retrofit has the checkbox “NS transformer measurement available” checked | digiONS |
| labels.stationLocation | station.city | Scharbeutz |
| labels.region | installationRegionalCenter | RZ Arnsberg |

  

  

  

Example from e.IoT:
