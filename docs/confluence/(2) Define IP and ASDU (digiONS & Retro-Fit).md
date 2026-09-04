# \(2\) Define IP and ASDU \(digiONS & Retro\-Fit\)

## General

|  |  |
| --- | --- |
| **User Story** | As system I want to assign automatically the ASDU and IP Adress to the relevant connection target. |
| **JIRA** | [EMP-382: Set auto-values for station number, ASDU and IP](https://axonivy.atlassian.net/browse/EMP-382)[EMP-390: Handle case Connection Target Stock runs out of records: automatic retry task](https://axonivy.atlassian.net/browse/EMP-390)[EMP-414: Handle case Connection Target Stock runs out of records: Notification Mail](https://axonivy.atlassian.net/browse/EMP-414) |
| **Description** |  |
| **Permission** |  |
| **Preconditions** | one table with values for ASDU and IP Adresses are available. (for details s. <https://confluence.agile.eon.com/wiki/spaces/kfwt22/pages/880247555/Display+ASDU+Overview>) |
| **State** | FINAL |

  

  

### Running out of entries - Cron Job

In order to ensure, that enough values are available during the processing of the cases, please create a cronjob to check if there are still enough entries according to a variable (default value 10). IF the number is \<= \<variable\> then send an information email to the admin. the admin should be defined via variable (email)
