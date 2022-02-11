package de.jmpsoftware.backend.repo;

import de.jmpsoftware.backend.model.db.FixtureDB;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface FixtureRepo extends MongoRepository<FixtureDB,String> {
}
