package com.eazybytes.eazyschool.service;

import com.eazybytes.eazyschool.model.video;
import com.eazybytes.eazyschool.repository.CoursePurchasedRepo;
import com.eazybytes.eazyschool.repository.VideoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class videoService {
    @Autowired
    VideoRepository videoRepository;


@Autowired
    CoursePurchasedRepo coursePurchasedRepo;


    public video getVideoDetailsById(long id)
    {
        video v1=videoRepository.findById(id).orElseThrow();
        return v1;
    }



    public video UpdateVideoDetails(long id, video video)
    {
        video v1=videoRepository.findById(id).orElseThrow();

        v1.setTitle(video.getTitle());
        v1.setDuration(video.getDuration());
        v1.setVideoUrl(video.getVideoUrl());
        videoRepository.save(v1);


        return v1;
    }


    public String videoDelete(long id)
    {
        video v1=videoRepository.findById(id).orElseThrow();
        videoRepository.delete(v1);
        return "video Deleted Successfully";
    }


    public Optional<String> getVideoUrl(Long videoId) {
        return videoRepository.findById(videoId)
                .map(video::getVideoUrl); // assuming Video class has getVideoUrl()
    }



    public Optional<String> getProtectedVideoUrl(Long videoId, Long userId) {
        video videoObj = videoRepository.findById(videoId).orElseThrow();

        Long courseId = videoObj.getCourse().getId(); // assuming each video is linked to a course

        boolean hasAccess = coursePurchasedRepo
                .findByUserIdAndCourseId(userId, courseId)
                .isPresent();

        if (hasAccess) {
            return Optional.ofNullable(videoObj.getVideoUrl());
        } else {
            return Optional.empty(); // or throw AccessDeniedException
        }
    }







}
