package org.springframework.boot.incident_reporter_backend_app.repositories;

import org.springframework.boot.incident_reporter_backend_app.entities.IncidentEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface IncidentRepository extends JpaRepository<IncidentEntity, Integer>, JpaSpecificationExecutor<IncidentEntity> {
}
