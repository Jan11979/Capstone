package de.jmpsoftware.backend.service;

import de.jmpsoftware.backend.model.DMXTable;
import de.jmpsoftware.backend.model.db.SceneDB;
import de.jmpsoftware.backend.model.fader.*;
import de.jmpsoftware.backend.model.frontendconnection.ActiveFixtureItem;
import de.jmpsoftware.backend.model.frontendconnection.DbCommandItem;
import de.jmpsoftware.backend.model.frontendconnection.FaderItem;
import de.jmpsoftware.backend.model.db.FixtureDB;
import de.jmpsoftware.backend.model.frontendconnection.FixtureItem;
import de.jmpsoftware.backend.repo.FixtureRepo;
import de.jmpsoftware.backend.model.db.FixtureTemplate;
import de.jmpsoftware.backend.repo.FixtureTemplateRepo;
import de.jmpsoftware.backend.model.db.UniverseItemDB;
import de.jmpsoftware.backend.repo.SceneRepo;
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
    private final FixtureTemplateRepo fixtureTemplateRepo;
    private final FixtureRepo fixtureRepo;
    private final UniverseRepo universeRepo;
    private final SceneRepo sceneRepo;
    private final ArtNetService artNetService;
    private final List<FixtureDB> fixtureList;


    public DMXService(UniverseRepo universeRepo, FixtureRepo fixtureRepo, FixtureTemplateRepo fixtureTemplateRepo, SceneRepo sceneRepo ) throws IOException {
        this.universeRepo = universeRepo;
        this.fixtureRepo = fixtureRepo;
        this.fixtureTemplateRepo = fixtureTemplateRepo;
        this.sceneRepo = sceneRepo;
        this.dmxTableService = new DMXTableService();
        artNetService = new ArtNetService();
        fixtureList = new ArrayList<>();
    }



    public void initService(){
        LOG.info("Init DMX Service");
        createDummyTemplates();
        createDummyFixtures();
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
        newDmxTable.setValueTable(universeItemDB.getValues());
        dmxTableService.setDMXTable(newDmxTable);
    }

    public void saveFixtureListInDB(List<FixtureItem> fixtureItemList){
        fixtureItemList.forEach(item -> {
            FixtureDB fixtureDB = getFixtureFromList(item.getName() );
            fixtureRepo.save(fixtureDB);
        } );
    }

    public void loadFixturesFromInDB(List<FixtureItem> fixtureItemList){
        fixtureItemList.forEach(item -> {
            FixtureDB newfixtureDB = fixtureRepo.findByIdName(item.getName());
            FixtureDB oldfixtureDB = fixtureList.stream().filter(fixture -> newfixtureDB.getIdName().equals(fixture.getIdName()))
                                                .findAny().orElse(null);
                    if(oldfixtureDB == null){
                        fixtureList.add(newfixtureDB);
                    }else{
                        //fixtureList.remove(fixtureDB);
                        oldfixtureDB.cloneIt(newfixtureDB);
                    }
        } );
    }

    public void saveSceneInDB(String sceneName, List<FixtureItem> fixtureItemList){
        SceneDB sceneDB = new SceneDB();
        sceneDB.setIdName(sceneName);
        fixtureItemList.forEach(item -> {
            FixtureDB fixtureDB = getFixtureFromList(item.getName() );
            sceneDB.getFixtureList().add(fixtureDB);
        } );
        sceneRepo.save(sceneDB);
    }

    public void loadSceneFromDB(String sceneName){
        SceneDB sceneDB = sceneRepo.findByIdName(sceneName);
        sceneDB.getFixtureList().forEach(item -> {
            FixtureDB oldfixtureDB = fixtureList.stream().filter(fixture -> item.getIdName().equals(fixture.getIdName()))
                    .findAny().orElse(null);

            if(oldfixtureDB == null){
                fixtureList.add(item);
            }else{
                oldfixtureDB.cloneIt(item);
            }

        } );
    }






    public void setActiveFixtureChecked(ActiveFixtureItem activeFixtureItem) {
        FixtureDB fixtureDB = getFixtureFromList( activeFixtureItem.getName() );
        fixtureDB.setChecked( activeFixtureItem.getChecked() );
    }

    public List<ActiveFixtureItem> getAllActiveFixture() {
        return fixtureList.stream().map(e -> new ActiveFixtureItem(e.getIdName(), e.getChecked())).collect(Collectors.toList());
    }

    public FaderItem getFaderFromFixtureFaderList(FaderBase faderBase, int address, int universe, String fixtureName) {
        FaderItem newItem = new FaderItem();
        newItem.setFixtureName(fixtureName);
        newItem.setType(faderBase.getFaderType());
        newItem.setUniverse(universe);

        switch (faderBase.getFaderType()) {
            case ArtNetService.FADER_TYPE_VALUE -> {
                newItem.setValue(((SingleFader) faderBase).getValue());
                newItem.setFixtureID(faderBase.getFaderID());
                newItem.setChannel(address);
            }
            case ArtNetService.FADER_TYPE_MASTER_RGB -> {
                newItem.setValue(((MasterRGBFader) faderBase).getValueMaster());
                newItem.setFixtureID(faderBase.getFaderID());
                newItem.setChannel(address);
            }
            case ArtNetService.FADER_TYPE_MASTER_HUE2RGB, ArtNetService.FADER_TYPE_RGB -> {
                newItem.setValue(((RGBFader) faderBase).getValueRed());
                newItem.setValueX1(((RGBFader) faderBase).getValueGreen());
                newItem.setValueX2(((RGBFader) faderBase).getValueBlue());
                newItem.setFixtureID(faderBase.getFaderID());
                newItem.setChannel(address);
            }
            case ArtNetService.FADER_TYPE_MASTER_KELVIN -> {
                newItem.setValue(((MasterKelvinFader) faderBase).getValueMaster());
                newItem.setValueX1(((MasterKelvinFader) faderBase).getValueKelvin());
                newItem.setFixtureID(faderBase.getFaderID());
                newItem.setChannel(address);
            }
            case ArtNetService.FADER_TYPE_KELVIN2C -> {
                newItem.setValue(((KelvinFader) faderBase).getValueKelvin());
                newItem.setFixtureID(faderBase.getFaderID());
                newItem.setChannel(address);
            }
        }
        return newItem;
    }

    public FixtureDB getFixtureFromList(String name) {

        FixtureDB fixtureDB = fixtureList.stream()
                .filter(fixture -> name.equals(fixture.getIdName()))
                .findAny()
                .orElse(null);

        assert fixtureDB != null;

        return fixtureDB;
    }

    public List<FaderItem> getFaderFromFixture(String name) {
        List<FaderItem> tmpList = new ArrayList<>();

        FixtureDB fixtureDB = getFixtureFromList( name );

        fixtureDB.getFaderList().forEach(fader -> tmpList.add(getFaderFromFixtureFaderList(fader, fixtureDB.getAddress(), fixtureDB.getUniverse(), name)));

        return tmpList;
    }

    public List<FaderItem> getFaderFromFixtureList(List<String> nameList) {
        List<FaderItem> tmpList = new ArrayList<>();

        nameList.forEach(name -> tmpList.addAll(getFaderFromFixture(name)));

        return tmpList;
    }

    public void updateFixture(FaderItem faderItem) throws IOException {
        FixtureDB fixtureDB = fixtureList.stream()
                .filter(fixture -> faderItem.getFixtureName().equals(fixture.getIdName()))
                .findAny()
                .orElse(null);
        if (fixtureDB != null) {
            setValueToTable(fixtureDB.update(faderItem));
        }
    }

    public List<String> getAllFixtureTemplateList() {
        List<String> tmpNameList = new ArrayList<>();
        fixtureTemplateRepo.findAll().forEach(fixtureTemplate -> tmpNameList.add( fixtureTemplate.getIdName() ) );
        return tmpNameList;
    }

    private FixtureDB getFixtureFromRepo(String name){
        FixtureTemplate fixtureTemplate = fixtureTemplateRepo.findByIdName( name );
        assert fixtureTemplate != null;
        return fixtureTemplate;
    }

    public void createFixtureFromTemplateList(String templateName, String fixtureName, int address, int universe){
        FixtureDB fixtureDB = getFixtureFromRepo( templateName );
        fixtureDB.switchIdToTemplateNameAndSetIdName( fixtureName );
        fixtureDB.setAddress( address );
        fixtureDB.setUniverse( universe );
        fixtureList.add(fixtureDB);
    }



    public void createDummyFixtures() {
        LOG.info("createDummyFixtures");
        List<String> tmpNameList = getAllFixtureTemplateList();
        tmpNameList.forEach( name ->{
            if( name.equals("Dimmer1") ){
                createFixtureFromTemplateList(name,  "1kwOpenFace", 10, 0);
            }
            if( name.equals("SimpleRGB") ){
                createFixtureFromTemplateList(name,  "ParSpotRGB", 6, 0);
            }
            if( name.equals("2ChanelKelvin") ){
                createFixtureFromTemplateList(name,  "FlaecheDT", 3, 0);
            }
            if( name.equals("MasterHUE2RGB") ){
                createFixtureFromTemplateList(name,  "FlaecheRGB", 0, 0);
            }
        });
    }




    public void createDummyTemplates() {
        if( fixtureTemplateRepo.existsById( "Version" ) ){
            LOG.info("DummyTemplates already exists");
            return;
        }
        LOG.info("createDummyTemplates");

        {
            FixtureTemplate fixtureTemplate = new FixtureTemplate();
            fixtureTemplate.setIdName("Version");
            fixtureTemplateRepo.save(fixtureTemplate);
        }
        {
            SingleFader singleFader = SingleFader.builder().value(0).build();
            singleFader.setFaderType(ArtNetService.FADER_TYPE_VALUE);
            singleFader.setFaderID(1);
            FixtureTemplate fixtureTemplate = new FixtureTemplate();
            fixtureTemplate.setIdName("Dimmer1");
            fixtureTemplate.setFaderList(new ArrayList<>());
            fixtureTemplate.getFaderList().add(singleFader);
            fixtureTemplateRepo.save(fixtureTemplate);
        }
        {
            RGBFader rgbFader = RGBFader.builder().valueRed(0).valueGreen(0).valueBlue(0).build();
            rgbFader.setFaderType(ArtNetService.FADER_TYPE_RGB);
            rgbFader.setFaderID(1);
            FixtureTemplate fixtureTemplate = new FixtureTemplate();
            fixtureTemplate.setIdName("SimpleRGB");
            fixtureTemplate.setFaderList(new ArrayList<>());
            fixtureTemplate.getFaderList().add(rgbFader);
            fixtureTemplateRepo.save(fixtureTemplate);
        }
        {
            MasterKelvinFader masterKelvinFader = MasterKelvinFader.builder().valueMaster(0).valueKelvin(0).minKelvin(2000).maxKelvin(8000).build();
            masterKelvinFader.setFaderType(ArtNetService.FADER_TYPE_MASTER_KELVIN);
            masterKelvinFader.setFaderID(1);
            KelvinFader kelvinFader = KelvinFader.builder().valueKelvin(0).build();
            kelvinFader.setFaderType(ArtNetService.FADER_TYPE_KELVIN2C);
            kelvinFader.setFaderID(2);
            FixtureTemplate fixtureTemplate = new FixtureTemplate();
            fixtureTemplate.setIdName("2ChanelKelvin");
            fixtureTemplate.setFaderList(new ArrayList<>());
            fixtureTemplate.getFaderList().add(masterKelvinFader);
            fixtureTemplate.getFaderList().add(kelvinFader);
            fixtureTemplateRepo.save(fixtureTemplate);
        }
        {
            MasterRGBFader mrgbFader = MasterRGBFader.builder().valueMaster(0).build();
            mrgbFader.setFaderType(ArtNetService.FADER_TYPE_MASTER_RGB);
            mrgbFader.setFaderID(1);
            RGBFader rgbFader = RGBFader.builder().valueRed(0).valueGreen(0).valueBlue(0).build();
            rgbFader.setFaderType(ArtNetService.FADER_TYPE_MASTER_HUE2RGB);
            rgbFader.setFaderID(2);
            FixtureTemplate fixtureTemplate = new FixtureTemplate();
            fixtureTemplate.setIdName("MasterHUE2RGB");
            fixtureTemplate.setFaderList(new ArrayList<>());
            fixtureTemplate.getFaderList().add(mrgbFader);
            fixtureTemplate.getFaderList().add(rgbFader);
            fixtureTemplateRepo.save(fixtureTemplate);
        }
    }
}

