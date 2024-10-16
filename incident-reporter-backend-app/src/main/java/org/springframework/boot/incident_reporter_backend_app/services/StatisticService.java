package org.springframework.boot.incident_reporter_backend_app.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.incident_reporter_backend_app.entities.statistics.IndexValue;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StatisticService {

    private final JdbcTemplate jdbcTemplate;
    private final RowMapper<IndexValue> rowMapper = (rs, row)
        -> new IndexValue(rs.getString("index"), rs.getInt("value"));

    @Autowired
    public StatisticService(JdbcTemplate jdbcTemplate){
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<IndexValue> getTypeCountStatistic(){
        return this.jdbcTemplate.query(typeCountStatistic, rowMapper);
    }

    public List<IndexValue> getSubtypeCountStatistic(){
        return this.jdbcTemplate.query(subtypeCountStatistic, rowMapper);
    }

    public List<IndexValue> getIncidentCountByDayInWeek(){
        return this.jdbcTemplate.query(incidentsCountByDayOfWeek, rowMapper);
    }

    public List<IndexValue> getIncidentsCountByPartOfDay(){
        return this.jdbcTemplate.query(incidentsCountByPartOfDay, rowMapper);
    }


    final String typeCountStatistic = "SELECT inc_type.name AS 'index', COUNT(*) AS 'value' FROM incident inc " +
            "INNER JOIN incident_subtype inc_sub ON inc.incident_subtype_id=inc_sub.id " +
            "INNER JOIN incident_type inc_type ON inc_sub.incident_type_id = inc_type.id " +
            "WHERE inc.status='APPROVED' " +
            "GROUP BY inc_sub.incident_type_id;";

    final String subtypeCountStatistic = "SELECT inc_sub.subtype AS 'index', COUNT(*) AS 'value' FROM incident inc " +
            "INNER JOIN incident_subtype inc_sub ON inc.incident_subtype_id=inc_sub.id " +
            "INNER JOIN incident_type inc_type ON inc_sub.incident_type_id = inc_type.id " +
            "WHERE inc.status='APPROVED' " +
            "GROUP BY inc.incident_subtype_id " +
            "ORDER BY inc_sub.subtype; ";

    final String incidentsCountByDayOfWeek = "SELECT DAYNAME(time_of_incident) AS 'index', COUNT(*) AS 'value' " +
            "FROM incident " +
            "WHERE status = 'APPROVED' " +
            "GROUP BY DAYOFWEEK(time_of_incident) " +
            "ORDER BY DAYOFWEEK(time_of_incident);";

    final String incidentsCountByPartOfDay = "SELECT " +
            "    CASE " +
            "        WHEN HOUR(time_of_incident) < 6 THEN '00:00 - 05:59' " +
            "        WHEN HOUR(time_of_incident) < 12 THEN '06:00 - 11:59' " +
            "        WHEN HOUR(time_of_incident) < 18 THEN '12:00 - 17:59' " +
            "        ELSE '18:00 - 23:59' " +
            "    END AS `index`, " +
            "    COUNT(*) AS 'value' " +
            "FROM " +
            "    incident " +
            "    WHERE status='APPROVED' " +
            "GROUP BY " +
            "    `index`" +
            "ORDER BY " +
            "    CASE " +
            "        WHEN HOUR(time_of_incident) < 6 THEN 1 " +
            "        WHEN HOUR(time_of_incident) < 12 THEN 2 " +
            "        WHEN HOUR(time_of_incident) < 18 THEN 3 " +
            "        ELSE 4" +
            "    END;";

}
