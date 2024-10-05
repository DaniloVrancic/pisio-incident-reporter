package org.springframework.boot.incident_reporter_backend_app.services;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.incident_reporter_backend_app.entities.IncidentEntity;
import org.springframework.boot.incident_reporter_backend_app.enums.Status;
import org.springframework.boot.incident_reporter_backend_app.repositories.IncidentRepository;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.Instant;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.temporal.TemporalAccessor;
import java.util.List;

@Service
public class IncidentService {

    private final IncidentRepository incidentRepository;

    @Autowired
    public IncidentService(IncidentRepository incidentRepository){
        this.incidentRepository = incidentRepository;
    }

    public IncidentEntity add(IncidentEntity entity){
        IncidentEntity modifiedEntity = entity;

        if(modifiedEntity.getTimeOfIncident() == null)
        {
            ZonedDateTime zoneAdjustedTime = Instant.now().atZone(ZoneId.systemDefault()); //Gets the local timezone of the machine
            modifiedEntity.setTimeOfIncident(Timestamp.from(zoneAdjustedTime.toInstant()));
        }
        if(modifiedEntity.getStatus() == null){
            if(modifiedEntity.getUserId() == null){
                modifiedEntity.setStatus(Status.REQUESTED);
            }
            else{
                modifiedEntity.setStatus(Status.APPROVED);
            }
        }

        return this.incidentRepository.save(modifiedEntity);
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
