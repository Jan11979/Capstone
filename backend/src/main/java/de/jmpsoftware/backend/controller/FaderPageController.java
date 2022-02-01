package de.jmpsoftware.backend.controller;


import de.jmpsoftware.backend.model.frontendconnection.FaderItem;
import de.jmpsoftware.backend.service.ArtNetService;
import org.apache.juli.logging.Log;
import org.apache.juli.logging.LogFactory;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.security.Principal;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("api/fp")
public class FaderPageController {
    private static final Log LOG = LogFactory.getLog(FaderPageController.class);
    final ArtNetService artNetService;

    public FaderPageController() throws IOException {
        artNetService = new ArtNetService();
    }

    @ResponseBody
    @PostMapping(path = "/setvalue")
    public void getSingleValue(@RequestBody FaderItem faderItem, Principal principal) throws IOException {
        if( faderItem == null)
            return;

        LOG.info("NewValue" + faderItem );
        artNetService.broadcastValue(faderItem);
    }



    /**
     *  Test
     */
    @GetMapping(path = "/simplepage")
    public List<FaderItem> getSimplePage(Principal principal) {
        List<FaderItem> tmpList = new ArrayList<>();
        for (int i = 0; i <= 5; i++ ) {
            FaderItem newItem = FaderItem.builder()
                    .channel(i).value(0).type( ArtNetService.FADER_TYPE_VALUE ).universe(0).build();
            tmpList.add(newItem);
        }

        FaderItem newItem1 = FaderItem.builder()
                .channel(6).value(0).type(ArtNetService.FADER_TYPE_RGB).universe(0).build();
        tmpList.add(newItem1);

        FaderItem newItem2 = FaderItem.builder()
                .channel(11).value(0).type(ArtNetService.FADER_TYPE_HUE).universe(0).build();
        tmpList.add(newItem2);
        FaderItem newItem3 = FaderItem.builder()
                .channel(12).value(0).type(ArtNetService.FADER_TYPE_KELVIN).universe(0).build();
        tmpList.add(newItem3);

        return tmpList;
    }
}
