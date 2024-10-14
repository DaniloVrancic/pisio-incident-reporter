package org.springframework.boot.incident_reporter_backend_app.services;

import org.springframework.boot.incident_reporter_backend_app.entities.IncidentEntity;
import org.springframework.boot.incident_reporter_backend_app.entities.analysis.Cluster;
import org.springframework.boot.incident_reporter_backend_app.entities.analysis.Location;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class AnalysisService {

    IncidentService incidentService;

    public AnalysisService(IncidentService incidentService){
        this.incidentService = incidentService;
    }


    public List<Cluster> allClusters(double eps, int minPts) {
        // TODO: Later, grab only incidents within certain time frame
        List<IncidentEntity> allIncidentsList = incidentService.findAllEntities();
        Set<LocalDate> allUniqueDates = incidentService.findUniqueDatesOfIncidents(allIncidentsList);

        allUniqueDates.forEach(System.out::println);
        List<Location> locations = Location.locationsFromIncidents(allIncidentsList); //Change from allIncidentsList to list of incidents in given time interval

        return DBSCAN(locations, eps, minPts);
    }

    private List<Cluster> DBSCAN(List<Location> locations, double eps, int minPts) {
        int clusterId = 0;

        for(int i = 0; i < locations.size(); ++i){
            Location location = locations.get(i);

            if(location.visited){
                continue;
            }

            location.visited = true;

            List<Location> neighbours = getNeighbours(locations, i, eps);

            if(neighbours.size() < minPts){
                location.clusterId = -1;
                continue;
            }

            ++clusterId;
            location.clusterId = clusterId;

            int j = 0;

            while(j < neighbours.size()){
                Location neighbour = neighbours.get(j);

                if(!neighbour.visited){
                    neighbour.visited = true;

                    List<Location> moreNeighbours = getNeighbours(locations, locations.indexOf(neighbour), eps);

                    if(moreNeighbours.size() >= minPts){
                        neighbours.addAll(moreNeighbours);
                    }
                }

                if(neighbour.clusterId == Location.UNDEFINED_CLUSTER_ID){
                    neighbour.clusterId = clusterId;
                }

                ++j;
            }
        }

        return createClusters(locations);
    }

    private List<Location> getNeighbours(List<Location> locations, int index, double eps){
        Location location = locations.get(index);

        return locations.stream().filter(other -> {
            if(other.id == location.id) return false;

            double distance = geodesicLength(
                    location.incident.getLatitude().doubleValue(),
                    location.incident.getLongitude().doubleValue(),
                    other.incident.getLatitude().doubleValue(),
                    other.incident.getLongitude().doubleValue());

            return distance <= eps;
        }).collect(Collectors.toList());
    }

    public List<Cluster> createClusters(List<Location> locations) {
        HashMap<Integer, Cluster> clusters = new HashMap<>();
        List<Location> unclustered = new ArrayList<>();
        List<Cluster> result = new ArrayList<>();

        for(int i = 0; i < locations.size(); ++i){
            Location location = locations.get(i);

            if(location.clusterId == Location.UNDEFINED_CLUSTER_ID || location.clusterId == -1){
                unclustered.add(location);
            }
            else {
                if(clusters.get(location.clusterId) == null){
                    clusters.put(location.clusterId, new Cluster(location.clusterId, 0, 0));
                }

                clusters.get(location.clusterId).items.add(location);
            }
        }

        for(Cluster cluster : clusters.values()){
            double lat = cluster.items.stream().map(x -> x.incident.getLatitude().doubleValue()).reduce(Double::sum).get();
            double lng = cluster.items.stream().map(x -> x.incident.getLatitude().doubleValue()).reduce(Double::sum).get();
            lat /= cluster.items.size();
            lng /= cluster.items.size();
            cluster.latitude = lat;
            cluster.longitude = lng;
            result.add(cluster);
        }

        if(unclustered.size() > 0){
            Cluster c = new Cluster(-1, 0, 0);
            c.items = unclustered;
            result.add(c);
        }

        return result;
    }

    private double geodesicLength(double lat1, double lng1, double lat2, double lng2) {
        var R = 6371; // Average radius of the Earth in kilometers
        var rlat1 = lat1 * (Math.PI/180); // Convert degrees to radians
        var rlat2 = lat2 * (Math.PI/180); // Convert degrees to radians
        var difflat = rlat2-rlat1; // Radian difference (latitudes)
        var difflon = (lng2 - lng1) * (Math.PI/180); // Radian difference (longitudes)

        var d = 2 * R * Math.asin(Math.sqrt(Math.sin(difflat/2)*Math.sin(difflat/2)+Math.cos(rlat1)*Math.cos(rlat2)*Math.sin(difflon/2)*Math.sin(difflon/2)));
        return d;
    }

}
