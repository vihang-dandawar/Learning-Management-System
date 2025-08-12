package com.vikki.vikkiSchool.controller;

import com.vikki.vikkiSchool.model.AuthRequest;
import com.vikki.vikkiSchool.repository.Auth_Request_repo;
import com.vikki.vikkiSchool.service.JWTService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class loginController {

    @Autowired
    private AuthenticationManager authManager;

    @Autowired
    private Auth_Request_repo authRepo;

    @Autowired
    private JWTService jwtService;

    @PostMapping("/loginUser")
    public ResponseEntity<?> login(@RequestBody AuthRequest request) {
        try {
            // Step 1: Authenticate user
            Authentication auth = authManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
            );
            System.out.println("Auth creds are"+request);

            // Step 2: Get user details from DB
            AuthRequest user = authRepo.findByEmail(request.getEmail()).orElse(null);
            if (user == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not foundddd");
            }

            String role = user.getRoles().name();
            String newRole=role.replace("ROLE_","");

            long userid=user.getId();
            System.out.println("User id of user is"+user.getId());

            // e.g., ROLE_ADMIN or ROLE_USER
            String token = jwtService.generateToken(newRole,user.getId(),user.getEmail()); // ✅ generate token
           // String token = jwtService.generateToken(user.getUsername(), role);
            System.out.println("Generated Token: " + token); // ✅ debug

            // Step 3: Send back token and role
            return ResponseEntity.ok(Map.of(
                    "message", "Login successful",
                    "token", token,
                    "role", newRole,
                    "userId",userid
            ));

        } catch (AuthenticationException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }
    }
}
