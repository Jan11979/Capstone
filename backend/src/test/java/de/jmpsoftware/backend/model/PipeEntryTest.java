package de.jmpsoftware.backend.model;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class PipeEntryTest {

    @Test
    void PackedInteger()
    {
        new PipeEntry();
        PipeEntry pipeEntry = PipeEntry.builder()
                .command(0)
                .valueDMX(255)
                .channel(0)
                .universe(1)
                .build();
        new PipeEntry();
        PipeEntry newPipeEntry = PipeEntry.builder()
                .command(0)
                .valueDMX(0)
                .channel(0)
                .universe(0)
                .build();

        int packedInteger = pipeEntry.getPackedIntegerByValues();
        newPipeEntry.setValuesByPackedInteger(packedInteger);

        assertEquals(pipeEntry, newPipeEntry);

        new PipeEntry();
        pipeEntry = PipeEntry.builder().command(2).valueDMX(90).channel(23).universe(1).build();
        new PipeEntry();
        newPipeEntry = PipeEntry.builder().command(0).valueDMX(0).channel(0).universe(0).build();
        packedInteger = pipeEntry.getPackedIntegerByValues();
        newPipeEntry.setValuesByPackedInteger(packedInteger);
        assertEquals(pipeEntry, newPipeEntry);


        new PipeEntry();
        pipeEntry = PipeEntry.builder().command(111).valueDMX(0).channel(0).universe(16).build();
        new PipeEntry();
        newPipeEntry = PipeEntry.builder().command(0).valueDMX(0).channel(0).universe(0).build();
        packedInteger = pipeEntry.getPackedIntegerByValues();
        newPipeEntry.setValuesByPackedInteger(packedInteger);
        assertNotEquals(pipeEntry, newPipeEntry);
    }

    @Test
    void Command(){
        new PipeEntry();
        PipeEntry pipeEntry = PipeEntry.builder().command(1).valueDMX(255).channel(533).universe(4).build();


        assertTrue( pipeEntry.isCommand(1) );
        pipeEntry.setCommand(5);
        assertTrue( pipeEntry.isCommand(5) );
        assertFalse( pipeEntry.isCommand(1) );

    }
    @Test
    void ValuesValid(){
        new PipeEntry();
        PipeEntry pipeEntry = PipeEntry.builder().command(1).valueDMX(255).channel(511).universe(4).build();
        assertTrue( pipeEntry.getValuesValid() );
        pipeEntry.setChannel( 1 );
        assertTrue( pipeEntry.getValuesValid() );
        pipeEntry.setChannel( 555 );
        assertFalse( pipeEntry.getValuesValid() );
        pipeEntry.setChannel( 123 );
        pipeEntry.setUniverse( 5 );
        assertFalse( pipeEntry.getValuesValid() );
        pipeEntry.setUniverse( 0 );
        assertFalse( pipeEntry.getValuesValid() );
        pipeEntry.setUniverse( 1 );
        pipeEntry.setChannel( -1 );
        assertFalse( pipeEntry.getValuesValid() );
    }

    @Test
    void BytePack(){
        new PipeEntry();
        PipeEntry pipeEntry = PipeEntry.builder().command(111).valueDMX(255).channel(666).universe(1).build();
        new PipeEntry();
        PipeEntry newPipeEntry = PipeEntry.builder().command(0).valueDMX(0).channel(0).universe(0).build();
        byte[] BytePack = new byte[4];

        pipeEntry.setBytePackFromValues(BytePack);
        newPipeEntry.setValuesFromBytePack(BytePack);
        assertEquals(pipeEntry, newPipeEntry);

        new PipeEntry();
        pipeEntry = PipeEntry.builder().command(1).valueDMX(255).channel(500).universe(4).build();
        new PipeEntry();
        newPipeEntry = PipeEntry.builder().command(0).valueDMX(0).channel(0).universe(0).build();
        pipeEntry.setBytePackFromValues(BytePack);
        newPipeEntry.setValuesFromBytePack(BytePack);
        assertEquals(pipeEntry, newPipeEntry);

        new PipeEntry();
        pipeEntry = PipeEntry.builder().command(1).valueDMX(255).channel(500).universe(4).build();
        new PipeEntry();
        newPipeEntry = PipeEntry.builder().command(0).valueDMX(0).channel(0).universe(0).build();
        pipeEntry.setBytePackFromValues(BytePack);
        BytePack[0] = 10;
        newPipeEntry.setValuesFromBytePack(BytePack);
        assertNotEquals(pipeEntry, newPipeEntry);


    }
}