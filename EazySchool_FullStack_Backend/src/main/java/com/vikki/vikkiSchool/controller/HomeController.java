package com.vikki.vikkiSchool.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = {"http://localhost:5173","https://vikkischool-lms.vercel.app"})

@RestController
@RequestMapping("/api")
public class HomeController {

    @GetMapping("/username")
    public String getUsername() {
        return "John Doe";
    }
}
