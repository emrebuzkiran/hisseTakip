package com.example.portfoyum;

import com.example.portfoyum.controller.UserController;
import com.example.portfoyum.dto.LoginDTO;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import static org.junit.jupiter.api.Assertions.*;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.Authentication;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class LoginControllerTest {
    @Mock
    AuthenticationManager authenticationManager;

    @InjectMocks
    UserController userController;

    @Test
    void testAuthenticateUser() {
        Authentication authentication = mock(Authentication.class);
        when(authenticationManager.authenticate(any(Authentication.class))).thenReturn(authentication);

        LoginDTO loginDTO = new LoginDTO();
        loginDTO.setEmail("test@test");
        loginDTO.setSifre("test");

        ResponseEntity<String> responseEntity = userController.authenticateUser(loginDTO);

        assertNotNull(responseEntity);
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals("Giriş Başarılı", responseEntity.getBody());

    }

    @Test
    void testAuthenticateUserFail(){
        when(authenticationManager.authenticate(any())).thenThrow(new BadCredentialsException("Invalid credentials"));

        // Creating a sample LoginDTO
        LoginDTO loginDTO = new LoginDTO();
        loginDTO.setEmail("test@example.com");
        loginDTO.setSifre("invalidPassword");

        // Calling the method
        ResponseEntity<String> responseEntity = userController.authenticateUser(loginDTO);

        // Assertions
        assertNotNull(responseEntity);
        assertEquals(HttpStatus.UNAUTHORIZED, responseEntity.getStatusCode());
        assertEquals("Giriş Başarısız", responseEntity.getBody());
    }
}
