package org.springframework.boot.incident_reporter_backend_app.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class StatisticsService {
    private final IncidentService incidentService;

    @Autowired
    public StatisticsService(IncidentService incidentService){
        this.incidentService = incidentService;
    }
}
