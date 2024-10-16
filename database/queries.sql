#Counts all the types of incidents and groups them by type
SELECT inc_type.`name`, COUNT(*) AS 'occurrence' FROM incident inc 
INNER JOIN incident_subtype inc_sub ON inc.incident_subtype_id=inc_sub.id 
INNER JOIN incident_type inc_type ON inc_sub.incident_type_id = inc_type.id 
WHERE inc.`status`='APPROVED' 
GROUP BY inc_sub.incident_type_id;

#Counts all the subtypes of incidents and groups them by type
SELECT inc_sub.`subtype`, COUNT(*) AS 'occurrence' FROM incident inc 
INNER JOIN incident_subtype inc_sub ON inc.incident_subtype_id=inc_sub.id 
INNER JOIN incident_type inc_type ON inc_sub.incident_type_id = inc_type.id 
WHERE inc.`status`='APPROVED' 
GROUP BY inc.incident_subtype_id
ORDER BY inc_sub.`subtype`;

#Counts how many incidents happen on a given day in the week, Monday-Sunday
SELECT DAYNAME(time_of_incident) AS day_of_week, COUNT(*) AS 'occurrences'
FROM incident
WHERE status = 'APPROVED'
GROUP BY DAYOFWEEK(time_of_incident)
ORDER BY DAYOFWEEK(time_of_incident);

#Counts how many crimes happen in a given time of day (day has been split in 4 parts, starting from midnight 00:00)
SELECT 
    CASE 
        WHEN HOUR(time_of_incident) < 6 THEN '00:00 - 05:59'
        WHEN HOUR(time_of_incident) < 12 THEN '06:00 - 11:59'
        WHEN HOUR(time_of_incident) < 18 THEN '12:00 - 17:59'
        ELSE '18:00 - 23:59'
    END AS time_interval,
    COUNT(*) AS incident_count
FROM 
    incident
GROUP BY 
    time_interval
ORDER BY 
    CASE 
        WHEN HOUR(time_of_incident) < 6 THEN 1
        WHEN HOUR(time_of_incident) < 12 THEN 2
        WHEN HOUR(time_of_incident) < 18 THEN 3
        ELSE 4
    END;