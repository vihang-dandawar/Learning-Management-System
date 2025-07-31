package com.eazybytes.eazyschool.service;

import com.eazybytes.eazyschool.model.course;
import com.eazybytes.eazyschool.model.video;
import com.eazybytes.eazyschool.repository.CourseRepository;
import com.eazybytes.eazyschool.repository.VideoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class CourseService {

    @Autowired
    CourseRepository courseRepository;

    @Autowired
    VideoRepository videoRepository;

    public course createCourse(@RequestBody course course) {
        course saved = courseRepository.save(course);
        return saved;
    }


    public video addVideoToCourse(@PathVariable Long courseId, @RequestBody video video) {
        course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new RuntimeException("Course not found"));

        video.setCourse(course);
        video saved = videoRepository.save(video);
        return saved;
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


   public course  UpdateCourseDetails(Long id,course course){
       course c1=courseRepository.findById(id).orElseThrow();
       c1.setImageUrl(course.getImageUrl());
       c1.setCategory(course.getCategory());
       c1.setDescription(course.getDescription());
       c1.setInstructor(course.getInstructor());
       c1.setPrice(course.getPrice());
       c1.setTitle(course.getTitle());
       courseRepository.save(c1);
       return c1;

   }


   public course DeleteCourse(long id)
   {
       course c1=courseRepository.findById(id).orElseThrow();
       courseRepository.delete(c1);
       return c1;

   }







}
