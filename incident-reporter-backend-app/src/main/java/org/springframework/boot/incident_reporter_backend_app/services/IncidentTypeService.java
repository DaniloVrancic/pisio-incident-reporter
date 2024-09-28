package org.springframework.boot.incident_reporter_backend_app.services;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.incident_reporter_backend_app.entities.IncidentEntity;
import org.springframework.boot.incident_reporter_backend_app.entities.IncidentTypeEntity;
import org.springframework.boot.incident_reporter_backend_app.repositories.IncidentRepository;
import org.springframework.boot.incident_reporter_backend_app.repositories.IncidentTypeRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class IncidentTypeService {

    private final IncidentTypeRepository incidentTypeRepository;

    @Autowired
    public IncidentTypeService(IncidentTypeRepository incidentTypeRepository){
        this.incidentTypeRepository = incidentTypeRepository;
    }

    public IncidentTypeEntity add(IncidentTypeEntity entity){
        return this.incidentTypeRepository.save(entity);
    }

    public IncidentTypeEntity update(IncidentTypeEntity entity){

        this.incidentTypeRepository.findById(entity.getId()).orElseThrow(() -> new EntityNotFoundException());
        if(entity.getId() == null || !this.incidentTypeRepository.existsById(entity.getId())){
            throw new EntityNotFoundException();
        }

        return this.incidentTypeRepository.save(entity);
    }

    public void delete(Integer id){
        this.incidentTypeRepository.deleteById(id);
    }

    public List<IncidentTypeEntity> findAllEntities(){
        return this.incidentTypeRepository.findAll();
    }

    public IncidentTypeEntity findById(Integer id){
        return this.incidentTypeRepository.findById(id).orElseThrow(EntityNotFoundException::new);
    }
}
