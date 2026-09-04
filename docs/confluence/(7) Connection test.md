# \(7\) Connection test

## General

|  |  |
| --- | --- |
| **User Story** | As telecontrol supplier , I want to confirm the connection test after the connection to the control system is confirmed by the ZLT. |
| **JIRA** |  |
| **Description** | In this process step through the handover of the digiONS type, the telecontrol supplier is able to decide, if a telecontrol device is a digiONS or a retrofit variant. |
| **Permission** | Telecontrol supplier has only access to digions assigned to him |
| **Preconditions** | Connection to control system is confirmed (<https://confluence.agile.eon.com/wiki/spaces/kfwt22/pages/880247137/6+Connection+control+system>) |
| **State** | FINAL |

## Task Details

| **Task Name** | **Description** | **Category** |
| --- | --- | --- |
| KFWG \<station\> im Verbindungstest wartet auf Rückmeldung des Lieferanten | Bitte prüfen Sie die Rückmeldung des Lieferanten und schließen den Vorgang ab. | - |

  

## Information

The telecontrol supplier has the possilibty to get all the telecontrol devices in the status "CONNECTION\_TEST\_TELECONTROL\_DEVICE" through the GET {system}/v1/kleinfernwirktechnik/telecontrol-devices?status=CONNECTION\_TEST\_TELECONTROL\_DEVICE

and can confirm the status "connectionTestDone": true through the PUT {system}/v1/kleinfernwirktechnik/telecontrol-devices/status/CONNECTION\_TEST\_TELECONTROL\_DEVICE.

  

  

In addtion the user is informed through an UI task, that the process is waiting for the confirmation of the telecontrol device supplier:


  

  

The next step depends on the digiONS type transferred from the telecontrol supplier through the JSON:

- DigiONS
    - digiOns type: FS, NS
    - <https://confluence.agile.eon.com/wiki/spaces/kfwt22/pages/880247141/8a+DigiONS+Confirm+Source-Sink-Test>
- Retrofit variant
    - digiOns type: LM, LO, SM, SO
    - <https://confluence.agile.eon.com/wiki/spaces/kfwt22/pages/880247143/8b+Retrofit+Push+to+stocklist>

  

## Action

| Name DE /Name EN | Type | Permissions | Action Result |
| --- | --- | --- | --- |
| Abbrechen /Cancel | button |  | return to portal home |
