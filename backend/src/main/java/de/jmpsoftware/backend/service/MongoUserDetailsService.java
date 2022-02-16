package de.jmpsoftware.backend.service;


import de.jmpsoftware.backend.repo.UserRepo;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class MongoUserDetailsService implements UserDetailsService {

    public static final String AUTHORITY_USER = "AUTHORITY_USER";
    public static final String AUTHORITY_ADMIN = "AUTHORITY_ADMIN";

    private final UserRepo repository;

    public MongoUserDetailsService(UserRepo repository) {
        this.repository = repository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        return repository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User " + username + " not found") );
    }
}