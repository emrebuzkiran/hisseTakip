package com.example.portfoyum.dto;

import com.example.portfoyum.entity.User;
import lombok.Getter;
import lombok.Setter;

public record UserDTO(String name, String username, String email) {
    public static UserDTO from(User user) {
        return new UserDTO(user.getName(), user.getUsername(), user.getEmail());
    }
}