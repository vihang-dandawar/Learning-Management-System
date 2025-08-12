package com.vikki.vikkiSchool.service;

import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import lombok.extern.slf4j.Slf4j;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;


@Service
public class RazorpayService {
    @Value("${razorpay.api.key}")
    private String RazorpayApiKey;

    @Value("${razorpay.api.secret}")
    private String RazorpayApiSecret;


    public String CreateOrder(int amount, String currency, String receiptId) throws RazorpayException {
        RazorpayClient razorpayClient = new RazorpayClient(RazorpayApiKey, RazorpayApiSecret);

        JSONObject orderRequest = new JSONObject();
        orderRequest.put("amount", amount * 100); // 100 paise = 1 INR
        orderRequest.put("currency", currency);
        orderRequest.put("receipt", receiptId); // ❗ Use key "receipt", not "receiptId"

        Order order = razorpayClient.orders.create(orderRequest);
        // ✅ Razorpay API call

//        log.info("Order Created: {}", order.toString());
        return order.toString(); // You can also return `order.get("id")` and others in a Map
    }

}
