package com.vikki.vikkiSchool.model;

import lombok.Data;

@Data
public class CoursePurchaseRequest {
    private Long courseId;
    private Long userId; // ⬅️ Optional, only if needed
    private String razorpayPaymentId;


    public Long getCourseId() {
        return courseId;
    }

    public void setCourseId(Long courseId) {
        this.courseId = courseId;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getRazorpayPaymentId() {
        return razorpayPaymentId;
    }

    public void setRazorpayPaymentId(String razorpayPaymentId) {
        this.razorpayPaymentId = razorpayPaymentId;
    }
}
