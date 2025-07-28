package com.eazybytes.eazyschool.controller;

import com.eazybytes.eazyschool.model.course;
import com.eazybytes.eazyschool.model.video;
import com.eazybytes.eazyschool.service.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.Optional;

@PreAuthorize("hasRole('ADMIN')")
@CrossOrigin("*")
@RestController
public class CourseController {



    @Autowired
    CourseService courseService;




    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/createCourse")
    public ResponseEntity<course> createCourse(@RequestBody course c) {
         course Createdcourse= courseService.createCourse(c);
        return ResponseEntity.ok(Createdcourse);
    }



@PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/courses/{courseId}/videos")
    public ResponseEntity<video> addVideoToCourse(@PathVariable Long courseId, @RequestBody video video)
{
    video saved= courseService.addVideoToCourse(courseId,video);
        return ResponseEntity.ok(saved);
    }


    @PreAuthorize("hasRole('USER','ADMIN')")
@GetMapping(value = "/getAllCourses")
    public ResponseEntity<List<course>> getCourses() {
  List<course> course= courseService.getAllCourses();
    return ResponseEntity.ok(course);
}


//    @PreAuthorize("hasRole('USER','ADMIN')")
    @GetMapping(value = "/all/courses/getCourseById/{id}")
    public ResponseEntity<course> getCourses(@PathVariable("id") Long id) {
        course course= courseService.getCourseById(id);
        return ResponseEntity.ok(course);
    }


    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/courses/updateInfo/{id}")
    public ResponseEntity<course> updateCourse(@PathVariable("id") Long id,  @RequestBody course course){
        course  c=courseService.UpdateCourseDetails(id,course);
        return ResponseEntity.ok(c);
    }


    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/courses/deleteCourse/{id}")
    public ResponseEntity<course> DeleteCourseById(@PathVariable("id") Long id){
        course  c=courseService.DeleteCourse(id);
        return ResponseEntity.ok(c);
    }










}
