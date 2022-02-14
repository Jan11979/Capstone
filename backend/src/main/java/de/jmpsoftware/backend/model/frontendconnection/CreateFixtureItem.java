package de.jmpsoftware.backend.model.frontendconnection;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CreateFixtureItem{
    String templateName;
    String fixtureName;
    int address;
    int universe;
}