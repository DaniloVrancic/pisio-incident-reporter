package org.springframework.boot.incident_reporter_backend_app.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "incident_subtype", schema = "pisio")
public class IncidentSubtypeEntity {
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
    @Column(name = "subtype", nullable = true, length = 64)
    private String subtype;


    public String getSubtype() {
        return subtype;
    }

    public void setSubtype(String subtype) {
        this.subtype = subtype;
    }

    @ManyToOne
    @JoinColumn(name = "incident_type_id", referencedColumnName = "id", nullable = false)
    private IncidentTypeEntity incidentType;

    public IncidentTypeEntity getIncidentType() {
        return incidentType;
    }

    public void setIncidentTypeId(IncidentTypeEntity incidentType) {
        this.incidentType = incidentType;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        IncidentSubtypeEntity that = (IncidentSubtypeEntity) o;

        if (id != null ? !id.equals(that.id) : that.id != null) return false;
        if (subtype != null ? !subtype.equals(that.subtype) : that.subtype != null) return false;
        if (incidentType != null ? !incidentType.equals(that.incidentType) : that.incidentType != null)
            return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = id != null ? id.hashCode() : 0;
        result = 31 * result + (subtype != null ? subtype.hashCode() : 0);
        result = 31 * result + (incidentType != null ? incidentType.hashCode() : 0);
        return result;
    }
}
