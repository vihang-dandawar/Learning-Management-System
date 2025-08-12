package com.vikki.vikkiSchool.repository;

import com.vikki.vikkiSchool.model.course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.List;

@Repository
public interface CourseRepository extends JpaRepository<course, Long>, JpaSpecificationExecutor<course> {
    @Query(value = "SELECT * FROM course ORDER BY id DESC LIMIT 5", nativeQuery = true)
    List<course> findLast5Courses();

    List<course> findBycategory(String category);

    @Query("SELECT DISTINCT c.category FROM course c")
    List<String> findDistinctCategories();

    List<course> findByTitleContainingIgnoreCase(String keyword);

    List<course> findByInstructorId(Long instructorId);
}










