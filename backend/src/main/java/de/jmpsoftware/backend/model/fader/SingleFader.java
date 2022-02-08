package de.jmpsoftware.backend.model.fader;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SingleFader extends FaderBase{
    private int value;
}
