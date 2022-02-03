package de.jmpsoftware.backend.model;


import de.jmpsoftware.backend.service.ArtNetService;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class DMXTable {
    private int universe;
    private int[] table;

    public DMXTable(int universe ) {
        this.universe = universe;
        table = new int[ArtNetService.SIZE_UNIVERSE];
    }

    public void setValue(int channel, int value) {
        table[channel] = value;
    }
    public int getValue(int channel) {
        return table[channel];
    }
    public int[] getValueTable() {
        return table;
    }
    public void setValueTable(int[] table) { this.table = table;}
}
