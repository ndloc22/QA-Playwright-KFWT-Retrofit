# \(16\) ACOS Data Export \(E\-Mail Notification\)

## \*will be removed with EAM transfer Go Live

## General

|  |  |
| --- | --- |
| **User Story** | As an external Secondary technician, I want to receive an e-mail notification about the ACOS relevant data. The E-Mail should contain also the ACOS Excel file prefilled with the relevant data out of the system. |
| **JIRA** |  |
| **Description** | At the end of the process, an e-Mail notification is sent out to the ST Area Mailbox / ST Area Global Mailbox (s. KFWT-528) containing the ACOS export excel file containing all relevant data for the case and an instruction on how to enter the data in the ACOS system. |
| **Permission** |  |
| **Preconditions** | DigiONS: <https://confluence.agile.eon.com/wiki/spaces/kfwt22/pages/880247151/12+Configure+updated+technical+place>Retro-Fit: <https://confluence.agile.eon.com/wiki/spaces/kfwt22/pages/880247155/15+Retrofit+Fulfill+source-sink-test> |
| **State** | FINAL |

  

## Email Properties

|  |  |
| --- | --- |
| **Sender address (if applicable)** | KFWG Default |
| **Reply to address (if applicable)** |  |
| **Recipients (to, cc, bcc)** | v2: Global ST Mailbox (s. KFWT-528)v1: Mailbox needs to be detected from Area Administration - ST Area Mailbox → Check maintained ST Area of case, detect corresponding e-mail address  |
| **Subject** | Datenexport \<station name\> \<abstract station number\> für ACOS Datenpflege |
| **Attachments (if applicable)** | Example File: File name: \<dd\_mm\_yy\>\_Datenpflege\_digiONS\_\<abstract station number\>.xlsx |

## Email Body

Guten Tag,

Du erhälst diese E-Mail als Mitglied der Rolle Sekundärtechniker.

Anbei findest du den Datenexport für \<abstract station number\> zur Eingabe der Daten in ACOS

  

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

  

English:

Hello,

You are receiving this e-mail as a member of the Secondary Technician role.

Enclosed you will find the data export for \<abstract station number\> for entering the data in ACOS

  

  

## Variables (if applicable)

|  |  |
| --- | --- |
| \<abstract station number\> | abstract station number |
| \<station name\> | station name |

  

  

## Fallback logic, if no e-mail address was found

As the ACOS E-Mail is included in the <https://confluence.agile.eon.com/wiki/spaces/kfwt22/pages/880247207/E-Mail+Administration> () the general fallback logic (Admin Task) will be used.
