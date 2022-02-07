package de.jmpsoftware.backend.controller;

import de.jmpsoftware.backend.model.frontendconnection.DbCommandItem;
import de.jmpsoftware.backend.service.DMXService;
import org.apache.juli.logging.Log;
import org.apache.juli.logging.LogFactory;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;


@RestController
@RequestMapping("api/data")
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
    @PutMapping(path = "/save")
    public void saveUniverse(@RequestBody DbCommandItem dbItem) throws Exception {
        checkDbCommandItemAndThrowException( dbItem );

        dmxService.saveDMXTableToDatabase(dbItem);
        LOG.info("Save:" + dbItem );
    }

    @ResponseBody
    @PutMapping(path = "/load")
    public void loadUniverse(@RequestBody DbCommandItem dbItem) throws Exception {
        checkDbCommandItemAndThrowException( dbItem );
        if(!dmxService.isDbItemDMXTableInDatabase( dbItem )){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Not found in Database:" + dbItem.getName() );
        }
        dmxService.loadDMXTableFromDatabase( dbItem );
        LOG.info("Load:" + dbItem );
    }
}
