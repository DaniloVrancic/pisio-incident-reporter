package org.springframework.boot.incident_reporter_backend_app.services;

import org.springframework.boot.incident_reporter_backend_app.config.FileTransferConfig;
import org.springframework.boot.incident_reporter_backend_app.util.B64;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

@Service
public class FileService {

    public String uploadImage(MultipartFile file) {
        // File name is incident GUID encoded as B64 plus the extension of the file (it is full file name)
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());
        fileName = B64.replaceSlashes(fileName);

        try {
            if (fileName.contains(".."))
                throw new RuntimeException("Sorry! File name is containing invalid path sequence " + fileName);

            Path targetLocation = Paths.get(FileTransferConfig.INCIDENTS_IMAGES_PATH + File.separator + fileName);
            Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);
            return fileName;
        } catch (IOException ex) {
            throw new RuntimeException(ex);
        }
    }

    public Resource downloadImage(String incidentGUID64){
        incidentGUID64 = B64.replaceSlashes(incidentGUID64);

        Resource resource = null;

        try {
            resource = new UrlResource(Paths.get(FileTransferConfig.NOT_FOUND_IMAGE_PATH).toUri());
        }catch (Exception e){
            e.printStackTrace();
        }

        File folder = new File(FileTransferConfig.INCIDENTS_IMAGES_PATH);
        File[] listOfFiles = folder.listFiles();

        for (File file : listOfFiles)
        {
            if (file.isFile())
            {
                String[] filename = file.getName().split("\\.");

                if(filename[0].equalsIgnoreCase(incidentGUID64))
                {
                    try{
                        resource = new UrlResource(Paths.get(FileTransferConfig.INCIDENTS_IMAGES_PATH +
                                File.separator + filename[0] + "." + filename[1]).toUri());
                    }catch(MalformedURLException e){
                        e.printStackTrace();
                    }
                }
            }
        }

        return resource;
    }
}
