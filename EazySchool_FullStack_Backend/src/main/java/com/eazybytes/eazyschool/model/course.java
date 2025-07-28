package com.eazybytes.eazyschool.model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.DoubleStream;

@Data
@Entity
public class course {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String description;
    private String instructor;
    private Double price;
    private String category;
    @Column( name ="image_url",length = 1000)
    private String imageUrl;


    @OneToMany(mappedBy = "course", cascade = CascadeType.ALL)
    private List<video> videos = new ArrayList<>();


    // Getters and Setters
}

