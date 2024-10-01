package org.springframework.boot.incident_reporter_backend_app.services;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.incident_reporter_backend_app.entities.IncidentSubtypeEntity;
import org.springframework.boot.incident_reporter_backend_app.entities.IncidentTypeEntity;
import org.springframework.boot.incident_reporter_backend_app.repositories.IncidentSubtypeRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class IncidentSubtypeService {

    private IncidentSubtypeRepository repository;

    @Autowired
    public IncidentSubtypeService(IncidentSubtypeRepository repository){
        this.repository = repository;
    }

    public IncidentSubtypeEntity add(IncidentSubtypeEntity entity){
        return this.repository.save(entity);
    }

    public IncidentSubtypeEntity update(IncidentSubtypeEntity entity){

        this.repository.findById(entity.getId()).orElseThrow(() -> new EntityNotFoundException());
        if(entity.getId() == null || !this.repository.existsById(entity.getId())){
            throw new EntityNotFoundException();
        }

        return this.repository.save(entity);
    }

    public void delete(Integer id){
        this.repository.deleteById(id);
    }

    public List<IncidentSubtypeEntity> findAllEntities(){
        return this.repository.findAll();
    }

    public IncidentSubtypeEntity findById(Integer id){
        return this.repository.findById(id).orElseThrow(EntityNotFoundException::new);
    }
}
