package com.quizapp.quiz_backend.controller;

import com.quizapp.quiz_backend.dto.LoginRequest;
import com.quizapp.quiz_backend.dto.LoginResponse;
import com.quizapp.quiz_backend.dto.RegisterRequest;
import com.quizapp.quiz_backend.model.User;
import com.quizapp.quiz_backend.service.UserService;
import org.springframework.web.bind.annotation.*;

import org.springframework.http.ResponseEntity;
import java.util.Map;




@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    // ================= REGISTER =================
    @PostMapping("/register")
    public User register(@RequestBody RegisterRequest request) {
        return userService.registerUser(request);
    }

    // ================= LOGIN =================
    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest request) {
        return userService.login(request);
    }
    
    
    
    
 
 // ================= SEND OTP =================
    @PostMapping("/send-otp")
    public ResponseEntity<?> sendOtp(@RequestBody Map<String, String> req) {
        return ResponseEntity.ok(Map.of("message", userService.sendOtp(req.get("email"))));
    }

    // ================= RESET PASSWORD =================
    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestBody Map<String, String> req) {
        return ResponseEntity.ok(
            Map.of("message",
                userService.resetPassword(
                    req.get("email"),
                    req.get("otp"),
                    req.get("newPassword")
                )
            )
        );
    }
    
}
