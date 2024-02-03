package com.example.portfoyum.dto;

import com.example.portfoyum.entity.Role;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.Set;

@Builder
public record SignupDTO(String name, String username, String password, String email, Set<Role> authorities) {
}
