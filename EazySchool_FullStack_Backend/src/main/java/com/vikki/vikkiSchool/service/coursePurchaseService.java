package com.vikki.vikkiSchool.service;


import com.vikki.vikkiSchool.model.AuthRequest;
import com.vikki.vikkiSchool.model.CoursePurchased;
import com.vikki.vikkiSchool.model.course;
import com.vikki.vikkiSchool.repository.Auth_Request_repo;
import com.vikki.vikkiSchool.repository.CoursePurchasedRepo;
import com.vikki.vikkiSchool.repository.CourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

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


    public List<AuthRequest> getEnrolledStudents(Long courseId) {
        return coursePurchasedRepo.findPaidUsersByCourseId(courseId);
    }





}
