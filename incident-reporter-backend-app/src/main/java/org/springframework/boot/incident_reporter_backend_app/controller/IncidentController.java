package org.springframework.boot.incident_reporter_backend_app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.incident_reporter_backend_app.entities.IncidentEntity;
import org.springframework.boot.incident_reporter_backend_app.services.IncidentService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/incident")
public class IncidentController {

    private final IncidentService incidentService;

    @Autowired
    public IncidentController(IncidentService incidentService){
        this.incidentService = incidentService;
    }
    @GetMapping("/all")
    public ResponseEntity<List<IncidentEntity>> findAll(){
        List<IncidentEntity> list = null;
        try{
            list = incidentService.findAllEntities();
        }
        catch(Exception ex){
            return ResponseEntity.notFound().build();
        }
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<IncidentEntity> findEntity(@PathVariable Integer id){
        IncidentEntity entity = null;
        try{
            entity = incidentService.findById(id);
        }
        catch(Exception ex){
            ResponseEntity.notFound();
        }
        return new ResponseEntity<>(entity, HttpStatus.OK);
    }

    @PutMapping("/update")
    public ResponseEntity<IncidentEntity> updateEntity(@RequestBody IncidentEntity requestBody){
        IncidentEntity entity = null;
        try{
            entity = incidentService.update(requestBody);
        }
        catch(Exception ex){
            ResponseEntity.internalServerError();
        }
        return new ResponseEntity<>(entity, HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<?> addEntity(@RequestBody IncidentEntity requestBody){
        IncidentEntity entity = null;
        try{
            entity = incidentService.add(requestBody);
        }
        catch(Exception ex){
            return new ResponseEntity<>(ex, HttpStatus.INTERNAL_SERVER_ERROR);
        }
            return new ResponseEntity<IncidentEntity>(entity, HttpStatus.CREATED);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteEntity(@PathVariable Integer id){
        Integer returnedId = this.incidentService.delete(id);

        if(returnedId == -1){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        else{
            return new ResponseEntity<Integer>(returnedId, HttpStatus.OK);
        }
    }
}
