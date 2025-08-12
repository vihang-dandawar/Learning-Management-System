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
















    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public AuthRequest getInstructor() {
        return instructor;
    }

    public void setInstructor(AuthRequest instructor) {
        this.instructor = instructor;
    }

    public List<video> getVideos() {
        return videos;
    }

    public void setVideos(List<video> videos) {
        this.videos = videos;
    }

    public String getInstructorName() {
        return instructorName;
    }

    public void setInstructorName(String instructorName) {
        this.instructorName = instructorName;
    }
}
