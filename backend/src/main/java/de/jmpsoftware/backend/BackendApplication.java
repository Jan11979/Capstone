package de.jmpsoftware.backend;

import de.jmpsoftware.backend.repo.FixtureRepo;
import de.jmpsoftware.backend.repo.FixtureTemplateRepo;
import de.jmpsoftware.backend.repo.UniverseRepo;
import de.jmpsoftware.backend.service.DMXService;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.io.IOException;

@SpringBootApplication
public class BackendApplication{



    private static DMXService dmxService;

    public BackendApplication(DMXService newDmxService) {
        BackendApplication.dmxService = newDmxService;
    }

    public static void main(String[] args) {
        SpringApplication.run(BackendApplication.class, args);
        dmxService.initService();
    }

}
