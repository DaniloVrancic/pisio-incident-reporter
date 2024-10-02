package org.springframework.boot.incident_reporter_backend_app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.incident_reporter_backend_app.entities.IncidentSubtypeEntity;
import org.springframework.boot.incident_reporter_backend_app.services.IncidentSubtypeService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/incident_subtype")
public class IncidentSubtypeController {

    IncidentSubtypeService incidentSubtypeService;

    @Autowired
    public IncidentSubtypeController(IncidentSubtypeService incidentSubtypeService){
        this.incidentSubtypeService = incidentSubtypeService;
    }
    
    @GetMapping("/all")
    public ResponseEntity<List<IncidentSubtypeEntity>> findAll(){
        List<IncidentSubtypeEntity> list = null;
        try{
            list = incidentSubtypeService.findAllEntities();
        }
        catch(Exception ex){
            ResponseEntity.notFound();
        }
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<IncidentSubtypeEntity> findEntity(@PathVariable Integer id){
        IncidentSubtypeEntity entity = null;
        try{
            entity = incidentSubtypeService.findById(id);
        }
        catch(Exception ex){
            ResponseEntity.notFound();
        }
        return new ResponseEntity<>(entity, HttpStatus.OK);
    }

    @PutMapping("/update")
    public ResponseEntity<IncidentSubtypeEntity> updateEntity(@RequestBody IncidentSubtypeEntity requestBody){
        IncidentSubtypeEntity entity = null;
        try{
            entity = incidentSubtypeService.update(requestBody);
        }
        catch(Exception ex){
            ResponseEntity.internalServerError();
        }
        return new ResponseEntity<>(entity, HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<IncidentSubtypeEntity> addEntity(@RequestBody IncidentSubtypeEntity requestBody){
        IncidentSubtypeEntity entity = null;
        try{
            entity = incidentSubtypeService.add(requestBody);
        }
        catch(Exception ex){
            ResponseEntity.internalServerError();
        }
        return new ResponseEntity<>(entity, HttpStatus.OK);
    }
}
