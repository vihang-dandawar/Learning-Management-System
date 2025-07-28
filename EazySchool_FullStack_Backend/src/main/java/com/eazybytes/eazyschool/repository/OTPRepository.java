package com.eazybytes.eazyschool.repository;

import com.eazybytes.eazyschool.model.OTP;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.Optional;

@Repository
public interface OTPRepository  extends JpaRepository<OTP,Long> {
    Optional<OTP> findByEmail(String email);

    void deleteByExpiryTimeBefore(LocalDateTime now);
}
