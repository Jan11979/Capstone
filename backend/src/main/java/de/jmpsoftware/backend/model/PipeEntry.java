package de.jmpsoftware.backend.model;

import de.jmpsoftware.backend.service.ArtNetService;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Objects;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PipeEntry {
    int valueDMX;
    int channel;
    int universe;
    int command;

    public void setValuesFromBytePack(byte[] bytes) {
        command = (bytes[0] & 0xff);
        valueDMX = (bytes[1] & 0xff);
        channel = (bytes[2] & 0xff);
        channel += (bytes[3] & 0x0F ) << 8;
        universe = (bytes[3] & 0xF0 ) >> 4;
    }
    public byte[] getBytePackFromValues() {
        byte[] bytes = new byte[4];
        bytes[0] = (byte)command;
        bytes[1] = (byte)valueDMX;
        bytes[2] = (byte)(channel & 0x00FF);
        bytes[3] = (byte)((channel & 0xFF00) >> 8);
        bytes[3] += (byte)((universe ) << 4);
        return bytes;
    }

    public int getPackedIntegerByValues() {
        int val = valueDMX;
        val += channel << 8;
        val += universe << 20;
        val += command << 24;
        return val;
    }

    public void setValuesByPackedInteger(int packedInteger) {
        valueDMX = (packedInteger & 0xFF);
        channel = ((packedInteger & 0x00000FFF00) >> 8);
        universe = ((packedInteger & 0x0000F00000) >> 20);
        command = (packedInteger >> 24);
    }
    

    public boolean isCommand(int checkCommand) {
        return getCommand() == checkCommand;
    }
    public boolean getValuesValid() {
        if(( channel >= ArtNetService.SIZE_UNIVERSE) || ( channel < 0))
            return false;

        return (universe < ArtNetService.COUNT_UNIVERSE) && (universe >= 0);
    }

    public int getValueDMX() {
        return valueDMX;
    }

    public void setValueDMX(int valueDMX) {
        this.valueDMX = valueDMX;
    }

    public int getChannel() {
        return channel;
    }

    public void setChannel(int channel) {
        this.channel = channel;
    }

    public int getUniverse() {
        return universe;
    }

    public void setUniverse(int universe) {
        this.universe = universe;
    }

    public int getCommand() {
        return command;
    }

    public void setCommand(int command) {
        this.command = command;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        PipeEntry pipeEntry = (PipeEntry) o;
        return valueDMX == pipeEntry.valueDMX && channel == pipeEntry.channel && universe == pipeEntry.universe && command == pipeEntry.command;
    }

    @Override
    public int hashCode() {
        return Objects.hash(valueDMX, channel, universe, command);
    }
}
