package de.jmpsoftware.backend.model.fader;

import lombok.*;


@EqualsAndHashCode(callSuper = true)
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
