package de.jmpsoftware.backend.model.db;

import de.jmpsoftware.backend.model.fader.FaderBase;
import de.jmpsoftware.backend.model.fader.SingleFader;
import de.jmpsoftware.backend.model.frontendconnection.FaderItem;
import de.jmpsoftware.backend.service.ArtNetService;
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

    private FaderBase getFader(int faderId){
        return faderList.stream().filter(fader -> faderId == fader.getFaderID() )
                .findAny().orElse(null);
    }

    public FaderItem update(FaderItem faderItem){
        switch( faderItem.getType() )
        {
            case ArtNetService.FADER_TYPE_VALUE:
                SingleFader fader = (SingleFader)getFader(faderItem.getFixtureID());
                fader.setValue( faderItem.getValue() );
                return faderItem;
            case ArtNetService.FADER_TYPE_RGB:

                break;
        }
        return faderItem;
    }

}
