package de.jmpsoftware.backend.model.frontendconnection;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FaderItem {
    private int type;
    private int value;
    private int valueX1;
    private int valueX2;
    private int channel;
    private int universe;
    private String fixtureName;
    private int fixtureID;

    @Override
    public String toString() {
        return "{ Type=" + type +
                ", Value=" + value +
                ", Channel=" + channel +
                ", Universe=" + universe +
                ", x1=" + valueX1 +
                ", x2=" + valueX2 +
                ", Name=" + fixtureName +
                ", ID=" + fixtureID +
                '}';
    }
}
