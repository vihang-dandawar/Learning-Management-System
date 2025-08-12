package com.vikki.vikkiSchool.repository;

import com.vikki.vikkiSchool.model.video;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VideoRepository extends JpaRepository<video,Long> {
    List<video> findByCourseId(Long courseId);



}
