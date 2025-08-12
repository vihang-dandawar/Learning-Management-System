package com.vikki.vikkiSchool.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "course_purchased")
public class CoursePurchased {

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;

        // Recommended: use @ManyToOne instead of just IDs
        @ManyToOne(fetch = FetchType.LAZY)
        @JoinColumn(name = "user_id")
        private AuthRequest user;

        @ManyToOne(fetch = FetchType.LAZY)
        @JoinColumn(name = "course_id")
        @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
        private course course;

        private String paymentId;
        private boolean paid;
        private LocalDateTime purchasedAt;
}





