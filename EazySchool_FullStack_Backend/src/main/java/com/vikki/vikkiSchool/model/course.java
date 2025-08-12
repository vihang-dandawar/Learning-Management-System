package com.vikki.vikkiSchool.model;

import com.vikki.vikkiSchool.model.AuthRequest;
import com.vikki.vikkiSchool.model.video;
import jakarta.persistence.*;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "course")
@Data
public class course {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String description;
    private Double price;
    private String category;

    @Column(name = "image_url", length = 1000)
    private String imageUrl;

    @ManyToOne
    @JoinColumn(name = "instructor_id", nullable = false)
    private AuthRequest instructor;

    @OneToMany(mappedBy = "course", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<video> videos = new ArrayList<>();
    @Column(name="instructor_name")
    private String instructorName;
}
