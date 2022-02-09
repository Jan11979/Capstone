package de.jmpsoftware.backend.service;

import de.jmpsoftware.backend.model.DMXTable;
import de.jmpsoftware.backend.model.PipeEntry;
import de.jmpsoftware.backend.model.frontendconnection.FaderItem;

import java.io.IOException;
import java.io.PipedInputStream;
import java.io.PipedOutputStream;


public class ArtNetService {
    public static final int SIZE_UNIVERSE = 512;
    public static final int COUNT_UNIVERSE = 4; // Only 2 Bits

    //                  CommandArtNetDmx < 16!! Only 4 Bits
    public static final int COMMAND_DMX = 0;         // DO Not change this Value
    public static final int COMMANDO_DMX_NO_SEND = 1; // DO Not change this Value vor using 1 or less in functions

    public static final int COMMAND_NO_START = 14;
    public static final int COMMAND_NO_STOP = 15;


    public static final int FADER_TYPE_EMPTY = 0;
    public static final int FADER_TYPE_VALUE = 1;
    public static final int FADER_TYPE_HUE = 2;
    public static final int FADER_TYPE_KELVIN = 3;
    public static final int FADER_TYPE_RGB = 4;
    public static final int FADER_TYPE_MASTER_HUE = 5;
    public static final int FADER_TYPE_MASTER_HUE2RGB = 6;
    public static final int FADER_TYPE_MASTER_KELVIN = 7;



    private final PipedInputStream inPipe;
    private final PipedOutputStream outPipe;
    private final PipeEntry pipeEntry;
    private final ArtNetThread artNetThread;

    public ArtNetService() throws IOException {
        inPipe = new PipedInputStream();
        outPipe = new PipedOutputStream(inPipe);
        pipeEntry = new PipeEntry();
        artNetThread = new ArtNetThread(inPipe);

        artNetThread.start();
    }

    private void setPipeEntry(int command, FaderItem faderItem) {
        pipeEntry.setCommand(command);
        pipeEntry.setValueDMX(faderItem.getValue());
        pipeEntry.setChannel(faderItem.getChannel());
        pipeEntry.setUniverse(faderItem.getUniverse());
    }
    private void setPipeEntry(int command, int value, int channel, int universe) {
        pipeEntry.setCommand(command);
        pipeEntry.setValueDMX(value);
        pipeEntry.setChannel(channel);
        pipeEntry.setUniverse(universe);
    }

    public void broadcastValue(FaderItem faderItem) throws IOException {

        /**
         * Only Type 1,4
         * All other will be Ignored "at the moment"
         */
        switch (faderItem.getType()) {
            case FADER_TYPE_VALUE, FADER_TYPE_RGB -> {
                setPipeEntry(COMMAND_DMX, faderItem);
                outPipe.write( pipeEntry.getBytePackFromValues() );
            }
        }
    }

    public void broadcastUniverse(DMXTable dmxTabe) throws IOException {
        for(int i=0; i < ArtNetService.SIZE_UNIVERSE; i++ ){
            setPipeEntry(COMMANDO_DMX_NO_SEND, dmxTabe.getValue(i), i, dmxTabe.getUniverse() );
            outPipe.write( pipeEntry.getBytePackFromValues() );
        }
    }

}
