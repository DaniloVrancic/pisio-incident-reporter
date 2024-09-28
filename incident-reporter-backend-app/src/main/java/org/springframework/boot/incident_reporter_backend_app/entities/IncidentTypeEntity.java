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
    @Column(name = "type_icon_name", nullable = true, length = 45)
    private String typeIconName;


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
        return typeIconName;
    }

    public void setTypeIconName(String typeIconName) {
        this.typeIconName = typeIconName;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        IncidentTypeEntity that = (IncidentTypeEntity) o;

        if (id != null ? !id.equals(that.id) : that.id != null) return false;
        if (name != null ? !name.equals(that.name) : that.name != null) return false;
        if (typeIconName != null ? !typeIconName.equals(that.typeIconName) : that.typeIconName != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = id != null ? id.hashCode() : 0;
        result = 31 * result + (name != null ? name.hashCode() : 0);
        result = 31 * result + (typeIconName != null ? typeIconName.hashCode() : 0);
        return result;
    }
}
