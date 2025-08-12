package com.vikki.vikkiSchool.model;

import lombok.Data;

@Data
public class CoursePurchaseRequest {
    private Long courseId;
    private Long userId; // ⬅️ Optional, only if needed
    private String razorpayPaymentId;
}
