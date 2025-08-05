package com.eazybytes.eazyschool.model;

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

                    Predicate titleMatch = cb.like(cb.lower(root.get("title")), "%" + phrase + "%");
                    Predicate descMatch = cb.like(cb.lower(root.get("description")), "%" + phrase + "%");
                    Predicate instructorMatch = cb.like(cb.lower(root.get("instructor")), "%" + phrase + "%");

                    orPredicates.add(cb.or(titleMatch, descMatch, instructorMatch));
                }
            }

            return cb.or(orPredicates.toArray(new Predicate[0]));
        };
    }

}
