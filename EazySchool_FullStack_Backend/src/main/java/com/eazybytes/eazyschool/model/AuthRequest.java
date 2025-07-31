package com.eazybytes.eazyschool.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity

public class AuthRequest {
    @Id
//    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;

    private String password;
@Enumerated(EnumType.STRING)
@Column(name="roles")
    private Role Roles;

    private String fullName;
    private int age;
    @Column(name="email",unique = true )
    private String email;

    public  enum Role {
        USER,
        ADMIN
    }
}
