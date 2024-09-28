package org.springframework.boot.incident_reporter_backend_app.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.incident_reporter_backend_app.entities.IncidentTypeEntity;
import org.springframework.boot.incident_reporter_backend_app.services.IncidentTypeService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/incident_type")
public class IncidentTypeController {
    IncidentTypeService incidentTypeService;

    @Autowired
    public IncidentTypeController(IncidentTypeService incidentTypeService){
        this.incidentTypeService = incidentTypeService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<IncidentTypeEntity>> findAll(){
        List<IncidentTypeEntity> list = null;
        try{
            list = incidentTypeService.findAllEntities();
        }
        catch(Exception ex){
            ResponseEntity.notFound();
        }
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<IncidentTypeEntity> findEntity(@PathVariable Integer id){
        IncidentTypeEntity entity = null;
        try{
            entity = incidentTypeService.findById(id);
        }
        catch(Exception ex){
            ResponseEntity.notFound();
        }
        return new ResponseEntity<>(entity, HttpStatus.OK);
    }

    @PutMapping("/update")
    public ResponseEntity<IncidentTypeEntity> updateEntity(@RequestBody IncidentTypeEntity requestBody){
        IncidentTypeEntity entity = null;
        try{
            entity = incidentTypeService.update(requestBody);
        }
        catch(Exception ex){
            ResponseEntity.internalServerError();
        }
        return new ResponseEntity<>(entity, HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<IncidentTypeEntity> addEntity(@RequestBody IncidentTypeEntity requestBody){
        IncidentTypeEntity entity = null;
        try{
            entity = incidentTypeService.add(requestBody);
        }
        catch(Exception ex){
            ResponseEntity.internalServerError();
        }
        return new ResponseEntity<>(entity, HttpStatus.OK);
    }
}
