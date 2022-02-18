package de.jmpsoftware.backend.controller;

import de.jmpsoftware.backend.model.frontendconnection.DbCommandItem;
import de.jmpsoftware.backend.model.frontendconnection.FixtureItem;
import de.jmpsoftware.backend.service.DMXService;
import org.apache.juli.logging.Log;
import org.apache.juli.logging.LogFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;



@RestController
@RequestMapping("api/loadandsave")
public class DataController {
    private static final Log LOG = LogFactory.getLog(DataController.class);

    private final DMXService dmxService;

    public DataController(DMXService dmxService) {
        this.dmxService = dmxService;
    }

    private void checkDbCommandItemAndThrowException( DbCommandItem dbItem ){
        if( dbItem == null)
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "No DbCommandItem!");
        if( !dbItem.checkValidData() )
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "invalid DbCommandItem!");
    }


    @ResponseBody
    @PutMapping(path = "/saveuniverse")
    public ResponseEntity<String> saveUniverse(@RequestBody DbCommandItem dbItem) throws Exception {
        checkDbCommandItemAndThrowException( dbItem );

        dmxService.saveDMXTableToDatabase(dbItem);
        LOG.info("Save:" + dbItem );
        return ResponseEntity.ok().build();
    }

    @ResponseBody
    @PostMapping(path = "/loaduniverse")
    public ResponseEntity<String> loadUniverse(@RequestBody DbCommandItem dbItem) throws Exception {
        checkDbCommandItemAndThrowException( dbItem );
        if(!dmxService.isDbItemDMXTableInDatabase( dbItem )){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Not found in Database:" + dbItem.getName() );
        }
        dmxService.loadDMXTableFromDatabase( dbItem );
        LOG.info("Load:" + dbItem );
        return ResponseEntity.ok().build();
    }

    @ResponseBody
    @PutMapping(path = "/savefixtures")
    public ResponseEntity<String> saveFixtures(@RequestBody List<FixtureItem> fixtureItemList) {
        if( fixtureItemList == null)
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Not fixtureItemList" );

        LOG.info("Save Fixture:" + fixtureItemList);
        dmxService.saveFixtureListInDB( fixtureItemList );
        return ResponseEntity.ok().build();
    }

    @ResponseBody
    @PostMapping(path = "/loadfixtures")
    public ResponseEntity<String> loadFixtures(@RequestBody List<FixtureItem> fixtureItemList) {
        if( fixtureItemList == null)
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Not fixtureItemList" );

        LOG.info("Load Fixture:" + fixtureItemList);
        dmxService.loadFixturesFromDB( fixtureItemList );
        return ResponseEntity.ok().build();
    }


    @ResponseBody
    @PutMapping(path = "/savefixturscene/{sceneName}")
    public ResponseEntity<String> saveFixturScene(@PathVariable String sceneName, @RequestBody List<FixtureItem> fixtureItemList) {
        if(( fixtureItemList == null) || ( sceneName == null))
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Not fixtureItemList" );

        LOG.info("Save Fixture Name:" + sceneName + " Scene:" + fixtureItemList);
        dmxService.saveSceneInDB( sceneName, fixtureItemList );
        return ResponseEntity.ok().build();
    }

    @ResponseBody
    @PostMapping(path = "/loadfixturscene/{sceneName}")
    public ResponseEntity<String> loadFixturScene(@PathVariable String sceneName) {
        if( sceneName == null)
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Not fixtureItemList" );

        LOG.info("Load Fixture Name:" + sceneName );
        dmxService.loadSceneFromDB( sceneName );
        return ResponseEntity.ok().build();
    }

}
