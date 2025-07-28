package com.eazybytes.eazyschool.controller;

import com.eazybytes.eazyschool.model.video;
import com.eazybytes.eazyschool.service.CourseService;
import com.eazybytes.eazyschool.service.videoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.Optional;
@CrossOrigin("*")
@RestController
public class videoController {
    @Autowired
    CourseService courseService;

    @Autowired
    videoService videoService;


    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/courses/video/GetInfo/{id}")
    public ResponseEntity<video> getVideoInfo(@PathVariable("id") Long id){
        video  c=videoService.getVideoDetailsById(id);
        return ResponseEntity.ok(c);
    }





    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/courses/video/updateInfo/{id}")
    public ResponseEntity<video> updateVideoInfo(@PathVariable("id") Long id,  @RequestBody video video){
        video  c=videoService.UpdateVideoDetails(id,video);
        return ResponseEntity.ok(c);
    }


    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/courses/video/deleteVideo/{id}")
    public ResponseEntity<String> DeleteVideo(@PathVariable("id") Long id){
        String   response=videoService.videoDelete(id);
        return ResponseEntity.ok(response);
    }



    // VideoController.java
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    @GetMapping("/videos/getLink/{videoId}")
    public ResponseEntity<String> getVideoUrl(@PathVariable Long videoId, Principal principal) {
        Optional<String> videoUrl = videoService.getVideoUrl(videoId);

        if (videoUrl.isPresent()) {
            return ResponseEntity.ok(videoUrl.get());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Video not found");
        }
    }



}
