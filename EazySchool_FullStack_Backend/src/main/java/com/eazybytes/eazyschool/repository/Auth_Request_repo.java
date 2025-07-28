package com.eazybytes.eazyschool.repository;

import com.eazybytes.eazyschool.model.AuthRequest;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface Auth_Request_repo  extends JpaRepository<AuthRequest,Integer> {
    Optional<AuthRequest> findByEmail(String email);
}
