package de.jmpsoftware.backend.service;

import de.jmpsoftware.backend.model.PipeEntry;
import de.jmpsoftware.backend.model.frontendconnection.FaderItem;

import java.io.IOException;
import java.io.PipedInputStream;
import java.io.PipedOutputStream;

public class ArtNetService {
    public static final int SIZE_UNIVERSE = 512;
    public static final int COUNT_UNIVERSE = 4;

    //                      CommandArtNetDmx < 16!!
    public static final int COMMAND_DMX = 0;         // DO Not change this Value
    public static final int COMMANDO_DMX_NO_SEND = 1; // DO Not change this Value


    public static final int COMMAND_NO_START = 14;
    public static final int COMMAND_NO_STOP = 15;


    final PipedInputStream inPipe;
    PipedOutputStream outPipe;
    PipeEntry pipeEntry;
    ArtNetThread artNetThread;

    public ArtNetService() throws IOException {
        inPipe = new PipedInputStream();
        outPipe = new PipedOutputStream(inPipe);
        pipeEntry = new PipeEntry();
        artNetThread = new ArtNetThread( inPipe );

        artNetThread.start();
    }

    public void broadcastValue(FaderItem faderItem) throws IOException {

        /**
         * Only Type 1
         * All other will be Ignored "at the moment"
         */
        if(faderItem.getType() == 1)
        {
            pipeEntry.setCommand(COMMAND_DMX);
            pipeEntry.setValueDMX( faderItem.getValue() );
            pipeEntry.setChannel( faderItem.getChannel() );
            pipeEntry.setUniverse( faderItem.getUniverse() );

            byte[] sendeByte = new byte[4];
            pipeEntry.setBytePackFromValues(sendeByte);
            outPipe.write (sendeByte);
        }
    }




}
