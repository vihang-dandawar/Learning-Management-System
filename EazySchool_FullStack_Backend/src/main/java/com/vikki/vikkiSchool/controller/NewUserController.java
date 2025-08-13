package com.vikki.vikkiSchool.controller;

import com.vikki.vikkiSchool.model.AuthRequest;
import com.vikki.vikkiSchool.repository.Auth_Request_repo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = {"http://localhost:5173","https://vikkischool-lms.vercel.app"})
public class NewUserController {

    @Autowired
    private Auth_Request_repo authRepo;


    @Autowired
    PasswordEncoder passwordEncoder;
    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody AuthRequest user) {
        if (authRepo.findByEmail(user.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body("Email already taken");
        }

        // Optional: check role in frontend input too
        user.setRoles(AuthRequest.Role.USER);

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        authRepo.save(user);
        return ResponseEntity.ok("User registered successfully");
    }

}
