package com.eazybytes.eazyschool.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
public class video {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String videoUrl;
    private String duration;

    @ManyToOne
    @JoinColumn(name = "course_id")
    @JsonIgnore
    private course course;

    // Getters, setters
}
