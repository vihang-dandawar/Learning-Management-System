package com.vikki.vikkiSchool.controller;

import com.vikki.vikkiSchool.model.CoursePurchased;
import com.vikki.vikkiSchool.model.PaymentOrderRequest;
import com.vikki.vikkiSchool.service.RazorpayService;
import com.vikki.vikkiSchool.service.coursePurchaseService;
import com.razorpay.RazorpayException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("api/payments")
public class PaymentController {
@Autowired
    RazorpayService razorpayService;

@Autowired
    coursePurchaseService coursePurchaseService;



    @PostMapping("/create-order")
    public ResponseEntity<Map<String, Object>> createOrder(@RequestBody PaymentOrderRequest orderRequest) throws RazorpayException {
        String orderStr = razorpayService.CreateOrder(
                orderRequest.getAmount(),
                orderRequest.getCurrency(),
                orderRequest.getReceiptId());

        JSONObject orderJson = new JSONObject(orderStr);

        Map<String, Object> response = new HashMap<>();
        response.put("id", orderJson.get("id"));
        response.put("amount", orderJson.get("amount"));
        response.put("currency", orderJson.get("currency"));
        response.put("receipt", orderJson.get("receipt"));
        response.put("status", orderJson.get("status"));

        return ResponseEntity.ok(response);
    }





    @PostMapping("/confirm-payment")
    public ResponseEntity<String> confirmPayment(@RequestBody CoursePurchased request) {
        coursePurchaseService.savePurchase(
                (long) request.getUser().getId(),
                request.getCourse().getId(),
                request.getPaymentId()
        );
        return ResponseEntity.ok("Purchase saved");
    }


}
