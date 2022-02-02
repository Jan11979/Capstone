package de.jmpsoftware.backend.service;

import ch.bildspur.artnet.ArtNetClient;
import de.jmpsoftware.backend.model.PipeEntry;
import lombok.SneakyThrows;
import org.apache.juli.logging.Log;
import org.apache.juli.logging.LogFactory;

import java.io.IOException;
import java.io.PipedInputStream;
import java.time.ZonedDateTime;

public class ArtNetThread extends Thread {
    private static final Log LOG = LogFactory.getLog(ArtNetThread.class);
    public static final int ARTNET_FORCE_BROADCAST_TIME = 500;
    public static final int ACTIVE_ARTNET_DOZY_TIME = 50;
    public static final int SLEEPING_ARTNET_DOZY_TIME = 1000;


    private final ArtNetClient artnet;
    private final byte[][] dmxData = new byte[ArtNetService.COUNT_UNIVERSE][ArtNetService.SIZE_UNIVERSE];
    private final PipedInputStream pipe;
    private final PipeEntry pipeEntry;
    private final byte[] readByte = new byte[4];
    private long sendDMXTimeStamp;

    public ArtNetThread(PipedInputStream pipe) {
        this.pipe = pipe;
        this.artnet = new ArtNetClient(null);
        pipeEntry = new PipeEntry();
        for (int i = 0; i < ArtNetService.COUNT_UNIVERSE; i++)
            for (int ii = 0; ii < ArtNetService.SIZE_UNIVERSE; ii++)
                dmxData[i][ii] = 0;

        LOG.trace("ArtNetClient is created");
    }

    @SneakyThrows
    @Override
    public void run() {
        LOG.trace("ArtNetClient Thread goes run");
        this.artnet.start();
        sendDMXTimeStamp = ZonedDateTime.now().toInstant().toEpochMilli();

        //noinspection InfiniteLoopStatement
        while (true) {
            while (pipe.available() > 0) {
                if (checkPipeReadDoneCorrect(pipe.read(readByte, 0, 4))) {

                    pipeEntry.setValuesFromBytePack(readByte);

                    LOG.info("ThreadRead" + pipeEntry);

                    if(isPipeEntryCommandDMX(pipeEntry)) {

                        if (pipeEntry.getValuesValid())
                            dmxData[pipeEntry.getUniverse()][pipeEntry.getChannel()] = (byte) pipeEntry.getValueDMX();

                        if (!pipeEntry.isCommand(ArtNetService.COMMANDO_DMX_NO_SEND))
                            broadcastDmx();
                    } else {
                        if (pipeEntry.isCommand(ArtNetService.COMMAND_NO_STOP))
                            this.artnet.stop();
                        else if (pipeEntry.isCommand(ArtNetService.COMMAND_NO_START))
                            this.artnet.start();
                    }
                }
            }
            if (this.artnet.isRunning()) {
                if (isMaxTimeBetweenLastDmxSendBigger(ARTNET_FORCE_BROADCAST_TIME)) {
                    broadcastDmx();
                } else {
                    sleepThreadMillis(ACTIVE_ARTNET_DOZY_TIME);
                }
            } else {
                sleepThreadMillis(SLEEPING_ARTNET_DOZY_TIME);
            }
        }
    }

    private void sleepThreadMillis(long millis) {
        try {
            Thread.sleep(millis);
        } catch (InterruptedException e) {
            LOG.warn("Do not Panic! But Sleep did not work.");
        }
    }

    private boolean isMaxTimeBetweenLastDmxSendBigger(long millis) {
        return ((ZonedDateTime.now().toInstant().toEpochMilli()) - sendDMXTimeStamp) > millis;
    }

    boolean isPipeEntryCommandDMX(PipeEntry pipeEntry) {
        return ((pipeEntry.getCommand() >= ArtNetService.COMMAND_DMX) && (pipeEntry.getCommand() <= ArtNetService.COMMANDO_DMX_NO_SEND));

    }

    boolean checkPipeReadDoneCorrect(int pipeReadReturn) throws IOException {
        if (pipeReadReturn == -1) {
            return false;
        }
        if (pipeReadReturn != 4) {
            LOG.warn("Thread Pipe did not Read correct Data");
            LOG.info("Thread Pipe Data may be Corrupt! Cleanup All Data");
            byte[] buffer = new byte[100];
            while (pipe.available() > 0)
            {
                @SuppressWarnings("unused") int trashIt = pipe.read(buffer,0,100);
            }
            return false;
        }
        return true;
    }

    public void broadcastDmx() {
        // UNIVERSE Startet mit 1 !!!!!!!!!
        // ToDO Active Universe Handling
        artnet.broadcastDmx(0, 1, dmxData[0]);
        artnet.broadcastDmx(0, 2, dmxData[1]);
        artnet.broadcastDmx(0, 3, dmxData[2]);
        artnet.broadcastDmx(0, 4, dmxData[3]);
        sendDMXTimeStamp = ZonedDateTime.now().toInstant().toEpochMilli();
    }
}