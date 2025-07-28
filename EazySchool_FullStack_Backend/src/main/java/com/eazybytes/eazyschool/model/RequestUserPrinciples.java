package com.eazybytes.eazyschool.model;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Collections;

public class RequestUserPrinciples implements UserDetails {

    private final AuthRequest authRequest;

    public RequestUserPrinciples(AuthRequest authRequest) {
        this.authRequest = authRequest;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        System.out.println( "Name is "+authRequest.getRoles().name());
        return Collections.singleton(
                new SimpleGrantedAuthority( authRequest.getRoles().name())

        );
    }


    @Override
    public String getPassword() {
        return authRequest.getPassword();
    }

    @Override
    public String getUsername() {
        return authRequest.getEmail();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
