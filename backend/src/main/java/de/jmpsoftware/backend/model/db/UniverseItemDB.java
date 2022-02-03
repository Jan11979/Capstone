package de.jmpsoftware.backend.model.db;

import de.jmpsoftware.backend.service.ArtNetService;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.Id;


@Data
@AllArgsConstructor
@Builder
public class UniverseItemDB {
    @Id
    private String idName;
    private int universe;
    private int[] values;

    public UniverseItemDB() {
        this.values = new int[ArtNetService.SIZE_UNIVERSE];
    }

    @Override
    public String toString() {
        StringBuilder bld = new StringBuilder("UniverseItemDB{" +
                "idName='" + idName + '\'' +
                ", universe=" + universe +
                ", values= ");
        for (int i=0; i < values.length; i++ ){
            bld.append(values[i]);
            if( i > 5 )
                break;
            else
                bld.append(", ");
        }
        bld.append("}");
        return bld.toString();
    }
}
