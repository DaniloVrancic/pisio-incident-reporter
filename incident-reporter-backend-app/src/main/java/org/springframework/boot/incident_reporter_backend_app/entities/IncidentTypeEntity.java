package org.springframework.boot.incident_reporter_backend_app.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "incident_type", schema = "pisio")
public class IncidentTypeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @Basic
    @Column(name = "name", nullable = false, length = 64)
    private String name;

    @Basic
    @Column(name = "type_icon_uri", nullable = true, length = 45)
    private String typeIconUri;


    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getTypeIconName() {
        return typeIconUri;
    }

    public void setTypeIconName(String typeIconUri) {
        this.typeIconUri = typeIconUri;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        IncidentTypeEntity that = (IncidentTypeEntity) o;

        if (id != null ? !id.equals(that.id) : that.id != null) return false;
        if (name != null ? !name.equals(that.name) : that.name != null) return false;
        if (typeIconUri != null ? !typeIconUri.equals(that.typeIconUri) : that.typeIconUri != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = id != null ? id.hashCode() : 0;
        result = 31 * result + (name != null ? name.hashCode() : 0);
        result = 31 * result + (typeIconUri != null ? typeIconUri.hashCode() : 0);
        return result;
    }
}
