package com.vikki.vikkiSchool.repository;

import com.vikki.vikkiSchool.model.AuthRequest;
import com.vikki.vikkiSchool.model.CoursePurchased;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CoursePurchasedRepo extends JpaRepository<CoursePurchased, Long> {
     Optional<CoursePurchased> findByUserIdAndCourseId(Long userId, Long courseId);
     List<CoursePurchased> findByUserId(Long userId);

     @Query("SELECT cp.user FROM CoursePurchased cp WHERE cp.course.id = :courseId AND cp.paid = true")
     List<AuthRequest> findPaidUsersByCourseId(@Param("courseId") Long courseId);

}