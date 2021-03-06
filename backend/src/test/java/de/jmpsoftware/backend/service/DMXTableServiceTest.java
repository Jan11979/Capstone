package de.jmpsoftware.backend.service;

import de.jmpsoftware.backend.model.DMXTable;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class DMXTableServiceTest {

    final DMXTableService dmxTableService = new DMXTableService();

    @Test
    void checkChannelUniverseValidTest(){
        assertTrue(dmxTableService.checkChannelUniverseValid( 2, 0) );
        assertFalse(dmxTableService.checkChannelUniverseValid( -1, 0) );
        assertFalse(dmxTableService.checkChannelUniverseValid( 0, -1) );
        assertFalse(dmxTableService.checkChannelUniverseValid( 530, 2) );
        assertFalse(dmxTableService.checkChannelUniverseValid( 2, 5) );
    }

    @Test
    void addAndGetValueToTableTest(){
        dmxTableService.addValueToTable(42, 2);
        dmxTableService.addValueToTable(123, 1, 1);

        assertEquals(42, dmxTableService.getValueFromTable(2));
        assertEquals(123, dmxTableService.getValueFromTable(1, 1));

        dmxTableService.addValueToTable(123, 555, 5);

        assertEquals(-1, dmxTableService.getValueFromTable(1, 5));
        assertEquals(-1, dmxTableService.getValueFromTable(542, 1));

    }

    @Test
    void addAndGetTableToTableTest() throws Exception {
        DMXTable DmxTable = new DMXTable(1);
        DmxTable.setValue(1,1);
        DmxTable.setValue(2,42);

        dmxTableService.setDMXTable(DmxTable);
        DMXTable newDmxTable = dmxTableService.getDMXTable(1);

        assertEquals(DmxTable, newDmxTable);

    }
}