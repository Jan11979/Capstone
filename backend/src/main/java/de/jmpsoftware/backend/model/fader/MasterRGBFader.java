package de.jmpsoftware.backend.model.fader;

import lombok.*;


@EqualsAndHashCode(callSuper = true)
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MasterRGBFader extends FaderBase{
    private int valueMaster;
}