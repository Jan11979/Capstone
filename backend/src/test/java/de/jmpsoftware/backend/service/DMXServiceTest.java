package de.jmpsoftware.backend.service;

import de.jmpsoftware.backend.model.db.UniverseItemDB;
import de.jmpsoftware.backend.model.frontendconnection.DbCommandItem;
import de.jmpsoftware.backend.repo.UniverseRepo;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import static org.junit.jupiter.api.Assertions.assertEquals;

class DMXServiceTest {

    @Autowired
    UniverseRepo universeRepo;
    private final DMXService dmxService = new DMXService(universeRepo);

    @Test
    void createAndStoreUniverseTest() throws Exception {

        //Given
        int[] table = new int[ArtNetService.SIZE_UNIVERSE];
        UniverseItemDB universeItemDB = new UniverseItemDB();
        DbCommandItem dbItem = new DbCommandItem();

        universeItemDB.setUniverse(0);
        table[0] = 3;
        table[1] = 2;
        table[2] = 1;
        universeItemDB.setValues(table);

        //WHEN
        dmxService.storeUniverseItemDBInLocalTable(universeItemDB);
        UniverseItemDB newUniverseItemDB = dmxService.createUniverseItemDB(dbItem);

        //THEN
        assertEquals(universeItemDB, newUniverseItemDB);
    }
}

