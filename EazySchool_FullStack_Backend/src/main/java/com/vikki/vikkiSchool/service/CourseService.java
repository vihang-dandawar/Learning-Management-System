package com.vikki.vikkiSchool.service;

import com.vikki.vikkiSchool.model.AuthRequest;
import com.vikki.vikkiSchool.model.CourseSpecification;
import com.vikki.vikkiSchool.model.course;
import com.vikki.vikkiSchool.model.video;
import com.vikki.vikkiSchool.repository.Auth_Request_repo;
import com.vikki.vikkiSchool.repository.CourseRepository;
import com.vikki.vikkiSchool.repository.VideoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.ArrayList;
import java.util.List;

@Service
public class CourseService {

    @Autowired
    CourseRepository courseRepository;

    @Autowired
    VideoRepository videoRepository;

@Autowired
    Auth_Request_repo authRequestRepo;


    public String getCurrentUsername() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return authentication.getName(); // usually email or username
    }



    public course createCourse(course course) {
        String email = getCurrentUsername();
        AuthRequest instructor = authRequestRepo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // ✅ Allow only INSTRUCTOR or ADMIN
        String role = instructor.getRoles().toString();
        if (!"INSTRUCTOR".equalsIgnoreCase(role) && !"ADMIN".equalsIgnoreCase(role)) {
            throw new RuntimeException("Only instructors or admins can create courses");
        }
        course.setInstructorName(instructor.getFullName());
        course.setInstructor(instructor);

        return courseRepository.save(course);
    }


    public video addVideoToCourse(Long courseId, video video) {
        String email = getCurrentUsername();
        AuthRequest currentUser = authRequestRepo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new RuntimeException("Course not found"));

        boolean isAdmin = "ADMIN".equalsIgnoreCase(String.valueOf(currentUser.getRoles()));
        boolean isOwner = course.getInstructor().getEmail().equals(email);

        if (!isAdmin && !isOwner) {
            throw new RuntimeException("You can only add videos to your own courses");
        }

        video.setCourse(course);
        return videoRepository.save(video);
    }



    public List<course> getAllCourses() {
        List<course> course = courseRepository.findAll();
        return new ArrayList<>(course);


    }


    public course getCourseById( Long courseId)
    {
        course course1=courseRepository.findById(courseId).orElseThrow();
        return course1;
    }


    public course updateCourseDetails(Long id, course updatedCourse) {
        String email = getCurrentUsername();
        AuthRequest currentUser = authRequestRepo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        course existingCourse = courseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Course not found"));

        // ✅ Admin can edit any course; instructor can edit only their own
        boolean isAdmin = "ADMIN".equalsIgnoreCase(currentUser.getRoles().toString());
        boolean isOwner = existingCourse.getInstructor().getEmail().equals(email);

        if (!isAdmin && !isOwner) {
            throw new RuntimeException("You can only update your own courses");
        }

        existingCourse.setTitle(updatedCourse.getTitle());
        existingCourse.setDescription(updatedCourse.getDescription());
        existingCourse.setPrice(updatedCourse.getPrice());
        existingCourse.setCategory(updatedCourse.getCategory());
        existingCourse.setImageUrl(updatedCourse.getImageUrl());

        return courseRepository.save(existingCourse);
    }



    public course deleteCourse(Long id) {
        String email = getCurrentUsername();
        AuthRequest currentUser = authRequestRepo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        course existingCourse = courseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Course not found"));

        boolean isAdmin = "ADMIN".equalsIgnoreCase(String.valueOf(currentUser.getRoles()));
        boolean isOwner = existingCourse.getInstructor().getEmail().equals(email);

        if (!isAdmin && !isOwner) {
            throw new RuntimeException("You can only delete your own courses");
        }

        courseRepository.delete(existingCourse);
        return existingCourse;
    }


    public List<course> getlatest5Courses() {
        List<course> course = courseRepository.findLast5Courses();
        return new ArrayList<>(course);


    }

    public List<course> getCourseByCategory(String category)
    {
        List<course> course=courseRepository.findBycategory(category);
        return new ArrayList<>(course);
    }


    public List<String> getCategories()
    {
        return courseRepository.findDistinctCategories();
    }


    public List<course> searchCourse(String keyword) {
        return courseRepository.findAll(CourseSpecification.searchByKeywords(keyword));
    }



public List<course> getCourseforInstructor(Authentication auth)
{
    String username = auth.getName(); // from JWT
    AuthRequest instructor = authRequestRepo.findByEmail(username)
        .orElseThrow(() -> new RuntimeException("Instructor not found"));

    List<course> courses = courseRepository.findByInstructorId(instructor.getId());
    return courses;
}







}
