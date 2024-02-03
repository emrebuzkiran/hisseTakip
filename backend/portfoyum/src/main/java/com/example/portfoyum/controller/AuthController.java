package com.example.portfoyum.controller;

import com.example.portfoyum.dto.LoginDTO;
import com.example.portfoyum.dto.SignupDTO;
import com.example.portfoyum.entity.User;
import com.example.portfoyum.service.GenerateTokenService;
import com.example.portfoyum.service.JwtService;
import com.example.portfoyum.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@Slf4j
public class AuthController {

    private final GenerateTokenService generateTokenService;
    private final UserService service;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;


    public AuthController(GenerateTokenService generateTokenService, UserService service, AuthenticationManager authenticationManager, JwtService jwtService) {
        this.generateTokenService = generateTokenService;
        this.service = service;
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
    }

    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    @GetMapping("/test")
    public ResponseEntity<String> hello() {
        return new ResponseEntity<>("test", HttpStatus.OK);
    }

    @PostMapping("/login")
    @CrossOrigin(origins = "http://localhost:3000")
    public String generateToken(@RequestBody LoginDTO loginDTO) {
        try {
            return generateTokenService.generateToken(loginDTO);
        } catch (Exception e) {
            return "Invalid credentials" +loginDTO.username()+loginDTO.password();
        }
    }
    @PostMapping("/register")
    @CrossOrigin(origins = "http://localhost:3000")
    public User addUser(@RequestBody SignupDTO signupDTO){
        return service.createUser(signupDTO);
    }

}
