package de.jmpsoftware.backend.model.frontendconnection;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Builder
public class ActiveFixtureItem {
    private String name;
    private int checked;

    public ActiveFixtureItem(String name, int checked) {
        this.name = name;
        this.checked = checked;
    }
}
