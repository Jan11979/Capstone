package de.jmpsoftware.backend.model.db;

import de.jmpsoftware.backend.service.ArtNetService;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UniverseItemDB {
    @Id
    private String idName;
    private int universe;
    private int[] values = new int[ArtNetService.SIZE_UNIVERSE];
}
