package de.jmpsoftware.backend.repo;


import de.jmpsoftware.backend.model.db.FixtureTamplate;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FixtureTamplateRepo extends MongoRepository<FixtureTamplate,String> {
}
