package org.springframework.boot.incident_reporter_backend_app.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.incident_reporter_backend_app.entities.IncidentTypeEntity;
import org.springframework.boot.incident_reporter_backend_app.entities.LocationEntity;
import org.springframework.boot.incident_reporter_backend_app.services.IncidentTypeService;
import org.springframework.boot.incident_reporter_backend_app.services.LocationService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/location")
public class LocationController {

    LocationService locationService;

    @Autowired
    public LocationController(LocationService locationService){
        this.locationService = locationService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<LocationEntity>> findAll(){
        List<LocationEntity> list = null;
        try{
            list = locationService.findAllEntities();
        }
        catch(Exception ex){
            ResponseEntity.notFound();
        }
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<LocationEntity> findEntity(@PathVariable Integer id){
        LocationEntity entity = null;
        try{
            entity = locationService.findById(id);
        }
        catch(Exception ex){
            ResponseEntity.notFound();
        }
        return new ResponseEntity<>(entity, HttpStatus.OK);
    }

    @PutMapping("/update")
    public ResponseEntity<LocationEntity> updateEntity(@RequestBody LocationEntity requestBody){
        LocationEntity entity = null;
        try{
            entity = locationService.update(requestBody);
        }
        catch(Exception ex){
            ResponseEntity.internalServerError();
        }
        return new ResponseEntity<>(entity, HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<LocationEntity> addEntity(@RequestBody LocationEntity requestBody){
        LocationEntity entity = null;
        try{
            entity = locationService.add(requestBody);
        }
        catch(Exception ex){
            ResponseEntity.internalServerError();
        }
        return new ResponseEntity<>(entity, HttpStatus.OK);
    }
}
