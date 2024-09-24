package org.springframework.boot.incident_reporter_backend_app.repositories;

import org.springframework.boot.incident_reporter_backend_app.entities.IncidentTypeEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface IncidentTypeRepository extends JpaRepository<IncidentTypeEntity, Integer>, JpaSpecificationExecutor<IncidentTypeEntity> {
}
