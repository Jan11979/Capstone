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
    int type;
    int value;
    int valueX1;
    int valueX2;
    int channel;
    int universe;

    @Override
    public String toString() {
        return "{ Type=" + type +
                ", Value=" + value +
                ", Channel=" + channel +
                ", Universe=" + universe +
                ", x1=" + valueX1 +
                ", x2=" + valueX2 +
                '}';
    }
}
