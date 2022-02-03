package de.jmpsoftware.backend.controller;

import de.jmpsoftware.backend.model.frontendconnection.DbCommandItem;
import de.jmpsoftware.backend.service.DMXService;
import org.apache.juli.logging.Log;
import org.apache.juli.logging.LogFactory;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("api/data")
public class DataController {
    private static final Log LOG = LogFactory.getLog(FaderPageController.class);

    private final DMXService dmxService;

    public DataController(DMXService dmxService) {
        this.dmxService = dmxService;
    }


    @ResponseBody
    @PutMapping(path = "/simplesave")
    public void getSingleValue(@RequestBody DbCommandItem dbItem) throws Exception {
        if( dbItem == null)
            return;
        //throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "invalid credentials!");

        dmxService.saveDMXTableToDatabase(dbItem);

        LOG.info("Save:" + dbItem );

    }

}
