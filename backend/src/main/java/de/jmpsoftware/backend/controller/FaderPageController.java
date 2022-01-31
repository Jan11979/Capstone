package de.jmpsoftware.backend.controller;


import de.jmpsoftware.backend.model.frontendconnection.FaderItem;
import org.apache.juli.logging.Log;
import org.apache.juli.logging.LogFactory;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("api/fp")
public class FaderPageController {
    private static final Log LOG = LogFactory.getLog(FaderPageController.class);

    /**
     *  Test
     */
    @GetMapping(path = "/simplepage")
    public List<FaderItem> getSimplePage(Principal principal) {
        List<FaderItem> tmpList = new ArrayList<>();
        for (int i = 0; i <= 10; i++ ) {
            FaderItem newItem = FaderItem.builder()
                    .channel(i).value(0).type(1).universe(1).build();
            tmpList.add(newItem);
        }
        FaderItem newItem = FaderItem.builder()
                .channel(11).value(0).type(2).universe(1).build();
        tmpList.add(newItem);
        FaderItem newItem2 = FaderItem.builder()
                .channel(12).value(0).type(3).universe(1).build();
        tmpList.add(newItem2);
        return tmpList;
    }

    @ResponseBody
    @PostMapping(path = "/setvalue")
    public void getSingleValue(@RequestBody FaderItem faderItem, Principal principal){
        LOG.info("NewValue" + faderItem.toString() );
    }
}
