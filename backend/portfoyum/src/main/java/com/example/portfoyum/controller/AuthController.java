package com.example.portfoyum.controller;

import com.example.portfoyum.dto.LoginDTO;
import com.example.portfoyum.dto.SignupDTO;
import com.example.portfoyum.entity.User;
import com.example.portfoyum.service.AuthService;
import com.example.portfoyum.service.JwtService;
import com.example.portfoyum.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthContoller {

    private final UserService service;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;

    private final AuthService authService;

    public AuthContoller(UserService service, AuthenticationManager authenticationManager, JwtService jwtService, AuthService authService) {
        this.service = service;
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
        this.authService = authService;
    }

    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    @GetMapping("/test")
    public ResponseEntity<String> hello() {
        return new ResponseEntity<>("test", HttpStatus.OK);
    }

    @PostMapping("/login")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<String> login(@RequestBody LoginDTO loginDTO) {
        try {
            String token = authService.generateJwtToken(loginDTO);
            return ResponseEntity.ok(token);
        } catch (AuthenticationException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }
    }

    @PostMapping("/register")
    @CrossOrigin(origins = "http://localhost:3000")
    public User addUser(@RequestBody SignupDTO signupDTO){
        return service.createUser(signupDTO);
    }

}
