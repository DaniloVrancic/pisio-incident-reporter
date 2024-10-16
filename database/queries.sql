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
GROUP BY inc.incident_subtype_id;