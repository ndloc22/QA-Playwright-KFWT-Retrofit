# \(5\) Build telecontrol device

## General

|  |  |
| --- | --- |
| **User Story** | As telecontrol supplier , I want to execute a connection test after the firewall and parametrization is done by westnetz |
| **JIRA** | [EMP-436: Split Build telecontrol device and Connection test](https://axonivy.atlassian.net/browse/EMP-436) |
| **Description** | - Supplier has to report telecontrol device details for digiONS / RetroFit and set the status buildTelecontrolDeviceDone <https://eon-energy.atlassian.net/wiki/spaces/kfwt22/pages/880246999/Excel-digiONS-IP-Liste+vs+JSON+File?src=contextnavpagetreemode> - Admin is informed through a UI Task about the status |
| **Permission** | Telecontrol supplier has only access to digions assigned to him |
| **Preconditions** | Firewall application and telecontrol parametrization is done. |
| **State** | FINAL |

## Task Details

| **Task Name** | **Description** | **Category** |
| --- | --- | --- |
| KFWG \<station\> im Bau wartet auf Rückmeldung des Lieferanten | Bitte prüfen Sie die Rückmeldung des Lieferanten und schließen den Vorgang ab. | - |

  

## Information

As described in [Connection to control system also to be done with json Export and import](https://confluence.agile.eon.com/wiki/spaces/kfwt22/pages/880246893/2+Connection+to+control+system+also+to+be+done+with+json+Export+and+import) , this step will use the JSON with the status of the digiONS after firewall application and connection to control system is done.

When the user try to get the data, all data with the status (3) Connection test\_telecontrol\_device should be exported.

when POST the KFWG, add a Flag \<Connection successfull\> to proceed in the process.

  

The telecontrol supplier has the possilibty to get all the telecontrol devices in the status "BUILD\_TELECONTROL\_DEVICE" through the GET {system}/v1/kleinfernwirktechnik/telecontrol-devices?status=BUILD\_TELECONTROL\_DEVICE

and can confirm the status "buildTelecontrolDeviceDone": true through the PUT {system}/v1/kleinfernwirktechnik/telecontrol-devices/status/BUILD\_TELECONTROL\_DEVICE.

  

Mandatory fields in this process step are defined here: <https://confluence.agile.eon.com/wiki/spaces/kfwt22/pages/880246999/Excel-digiONS-IP-Liste+vs+JSON+File>

  

  

  

In addition the user is informed through an UI task, that the process is waiting for the confirmation of the telecontrol device supplier:


  

## Action

| Name DE /Name EN | Type | Permissions | Action Result |
| --- | --- | --- | --- |
| Abbrechen /Cancel | button |  | return to portal home |
