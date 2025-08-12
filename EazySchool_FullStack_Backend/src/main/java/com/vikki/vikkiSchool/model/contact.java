package com.vikki.vikkiSchool.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Entity
@Data
@Table(name="contact_details")
public class contact {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @NotBlank(message="Name must not be blank")
    @Size(min=3, message="Name must be at least 3 characters long")
    private String name;

    @NotBlank(message="Mobile number must not be blank")
    @Pattern(regexp="(^$|[0-9]{10})",message = "Mobile number must be 10 digits")
    private String mobileNum;

    @NotBlank(message="Email must not be blank")
    @Email(message = "Please provide a valid email address" )
    private String email;

    @NotBlank(message="Subject must not be blank")
    @Size(min=5, message="Subject must be at least 5 characters long")
    private String subject;

    @NotBlank(message="Message must not be blank")
    @Size(min=10, message="Message must be at least 10 characters long")
    private String message;


    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public @NotBlank(message = "Name must not be blank") @Size(min = 3, message = "Name must be at least 3 characters long") String getName() {
        return name;
    }

    public void setName(@NotBlank(message = "Name must not be blank") @Size(min = 3, message = "Name must be at least 3 characters long") String name) {
        this.name = name;
    }

    public @NotBlank(message = "Mobile number must not be blank") @Pattern(regexp = "(^$|[0-9]{10})", message = "Mobile number must be 10 digits") String getMobileNum() {
        return mobileNum;
    }

    public void setMobileNum(@NotBlank(message = "Mobile number must not be blank") @Pattern(regexp = "(^$|[0-9]{10})", message = "Mobile number must be 10 digits") String mobileNum) {
        this.mobileNum = mobileNum;
    }

    public @NotBlank(message = "Email must not be blank") @Email(message = "Please provide a valid email address") String getEmail() {
        return email;
    }

    public void setEmail(@NotBlank(message = "Email must not be blank") @Email(message = "Please provide a valid email address") String email) {
        this.email = email;
    }

    public @NotBlank(message = "Subject must not be blank") @Size(min = 5, message = "Subject must be at least 5 characters long") String getSubject() {
        return subject;
    }

    public void setSubject(@NotBlank(message = "Subject must not be blank") @Size(min = 5, message = "Subject must be at least 5 characters long") String subject) {
        this.subject = subject;
    }

    public @NotBlank(message = "Message must not be blank") @Size(min = 10, message = "Message must be at least 10 characters long") String getMessage() {
        return message;
    }

    public void setMessage(@NotBlank(message = "Message must not be blank") @Size(min = 10, message = "Message must be at least 10 characters long") String message) {
        this.message = message;
    }
}
