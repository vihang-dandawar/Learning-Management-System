package com.vikki.vikkiSchool.repository;
import com.vikki.vikkiSchool.model.InstructorApplication;
import com.vikki.vikkiSchool.model.InstructorApplication.Status;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface InstructorApplicationRepo extends JpaRepository<InstructorApplication, Long> {

    // Find pending applications (for admin)
    List<InstructorApplication> findByStatus(Status status);

    // Find application by user (to prevent duplicates)
    boolean existsByAuthRequestId(Long userId);

}

