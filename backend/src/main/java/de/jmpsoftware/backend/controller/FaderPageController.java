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


    /**
     *  Test
     */
    @GetMapping(path = "/simplepage")
    public ResponseEntity<List<FaderItem>> getSimplePage(Principal principal) {
        List<FaderItem> tmpList = new ArrayList<>();

        for (int i = 0; i <= 5; i++ ) {
            FaderItem newItem = FaderItem.builder()
                    .channel(i).value(0).type( ArtNetService.FADER_TYPE_VALUE ).universe(0).fixtureName("STD").build();
            newItem.setValue(dmxService.getValueFromTable(i));
            tmpList.add(newItem);
        }

        FaderItem newItem1 = FaderItem.builder()
                .channel(6).value(0).type(ArtNetService.FADER_TYPE_RGB).universe(0).fixtureName("STD").build();
        newItem1.setValue(dmxService.getValueFromTable(6));
        newItem1.setValueX1(dmxService.getValueFromTable(7));
        newItem1.setValueX2(dmxService.getValueFromTable(8));
        tmpList.add(newItem1);

        FaderItem newItem2 = FaderItem.builder()
                .channel(11).value(0).type(ArtNetService.FADER_TYPE_HUE).universe(0).fixtureName("STD").build();
        newItem2.setValue(dmxService.getValueFromTable(11));
        tmpList.add(newItem2);
        FaderItem newItem3 = FaderItem.builder()
                .channel(12).value(0).type(ArtNetService.FADER_TYPE_KELVIN).universe(0).fixtureName("STD").build();
        newItem3.setValue(dmxService.getValueFromTable(12));
        tmpList.add(newItem3);

        return ResponseEntity.ok(tmpList);
    }
}
