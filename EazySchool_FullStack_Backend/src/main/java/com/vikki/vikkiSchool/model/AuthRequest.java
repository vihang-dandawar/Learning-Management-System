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










    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Role getRoles() {
        return Roles;
    }

    public void setRoles(Role roles) {
        Roles = roles;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
