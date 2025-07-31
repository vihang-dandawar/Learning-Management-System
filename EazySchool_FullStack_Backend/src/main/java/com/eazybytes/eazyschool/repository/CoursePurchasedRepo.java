package com.eazybytes.eazyschool.repository;

import com.eazybytes.eazyschool.model.CoursePurchased;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CoursePurchasedRepo extends JpaRepository<CoursePurchased, Long> {
     Optional<CoursePurchased> findByUserIdAndCourseId(Long userId, Long courseId);

}