package com.eazybytes.eazyschool.repository;

import com.eazybytes.eazyschool.model.course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CourseRepository extends JpaRepository<course,Long> {

}
