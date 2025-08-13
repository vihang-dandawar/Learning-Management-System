package com.vikki.vikkiSchool.controller;
import com.vikki.vikkiSchool.config.SecurityUtils;
import com.vikki.vikkiSchool.model.InstructorApplication;
import com.vikki.vikkiSchool.model.InstructorApplication.Status;
import com.vikki.vikkiSchool.service.InstructorApplicationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;



@RestController
@CrossOrigin(origins = {"http://localhost:5173","https://vikkischool-lms.vercel.app"})

public class InstructorApplicationController {

    @Autowired
    private InstructorApplicationService service;

    // Student submits application — accepts JSON with userId, expertiseArea, bio
    @PostMapping("/apply")
    public ResponseEntity<?> apply(@RequestBody Map<String, String> payload) {
        try {
            // ✅ Get logged-in user's ID from SecurityContext
            Long userId = SecurityUtils.getCurrentUserId();

            String expertiseArea = payload.get("expertiseArea");
            String bio = payload.get("bio");

            InstructorApplication application = service.apply(userId, expertiseArea, bio);
            return ResponseEntity.ok(application);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Invalid request: " + e.getMessage());
        }
    }





    // Admin fetches all pending applications
    @GetMapping("/pending")
    public ResponseEntity<List<InstructorApplication>> getPendingApplications() {
        List<InstructorApplication> pendingApps = service.getPendingApplications();
        return ResponseEntity.ok(pendingApps);
    }

    // Admin approves application by ID
    @PutMapping("/{id}/approve")
    public ResponseEntity<?> approve(@PathVariable Long id) {
        try {
            InstructorApplication app = service.approveApplication(id);
            return ResponseEntity.ok(app);
        } catch (RuntimeException ex) {
            return ResponseEntity.badRequest().body(ex.getMessage());
        }
    }

    // Admin rejects application by ID
    @PutMapping("/{id}/reject")
    public ResponseEntity<?> reject(@PathVariable Long id) {
        try {
            InstructorApplication app = service.rejectApplication(id);
            return ResponseEntity.ok(app);
        } catch (RuntimeException ex) {
            return ResponseEntity.badRequest().body(ex.getMessage());
        }
    }
}

