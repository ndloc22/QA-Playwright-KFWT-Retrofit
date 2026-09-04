# \(4\) Firewall Change Ordered \(digiONS & Retro\-Fit\)

## General

|  |  |
| --- | --- |
| **User Story** | As communication engineer, I want to get a notification and in addition a complete list of all relevant entries via CSV and after adding information to it (basically a flag to confirm, it is done) I want to reimport the CSV to proceed with the process |
| **JIRA** | [EMP-435: Firewall change to be used with CSV Export and import](https://axonivy.atlassian.net/browse/EMP-435) |
| **Description** | When a case waits for a Firewall Import a UI task is displayed and assigned to the role Communications Engineer, with the information that this device awaits a firewall request.The UI Task is described here.The Firewall Request is described as a single subprocess here: <https://confluence.agile.eon.com/wiki/spaces/kfwt22/pages/880247381/Request+Firewall> |
| **Permission** | Communication Engineer |
| **Preconditions** | IP / ASDU and Router were successfully assigned to the digiONS / Retro-Fit device(s) |
| **State** | FINAL |

## User Interface


## Task Details

| **Task Name** | **Description** | **Category** |
| --- | --- | --- |
| Firewall Antrag für \<station\> ist gestellt und wartet auf Rückmeldung (CSV) | Bitte prüfen Sie die Rückmeldung des Firewall Antrags und schließen den Vorgang ab. | - |

  

## Information

in <https://confluence.agile.eon.com/wiki/spaces/kfwt22/pages/880246874/3a+Order+routers+-+export> we defined an approach, how to export digions in a CSV file and in <https://confluence.agile.eon.com/wiki/spaces/kfwt22/pages/880246876/3b+Order+routers+import> how to reimport them. In this story, I think we can reuse the pattern.

- Provide two process starts:
    - Firewall request - Export / Firewall Antrag - Export
        - Export all entries with the right preconditions
    - Firewall request - Import / Firewall Antrag - Import
        - Show the table to validate entries.
- Bring back email (from POC) to send once a day a CSV with all entries in this status to a defined recipient.
    - The file in the email, is the same the user can create manually using the export process.
