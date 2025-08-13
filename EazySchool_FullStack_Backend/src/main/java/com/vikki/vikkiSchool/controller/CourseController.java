package com.vikki.vikkiSchool.controller;

import com.vikki.vikkiSchool.model.AuthRequest;
import com.vikki.vikkiSchool.model.course;
import com.vikki.vikkiSchool.model.video;
import com.vikki.vikkiSchool.service.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@CrossOrigin(origins = {"http://localhost:5173","https://vikkischool-lms.vercel.app"})

@RestController
public class CourseController {



    @Autowired
    CourseService courseService;




    @PreAuthorize("hasRole('INSTRUCTOR')")
    @PostMapping("/createCourse")
    public ResponseEntity<course> createCourse(@RequestBody course c) {
         course Createdcourse= courseService.createCourse(c);
        return ResponseEntity.ok(Createdcourse);
    }



@PreAuthorize("hasRole('INSTRUCTOR')")
    @PostMapping("/courses/{courseId}/videos")
    public ResponseEntity<video> addVideoToCourse(@PathVariable Long courseId, @RequestBody video video)
{
    video saved= courseService.addVideoToCourse(courseId,video);
        return ResponseEntity.ok(saved);
    }



@GetMapping(value = "/getAllCourses")
    public ResponseEntity<List<course>> getCourses() {
  List<course> course= courseService.getAllCourses();
    return ResponseEntity.ok(course);
}


//    @PreAuthorize("hasRole('USER','ADMIN','INSTRUCTOR')")
    @GetMapping(value = "/all/courses/getCourseById/{id}")
    public ResponseEntity<course> getCourses(@PathVariable("id") Long id) {
        course course= courseService.getCourseById(id);
        return ResponseEntity.ok(course);
    }


    @PreAuthorize("hasRole('INSTRUCTOR')")
    @PutMapping("/courses/updateInfo/{id}")
    public ResponseEntity<course> updateCourse(@PathVariable("id") Long id,  @RequestBody course course){
        course  c=courseService.updateCourseDetails(id,course);
        return ResponseEntity.ok(c);
    }


    @PreAuthorize("hasRole('INSTRUCTOR')")
    @DeleteMapping("/courses/deleteCourse/{id}")
    public ResponseEntity<course> DeleteCourseById(@PathVariable("id") Long id){
        course  c=courseService.deleteCourse(id);
        return ResponseEntity.ok(c);
    }



    @GetMapping("/courses/latest")
    public List<course> getLatestCourses() {
        return courseService.getlatest5Courses(); // assuming createdAt exists
    }

    @GetMapping("/courses/category/{category}")
    public ResponseEntity<List<course>> getCoursesByCategory(@PathVariable String category) {
        List<course> courses = courseService.getCourseByCategory(category);
        return ResponseEntity.ok(courses);
    }

    @GetMapping("/courses/getCategory")
    public ResponseEntity<List<String>> getCoursesByCategory() {
        List<String> courses = courseService.getCategories();
        return ResponseEntity.ok(courses);
    }

    @GetMapping("/courses/search/{keyword}")
    public ResponseEntity<List<course>> searchCourses(@PathVariable String keyword) {
        List<course> courses = courseService.searchCourse(keyword);
        return ResponseEntity.ok(courses);
    }

    @PreAuthorize("hasRole('INSTRUCTOR','ADMIN')")
    @GetMapping("/instructor/courses")
    public ResponseEntity<List<course>> getInstructorCourses(Authentication authentication) {
        List<course> courses=courseService.getCourseforInstructor(authentication);
        return ResponseEntity.ok(courses);
    }


















}
