package de.jmpsoftware.backend.model.db;

import de.jmpsoftware.backend.model.fader.*;
import de.jmpsoftware.backend.model.frontendconnection.FaderItem;
import de.jmpsoftware.backend.service.ArtNetService;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;

import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FixtureDB {
    @Id
    private String idName;
    private String templateName;
    private int universe;
    private int address;
    private List<FaderBase> faderList = new ArrayList<>();

    private FaderBase getFader(int faderId) {
        return faderList.stream().filter(fader -> faderId == fader.getFaderID())
                .findAny().orElse(null);
    }

    public void switchIdToTemplateNameAndSetIdName(String name){
        setTemplateName( getIdName() );
        setIdName( name );
    }

    private double getFloatingMasterFrom255Value(int value) {
        return ((double) value) / 255.0;
    }
    private FaderItem updateFaderItemRGBMasterSettings(FaderItem faderItem, RGBFader rgbFader, double master ){
        faderItem.setValue((int) (rgbFader.getValueRed() * master));
        faderItem.setValueX1((int) (rgbFader.getValueGreen() * master));
        faderItem.setValueX2((int) (rgbFader.getValueBlue() * master));
        return faderItem;
    }
    private FaderItem updateFaderItemKelvin2ChannelSettings(FaderItem faderItem, int value, double master ){
        faderItem.setValueX1((int) ((255 - value) * master));
        faderItem.setValueX2((int) (value * master));
        faderItem.setType(ArtNetService.FADER_TYPE_KELVIN2C);
        return faderItem;
    }


    public FaderItem update(FaderItem faderItem) {
        switch (faderItem.getType()) {
            case ArtNetService.FADER_TYPE_VALUE -> {
                SingleFader singleFader = (SingleFader) getFader(faderItem.getFixtureID());
                singleFader.setValue(faderItem.getValue());
                return faderItem;
            }
            case ArtNetService.FADER_TYPE_RGB -> {
                RGBFader rgbFader = (RGBFader) getFader(faderItem.getFixtureID());
                switch (faderItem.getChannel() - address) {
                    case 0 -> rgbFader.setValueRed(faderItem.getValue());
                    case 1 -> rgbFader.setValueGreen(faderItem.getValue());
                    case 2 -> rgbFader.setValueBlue(faderItem.getValue());
                }
                return faderItem;
            }
            case ArtNetService.FADER_TYPE_MASTER_KELVIN -> {
                MasterKelvinFader mkFader = (MasterKelvinFader) getFader(faderItem.getFixtureID());
                KelvinFader kFader = (KelvinFader) getFader(faderItem.getFixtureID() + 1);
                mkFader.setValueMaster(faderItem.getValue());

                return updateFaderItemKelvin2ChannelSettings(faderItem, kFader.getValueKelvin(), getFloatingMasterFrom255Value(mkFader.getValueMaster()));
            }
            case ArtNetService.FADER_TYPE_KELVIN2C -> {
                MasterKelvinFader mkFader = (MasterKelvinFader) getFader(faderItem.getFixtureID() - 1);
                KelvinFader kFader = (KelvinFader) getFader(faderItem.getFixtureID());
                kFader.setValueKelvin(faderItem.getValue());

                return updateFaderItemKelvin2ChannelSettings(faderItem, faderItem.getValue(), getFloatingMasterFrom255Value(mkFader.getValueMaster()));
            }
            case ArtNetService.FADER_TYPE_MASTER_RGB -> {
                MasterRGBFader mrgbFader = (MasterRGBFader) getFader(faderItem.getFixtureID());
                RGBFader rgbFader = (RGBFader) getFader(faderItem.getFixtureID() + 1);
                mrgbFader.setValueMaster(faderItem.getValue());

                faderItem.setType(ArtNetService.FADER_TYPE_MASTER_HUE2RGB);
                return updateFaderItemRGBMasterSettings(faderItem, rgbFader, getFloatingMasterFrom255Value(mrgbFader.getValueMaster()));
            }
            case ArtNetService.FADER_TYPE_MASTER_HUE2RGB -> {
                MasterRGBFader mrgbFader = (MasterRGBFader) getFader(faderItem.getFixtureID() - 1);
                RGBFader rgbFader = (RGBFader) getFader(faderItem.getFixtureID());

                rgbFader.setValueRed(faderItem.getValue());
                rgbFader.setValueGreen(faderItem.getValueX1());
                rgbFader.setValueBlue(faderItem.getValueX2());

                return updateFaderItemRGBMasterSettings(faderItem, rgbFader, getFloatingMasterFrom255Value(mrgbFader.getValueMaster()));
            }
        }
        return faderItem;
    }


}
