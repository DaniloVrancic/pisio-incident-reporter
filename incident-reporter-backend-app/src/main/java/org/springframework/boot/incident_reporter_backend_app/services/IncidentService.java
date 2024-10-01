package org.springframework.boot.incident_reporter_backend_app.services;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.incident_reporter_backend_app.entities.IncidentEntity;
import org.springframework.boot.incident_reporter_backend_app.repositories.IncidentRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class IncidentService {

    private final IncidentRepository incidentRepository;

    @Autowired
    public IncidentService(IncidentRepository incidentRepository){
        this.incidentRepository = incidentRepository;
    }

    public IncidentEntity add(IncidentEntity entity){
        return this.incidentRepository.save(entity);
    }

    public IncidentEntity update(IncidentEntity entity){

        this.incidentRepository.findById(entity.getId()).orElseThrow(() -> new EntityNotFoundException());
        if(entity.getId() == null || !this.incidentRepository.existsById(entity.getId())){
            throw new EntityNotFoundException();
        }

        return this.incidentRepository.save(entity);
    }

    public void delete(Integer id){
        this.incidentRepository.deleteById(id);
    }

    public List<IncidentEntity> findAllEntities(){
        return this.incidentRepository.findAll();
    }

    public IncidentEntity findById(Integer id){
        return this.incidentRepository.findById(id).orElseThrow(EntityNotFoundException::new);
    }
}
