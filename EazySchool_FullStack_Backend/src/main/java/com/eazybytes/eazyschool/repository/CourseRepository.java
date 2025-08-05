package com.eazybytes.eazyschool.repository;

import com.eazybytes.eazyschool.model.course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
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

//    // In CourseRepository.java
//    @Query("SELECT c FROM course c WHERE " +
//            "LOWER(c.title) LIKE %:kw1% OR " +
//            "LOWER(c.description) LIKE %:kw1% OR " +
//            "LOWER(c.instructor) LIKE %:kw1% OR " +
//            "LOWER(c.title) LIKE %:kw2% OR " +
//            "LOWER(c.description) LIKE %:kw2% OR " +
//            "LOWER(c.instructor) LIKE %:kw2% OR " +
//            "LOWER(c.title) LIKE %:kw3% OR " +
//            "LOWER(c.description) LIKE %:kw3% OR " +
//            "LOWER(c.instructor) LIKE %:kw3%")
//    List<course> searchCoursesFlexible(@Param("kw1") String kw1,
//                                       @Param("kw2") String kw2,
//                                       @Param("kw3") String kw3);











}
