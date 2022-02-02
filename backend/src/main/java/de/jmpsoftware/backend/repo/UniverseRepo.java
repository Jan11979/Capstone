package de.jmpsoftware.backend.repo;

import de.jmpsoftware.backend.model.db.UniverseItemDB;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface UniverseRepo extends MongoRepository<UniverseItemDB,String> {
}