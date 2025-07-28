package com.eazybytes.eazyschool.controller;

import com.eazybytes.eazyschool.model.AuthRequest;
import com.eazybytes.eazyschool.model.OTP;
import com.eazybytes.eazyschool.model.PasswordRequest;
import com.eazybytes.eazyschool.service.EmailService;
import com.eazybytes.eazyschool.service.OTPService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;


@RestController
@CrossOrigin("*")
public class OTPController {
@Autowired
    EmailService emailService;
@Autowired
    OTPService otpService;


    @PostMapping("/auth/send-otp")
    public ResponseEntity<?> sendOtp(@RequestBody Map<String, String> request) {
        String email = request.get("email").trim(); // trim to avoid whitespace issues
        return ResponseEntity.ok(otpService.generateAndSendOtp(email));
    }

    @PostMapping("/auth/verify-otp")
    public ResponseEntity<?> verifyOtp(@RequestBody OTP otpRequest) {
        boolean isValid = otpService.verifyOtp(otpRequest.getEmail(), otpRequest.getOtp());
        if (isValid) {
            return ResponseEntity.ok("OTP verified successfully");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid or expired OTP");
        }
    }



    @PostMapping("/auth/reset-password")
    public ResponseEntity<?> resetPassword(@RequestBody PasswordRequest request) {
        String response = otpService.resetPasswordWithOtp(
                request.getEmail(),
                request.getOtp(),
                request.getPassword()
        );

        // Handle error messages with appropriate status codes
        if (response.equals("Invalid or expired OTP")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response); // 401
        } else if (response.equals("User not found")) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response); // 404
        } else {
            return ResponseEntity.ok(response); // 200 OK
        }
    }






}





