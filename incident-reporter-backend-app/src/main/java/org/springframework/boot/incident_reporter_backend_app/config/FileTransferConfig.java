package org.springframework.boot.incident_reporter_backend_app.config;

import java.io.File;

public class FileTransferConfig {

    public static String INCIDENTS_IMAGES_PATH = "report_images";
    public static String NOT_FOUND_IMAGE_PATH = INCIDENTS_IMAGES_PATH + File.separator + "notFound.png";

}
