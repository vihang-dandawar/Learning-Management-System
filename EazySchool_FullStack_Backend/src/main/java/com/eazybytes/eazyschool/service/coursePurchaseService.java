package com.eazybytes.eazyschool.service;


import com.eazybytes.eazyschool.model.AuthRequest;
import com.eazybytes.eazyschool.model.CoursePurchased;
import com.eazybytes.eazyschool.model.course;
import com.eazybytes.eazyschool.repository.Auth_Request_repo;
import com.eazybytes.eazyschool.repository.CoursePurchasedRepo;
import com.eazybytes.eazyschool.repository.CourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class coursePurchaseService {
@Autowired
    CoursePurchasedRepo coursePurchasedRepo;

    @Autowired
    private Auth_Request_repo authRequestRepo;

    @Autowired
    private CourseRepository courseRepo;

    public void savePurchase(Long userId, Long courseId, String paymentId) {
        AuthRequest user = authRequestRepo.findById(Math.toIntExact(userId))
                .orElseThrow(() -> new RuntimeException("User not found"));
        course courseEntity = courseRepo.findById(courseId)
                .orElseThrow(() -> new RuntimeException("Course not found"));

        CoursePurchased purchase = new CoursePurchased();
        purchase.setUser(user);
        purchase.setCourse(courseEntity);
        purchase.setPaymentId(paymentId);
        purchase.setPaid(true);
        purchase.setPurchasedAt(LocalDateTime.now());

        coursePurchasedRepo.save(purchase);
    }






    public boolean isCoursePurchased(String email, Long courseId) {
        AuthRequest user = authRequestRepo.findByEmail(email).orElse(null);
        if (user == null) return false;

        return coursePurchasedRepo
                .findByUserIdAndCourseId((long) user.getId(), courseId)
                .isPresent();
    }



}
