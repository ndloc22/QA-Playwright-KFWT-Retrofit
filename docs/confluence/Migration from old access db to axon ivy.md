# Migration from old access db to axon ivy

  

Status mapping:   
the condition says, that an elment will get into the statuis and is **in to-do, not completed**

| Status in Axon Ivy Process (step is in to-do) | Condition in export file | Comment |
| --- | --- | --- |
| Define IP and ASDU | none | All elements go here if they dont meet the next condition |
| Assign router information to cases | (ASDU beantragt) == 1  && (ASDU) != null |  |
| Firewall change ordered |  |  |
| Build telecontrol device |  |  |
| Connection to control system |  |  |
| Connection test |  |  |
| plan source sink test |  |  |
| add additional information |  |  |
| procees source sink test |  |  |
| final |  |  |
