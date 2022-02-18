package de.jmpsoftware.backend.controller;

import org.apache.juli.logging.Log;
import org.apache.juli.logging.LogFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import java.security.Principal;

@RestController
@RequestMapping("service")
public class ServiceController {
    private static final Log LOG = LogFactory.getLog(ServiceController.class);

    @GetMapping(path = "/ping")
    public ResponseEntity<String> getPing(Principal principal) {
        if (principal == null)
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "No principal");

        LOG.trace("ping from: " + principal.getName());
        return ResponseEntity.ok("Hallo " + principal.getName());
    }
}