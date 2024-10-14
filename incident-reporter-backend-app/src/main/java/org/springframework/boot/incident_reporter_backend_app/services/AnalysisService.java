package org.springframework.boot.incident_reporter_backend_app.services;

import org.springframework.boot.incident_reporter_backend_app.entities.IncidentEntity;
import org.springframework.boot.incident_reporter_backend_app.entities.analysis.Cluster;
import org.springframework.boot.incident_reporter_backend_app.entities.analysis.Location;
import org.springframework.boot.incident_reporter_backend_app.enums.Status;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class AnalysisService {

    IncidentService incidentService;
    private final int DAYS_BACK_TO_CHECK = 7;

    public AnalysisService(IncidentService incidentService){
        this.incidentService = incidentService;
    }


    public HashMap<LocalDate, List<Cluster>> allClusters(double eps, int minPts) {
        List<IncidentEntity> allIncidentsList = incidentService.findAllEntities();
        List<Cluster> allClusters = new ArrayList<>();
        Set<LocalDate> allUniqueDates = incidentService.findUniqueDatesOfIncidents(allIncidentsList);
        HashMap<LocalDate, List<Cluster>> clustersOnDate = new HashMap<>();

        allUniqueDates.forEach(uniqueDate -> {
            LocalDate lowerDate = uniqueDate.minusDays(DAYS_BACK_TO_CHECK); //The range will be 7 under days
            LocalDate upperDate = uniqueDate.plusDays(1); //Plus one because it checks from midnight (the very start of next day)

            LocalDateTime lowerDateTime = lowerDate.atStartOfDay();
            LocalDateTime upperDateTime = upperDate.atStartOfDay();

            Timestamp t1 = Timestamp.valueOf(lowerDateTime);
            Timestamp t2 = Timestamp.valueOf(upperDateTime); //Need timestamps to be compatible with the repository method

            List<IncidentEntity> incidentsInTimeRange = incidentService.findBetweenDatesAndStatus(t1, t2, Status.APPROVED); //Gets only APPROVED incidents in the specified time slot between t1 and t2
            List<Location> locations = Location.locationsFromIncidents(incidentsInTimeRange); //makes all those incidents into Locations

            List<Cluster> clustersForSelectedTimeRangeIncidents = DBSCAN(locations, eps, minPts); //Returns clusters from the scan of only those Locations considered in the time slot

            clustersForSelectedTimeRangeIncidents = clustersForSelectedTimeRangeIncidents.stream()
                                                    .filter(cluster -> {return cluster.id != -1;}) //Those Locations that have the clusterId == -1 are UNCLUSTERED locations (not part of any neighbourhood that is above the minIncidents trashhold)
                                                    .collect(Collectors.toList()); //Will filter out the clusters that have an ID value of -1
            if(clustersForSelectedTimeRangeIncidents.size() > 0) //Not going to put empty lists into the HashMap
            {
                 clustersOnDate.put(uniqueDate, clustersForSelectedTimeRangeIncidents); //dictionary Date-List<Cluster>
                 allClusters.addAll(clustersForSelectedTimeRangeIncidents); //keep a list of All clusters at all times, just in case a user needs them later, for easy access
            }
        });
         //Change from allIncidentsList to list of incidents in given time interval

        return clustersOnDate;
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
