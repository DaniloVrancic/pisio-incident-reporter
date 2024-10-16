package org.springframework.boot.incident_reporter_backend_app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.incident_reporter_backend_app.entities.statistics.IndexValue;
import org.springframework.boot.incident_reporter_backend_app.services.StatisticService;
import org.springframework.cglib.core.Local;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.time.LocalDate;
import java.util.List;

@Controller
@RequestMapping("/statistics")
public class StatisticsController {

    private final StatisticService statisticService;

    @Autowired
    public StatisticsController(StatisticService statisticService){
        this.statisticService = statisticService;
    }

    @GetMapping("/get_type_group_count")
    public ResponseEntity<?> getTypeGroupCount(){
        try{
            return new ResponseEntity<List<IndexValue>>(this.statisticService.getTypeCountStatistic(), HttpStatus.OK);
        }
        catch(Exception ex)
        {
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/get_subtype_group_count")
    public ResponseEntity<?> getSubtypeGroupCount(){
        try{
            return new ResponseEntity<List<IndexValue>>(this.statisticService.getSubtypeCountStatistic(), HttpStatus.OK);
        }
        catch(Exception ex)
        {
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/get_days_in_week_group_count")
    public ResponseEntity<?> getDaysInWeekCount(){
        try{
            return new ResponseEntity<List<IndexValue>>(this.statisticService.getIncidentCountByDayInWeek(), HttpStatus.OK);
        }
        catch(Exception ex)
        {
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/get_part_of_day_group")
    public ResponseEntity<?> getPartOfDayGroups(){
        try{
            return new ResponseEntity<List<IndexValue>>(this.statisticService.getIncidentsCountByPartOfDay(), HttpStatus.OK);
        }
        catch(Exception ex)
        {
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/get_incidents_between_dates")
    public ResponseEntity<?> getPartOfDayGroups(@RequestParam String startDate, @RequestParam String endDate){
        try{
            LocalDate startLocalDate = LocalDate.parse(startDate);
            LocalDate endLocalDate = LocalDate.parse(endDate);
            return new ResponseEntity<List<IndexValue>>(this.statisticService.getIncidentsBetweenDates(startLocalDate,endLocalDate), HttpStatus.OK);
        }
        catch(Exception ex)
        {
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/get_incidents_from_date")
    public ResponseEntity<?> getPartOfDayGroups(@RequestParam String startDate){
        try{
            LocalDate startLocalDate = LocalDate.parse(startDate);
            LocalDate endLocalDate = LocalDate.now();
            return new ResponseEntity<List<IndexValue>>(this.statisticService.getIncidentsBetweenDates(startLocalDate,endLocalDate), HttpStatus.OK);
        }
        catch(Exception ex)
        {
            return ResponseEntity.internalServerError().build();
        }
    }


}
