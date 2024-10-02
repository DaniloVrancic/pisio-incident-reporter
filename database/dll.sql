INSERT INTO `pisio`.`incident_type` (`name`) VALUES ('medical');
INSERT INTO `pisio`.`incident_type` (`name`) VALUES ('caution');
INSERT INTO `pisio`.`incident_type` (`name`) VALUES ('crime');
INSERT INTO `pisio`.`incident_type` (`name`) VALUES ('other');

INSERT INTO `pisio`.`incident_subtype` (`subtype`, `incident_type_id`) VALUES ('ambulance', '1');
INSERT INTO `pisio`.`incident_subtype` (`subtype`, `incident_type_id`) VALUES ('explosion', '2');
INSERT INTO `pisio`.`incident_subtype` (`subtype`, `incident_type_id`) VALUES ('fire', '2');
INSERT INTO `pisio`.`incident_subtype` (`subtype`, `incident_type_id`) VALUES ('earthquake', '2');
INSERT INTO `pisio`.`incident_subtype` (`subtype`, `incident_type_id`) VALUES ('flood', '2');
INSERT INTO `pisio`.`incident_subtype` (`subtype`, `incident_type_id`) VALUES ('crimescene', '3');
INSERT INTO `pisio`.`incident_subtype` (`subtype`, `incident_type_id`) VALUES ('fight', '3');
INSERT INTO `pisio`.`incident_subtype` (`subtype`, `incident_type_id`) VALUES ('theft', '3');
INSERT INTO `pisio`.`incident_subtype` (`subtype`, `incident_type_id`) VALUES ('treedown', '4');
INSERT INTO `pisio`.`incident_subtype` (`subtype`, `incident_type_id`) VALUES ('poweroutage', '4');
INSERT INTO `pisio`.`incident_subtype` (`subtype`, `incident_type_id`) VALUES ('construction', '4');