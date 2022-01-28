package de.jmpsoftware.backend.repo;

import de.jmpsoftware.backend.model.Something;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SomethingRepo extends MongoRepository<Something,String> {
}
