package org.springframework.boot.incident_reporter_backend_app.controller;

import com.nimbusds.oauth2.sdk.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.incident_reporter_backend_app.services.IncidentService;
import org.springframework.core.io.FileSystemResource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import java.io.File;

@Controller
@RequestMapping("/photo")
public class PhotoController {

    IncidentService incidentService;

    @Autowired
    public PhotoController(IncidentService incidentService){
        this.incidentService = incidentService;
    }

    @GetMapping("/incident/{id}")
    public ResponseEntity<?> getIncidentPhoto(@PathVariable("id") Integer profileId)
    {


        String pathToPhoto = incidentService.findById(profileId).getPhotoUrl();

        if(pathToPhoto == null){
            return ResponseEntity.notFound().build();
        }

        File photoFile = new File(pathToPhoto);
        
        if(photoFile.exists())
        {
            if(pathToPhoto.endsWith(".png"))
            {
                return ResponseEntity.ok()
                        .contentType(MediaType.IMAGE_PNG) // Change the content type based on your photo type
                        .body(new FileSystemResource(photoFile));
            }
            else if(pathToPhoto.endsWith(".gif"))
            {
                return ResponseEntity.ok()
                        .contentType(MediaType.IMAGE_GIF) // Change the content type based on your photo type
                        .body(new FileSystemResource(photoFile));
            }
            else
            {
                return ResponseEntity.ok()
                        .contentType(MediaType.IMAGE_JPEG) // Change the content type based on your photo type
                        .body(new FileSystemResource(photoFile));
            }

        }
        else
        {
            return ResponseEntity.notFound().build();
        }
    }
}
