package org.springframework.boot.incident_reporter_backend_app.entities;

import jakarta.persistence.*;
import org.springframework.boot.incident_reporter_backend_app.enums.Status;

import java.sql.Timestamp;

@Entity
@Table(name = "incident", schema = "pisio")
public class IncidentEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    @Basic
    @Column(name = "description", nullable = true, length = -1)
    private String description;


    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @Basic
    @Column(name = "incident_type_id", nullable = false)
    private Integer incidentTypeId;


    public Integer getIncidentTypeId() {
        return incidentTypeId;
    }

    public void setIncidentTypeId(Integer incidentTypeId) {
        this.incidentTypeId = incidentTypeId;
    }

    @Basic
    @Column(name = "photo_url", nullable = true, length = 512)
    private String photoUrl;


    public String getPhotoUrl() {
        return photoUrl;
    }

    public void setPhotoUrl(String photoUrl) {
        this.photoUrl = photoUrl;
    }

    @Basic
    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private Status status;

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
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

    @ManyToOne
    @JoinColumn(name = "location_id", referencedColumnName = "id", nullable = false)
    private LocationEntity location;


    public LocationEntity getLocation() {
        return location;
    }

    public void setLocationId(LocationEntity location) {
        this.location = location;
    }

    private Integer userId;


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
        if (location != null ? !location.equals(that.location) : that.location != null) return false;

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
        result = 31 * result + (location != null ? location.hashCode() : 0);
        return result;
    }

}
