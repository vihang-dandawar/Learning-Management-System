package com.vikki.vikkiSchool.repository;

import com.vikki.vikkiSchool.model.AuthRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
@Repository
public interface Auth_Request_repo  extends JpaRepository<AuthRequest,Integer> {
    Optional<AuthRequest> findByEmail(String email);
}
