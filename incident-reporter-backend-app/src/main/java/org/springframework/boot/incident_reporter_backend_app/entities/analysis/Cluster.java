package org.springframework.boot.incident_reporter_backend_app.entities.analysis;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.boot.incident_reporter_backend_app.entities.IncidentEntity;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

public class Cluster {
    public int id;
    public List<Location> items =new ArrayList<>();
    public double latitude;
    public double longitude;

    public String date;

    public Cluster(){
        id = -999;
        latitude = 0.0;
        longitude = 0.0;
        date = null;
    };

    public Cluster(int id, double latitude, double longitude, String date){
        this.id = id;
        this.latitude = latitude;
        this.longitude = longitude;
        this.date = date;
    }
}
