package de.jmpsoftware.backend.model.fader;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FaderBase {
    private int faderType;
    private int faderID;
}
