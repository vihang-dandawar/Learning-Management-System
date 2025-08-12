package com.vikki.vikkiSchool.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {



        @Autowired
        private JavaMailSender mailSender;


        public void sendOTPEmail(String toEmail, String otp) {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(toEmail);
            message.setSubject("Your OTP Code for Password Reset");
            message.setText("Your OTP is: " + otp);
            message.setFrom("vihangreddy1234@gmail.com");
            mailSender.send(message);
        }
    }


