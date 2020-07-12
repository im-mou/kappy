
# Requirements
## Scenario: Create new Relation
----

## New site:
- insert record into "sites"
- set start date
  - possibly only the year and month -> MM/YYYY


## New Worker:
- insert record into "workers"
- set start date -> DD/MM/YYYY


## New relation:
- insert record into "relations"
- check if Attendance record is created for current month -> MM/YYYY
  - If doesn't exist:
    - ~~create a new database document "attendance.MM.YYYY"~~
    - ~~if MM/YYYY is very old -> create multiple db.document -> curr. month~~
  - ~~start populating data from "worker.startdate"~~ <- you dumbass it's negated logic.
    - ~~f startdate is too old -> hop through multiple files~~
      - ~~set "Present" as the default value.~~


<br/>

## Scenario: Open app after a long time
----

## Open Attendance page:
- get current selected site
- check for last data insertion date
  - if "attendance.MM.YYYY" doesn't exist create a new-one/multiple
  - start populating data from "worker.startdate"
      - if startdate is too old -> hop through multiple files
        - set "Present" as the default value.

<br/>

## Challenges
----

- [Scenario: Create new Relation]
  - determine if for a given "MM/YYYY" database file exists

<br/>

- [Scenario: Open app after a long time]
  - determine if for a given "MM/YYYY" database file exists
  - determine the last update to the "attendance.MM.YYYY" file
