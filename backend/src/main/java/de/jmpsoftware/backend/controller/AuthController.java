package de.jmpsoftware.backend.controller;

import de.jmpsoftware.backend.model.db.UserDataDB;
import de.jmpsoftware.backend.model.frontendconnection.LoginData;
import de.jmpsoftware.backend.repo.UserRepo;
import de.jmpsoftware.backend.service.JWTUtils;
import de.jmpsoftware.backend.service.MongoUserDetailsService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping("auth")
public class AuthController {

    @Value("${security.admin.name}")
    public String adminName;


    final AuthenticationManager authenticationManager;
    final JWTUtils jwtService;
    final UserRepo repositoryUser;
    final PasswordEncoder encoder;

    public AuthController(AuthenticationManager authenticationManager, JWTUtils jwtService, UserRepo repositoryUser, PasswordEncoder encoder) {
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
        this.repositoryUser = repositoryUser;
        this.encoder = encoder;
    }

    @PostMapping(path = "/login")
    public ResponseEntity<String> login(@RequestBody LoginData data) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(data.getName(), data.getPassword())
            );
            return ResponseEntity.ok(jwtService.createToken(new HashMap<>(), data.getName()));
        } catch (AuthenticationException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "invalid credentials");
        }
    }

    @PostMapping(path = "/signup") // User Registration
    public ResponseEntity<String> signup(@RequestBody LoginData data) {
        if( data == null)
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Wrong Login");
        if(!adminName.equals(data.getName()))
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "invalid Login");

        if (!repositoryUser.existsById(data.getName())) {
            final String encodedPassword = encoder.encode(data.getPassword());
            final UserDataDB user = UserDataDB.newUser(data.getName(), encodedPassword,
                    List.of(new SimpleGrantedAuthority(MongoUserDetailsService.AUTHORITY_ADMIN)));
            repositoryUser.insert(user);
            return ResponseEntity.ok().build();
        }
        else{
            if(!adminName.equals(data.getName()))
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "invalid Login");
        }

        throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "invalid Login");
    }
}
