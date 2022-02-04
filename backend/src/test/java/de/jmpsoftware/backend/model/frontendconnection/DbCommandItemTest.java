package de.jmpsoftware.backend.model.frontendconnection;


import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.Test;

class DbCommandItemTest {


    @Test
    void checkValidDataTest(){
        DbCommandItem dbCommandItem = new DbCommandItem();

        dbCommandItem.setUniverse(-1);
        assertFalse(dbCommandItem.checkValidData());

        dbCommandItem.setUniverse(5);
        assertFalse(dbCommandItem.checkValidData());

        dbCommandItem.setUniverse(0);
        assertFalse(dbCommandItem.checkValidData());

        dbCommandItem.setName("");
        assertFalse(dbCommandItem.checkValidData());


        dbCommandItem.setName("richtig");
        dbCommandItem.setUniverse(-1);
        assertFalse(dbCommandItem.checkValidData());

        dbCommandItem.setUniverse(5);
        assertFalse(dbCommandItem.checkValidData());

        dbCommandItem.setUniverse(0);
        assertTrue(dbCommandItem.checkValidData());
    }


}