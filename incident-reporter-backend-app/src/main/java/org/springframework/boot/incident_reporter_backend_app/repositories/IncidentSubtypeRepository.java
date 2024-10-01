package org.springframework.boot.incident_reporter_backend_app.repositories;

import org.springframework.boot.incident_reporter_backend_app.entities.IncidentSubtypeEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface IncidentSubtypeRepository extends JpaRepository<IncidentSubtypeEntity, Integer>, JpaSpecificationExecutor<IncidentSubtypeEntity> {
}
