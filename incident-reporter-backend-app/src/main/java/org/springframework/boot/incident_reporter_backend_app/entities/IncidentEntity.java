package org.springframework.boot.incident_reporter_backend_app.entities;

import jakarta.persistence.*;
import org.springframework.boot.incident_reporter_backend_app.enums.Status;

import java.math.BigDecimal;
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

    @ManyToOne
    @JoinColumn(name = "incident_subtype_id", referencedColumnName = "id", nullable = false)
    private IncidentSubtypeEntity incidentSubtype;


    public IncidentSubtypeEntity getIncidentType() {
        return incidentSubtype;
    }

    public void setIncidentType(IncidentSubtypeEntity incidentType) {
        this.incidentSubtype = incidentType;
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

    @Basic
    @Column(name = "latitude", nullable = false, precision = 8)
    private BigDecimal latitude;
    @Basic
    @Column(name = "longitude", nullable = false, precision = 8)
    private BigDecimal longitude;

    public BigDecimal getLatitude() {
        return latitude;
    }

    public void setLatitude(BigDecimal latitude) {
        this.latitude = latitude;
    }


    public BigDecimal getLongitude() {
        return longitude;
    }

    public void setLongitude(BigDecimal longitude) {
        this.longitude = longitude;
    }

    @ManyToOne
    @JoinColumn(name="user_id", referencedColumnName = "id", nullable = true)
    private UserEntity user;


    public UserEntity getUserId() {
        return this.user;
    }

    public void setUserId(UserEntity user) {
        this.user = user;
    }


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        IncidentEntity that = (IncidentEntity) o;

        if (id != null ? !id.equals(that.id) : that.id != null) return false;
        if (description != null ? !description.equals(that.description) : that.description != null) return false;
        if (incidentSubtype != null ? !incidentSubtype.equals(that.incidentSubtype) : that.incidentSubtype != null)
            return false;
        if (photoUrl != null ? !photoUrl.equals(that.photoUrl) : that.photoUrl != null) return false;
        if (status != null ? !status.equals(that.status) : that.status != null) return false;
        if (timeOfIncident != null ? !timeOfIncident.equals(that.timeOfIncident) : that.timeOfIncident != null)
            return false;
        if (latitude != null ? !latitude.equals(that.latitude) : that.latitude != null) return false;
        if (longitude != null ? !longitude.equals(that.longitude) : that.longitude != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = id != null ? id.hashCode() : 0;
        result = 31 * result + (description != null ? description.hashCode() : 0);
        result = 31 * result + (incidentSubtype != null ? incidentSubtype.hashCode() : 0);
        result = 31 * result + (photoUrl != null ? photoUrl.hashCode() : 0);
        result = 31 * result + (status != null ? status.hashCode() : 0);
        result = 31 * result + (timeOfIncident != null ? timeOfIncident.hashCode() : 0);
        result = 31 * result + (longitude != null ? longitude.hashCode() : 0);
        result = 31 * result + (latitude != null ? latitude.hashCode() : 0);
        return result;
    }

}
