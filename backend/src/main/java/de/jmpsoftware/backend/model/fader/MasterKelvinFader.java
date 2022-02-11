package de.jmpsoftware.backend.model.fader;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MasterKelvinFader extends FaderBase{
    private int valueMaster;
    private int valueKelvin;
    private int minKelvin;
    private int maxKelvin;
}
