package de.jmpsoftware.backend.model.frontendconnection;

import de.jmpsoftware.backend.service.ArtNetService;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DbCommandItem {
    private String name;
    private int universe;

    public boolean checkValidData(){
        if( name == null )
            return false;
        return ((name.length() > 0 ) && ( universe >= 0 ) && ( universe < ArtNetService.COUNT_UNIVERSE ));
    }
}
