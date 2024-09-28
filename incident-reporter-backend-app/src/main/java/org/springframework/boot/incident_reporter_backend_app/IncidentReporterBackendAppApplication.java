package org.springframework.boot.incident_reporter_backend_app;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableJpaRepositories(basePackages = "org.springframework.boot.incident_reporter_backend_app.repositories")
public class IncidentReporterBackendAppApplication {

	public static void main(String[] args) {
		SpringApplication.run(IncidentReporterBackendAppApplication.class, args);
	}

}
