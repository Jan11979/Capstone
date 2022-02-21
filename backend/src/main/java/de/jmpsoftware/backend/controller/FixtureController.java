package de.jmpsoftware.backend.controller;

import de.jmpsoftware.backend.model.frontendconnection.ActiveFixtureItem;
import de.jmpsoftware.backend.model.frontendconnection.CreateFixtureItem;
import de.jmpsoftware.backend.model.frontendconnection.FaderItem;
import de.jmpsoftware.backend.service.DMXService;
import org.apache.juli.logging.Log;
import org.apache.juli.logging.LogFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.security.Principal;
import java.util.List;


@SuppressWarnings("SameReturnValue")
@RestController
@RequestMapping("api/fixture")
public class FixtureController {
    private static final Log LOG = LogFactory.getLog(FixtureController.class);

    private final DMXService dmxService;

    public FixtureController(DMXService dmxService) {
        this.dmxService = dmxService;
    }


    @GetMapping(path = "/allfixturetemplatelist")
    public ResponseEntity<List<String>> returnAllFixtureTemplateList() {return ResponseEntity.ok( dmxService.getAllFixtureTemplateList());}

    @ResponseBody
    @PostMapping(path = "/createfixture")
    public ResponseEntity<String> postFixtureFader(@RequestBody CreateFixtureItem fixtureItem) {
        if (fixtureItem == null)
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Not fixtureItem" );

        dmxService.createFixtureFromTemplateList(fixtureItem.getTemplateName(),  fixtureItem.getFixtureName(), fixtureItem.getAddress(), fixtureItem.getUniverse());
        return ResponseEntity.ok().build();
    }


    @GetMapping(path = "/allactivefixture")
    public ResponseEntity<List<ActiveFixtureItem>> returnAllActiveFixture() {
        return ResponseEntity.ok(dmxService.getAllActiveFixture());
    }

    @ResponseBody
    @PutMapping(path = "/deleteactivefixture")
    public ResponseEntity<String> deleteActiveFixtures(@RequestBody List<ActiveFixtureItem> activeFixtureItemList){
        if( activeFixtureItemList == null)
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "No fixtureList!");

        dmxService.deleteActiveFixture(activeFixtureItemList);
        return ResponseEntity.ok().build();
    }


    @ResponseBody
    @PutMapping(path = "/setactivefixturechecked")
    public ResponseEntity<String> createFaderList(@RequestBody ActiveFixtureItem activeFixtureItem){
        if( activeFixtureItem == null)
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "No fixtureList!");

        dmxService.setActiveFixtureChecked(activeFixtureItem);
        return ResponseEntity.ok().build();
    }


    @ResponseBody
    @PutMapping(path = "/getfixture")
    public ResponseEntity<List<FaderItem>> createFaderList(@RequestBody List<String> fixtureList){
        if( fixtureList == null)
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "No fixtureList!");

        return ResponseEntity.ok(dmxService.getFaderFromFixtureList(fixtureList));
    }

    @ResponseBody
    @PostMapping(path = "/setfixturevalue")
    public ResponseEntity<String> postFixtureFader(@RequestBody FaderItem faderItem, Principal principal) throws IOException {
        if( faderItem == null)
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Not faderItem" );

        LOG.info("valueFixtureFader" + faderItem );
        dmxService.updateFixture(faderItem);
        return ResponseEntity.ok().build();
    }


    @GetMapping(path = "/createdummytemplates")
    public ResponseEntity<String> createDummyTemplates() {
        dmxService.createDummyTemplates();
        return ResponseEntity.ok().build();
    }

    @GetMapping(path = "/createdummyfixtures")
    public ResponseEntity<String> createDummyFixtures() {
        dmxService.createDummyFixtures();
        return ResponseEntity.ok().build();
    }
}