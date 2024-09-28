package org.springframework.boot.incident_reporter_backend_app.services;


import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.incident_reporter_backend_app.entities.IncidentSubtypeEntity;
import org.springframework.boot.incident_reporter_backend_app.entities.IncidentTypeEntity;
import org.springframework.boot.incident_reporter_backend_app.entities.LocationEntity;
import org.springframework.boot.incident_reporter_backend_app.repositories.IncidentSubtypeRepository;
import org.springframework.boot.incident_reporter_backend_app.repositories.LocationRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LocationService {

    private LocationRepository repository;

    @Autowired
    public LocationService(LocationRepository repository){
        this.repository = repository;
    }

    public LocationEntity add(LocationEntity entity){
        return this.repository.save(entity);
    }

    public LocationEntity update(LocationEntity entity){

        this.repository.findById(entity.getId()).orElseThrow(() -> new EntityNotFoundException());
        if(entity.getId() == null || !this.repository.existsById(entity.getId())){
            throw new EntityNotFoundException();
        }

        return this.repository.save(entity);
    }

    public void delete(Integer id){
        this.repository.deleteById(id);
    }

    public List<LocationEntity> findAllEntities(){
        return this.repository.findAll();
    }

    public LocationEntity findById(Integer id){
        return this.repository.findById(id).orElseThrow(EntityNotFoundException::new);
    }
}

