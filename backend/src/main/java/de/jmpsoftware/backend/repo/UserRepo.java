package de.jmpsoftware.backend.repo;

import de.jmpsoftware.backend.model.db.UserDataDB;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepo extends MongoRepository<UserDataDB, String> {
    Optional<UserDataDB> findByUsername(String name) throws UsernameNotFoundException;
}
