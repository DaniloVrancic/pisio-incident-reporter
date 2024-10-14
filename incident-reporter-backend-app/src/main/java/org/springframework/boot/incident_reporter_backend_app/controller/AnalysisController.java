package org.springframework.boot.incident_reporter_backend_app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.incident_reporter_backend_app.entities.analysis.Cluster;
import org.springframework.boot.incident_reporter_backend_app.services.AnalysisService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;

@Controller
@RequestMapping("/analysis")
public class AnalysisController {

    private final AnalysisService analysisService;

    @Autowired
    public AnalysisController(AnalysisService analysisService){
        this.analysisService = analysisService;
    }

    @GetMapping("/clusters")
    public ResponseEntity<?> findAllClusters(@RequestParam double eps, @RequestParam int minIncidents){
        try{
            System.out.println("eps: " + eps);
            System.out.println("minIncidents: " + minIncidents);
            HashMap<LocalDate, List<Cluster>> result = analysisService.allClusters(eps, minIncidents);
            return new ResponseEntity<HashMap<LocalDate, List<Cluster>>>(result, HttpStatus.OK);


        }
        catch(Exception ex){
            return  new ResponseEntity<>(ex, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
