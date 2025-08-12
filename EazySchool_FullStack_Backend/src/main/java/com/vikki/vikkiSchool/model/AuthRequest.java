package com.vikki.vikkiSchool.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
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
    @GeneratedValue(strategy = GenerationType.IDENTITY) // ✅ Add this
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
        ADMIN,
        INSTRUCTOR
    }
}
