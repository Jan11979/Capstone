package de.jmpsoftware.backend.controller;


import de.jmpsoftware.backend.model.frontendconnection.FaderItem;
import de.jmpsoftware.backend.model.frontendconnection.FaderPageSelect;
import de.jmpsoftware.backend.service.ArtNetService;
import de.jmpsoftware.backend.service.DMXService;
import org.apache.juli.logging.Log;
import org.apache.juli.logging.LogFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.security.Principal;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("api/faderpage")
public class FaderPageController {
    private static final Log LOG = LogFactory.getLog(FaderPageController.class);

    private final DMXService dmxService;

    public FaderPageController(DMXService dmxService) {
        this.dmxService = dmxService;
    }

    @ResponseBody
    @PostMapping(path = "/setvalue")
    public ResponseEntity<String> getSingleValue(@RequestBody FaderItem faderItem, Principal principal) throws IOException {
        if( faderItem == null)
            return ResponseEntity.badRequest().build();

        LOG.info("NewSingleValue" + faderItem );
        dmxService.setValueToTable(faderItem);
        return ResponseEntity.ok().build();
    }

    @ResponseBody
    @PostMapping(path = "/simpleselectpage")
    public ResponseEntity<List<FaderItem>> postGenerateSelectFaderPage(@RequestBody FaderPageSelect faderPageSelect) {
        List<FaderItem> tmpList = new ArrayList<>();
        if( faderPageSelect == null)
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Not faderPageSelect" );
        LOG.info("postGenerateSelectFaderPage" + faderPageSelect );

        for (int i = faderPageSelect.getStartAddress()-1; i < faderPageSelect.getStartAddress()+faderPageSelect.getQuantity()-1; i++ ) {
            FaderItem newItem = FaderItem.builder()
                    .channel(i).value(0).type( ArtNetService.FADER_TYPE_VALUE ).universe(faderPageSelect.getUniverse()).fixtureName("STD").build();
            newItem.setValue(dmxService.getValueFromTable(i, faderPageSelect.getUniverse()) );
            tmpList.add(newItem);
        }
        return ResponseEntity.ok(tmpList);
    }

}
