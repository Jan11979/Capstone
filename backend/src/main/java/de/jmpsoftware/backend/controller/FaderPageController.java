package de.jmpsoftware.backend.controller;


import de.jmpsoftware.backend.model.frontendconnection.FaderItem;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("api/fp")
public class FaderPageController {

    @GetMapping(path = "/simplepage")
    public List<FaderItem> getSimplePage(Principal principal) {
        List<FaderItem> tmpList = new ArrayList<>();
        for(int i=0; i<=10; i++)
        {
            FaderItem newItem = new FaderItem().builder()
                    .channel(i).value(0).type(1).universe(1).build();
            tmpList.add(newItem);
        }
        return tmpList;
    }
}
