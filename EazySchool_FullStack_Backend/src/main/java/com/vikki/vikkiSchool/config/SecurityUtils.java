package com.vikki.vikkiSchool.config;
import com.vikki.vikkiSchool.model.RequestUserPrinciples;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;

public class SecurityUtils {

    public static Long getCurrentUserId() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        if (auth == null || !auth.isAuthenticated()) {
            throw new RuntimeException("User not authenticated");
        }

        Object principal = auth.getPrincipal();

        if (principal instanceof RequestUserPrinciples) {
            return ((RequestUserPrinciples) principal).getId();
        }

        throw new RuntimeException("User details not found");
    }


    public String getCurrentUsername() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return authentication.getName(); // usually email or username
    }



}

