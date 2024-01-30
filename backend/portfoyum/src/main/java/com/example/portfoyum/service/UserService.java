package com.example.portfoyum.service;

import com.example.portfoyum.entity.User;
import com.example.portfoyum.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(email);
        if (user==null){
            throw new UsernameNotFoundException("Kullanıcı Bulunamadı");
        }
        return new org.springframework.security.core.userdetails.User(user.getEmail(),user.getSifre(),null);
    }
}
