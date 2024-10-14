package org.springframework.boot.incident_reporter_backend_app.repositories;

import org.springframework.boot.incident_reporter_backend_app.entities.IncidentEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.sql.Timestamp;
import java.time.LocalDate;
import java.util.List;

@Repository
public interface IncidentRepository extends JpaRepository<IncidentEntity, Integer>, JpaSpecificationExecutor<IncidentEntity> {

    public List<IncidentEntity> findIncidentEntitiesByTimeOfIncidentBetween(Timestamp t1, Timestamp t2);
}
