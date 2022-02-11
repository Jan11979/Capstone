package de.jmpsoftware.backend.controller;

import de.jmpsoftware.backend.model.frontendconnection.ActiveFixtureList;
import de.jmpsoftware.backend.model.frontendconnection.FaderItem;
import de.jmpsoftware.backend.model.frontendconnection.FixtureItem;
import de.jmpsoftware.backend.service.DMXService;
import org.apache.juli.logging.Log;
import org.apache.juli.logging.LogFactory;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.security.Principal;
import java.util.List;


@RestController
@RequestMapping("api/fixture")
public class FixtureController {
    private static final Log LOG = LogFactory.getLog(FixtureController.class);

    private final DMXService dmxService;

    public FixtureController(DMXService dmxService) {
        this.dmxService = dmxService;
    }

    @GetMapping(path = "/allactivefixture")
    public List<ActiveFixtureList> returnAllActivFixture() {
        return dmxService.getAllActivFixture();
    }

    @ResponseBody
    @PutMapping(path = "/getfixture")
    public List<FaderItem> createFaderList(@RequestBody List<String> fixtureList){
        if( fixtureList == null)
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "No fixtureList!");

        return dmxService.getFaderFromFixtureList(fixtureList);
    }

    @ResponseBody
    @PostMapping(path = "/setfixturevalue")
    public void postFixtureFader(@RequestBody FaderItem faderItem, Principal principal) throws IOException {
        if( faderItem == null)
            return;

        LOG.info("valueFixtureFader" + faderItem );
        dmxService.updateFixture(faderItem);
    }




    @ResponseBody
    @PutMapping(path = "/loadfixture")
    public void loadFixture(@RequestBody FixtureItem fixtureItem){
        LOG.info("load:" + fixtureItem);
    }


    @GetMapping(path = "/createdummytemplates")
    public String createDummyTemplates() {
        dmxService.createDummyTemplates();
        return "Done";
    }
    @GetMapping(path = "/createdummyfixtures")
    public String createDummyFixtures() {
        dmxService.createDummyFixtures();
        return "Done";
    }
}