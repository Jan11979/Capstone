package de.jmpsoftware.backend.model.db;

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
public class SceneDB {
    @Id
    private String idName;
    private List<FixtureDB> fixtureList = new ArrayList<>();
}
