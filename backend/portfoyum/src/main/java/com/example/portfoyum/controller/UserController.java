package com.example.portfoyum.controller;

import com.example.portfoyum.dto.LoginDTO;
import com.example.portfoyum.dto.UserDTO;
import com.example.portfoyum.entity.User;
import com.example.portfoyum.repository.UserRepository;
import com.example.portfoyum.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
@Slf4j
public class UserController {

    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    private final UserService service;
    UserRepository userRepository;

    public UserController(UserService service, UserRepository userRepository) {
        this.service = service;
        this.userRepository = userRepository;
    }

    @GetMapping("/{username}")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<UserDTO> getUserInfo(@PathVariable String username) {
            try {
                UserDTO userDTO = service.getUserInfo(username);
                if (userDTO != null) {
                    return ResponseEntity.ok(userDTO);
                } else {
                    return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
                }

            } catch (Exception e) {
                log.error("error in getting user info " + e.getMessage());
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
            }
    }

    @GetMapping("/private")
    public ResponseEntity<String> privateHello() {
        return new ResponseEntity<>("Hello Private World", HttpStatus.OK);
    }



}
