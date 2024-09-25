package org.springframework.boot.incident_reporter_backend_app.entities;

import jakarta.persistence.*;
import java.sql.Timestamp;

@Entity
@Table(name = "incident", schema = "pisio")
public class IncidentEntity {
    private Integer id;

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id", nullable = false)
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    private String description;

    @Basic
    @Column(name = "description", nullable = true, length = -1)
    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    private Integer incidentTypeId;

    @Basic
    @Column(name = "incident_type_id", nullable = false)
    public Integer getIncidentTypeId() {
        return incidentTypeId;
    }

    public void setIncidentTypeId(Integer incidentTypeId) {
        this.incidentTypeId = incidentTypeId;
    }

    private String photoUrl;

    @Basic
    @Column(name = "photo_url", nullable = true, length = 512)
    public String getPhotoUrl() {
        return photoUrl;
    }

    public void setPhotoUrl(String photoUrl) {
        this.photoUrl = photoUrl;
    }

    private Object status;

    @Basic
    @Column(name = "status", nullable = false)
    public Object getStatus() {
        return status;
    }

    public void setStatus(Object status) {
        this.status = status;
    }

    private Timestamp timeOfIncident;

    @Basic
    @Column(name = "time_of_incident", nullable = false)
    public Timestamp getTimeOfIncident() {
        return timeOfIncident;
    }

    public void setTimeOfIncident(Timestamp timeOfIncident) {
        this.timeOfIncident = timeOfIncident;
    }

    private Integer locationId;

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "location_id", nullable = false)
    public Integer getLocationId() {
        return locationId;
    }

    public void setLocationId(Integer locationId) {
        this.locationId = locationId;
    }

    private Integer userId;

    @Basic
    @Column(name = "user_id", nullable = false)
    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        IncidentEntity that = (IncidentEntity) o;

        if (id != null ? !id.equals(that.id) : that.id != null) return false;
        if (description != null ? !description.equals(that.description) : that.description != null) return false;
        if (incidentTypeId != null ? !incidentTypeId.equals(that.incidentTypeId) : that.incidentTypeId != null)
            return false;
        if (photoUrl != null ? !photoUrl.equals(that.photoUrl) : that.photoUrl != null) return false;
        if (status != null ? !status.equals(that.status) : that.status != null) return false;
        if (timeOfIncident != null ? !timeOfIncident.equals(that.timeOfIncident) : that.timeOfIncident != null)
            return false;
        if (locationId != null ? !locationId.equals(that.locationId) : that.locationId != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = id != null ? id.hashCode() : 0;
        result = 31 * result + (description != null ? description.hashCode() : 0);
        result = 31 * result + (incidentTypeId != null ? incidentTypeId.hashCode() : 0);
        result = 31 * result + (photoUrl != null ? photoUrl.hashCode() : 0);
        result = 31 * result + (status != null ? status.hashCode() : 0);
        result = 31 * result + (timeOfIncident != null ? timeOfIncident.hashCode() : 0);
        result = 31 * result + (locationId != null ? locationId.hashCode() : 0);
        return result;
    }

}
