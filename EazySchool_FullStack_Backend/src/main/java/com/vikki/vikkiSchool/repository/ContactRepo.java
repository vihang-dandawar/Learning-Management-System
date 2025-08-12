package com.vikki.vikkiSchool.repository;

import com.vikki.vikkiSchool.model.contact;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ContactRepo extends JpaRepository<contact,Integer> {

}
