package com.vikki.vikkiSchool.service;

import com.vikki.vikkiSchool.config.SecurityUtils;
import com.vikki.vikkiSchool.repository.Auth_Request_repo;
import com.vikki.vikkiSchool.repository.InstructorApplicationRepo;
import org.springframework.stereotype.Service;

import com.vikki.vikkiSchool.model.InstructorApplication;
import com.vikki.vikkiSchool.model.InstructorApplication.Status;
import com.vikki.vikkiSchool.model.AuthRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
@Service
public class InstructorApplicationService {

    @Autowired
    private InstructorApplicationRepo applicationRepository;

    @Autowired
    private Auth_Request_repo authRequestRepository;





    // Submit new application
    public InstructorApplication apply(Long userId, String expertiseArea, String bio) {
        if (applicationRepository.existsByAuthRequestId(userId)) {
            throw new RuntimeException("You have already submitted an application.");
        }

        AuthRequest user = authRequestRepository.findById(Math.toIntExact(userId))
                .orElseThrow(() -> new RuntimeException("User not found"));

        InstructorApplication app = new InstructorApplication();
        app.setAuthRequest(user);
        app.setExpertiseArea(expertiseArea);
        app.setBio(bio);
        app.setStatus(Status.PENDING);
        app.setSubmittedAt(LocalDateTime.now());

        return applicationRepository.save(app);
    }









    // Get all pending applications for admin
    public List<InstructorApplication> getPendingApplications() {
        return applicationRepository.findByStatus(Status.PENDING);
    }





    // Approve application: change status + update user role
    @Transactional
    public InstructorApplication approveApplication(Long applicationId) {
        InstructorApplication application = applicationRepository.findById(applicationId)
                .orElseThrow(() -> new RuntimeException("Application not found"));

        application.setStatus(Status.APPROVED);
        applicationRepository.save(application);

        // Update user role to INSTRUCTOR
        AuthRequest user = application.getAuthRequest();
        user.setRoles(AuthRequest.Role.INSTRUCTOR);
        authRequestRepository.save(user);

        return application;
    }





    // Reject application
    public InstructorApplication rejectApplication(Long applicationId) {
        InstructorApplication application = applicationRepository.findById(applicationId)
                .orElseThrow(() -> new RuntimeException("Application not found"));

        application.setStatus(Status.REJECTED);
        return applicationRepository.save(application);
    }





}
