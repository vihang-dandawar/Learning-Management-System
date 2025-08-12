package com.vikki.vikkiSchool.controller;

import com.vikki.vikkiSchool.model.contact;
import com.vikki.vikkiSchool.service.ContactService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
//@CrossOrigin(origins = "*")  // Allow React frontend to make requests
public class ContactController {

    @Autowired
    private ContactService contactService;

    @PostMapping("/saveMsg")
    public ResponseEntity<String> saveMessage( @Valid  @RequestBody contact contact) {
        boolean isSaved = contactService.saveMessageDetails(contact);
        if (isSaved) {
            return ResponseEntity.ok("Message saved successfully");
        } else {
            return ResponseEntity.status(500).body("Message not received");
        }
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/allMessages")
    public ResponseEntity<List<contact>> getAllMessages() {
        return ResponseEntity.ok(contactService.GetAllMessages());
    }



}
