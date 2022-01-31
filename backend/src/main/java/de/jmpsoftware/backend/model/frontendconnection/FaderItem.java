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
    int channel;
    int universe;

    @Override
    public String toString() {
        return "{ t=" + type +
                ", v=" + value +
                ", c=" + channel +
                ", u=" + universe + '}';
    }
}
