package com.example.portfoyum.service;

import com.example.portfoyum.dto.LoginDTO;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class GenerateTokenService {
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;

    public GenerateTokenService(AuthenticationManager authenticationManager, JwtService jwtService) {
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
    }

    public String generateToken(LoginDTO loginDTO) {
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginDTO.username(), loginDTO.password()));
        if (authentication.isAuthenticated()) {
            return jwtService.generateToken(loginDTO.username());
        }

        throw new UsernameNotFoundException("invalid username {} " + loginDTO.username());
    }
}
