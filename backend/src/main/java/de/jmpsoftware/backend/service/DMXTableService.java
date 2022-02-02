package de.jmpsoftware.backend.service;


import de.jmpsoftware.backend.model.DMXTable;
import org.apache.juli.logging.Log;
import org.apache.juli.logging.LogFactory;


public class DMXTableService {
    private static final Log LOG = LogFactory.getLog(DMXTableService.class);

    private final DMXTable[] dmxTable;

    public DMXTableService() {
        this.dmxTable = new DMXTable[ArtNetService.COUNT_UNIVERSE];
        for(int i=0; i < ArtNetService.COUNT_UNIVERSE; i++ ){
            this.dmxTable[i] = new DMXTable(i);
        }
    }

    boolean checkChannelUniverseValid(int channel, int universe) {
        if ((channel < 0) || (channel > ArtNetService.SIZE_UNIVERSE))
            return false;

        return ((universe >= 0) && (universe < ArtNetService.COUNT_UNIVERSE));
    }

    public void addValueToTable(int value, int channel) {
        addValueToTable(value, channel, 0);
    }

    public void addValueToTable(int value, int channel, int universe) {
        if (checkChannelUniverseValid(channel, universe)) {
            LOG.info("Save-> Value: "+value+"  Channel: "+channel+"  Universe: "+universe);
            dmxTable[universe].setValue(channel,value);

        }
    }
    public int getValueFromTable( int channel ) {
        return getValueFromTable( channel, 0 );
    }
    public int getValueFromTable( int channel, int universe) {
        if (checkChannelUniverseValid(channel, universe)) {
            return dmxTable[universe].getValue(channel);
        }
        return -1;
    }
}
