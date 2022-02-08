package de.jmpsoftware.backend.controller;

import de.jmpsoftware.backend.model.frontendconnection.FixtureItem;
import de.jmpsoftware.backend.service.DMXService;
import org.apache.juli.logging.Log;
import org.apache.juli.logging.LogFactory;
import org.springframework.web.bind.annotation.*;

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
    public List<String> returnAllActivFixture() {
        return dmxService.getAllActivFixture();
    }


    @ResponseBody
    @PutMapping(path = "/loadfixture")
    public void loadFixture(@RequestBody FixtureItem fixtureItem){
        LOG.info("load:" + fixtureItem);
    }



    @GetMapping(path = "/createdummyTemplates")
    public String createDummyFixtures() {
        dmxService.createDummyFixtures();
        return "Done";
    }
    @GetMapping(path = "/createdummyFixtures")
    public String createDummyTemplates() {
        dmxService.createDummyTemplates();
        return "Done";
    }
}