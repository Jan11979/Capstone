package de.jmpsoftware.backend.model.db;

import de.jmpsoftware.backend.model.fader.FaderBase;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;

import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FixtureDB {
    @Id
    private String idName;
    private int universe;
    private int address;
    private List<FaderBase> faderList = new ArrayList<>();
}