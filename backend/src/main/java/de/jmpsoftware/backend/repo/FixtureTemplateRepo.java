package de.jmpsoftware.backend.repo;


import de.jmpsoftware.backend.model.db.FixtureTemplate;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FixtureTemplateRepo extends MongoRepository<FixtureTemplate,String> {
    FixtureTemplate findByIdName(String name);
}
