package com.vikki.vikkiSchool.service;

import com.vikki.vikkiSchool.model.AuthRequest;
import com.vikki.vikkiSchool.model.RequestUserPrinciples;
import com.vikki.vikkiSchool.repository.Auth_Request_repo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class MyUserDetailsService implements UserDetailsService {

    @Autowired
    private Auth_Request_repo authRequestRepo;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        System.out.println("Looking for user: " + username);

        Optional<AuthRequest> optionalUser = authRequestRepo.findByEmail(username);

        if (optionalUser.isEmpty()) {
            System.out.println("User not found!");
            throw new UsernameNotFoundException("User not found");
        }

        AuthRequest user = optionalUser.get();
        System.out.println("User found: " + user.getEmail() + ", password: " + user.getPassword());

        return new RequestUserPrinciples(user);
    }
}
