package de.jmpsoftware.backend.model.frontendconnection;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Builder
public class ActiveFixtureList {
    private String name;
    private int checked;

    public ActiveFixtureList(String name, int checked) {
        this.name = name;
        this.checked = checked;
    }
}
