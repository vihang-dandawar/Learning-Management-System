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


        public Long getId() {
                return id;
        }

        public void setId(Long id) {
                this.id = id;
        }

        public AuthRequest getUser() {
                return user;
        }

        public void setUser(AuthRequest user) {
                this.user = user;
        }

        public com.vikki.vikkiSchool.model.course getCourse() {
                return course;
        }

        public void setCourse(com.vikki.vikkiSchool.model.course course) {
                this.course = course;
        }

        public String getPaymentId() {
                return paymentId;
        }

        public void setPaymentId(String paymentId) {
                this.paymentId = paymentId;
        }

        public boolean isPaid() {
                return paid;
        }

        public void setPaid(boolean paid) {
                this.paid = paid;
        }

        public LocalDateTime getPurchasedAt() {
                return purchasedAt;
        }

        public void setPurchasedAt(LocalDateTime purchasedAt) {
                this.purchasedAt = purchasedAt;
        }
}





