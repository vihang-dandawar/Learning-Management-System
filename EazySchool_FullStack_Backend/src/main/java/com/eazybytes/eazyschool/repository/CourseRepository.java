package com.eazybytes.eazyschool.repository;

import com.eazybytes.eazyschool.model.course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CourseRepository extends JpaRepository<course,Long> {
    @Query(value = "SELECT * FROM course ORDER BY id DESC LIMIT 5", nativeQuery = true)
    List<course> findLast5Courses();

}
