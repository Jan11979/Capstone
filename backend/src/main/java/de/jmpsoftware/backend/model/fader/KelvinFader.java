package de.jmpsoftware.backend.model.fader;

import lombok.*;


@EqualsAndHashCode(callSuper = true)
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class KelvinFader extends FaderBase{
    private int valueKelvin;
}
