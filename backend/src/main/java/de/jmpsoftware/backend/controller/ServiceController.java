package de.jmpsoftware.backend.controller;

import org.apache.juli.logging.Log;
import org.apache.juli.logging.LogFactory;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import java.security.Principal;

@RestController
@RequestMapping("service")
public class ServiceController {
    private static final Log LOG = LogFactory.getLog(DataController.class);

    @GetMapping(path = "/ping")
    public String getPing(Principal principal) {
        if (principal == null)
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "No principal");

        return "Hallo " + principal.getName();
    }
}