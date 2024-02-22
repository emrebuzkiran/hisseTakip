package com.example.portfoyum.service;


import com.example.portfoyum.dto.HisseDTO;
import com.example.portfoyum.dto.SignupDTO;
import com.example.portfoyum.dto.UserDTO;
import com.example.portfoyum.entity.User;
import com.example.portfoyum.repository.HisseRepository;
import com.example.portfoyum.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService implements UserDetailsService {

    private final UserRepository userRepository;
    private final HisseRepository hisseRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, HisseRepository hisseRepository, BCryptPasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.hisseRepository = hisseRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        Optional<User> user = userRepository.findByUsername(username);
        return user.orElseThrow(EntityNotFoundException::new);
    }

    public Optional<User> getByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    public UserDTO getUserInfo(String username) {
        Optional<User> user = userRepository.findByUsername(username);
        return user.map(UserDTO::from).orElse(null);
    }

    public User createUser(SignupDTO request) {

        User newUser = User.builder()
                .name(request.name())
                .username(request.username())
                .password(passwordEncoder.encode(request.password()))
                .email(request.email())
                .authorities(request.authorities())
                .accountNonExpired(true)
                .credentialsNonExpired(true)
                .isEnabled(true)
                .accountNonLocked(true)
                .build();

        return userRepository.save(newUser);
    }
}
