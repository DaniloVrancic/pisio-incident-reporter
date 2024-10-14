package org.springframework.boot.incident_reporter_backend_app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.incident_reporter_backend_app.services.StatisticsService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/statistics")
public class StatisticsController {

    private final StatisticsService statisticsService;

    @Autowired
    public StatisticsController(StatisticsService statisticsService){
        this.statisticsService = statisticsService;
    }


}
