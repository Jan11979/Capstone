package de.jmpsoftware.backend.controller;


import de.jmpsoftware.backend.model.Something;
import de.jmpsoftware.backend.service.SomethingService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("api")
public class SomethingController {

    private final SomethingService somethingService;


    public SomethingController(SomethingService somethingService) {
        this.somethingService = somethingService;
    }

    @GetMapping
    public List<Something> checkWorking(){
        somethingService.addNewSomething(Something.builder().name("I´ll be back!").build());
        return somethingService.getAll();
    }

    @GetMapping(path = "/info")
    public List<String> getHallo(Principal principal) {

        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd 'at' HH:mm:ss z");
        Date date = new Date(System.currentTimeMillis());

        List<String> tmpList = new ArrayList<>();

        if( principal == null )
            tmpList.add("No User");
        else
            tmpList.add("UserName: " + principal.getName());

        tmpList.add("Miau um: " + formatter.format(date));
        tmpList.add("Service: Deploy Test ");

        somethingService.addNewSomething(Something.builder().name("I´ll be back!").build());
        tmpList.add("DB Test: ");
        tmpList.add( somethingService.getAll().toString() );


        return tmpList;
    }

}
