package com.vikki.vikkiSchool.model;

import lombok.Data;

@Data
public class PaymentOrderRequest {
    private int amount;
    private String currency;
    private String receiptId;
}
