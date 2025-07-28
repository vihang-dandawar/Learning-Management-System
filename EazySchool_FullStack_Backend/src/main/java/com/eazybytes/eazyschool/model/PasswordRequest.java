package com.eazybytes.eazyschool.model;

import lombok.Data;

@Data
public class PasswordRequest {
    private String email;
    private String otp;
    private String password;
}
