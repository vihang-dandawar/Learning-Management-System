package com.vikki.vikkiSchool.config;

import com.vikki.vikkiSchool.service.MyUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.*;

import java.util.List;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Autowired
    private MyUserDetailsService myUserDetailsService;

    @Autowired
    private JWTFilter jwtFilter;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable())
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(
                                "/loginUser",
                                "/register",
                                "/saveMsg",
                                "/auth/send-otp",
                                "/auth/verify-otp",
                                "/auth/reset-password",
                                "/getAllCourses",
                                "/all/courses/getCourseById/**",
                                "/courses/latest",
                                "/courses/category/{category}",
                                "/courses/getCategory",
                                "/courses/search/**"
                        ).permitAll()
                        .requestMatchers(
                                "/createCourse",
                                "/courses/{courseId}/videos",
                                "/courses/updateInfo/{id}",
                                "/courses/deleteCourse/{id}"
                        ).hasAuthority("INSTRUCTOR")
                        .requestMatchers(
                                "/allMessages",
                                "/api/instructor-applications/pending",
                                "/api/instructor-applications/{id}/approve",
                                "/api/instructor-applications/{id}/reject"

                        ).hasAuthority("ADMIN")
                        .requestMatchers(
                                "/api/instructor-applications/apply"
                        ).hasAuthority("USER")

                        .requestMatchers(


                                "/courses/**",
                                "/courses/{courseId}/students",
                                        "/instructor/courses"
                        ).hasAnyAuthority("ADMIN", "INSTRUCTOR")
                        .requestMatchers("/videos/getLink/{videoId}").authenticated()
                        .requestMatchers("/purchased-courses"
                        ).authenticated()
                        .requestMatchers("/loginUser").permitAll()
                        .anyRequest().authenticated()
                )
                .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class)
                .httpBasic(Customizer.withDefaults())
                .sessionManagement(sess -> sess.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authenticationProvider(authenticationProvider());

        return http.build();
    }


    // ✅ Register custom provider
    @Bean
    public AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setUserDetailsService(myUserDetailsService);
        provider.setPasswordEncoder(passwordEncoder()); // Use encoder!

        return provider;
    }

    // ✅ Needed for manual authentication (e.g., in LoginController)
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

    // ✅ Allow frontend to make requests (CORS)
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowedOrigins(List.of("http://localhost:5173"));
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        config.setAllowedHeaders(List.of("*"));
        config.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }


    @Bean
    PasswordEncoder passwordEncoder()
    {
        return  new BCryptPasswordEncoder(12);
    }
}
