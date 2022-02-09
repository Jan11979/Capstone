package de.jmpsoftware.backend.service;

import de.jmpsoftware.backend.model.DMXTable;
import de.jmpsoftware.backend.model.db.FixtureDB;
import de.jmpsoftware.backend.model.db.FixtureTamplate;
import de.jmpsoftware.backend.model.db.UniverseItemDB;
import de.jmpsoftware.backend.model.fader.FaderBase;
import de.jmpsoftware.backend.model.fader.RGBFader;
import de.jmpsoftware.backend.model.fader.SingleFader;
import de.jmpsoftware.backend.model.frontendconnection.ActiveFixtureList;
import de.jmpsoftware.backend.model.frontendconnection.DbCommandItem;
import de.jmpsoftware.backend.model.frontendconnection.FaderItem;
import de.jmpsoftware.backend.repo.FixtureRepo;
import de.jmpsoftware.backend.repo.FixtureTamplateRepo;
import de.jmpsoftware.backend.repo.UniverseRepo;
import org.apache.juli.logging.Log;
import org.apache.juli.logging.LogFactory;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class DMXService {
    private static final Log LOG = LogFactory.getLog(DMXService.class);

    private final DMXTableService dmxTableService;
    private final UniverseRepo universeRepo;
    private final FixtureRepo fixtureRepo;
    private final FixtureTamplateRepo fixtureTamplateRepo;
    private final ArtNetService artNetService;
    private final List<FixtureDB> fixtureList;

    public DMXService(UniverseRepo universeRepo, FixtureRepo fixtureRepo, FixtureTamplateRepo fixtureTamplateRepo) throws IOException {
        this.universeRepo = universeRepo;
        this.fixtureRepo = fixtureRepo;
        this.fixtureTamplateRepo = fixtureTamplateRepo;
        this.dmxTableService = new DMXTableService();
        artNetService = new ArtNetService();
        fixtureList = new ArrayList<>();
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

    public void setValueToTable(FaderItem faderItem) throws IOException {
        dmxTableService.addValueToTable(faderItem.getValue(), faderItem.getChannel(), faderItem.getUniverse());
        artNetService.broadcastValue(faderItem);
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

    public List<ActiveFixtureList> getAllActivFixture() {
        return fixtureList.stream().map(e -> new ActiveFixtureList(e.getIdName(), 0) ).collect(Collectors.toList());
    }

    public FaderItem getFaderFromFixtureFaderList(FaderBase faderBase,  int address,  int universe, String fixtureName) {
        FaderItem newItem = new FaderItem();
        newItem.setFixtureName( fixtureName );
        newItem.setType(faderBase.getFaderType());
        newItem.setUniverse(universe);

        switch( faderBase.getFaderType() )
        {
            case ArtNetService.FADER_TYPE_VALUE:
                newItem.setValue( ((SingleFader)faderBase).getValue());
                newItem.setFixtureID( faderBase.getFaderID() );
                newItem.setChannel(address);
                break;
            case ArtNetService.FADER_TYPE_RGB:
                newItem.setValue( ((RGBFader)faderBase).getValueRed());
                newItem.setValueX1( ((RGBFader)faderBase).getValueGreen());
                newItem.setValueX2( ((RGBFader)faderBase).getValueBlue());
                newItem.setFixtureID( faderBase.getFaderID() );
                newItem.setChannel(address);
                break;
        }
        return newItem;
    }



    public List<FaderItem> getFaderFromFixture(String name) {
        List<FaderItem> tmpList = new ArrayList<>();

        FixtureDB fixtureDB = fixtureList.stream()
                .filter(fixture -> name.equals(fixture.getIdName() ) )
                .findAny()
                .orElse(null);

        fixtureDB.getFaderList().stream().forEach( fader -> tmpList.add(getFaderFromFixtureFaderList(fader, fixtureDB.getAddress(), fixtureDB.getUniverse(), name ) ) );

        return tmpList;
    }

    public List<FaderItem> getFaderFromFixtureList(List<String> nameList) {
        List<FaderItem> tmpList = new ArrayList<>();

        nameList.stream().forEach( name -> tmpList.addAll( getFaderFromFixture(name) ) );

        return tmpList;
    }

    public void updateFixture(FaderItem faderItem) throws IOException {
        FixtureDB fixtureDB = fixtureList.stream()
                .filter(fixture -> faderItem.getFixtureName().equals(fixture.getIdName() ) )
                .findAny()
                .orElse(null);
        if(fixtureDB != null)
        {
            setValueToTable(fixtureDB.update( faderItem ));
        }
    }


    public void createDummyTemplates(){
        LOG.info("createDummyTemplates");
        SingleFader singleFader = SingleFader.builder().value(0).build();
        singleFader.setFaderType(artNetService.FADER_TYPE_VALUE);

        FixtureTamplate fixtureTemplate = new FixtureTamplate();
        fixtureTemplate.setIdName("Dimmer1");
        fixtureTemplate.setFaderList(new ArrayList<>());
        fixtureTemplate.getFaderList().add(singleFader);

        fixtureTamplateRepo.save(fixtureTemplate);
    }

    public void createDummyFixtures(){
        LOG.info("createDummyFixturese");
        SingleFader singleFader = SingleFader.builder().value(0).build();
        singleFader.setFaderType(artNetService.FADER_TYPE_VALUE);
        singleFader.setFaderID(1);

        FixtureDB fixtureDB1 = FixtureDB.builder().idName("1kwOpenFace").address(10).build();
        fixtureDB1.setFaderList(new ArrayList<>());
        fixtureDB1.getFaderList().add(singleFader);
        fixtureRepo.save(fixtureDB1);
        fixtureList.add(fixtureDB1);


        RGBFader rgbFader = RGBFader.builder().valueRed(0).valueGreen(0).valueBlue(0).build();
        rgbFader.setFaderType(artNetService.FADER_TYPE_RGB);
        singleFader.setFaderID(1);

        FixtureDB fixtureDB2 = FixtureDB.builder().idName("ParSpotRGB").address(6).build();
        fixtureDB2.setFaderList(new ArrayList<>());
        fixtureDB2.getFaderList().add(rgbFader);

        fixtureRepo.save(fixtureDB2);
        fixtureList.add(fixtureDB2);
    }
}

