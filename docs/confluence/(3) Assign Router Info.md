# \(3\) Assign Router Info

## General

|  |  |
| --- | --- |
| **User Story** | As communication enginners we want to provide a stock data for router information and the system to assign these to each digions automatically. |
| **JIRA** | [EMP-416: Automatic assignment of order router data](https://axonivy.atlassian.net/browse/EMP-416) |
| **Description** | Detailed description of router overview & upload:  <https://confluence.agile.eon.com/wiki/spaces/kfwt22/pages/880247588/Display+Router+Overview><https://confluence.agile.eon.com/wiki/spaces/kfwt22/pages/880247644/Upload+router+data+E.ON+Router> |
| **Permission** | system |
| **Preconditions** | Process has been started |
| **State** | FINAL |

### Fields

Create a new table in the Database (similar to <https://confluence.agile.eon.com/wiki/spaces/kfwt22/pages/880247129/2+Define+IP+and+ASDU+digiONS+Retro-Fit>) for Router information stock.

Stock will be maintained in v1 via DB.

The needed fields, are defined in the “Import” column in this page: <https://confluence.agile.eon.com/wiki/spaces/kfwt22/pages/880246874/3a+Order+routers+-+export> 

also here: <https://confluence.agile.eon.com/wiki/spaces/kfwt22/pages/880247586/Router+Overview>

  

### Logic and details

For each DIGIONS assigned the corresponding entry is marked as “Used”.

Please consider also the use cases

- Automatic retry task if not successful
- Automatic mail notification if running out of entries.
    - 

### Running out of entries - Cron Job
In order to ensure, that enough values are available during the processing of the cases, please create a cronjob to check if there are still enough entries according to a variable (default value 10). IF the number is \<= \<variable\> then send an information email to the admin. the admin should be defined via variable (email)

  

- ***Hint: ***Only E.ON Routers with a valid supplier are picked from the router list to assign a router to the DigiONS / RetroFit device.
