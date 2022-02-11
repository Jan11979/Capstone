package de.jmpsoftware.backend.model.fader;

import lombok.*;

@EqualsAndHashCode(callSuper = true)
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class RGBFader extends FaderBase{
    private int valueRed;
    private int valueGreen;
    private int valueBlue;
}
