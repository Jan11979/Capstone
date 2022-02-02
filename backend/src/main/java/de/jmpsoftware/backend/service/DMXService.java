package de.jmpsoftware.backend.service;

import de.jmpsoftware.backend.model.frontendconnection.FaderItem;
import org.springframework.stereotype.Service;

@Service
public class DMXService {

    private final DMXTableService dmxTableService;

    public DMXService() {
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

}
