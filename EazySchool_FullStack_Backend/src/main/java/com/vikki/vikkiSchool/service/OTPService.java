package com.vikki.vikkiSchool.service;

import com.vikki.vikkiSchool.model.AuthRequest;
import com.vikki.vikkiSchool.model.OTP;
import com.vikki.vikkiSchool.repository.Auth_Request_repo;
import com.vikki.vikkiSchool.repository.OTPRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.Random;

@Service
public class OTPService {

    @Autowired
    private Auth_Request_repo authRepo;

    @Autowired
    private OTPRepository otpRepository;

    @Autowired
    private EmailService emailService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public String generateAndSendOtp(String email) {
        Optional<AuthRequest> user = authRepo.findByEmail(email);
        if (user.isEmpty()) {
            return "User not found!";
        }

        // Generate 6-digit OTP with leading zeros
        String otp = String.format("%06d", new Random().nextInt(999999));
        LocalDateTime expiryTime = LocalDateTime.now().plusMinutes(5);

        // Check if OTP already exists for this email
        Optional<OTP> existingOtp = otpRepository.findByEmail(email);

        if (existingOtp.isPresent()) {
            OTP otpEntity = existingOtp.get();
            otpEntity.setOtp(otp);
            otpEntity.setExpiryTime(expiryTime);
            otpRepository.save(otpEntity);
        } else {
            OTP newOtp = new OTP(email, otp, expiryTime);
            otpRepository.save(newOtp);
        }

        // Send OTP via email
        emailService.sendOTPEmail(email, otp);

        return "OTP sent to email.";
    }


    public boolean verifyOtp(String email, String userOtp) {
        OTP otpEntity = otpRepository.findByEmail(email).orElseThrow();


        if (otpEntity.getExpiryTime().isBefore(LocalDateTime.now())) {
            throw new RuntimeException("OTP has expired");
        }

        boolean isValid = otpEntity.getOtp().equals(userOtp);
        if (isValid) {
            otpRepository.delete(otpEntity); // OTP used, now remove
        }
        return isValid;
    }


    public String resetPasswordWithOtp(String email, String otp, String newPassword) {

        // 1. Verify OTP
        boolean isValid = verifyOtp(email, otp);
        if (!isValid) {
            return "Invalid or expired OTP";
        }

        // 2. Fetch user
        Optional<AuthRequest> userOpt = authRepo.findByEmail(email);
        if (userOpt.isEmpty()) {
            return "User not found";
        }

        // 3. Update password
        AuthRequest user = userOpt.get();
        user.setPassword(passwordEncoder.encode(newPassword));
        authRepo.save(user);

        return "Password reset successful";
    }








}

