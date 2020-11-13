/*calendar_import_S1.csv or calendar_import_S2.csv - create this or these files in the the /teachers/ folder and paste this SQL code AFTER adjusting the cc.date_value and the s.termid */

Subject,Start Date,Start Time,End Date,End Time,All Day Event,Description,Location
~[tlist_sql;SELECT P.Abbreviation || '(' || SM.CYCLE_DAY_LETTER || ')' || ' - ' || c.course_name AS "Subject", 
to_char(CD.DATE_VALUE, 'MM/DD/YYYY') AS "Start Date", 
BSI.START_TIME AS "Start Time", 
to_char(CD.DATE_VALUE, 'MM/DD/YYYY') AS "End Date",
BSI.END_TIME AS "End Time",
'FALSE' AS "All Day Event",
C.COURSE_NAME ||' - Block ' || P.PERIOD_NUMBER ||' - ' || SM.CYCLE_DAY_LETTER ||' Day' AS "Description", 
S.ROOM AS "Location"
FROM sectionteacher st
INNER JOIN sections S ON st.sectionid=s.id
INNER JOIN Courses C ON S.COURSE_NUMBER=C.COURSE_NUMBER  
INNER JOIN SECTION_MEETING SM ON S.ID=SM.SECTIONID 
  AND S.SchoolID=SM.SCHOOLID 
INNER JOIN PERIOD P ON P.PERIOD_NUMBER =SM.PERIOD_NUMBER 
  AND P.SCHOOLID=SM.SCHOOLID 
  AND P.YEAR_ID=SM.YEAR_ID
INNER JOIN BELL_SCHEDULE_ITEMS BSI ON P.ID= BSI.PERIOD_ID
INNER JOIN CALENDAR_DAY CD ON  CD.BELL_SCHEDULE_ID=BSI.BELL_SCHEDULE_ID 
  AND CD.INSESSION=1 
  AND CD.SchoolID=~(curschoolid)
 AND CD.DATE_VALUE BETWEEN  TO_DATE ('09/01/2018', 'mm/dd/yyyy')--'~[x:termbegdate]'
AND TO_DATE ('12/31/2018', 'mm/dd/yyyy')-- and '~[x:termenddate]'
INNER JOIN CYCLE_DAY CYD ON CD.SchoolID=CYD.SCHOOLID  
  AND CYD.id=CD.CYCLE_DAY_ID  
  AND CYD.LETTER =SM.CYCLE_DAY_LETTER 
  AND CYD.YEAR_ID=SM.YEAR_ID
WHERE S.TERMID IN(~(curyearid)00,~(curyearid)01,~(curyearid)02,~(curyearid)03,~(curyearid)04,~(curyearid)05,~(curyearid)06,~(curyearid)07,~(curyearid)08) AND st.teacherid='~[x:userid]'
ORDER BY CD.DATE_VALUE,START_TIME;] ~(1),~(2),~(3;l;format=time),~(4),~(5;l;format=time),~(6),~(7),~(8)
[/tlist_sql]