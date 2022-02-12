package de.jmpsoftware.backend.model.fader;

import lombok.*;

@EqualsAndHashCode(callSuper = true)
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SingleFader extends FaderBase{
    private int value;
}
