package org.springframework.boot.incident_reporter_backend_app.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.incident_reporter_backend_app.entities.statistics.IndexValue;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
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

    public List<IndexValue> getIncidentsBetweenDates(LocalDate startDate, LocalDate endDate){
        return this.jdbcTemplate.query(callGetIncidentsCountsForDates(startDate,endDate), rowMapper);
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

    final String incidentsCountByDayOfWeek = "WITH week_days AS (\n" +
            "  SELECT 1 AS day_num, 'Monday' AS day_name\n" +
            "  UNION SELECT 2, 'Tuesday'\n" +
            "  UNION SELECT 3, 'Wednesday'\n" +
            "  UNION SELECT 4, 'Thursday'\n" +
            "  UNION SELECT 5, 'Friday'\n" +
            "  UNION SELECT 6, 'Saturday'\n" +
            "  UNION SELECT 7, 'Sunday'\n" +
            ")\n" +
            "SELECT wd.day_name AS 'index', \n" +
            "       COALESCE(COUNT(i.time_of_incident), 0) AS 'value'\n" +
            "FROM week_days wd\n" +
            "LEFT JOIN incident i \n" +
            "  ON (CASE \n" +
            "        WHEN DAYOFWEEK(i.time_of_incident) = 1 THEN 7  -- Sunday becomes 7\n" +
            "        ELSE DAYOFWEEK(i.time_of_incident) - 1  -- Shift the rest by 1\n" +
            "      END) = wd.day_num\n" +
            "  AND i.status = 'APPROVED'\n" +
            "GROUP BY wd.day_num, wd.day_name\n" +
            "ORDER BY wd.day_num;\n";

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

    private String callGetIncidentsCountsForDates(LocalDate startDate, LocalDate endDate)
    {
        return  "call GetIncidentCounts(' "+ startDate.toString() + " ', ' "+ endDate.toString() +" ');";
    }
}
