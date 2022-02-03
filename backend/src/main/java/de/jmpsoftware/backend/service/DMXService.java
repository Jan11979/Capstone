package de.jmpsoftware.backend.service;

import de.jmpsoftware.backend.model.DMXTable;
import de.jmpsoftware.backend.model.db.UniverseItemDB;
import de.jmpsoftware.backend.model.frontendconnection.DbCommandItem;
import de.jmpsoftware.backend.model.frontendconnection.FaderItem;
import de.jmpsoftware.backend.repo.UniverseRepo;
import org.springframework.stereotype.Service;

@Service
public class DMXService {

    private final DMXTableService dmxTableService;
    private final UniverseRepo universeRepo;

    public DMXService(UniverseRepo universeRepo) {
        this.universeRepo = universeRepo;
        this.dmxTableService = new DMXTableService();
    }

    public int getValueFromTable(int channel){
        return dmxTableService.getValueFromTable( channel );
    }

    public int getValueFromTable(int channel, int universe){
        return dmxTableService.getValueFromTable( channel, universe );
    }

    public void setValueToTable(int value, int channel){
        dmxTableService.addValueToTable( value, channel );
    }

    public void setValueToTable(int value, int channel, int universe){
        dmxTableService.addValueToTable( value, channel, universe );
    }
    public void setValueToTable(FaderItem faderItem){
        dmxTableService.addValueToTable( faderItem.getValue(), faderItem.getChannel(), faderItem.getUniverse() );
    }

    public void saveDMXTableToDatabase(DbCommandItem dbItem) throws Exception {
        universeRepo.save( createUniverseItemDB(dbItem) );
    }

    private UniverseItemDB createUniverseItemDB(DbCommandItem dbItem) throws Exception {
        UniverseItemDB universeItemDB = new UniverseItemDB();
        DMXTable dmxTable = dmxTableService.getDMXTable(dbItem.getUniverse());
        universeItemDB.setIdName(dbItem.getName());
        universeItemDB.setUniverse(dbItem.getUniverse());
        universeItemDB.setValues(dmxTable.getValueTable());
        return universeItemDB;
    }
}

/**
 * somethingService.addNewSomething(Something.builder().name("I´ll be back!").build());
 *         return somethingService.getAll();
 *         public void addNewSomething(Something build) {
 *         somethingRepo.save(build);
 *     }
 *
 *     public List<Something> getAll() {
 *         return somethingRepo.findAll();
 *     }
 */
