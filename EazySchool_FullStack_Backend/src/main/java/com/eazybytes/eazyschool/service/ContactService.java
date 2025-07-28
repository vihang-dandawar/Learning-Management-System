package com.eazybytes.eazyschool.service;

import com.eazybytes.eazyschool.model.contact;
import com.eazybytes.eazyschool.repository.ContactRepo;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

//@Slf4j
@Service
public class ContactService {

    @Autowired
    ContactRepo contactrepo;
    private static final Logger log = LoggerFactory.getLogger(ContactService.class);

    public boolean saveMessageDetails(contact contact) {
        boolean isSaved = true;
        //TODO - Need to persist the data into the DB table
        contactrepo.save(contact);
//        log.info(contact.toString());
        return isSaved;
    }


    public List<contact> GetAllMessages() {

        List<contact> contact = contactrepo.findAll();

        return contact.stream().map((Eachemployee) ->
                        (Eachemployee)).
                collect(Collectors.toList());


    }
}





