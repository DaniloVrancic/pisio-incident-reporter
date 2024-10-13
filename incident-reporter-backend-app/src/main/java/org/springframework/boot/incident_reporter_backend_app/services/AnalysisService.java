package org.springframework.boot.incident_reporter_backend_app.services;

import org.springframework.boot.incident_reporter_backend_app.entities.analysis.Cluster;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AnalysisService {

    IncidentService incidentService;

    public AnalysisService(IncidentService incidentService){
        this.incidentService = incidentService;
    }


}
