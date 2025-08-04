package com.eazybytes.eazyschool.controller;

import com.eazybytes.eazyschool.model.AuthRequest;
import com.eazybytes.eazyschool.model.CoursePurchaseRequest;
import com.eazybytes.eazyschool.model.CoursePurchased;
import com.eazybytes.eazyschool.repository.Auth_Request_repo;
import com.eazybytes.eazyschool.repository.CoursePurchasedRepo;
import com.eazybytes.eazyschool.service.coursePurchaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("*")
public class CoursePurchasedController {
@Autowired
    coursePurchaseService coursePurchaseService;

@Autowired
    Auth_Request_repo authRequestRepo;

@Autowired
    CoursePurchasedRepo coursePurchasedRepo;

    @GetMapping("/isCoursePurchased")
    public ResponseEntity<Boolean> isCoursePurchased(
            @RequestParam Long courseId,

            Principal principal) {

        if (principal == null) {
            System.out.println("Principal is null → Unauthorized request");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        String email = principal.getName(); // from JWT "sub"
        System.out.println("Authenticated user: " + email);

        boolean isPurchased = coursePurchaseService.isCoursePurchased(email, courseId);
        return ResponseEntity.ok(isPurchased);
    }





    @PreAuthorize("hasRole('USER')")
    @PostMapping("/api/course-purchase")
    public ResponseEntity<String> purchaseCourse(
            @RequestBody CoursePurchaseRequest request,
            Principal principal) {

        if (principal == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized");
        }

        String email = principal.getName();
        Optional<AuthRequest> user = authRequestRepo.findByEmail(email);
        if (user.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }

        coursePurchaseService.savePurchase(
                user.get().getId(),
                request.getCourseId(),
                request.getRazorpayPaymentId()
        );

        return ResponseEntity.ok("Purchase recorded successfully.");
    }

    @PreAuthorize("hasRole('USER')")
    @GetMapping("/purchased-courses")
    public ResponseEntity<List<CoursePurchased>> getCoursesPurchased(
            @AuthenticationPrincipal UserDetails userDetails) {

        String username = userDetails.getUsername();

        // Fetch user ID from username
        Long userId = authRequestRepo.findByEmail(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"))
                .getId();

        List<CoursePurchased> courses = coursePurchasedRepo.findByUserId((userId));
        if (courses.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

    return ResponseEntity.ok(courses);
  }












}
