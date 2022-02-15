package de.jmpsoftware.backend.controller;

import de.jmpsoftware.backend.model.frontendconnection.DbCommandItem;
import de.jmpsoftware.backend.model.frontendconnection.FixtureItem;
import de.jmpsoftware.backend.service.DMXService;
import org.apache.juli.logging.Log;
import org.apache.juli.logging.LogFactory;
import org.springframework.http.HttpStatus;
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
    public void saveUniverse(@RequestBody DbCommandItem dbItem) throws Exception {
        checkDbCommandItemAndThrowException( dbItem );

        dmxService.saveDMXTableToDatabase(dbItem);
        LOG.info("Save:" + dbItem );
    }

    @ResponseBody
    @PostMapping(path = "/loaduniverse")
    public void loadUniverse(@RequestBody DbCommandItem dbItem) throws Exception {
        checkDbCommandItemAndThrowException( dbItem );
        if(!dmxService.isDbItemDMXTableInDatabase( dbItem )){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Not found in Database:" + dbItem.getName() );
        }
        dmxService.loadDMXTableFromDatabase( dbItem );
        LOG.info("Load:" + dbItem );
    }

    @ResponseBody
    @PutMapping(path = "/savefixtures")
    public void saveFixtures(@RequestBody List<FixtureItem> fixtureItemList) {
        if( fixtureItemList == null)
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Not fixtureItemList" );

        LOG.info("Save Fixture:" + fixtureItemList);
        dmxService.saveFixtureListInDB( fixtureItemList );
    }

    @ResponseBody
    @PostMapping(path = "/loadfixtures")
    public void loadFixtures(@RequestBody List<FixtureItem> fixtureItemList) {
        if( fixtureItemList == null)
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Not fixtureItemList" );

        LOG.info("Load Fixture:" + fixtureItemList);
        dmxService.loadFixturesFromInDB( fixtureItemList );
    }


    @ResponseBody
    @PutMapping(path = "/savefixturscene/{sceneName}")
    public void saveFixturScene(@PathVariable String sceneName, @RequestBody List<FixtureItem> fixtureItemList) {
        if(( fixtureItemList == null) || ( sceneName == null))
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Not fixtureItemList" );

        LOG.info("Save Fixture Name:" + sceneName + " Scene:" + fixtureItemList);
        dmxService.saveSceneInDB( sceneName, fixtureItemList );
    }

    @ResponseBody
    @PostMapping(path = "/loadfixturscene/{sceneName}")
    public void loadFixturScene(@PathVariable String sceneName) {
        if( sceneName == null)
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Not fixtureItemList" );

        LOG.info("Load Fixture Name:" + sceneName );
        dmxService.loadSceneFromDB( sceneName );
    }

}
