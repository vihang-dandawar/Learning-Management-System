package com.eazybytes.eazyschool.repository;

import com.eazybytes.eazyschool.model.contact;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ContactRepo extends JpaRepository<contact,Integer> {

}
