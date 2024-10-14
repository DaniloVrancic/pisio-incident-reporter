package org.springframework.boot.incident_reporter_backend_app.services;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.incident_reporter_backend_app.entities.IncidentEntity;
import org.springframework.boot.incident_reporter_backend_app.enums.Status;
import org.springframework.boot.incident_reporter_backend_app.repositories.IncidentRepository;
import org.springframework.stereotype.Service;

import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.sql.Time;
import java.sql.Timestamp;
import java.time.*;
import java.time.temporal.TemporalAccessor;
import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

@Service
public class IncidentService {
    private final IncidentRepository incidentRepository;
    public final String incidentPhotoFilePath = ".//report_images//";

    @Autowired
    public IncidentService(IncidentRepository incidentRepository){
        this.incidentRepository = incidentRepository;
    }

    public IncidentEntity add(IncidentEntity entity){
        IncidentEntity modifiedEntity = entity;

        String avatar = modifiedEntity.getPhotoUrl();
        modifiedEntity.setPhotoUrl(null);
        IncidentEntity realEntityToSave = null;

        if(modifiedEntity.getTimeOfIncident() == null)
        {
            ZonedDateTime zoneAdjustedTime = Instant.now().atZone(ZoneId.systemDefault()); //Gets the local timezone of the machine
            modifiedEntity.setTimeOfIncident(Timestamp.from(zoneAdjustedTime.toInstant()));
        }
        else{
            // Get the current timestamp
            ZonedDateTime zoneAdjustedTime = Instant.now().atZone(ZoneId.systemDefault());
            Timestamp currentTime = Timestamp.from(zoneAdjustedTime.toInstant());

            // Extract the current time (hours, minutes, seconds) from currentTime
            LocalTime currentTimeOnly = currentTime.toInstant()
                    .atZone(ZoneId.systemDefault())
                    .toLocalTime();

            // Extract year, month, and day from the selected date
            LocalDate selectedDateOnly = modifiedEntity.getTimeOfIncident().toInstant()
                    .atZone(ZoneId.systemDefault())
                    .toLocalDate();

            // Combine the selected date (year, month, day) with the current time (hours, minutes, seconds)
            LocalDateTime combinedDateTime = LocalDateTime.of(selectedDateOnly, currentTimeOnly);

            // Convert the combined LocalDateTime back to a Timestamp
            Timestamp finalTimestamp = Timestamp.valueOf(combinedDateTime);
        }
        if(modifiedEntity.getStatus() == null){
            if(modifiedEntity.getUser_token() == null){
                modifiedEntity.setStatus(Status.REQUESTED);
            }
            else{
                modifiedEntity.setStatus(Status.APPROVED);

            }
        }
        if(avatar != null && !avatar.isEmpty())
        {
            realEntityToSave = this.incidentRepository.save(modifiedEntity);
            realEntityToSave.setPhotoUrl(saveBase64EncodedPhoto(avatar, realEntityToSave));
            return this.incidentRepository.save(realEntityToSave);
        }
        else{
            return this.incidentRepository.save(modifiedEntity);
        }
    }

    public IncidentEntity update(IncidentEntity entity){

        IncidentEntity entityToReturn = this.incidentRepository.findById(entity.getId()).orElseThrow(() -> new EntityNotFoundException());
        if(entity.getId() == null || !this.incidentRepository.existsById(entity.getId())){
            throw new EntityNotFoundException();
        }

        if(entity.getStatus() != null){
            entityToReturn.setStatus(entity.getStatus());
        }
        if(entity.getUser_token() != null){
            entityToReturn.setUser_token(entity.getUser_token());
        }
        if(entity.getDescription() != null){
           entityToReturn.setDescription(entity.getDescription());
        }
        if(entity.getTimeOfIncident() != null){
            entityToReturn.setTimeOfIncident(entity.getTimeOfIncident());
        }
        if(entity.getLatitude() != null){
            entityToReturn.setLatitude(entity.getLatitude());
        }
        if(entity.getLongitude() != null){
            entityToReturn.setLongitude(entity.getLongitude());
        }
        if(entity.getIncidentSubtype() != null){
            entityToReturn.setIncidentSubtype(entity.getIncidentSubtype());
        }
        if(entity.getPhotoUrl() != null){
            entityToReturn.setPhotoUrl(entity.getPhotoUrl());
        }

        return this.incidentRepository.save(entityToReturn);
    }

    public Integer delete(Integer id){
        try
        {
            this.incidentRepository.deleteById(id);
            return id;
        }
        catch(Exception ex){
            System.err.println(ex.getLocalizedMessage());
            return -1; //Returns -1 if an exception occured
        }
    }

    public List<IncidentEntity> findAllEntities(){
        return this.incidentRepository.findAll();
    }

    public IncidentEntity findById(Integer id){
        return this.incidentRepository.findById(id).orElseThrow(EntityNotFoundException::new);
    }

    /**
     * Returns the list of IncidentEntities that are between the times specified
     * @param t1 the start time from where it will be measured
     * @param t2 the end time
     * @return List of incidents that satisfy the confiditon of occuring between the two timestamps
     */
    public List<IncidentEntity> findBetweenDatesAndStatus(Timestamp t1, Timestamp t2, Status s){
        return this.incidentRepository.findIncidentEntitiesByTimeOfIncidentBetweenAndStatus(t1, t2, s); // Will return all Incidents in the time interval selected
    }

    public Set<LocalDate> findUniqueDatesOfIncidents(List<IncidentEntity> incidents){
        Set<LocalDate> result;

        result = incidents.stream()
                          .map(incident -> {return incident.getTimeOfIncident().toLocalDateTime().toLocalDate();})
                          .collect(Collectors.toSet());

        return result;
    }

    /**
     * Depending on the UserID value, this photo will be saved on the file system in a predetermined folder, under
     * the UserID of the user that is requesting the save to take place.
     * @param base64encodedPhoto the full photo base64 encoded
     * @param incident Saving the photo for this incident
     * @return relative Path to the photo
     */
    public String saveBase64EncodedPhoto(String base64encodedPhoto, IncidentEntity incident) {
        String[] photoParts = base64encodedPhoto.split(",");
        String metadataAboutEncode = photoParts[0];
        String payload = photoParts[1];

        String regex = "image/(\\w*)";

        Pattern pattern = Pattern.compile(regex);
        Matcher matcher = pattern.matcher(metadataAboutEncode);

        String photoType;

        if (matcher.find()) {
            photoType = matcher.group(1);
        } else {
            photoType = "";
        }

        byte[] decodedBytes = Base64.getDecoder().decode(payload);
        InputStream inputStream = new ByteArrayInputStream(decodedBytes);

        Path directoryPath = Paths.get(incidentPhotoFilePath + incident.getId());
        Path outputPath = directoryPath.resolve("incident" + ((photoType.length() > 0) ? "." + photoType : photoType));

        try {
            // Check if the directory exists, if not create it
            if (!Files.exists(directoryPath)) {
                Files.createDirectories(directoryPath);
            }
            Files.copy(inputStream, outputPath, StandardCopyOption.REPLACE_EXISTING);
        } catch (Exception ex) {
            ex.printStackTrace();
            System.err.println(ex.getLocalizedMessage());
        }
        System.out.println(outputPath);
        return outputPath.toString();
    }
}
