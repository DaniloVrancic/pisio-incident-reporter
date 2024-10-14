package org.springframework.boot.incident_reporter_backend_app.entities.analysis;



import org.springframework.boot.incident_reporter_backend_app.entities.IncidentEntity;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class Location {
    public static int UNDEFINED_CLUSTER_ID = -10;
    public int id;
    public IncidentEntity incident;
    public boolean visited;
    public int clusterId;

    public Location(){}

    public Location(int id, IncidentEntity incident, boolean visited, int clusterId){
        this.id = id;
        this.incident = incident;
        this.visited = visited;
        this.clusterId = clusterId;
    }

    public static List<Location> locationsFromIncidents(List<IncidentEntity> incidents) {
        List<Location> locations = new ArrayList<>();
        for(int i = 0; i < incidents.size(); ++i){
            locations.add(new Location(i, incidents.get(i), false, UNDEFINED_CLUSTER_ID));
        }
        return locations;
    }
}

