package com.example.portfoyum.controller;

import com.example.portfoyum.dto.LoginDTO;
import com.example.portfoyum.dto.SignupDTO;
import com.example.portfoyum.dto.UserDTO;
import com.example.portfoyum.entity.User;
import com.example.portfoyum.repository.UserRepository;
import com.example.portfoyum.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
public class UserController {
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    UserRepository userRepository;
    @Autowired
    PasswordEncoder passwordEncoder;

    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    @GetMapping("/")
    public ResponseEntity<String> hello() {
        return new ResponseEntity<>("Hello World", HttpStatus.OK);
    }

    @PostMapping("/login")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<String> authenticateUser(@RequestBody LoginDTO loginDTO) {
        try {
            logger.info(loginDTO.getEmail());
            logger.info(loginDTO.getSifre());
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginDTO.getEmail(), loginDTO.getSifre()));
            SecurityContext securityContext = SecurityContextHolder.getContext();
            securityContext.setAuthentication(authentication);
            SecurityContextHolder.setContext(securityContext);

            return ResponseEntity.ok("Giriş Başarılı");
        } catch (AuthenticationException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Giriş Başarısız");
        }
    }

    @PostMapping("/register")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<?> registerUser(@RequestBody SignupDTO signupDTO) {
        if (userRepository.existsByEmail(signupDTO.getEmail())) {
            return new ResponseEntity<>("Bu email zaten kayıtlı", HttpStatus.BAD_REQUEST);
        }
        User user = new User();
        user.setAd(signupDTO.getAd());
        user.setSoyad(signupDTO.getSoyad());
        user.setEmail(signupDTO.getEmail());
        user.setSifre(passwordEncoder.encode(signupDTO.getSifre()));
        userRepository.save(user);

        return new ResponseEntity<>("Kayıt Başarılı", HttpStatus.OK);
    }

    @GetMapping("/userinfo")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<UserDTO> getUserInfo() {
        SecurityContext context = SecurityContextHolder.getContext();
        UserDetails userDetails = (UserDetails) context.getAuthentication().getPrincipal();
        logger.info(userDetails.getUsername());
        User user = userRepository.findByEmail(userDetails.getUsername());
        UserDTO userDTO = new UserDTO();
        userDTO.setAd(user.getAd());
        userDTO.setSoyad(user.getSoyad());
        userDTO.setEmail(user.getEmail());
        return new ResponseEntity<>(userDTO, HttpStatus.OK);
    }


    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/logout")
    public ResponseEntity<String> logout(){
        SecurityContextHolder.clearContext();
        return new ResponseEntity<>("Çıkış Başarılı", HttpStatus.OK);
    }


}
