package org.springframework.boot.incident_reporter_backend_app.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "incident_subtype", schema = "pisio")
public class IncidentSubtypeEntity {
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

    private String subtype;

    @Basic
    @Column(name = "subtype", nullable = true, length = 64)
    public String getSubtype() {
        return subtype;
    }

    public void setSubtype(String subtype) {
        this.subtype = subtype;
    }

    private Integer incidentTypeId;

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "incident_type_id", nullable = false)
    public Integer getIncidentTypeId() {
        return incidentTypeId;
    }

    public void setIncidentTypeId(Integer incidentTypeId) {
        this.incidentTypeId = incidentTypeId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        IncidentSubtypeEntity that = (IncidentSubtypeEntity) o;

        if (id != null ? !id.equals(that.id) : that.id != null) return false;
        if (subtype != null ? !subtype.equals(that.subtype) : that.subtype != null) return false;
        if (incidentTypeId != null ? !incidentTypeId.equals(that.incidentTypeId) : that.incidentTypeId != null)
            return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = id != null ? id.hashCode() : 0;
        result = 31 * result + (subtype != null ? subtype.hashCode() : 0);
        result = 31 * result + (incidentTypeId != null ? incidentTypeId.hashCode() : 0);
        return result;
    }
}
