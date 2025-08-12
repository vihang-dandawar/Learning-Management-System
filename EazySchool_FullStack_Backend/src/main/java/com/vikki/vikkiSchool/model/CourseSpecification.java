package com.vikki.vikkiSchool.model;

import jakarta.persistence.criteria.*;
import org.springframework.data.jpa.domain.Specification;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class CourseSpecification {

    public static Specification<course> searchByKeywords(String keyword) {
        return (Root<course> root, CriteriaQuery<?> query, CriteriaBuilder cb) -> {
            String[] words = keyword.toLowerCase().split("\\s+");
            List<Predicate> orPredicates = new ArrayList<>();

            // Generate all possible contiguous combinations (n-grams)
            for (int i = 0; i < words.length; i++) {
                for (int j = i + 1; j <= words.length; j++) {
                    String phrase = String.join(" ", Arrays.copyOfRange(words, i, j));

                    // Search in string fields only
                    Predicate titleMatch = cb.like(cb.lower(root.get("title")), "%" + phrase + "%");
                    Predicate descMatch = cb.like(cb.lower(root.get("description")), "%" + phrase + "%");
                    Predicate categoryMatch = cb.like(cb.lower(root.get("category")), "%" + phrase + "%");

                    // For instructor, use the instructorName field (which is a string)
                    Predicate instructorNameMatch = cb.like(cb.lower(root.get("instructorName")), "%" + phrase + "%");

                    // Alternative: If you want to search in instructor's fullName from the relationship
                    // Join<course, User> instructorJoin = root.join("instructor", JoinType.LEFT);
                    // Predicate instructorFullNameMatch = cb.like(cb.lower(instructorJoin.get("fullName")), "%" + phrase + "%");

                    orPredicates.add(cb.or(titleMatch, descMatch, categoryMatch, instructorNameMatch));
                }
            }

            return cb.or(orPredicates.toArray(new Predicate[0]));
        };
    }

    // Alternative approach with instructor relationship join
    public static Specification<course> searchByKeywordsWithInstructorJoin(String keyword) {
        return (Root<course> root, CriteriaQuery<?> query, CriteriaBuilder cb) -> {
            String[] words = keyword.toLowerCase().split("\\s+");
            List<Predicate> orPredicates = new ArrayList<>();

            // Join with instructor entity
            Join<course, AuthRequest> instructorJoin = root.join("instructor", JoinType.LEFT);

            // Generate all possible contiguous combinations (n-grams)
            for (int i = 0; i < words.length; i++) {
                for (int j = i + 1; j <= words.length; j++) {
                    String phrase = String.join(" ", Arrays.copyOfRange(words, i, j));

                    Predicate titleMatch = cb.like(cb.lower(root.get("title")), "%" + phrase + "%");
                    Predicate descMatch = cb.like(cb.lower(root.get("description")), "%" + phrase + "%");
                    Predicate categoryMatch = cb.like(cb.lower(root.get("category")), "%" + phrase + "%");
                    Predicate instructorNameMatch = cb.like(cb.lower(root.get("instructorName")), "%" + phrase + "%");

                    // Search in instructor's fullName through the relationship
                    Predicate instructorFullNameMatch = cb.like(cb.lower(instructorJoin.get("fullName")), "%" + phrase + "%");

                    // You can also search in instructor's email if needed
                    // Predicate instructorEmailMatch = cb.like(cb.lower(instructorJoin.get("email")), "%" + phrase + "%");

                    orPredicates.add(cb.or(titleMatch, descMatch, categoryMatch, instructorNameMatch, instructorFullNameMatch));
                }
            }

            return cb.or(orPredicates.toArray(new Predicate[0]));
        };
    }
}