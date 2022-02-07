package de.jmpsoftware.backend.service;

import de.jmpsoftware.backend.model.DMXTable;
import de.jmpsoftware.backend.model.db.UniverseItemDB;
import de.jmpsoftware.backend.model.frontendconnection.DbCommandItem;
import de.jmpsoftware.backend.model.frontendconnection.FaderItem;
import de.jmpsoftware.backend.repo.UniverseRepo;
import org.apache.juli.logging.Log;
import org.apache.juli.logging.LogFactory;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
public class DMXService {
    private static final Log LOG = LogFactory.getLog(DMXService.class);

    private final DMXTableService dmxTableService;
    private final UniverseRepo universeRepo;
    private final ArtNetService artNetService;

    public DMXService(UniverseRepo universeRepo) throws IOException {
        this.universeRepo = universeRepo;
        this.dmxTableService = new DMXTableService();
        artNetService = new ArtNetService();
    }

    public ArtNetService getArtNetService() {
        return artNetService;
    }

    public int getValueFromTable(int channel) {
        return dmxTableService.getValueFromTable(channel);
    }

    public int getValueFromTable(int channel, int universe) {
        return dmxTableService.getValueFromTable(channel, universe);
    }

    public void setValueToTable(int value, int channel) {
        dmxTableService.addValueToTable(value, channel);
    }

    public void setValueToTable(int value, int channel, int universe) {
        dmxTableService.addValueToTable(value, channel, universe);
    }

    public void setValueToTable(FaderItem faderItem) {
        dmxTableService.addValueToTable(faderItem.getValue(), faderItem.getChannel(), faderItem.getUniverse());
    }

    public boolean isDbItemDMXTableInDatabase(DbCommandItem dbItem) {
        return universeRepo.existsById(dbItem.getName());
    }

    public void saveDMXTableToDatabase(DbCommandItem dbItem) throws Exception {
        UniverseItemDB universeItemDB = createUniverseItemDB(dbItem);
        universeRepo.save(universeItemDB);
        LOG.info("Save Universe" + dbItem.getName() + universeItemDB);
    }

    UniverseItemDB createUniverseItemDB(DbCommandItem dbItem) throws Exception {
        UniverseItemDB universeItemDB = new UniverseItemDB();
        DMXTable dmxTable = dmxTableService.getDMXTable(dbItem.getUniverse());
        universeItemDB.setIdName(dbItem.getName());
        universeItemDB.setUniverse(dbItem.getUniverse());
        universeItemDB.setValues(dmxTable.getValueTable());
        return universeItemDB;
    }

    public void loadDMXTableFromDatabase(DbCommandItem dbItem) throws Exception {
        UniverseItemDB universeItemDB = universeRepo.findById(dbItem.getName())
                .orElseThrow(() -> new IllegalStateException("No Database Item ID: " + dbItem.getName()));

        storeUniverseItemDBInLocalTable(universeItemDB);
        artNetService.broadcastUniverse(dmxTableService.getDMXTable(universeItemDB.getUniverse()));

        LOG.info("Load Universe" + dbItem.getName() + universeItemDB);
    }

    void storeUniverseItemDBInLocalTable(UniverseItemDB universeItemDB) throws Exception {
        DMXTable newDmxTable = new DMXTable();
        newDmxTable.setUniverse(universeItemDB.getUniverse());
        newDmxTable.setValueTable( universeItemDB.getValues() );
        dmxTableService.setDMXTable(newDmxTable);
    }
}

