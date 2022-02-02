package de.jmpsoftware.backend.service;

import de.jmpsoftware.backend.model.PipeEntry;
import org.junit.jupiter.api.Test;

import java.io.IOException;
import java.io.PipedInputStream;

import static org.junit.jupiter.api.Assertions.*;

class ArtNetThreadTest {

    @Test
    void checkPipeReadDoneCorrectTest() throws IOException {

        //Given
        ArtNetThread myThread = new ArtNetThread(new PipedInputStream());

        //WHEN
        boolean retBool = myThread.checkPipeReadDoneCorrect( 4);
        //THEN
        assertTrue(retBool);

        //WHEN
        retBool = myThread.checkPipeReadDoneCorrect( -1);
        //THEN
        assertFalse(retBool);

        //WHEN
        retBool = myThread.checkPipeReadDoneCorrect( 1);
        //THEN
        assertFalse(retBool);
    }

    @Test
    void isPipeEntryCommandDMXTest(){
        //Given
        ArtNetThread myThread = new ArtNetThread(new PipedInputStream());

        //WHEN
        PipeEntry pipeEntry = PipeEntry.builder().command(ArtNetService.COMMAND_DMX).valueDMX(0).channel(0).universe(0).build();
        boolean retBool = myThread.isPipeEntryCommandDMX( pipeEntry);
        //THEN
        assertTrue(retBool);

        //WHEN
        pipeEntry = PipeEntry.builder().command(ArtNetService.COMMANDO_DMX_NO_SEND).valueDMX(0).channel(0).universe(0).build();
        retBool = myThread.isPipeEntryCommandDMX( pipeEntry);
        //THEN
        assertTrue(retBool);

        //WHEN
        pipeEntry = PipeEntry.builder().command(ArtNetService.COMMAND_NO_START).valueDMX(0).channel(0).universe(0).build();
        retBool = myThread.isPipeEntryCommandDMX( pipeEntry);
        //THEN
        assertFalse(retBool);
        //WHEN
        pipeEntry = PipeEntry.builder().command(ArtNetService.COMMAND_NO_STOP).valueDMX(0).channel(0).universe(0).build();
        retBool = myThread.isPipeEntryCommandDMX( pipeEntry);
        //THEN
        assertFalse(retBool);
    }

}