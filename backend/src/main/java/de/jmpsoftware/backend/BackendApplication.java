package de.jmpsoftware.backend;

import de.jmpsoftware.backend.service.DMXService;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class BackendApplication {


    private static DMXService dmxService;

    public BackendApplication(DMXService newDmxService) {
        BackendApplication.dmxService = newDmxService;
    }

    public static void main(String[] args) {
        SpringApplication.run(BackendApplication.class, args);
        dmxService.initService();
    }

}
