# Role Concept

## General

|  |  |
| --- | --- |
| **User Story** | As System I need to know all the roles in my application to assign permissions accordingly.As Admin, I want the permission handling to be integrated with the E.ONs User Management bot |
| **JIRA** | [EMP-384: Implement regional roles for PLANER](https://axonivy.atlassian.net/browse/EMP-384) |
| **Description** |  |
| **Permission** |  |
| **Preconditions** | Static roles to be able to manage the user assignemnt automatically using user management by eon. |
| **State** |  |

## Regional roles in KFWG:

- Planung / PLANER
- Sekundärtechnik / SECONDARY\_TECHNICIAN

  

### Regions in KFWG: 

 the regions are more or less stable. therefore if the regions are changed, we agreed with customer, that a new release is needed. 

|  |  |
| --- | --- |
| ID | ST-Bereich |
| 1 | Osnabrück |
| 2 | Münster |
| 3 | Arnsberg |
| 4 | Recklinghausen |
| 6 | SmartPool außerhalb Westnetz |
| 7 | Testanlagen |
| 8 | Trier |
| 9 | Schulung |
| 10 | Essen |
| 11 | Langenfeld |
| 12 | Neuss |
| 13 | Wesel |
| 14 | Siegen |
| 15 | Wesseling |
| 16 | Düren |
| 17 | Bad Kreuznach |
| 18 | Saffig |
| 19 | Import WNS Süd |

## Other roles in KFWG:

- Admin
- Nachrichtentechnik / COMMUNICATIONS\_ENGINEERING
- Zentrale Leittechnik / CENTRAL\_CONTROL\_ENGINEERING
- Fernwirklieferant
    - Sprecher
    - WAGO
- Stationslieferant
    - Graeper
    - SBG
    - Scheidt
    - Elsic

  

## Logic:

Normal scenario: 1 Role for n regions

Therefore the logic should consider that a user should get the right roles in the engine cockpit.

e.g. Planung Osnabrück and Planer Siegen → We should assign these two roles in engine cockpit.

→ During this process, the planer of each region will get also a task to add additional information at the end of the process.
