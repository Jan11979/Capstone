package de.jmpsoftware.backend.repo;

import de.jmpsoftware.backend.model.db.SceneDB;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface SceneRepo extends MongoRepository<SceneDB,String> {
    SceneDB findByIdName(String sceneName);
}