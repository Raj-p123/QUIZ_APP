package com.quizapp.quiz_backend.service;

import com.quizapp.quiz_backend.dto.LoginRequest;
import com.quizapp.quiz_backend.dto.LoginResponse;
import com.quizapp.quiz_backend.dto.RegisterRequest;
import com.quizapp.quiz_backend.model.User;
import com.quizapp.quiz_backend.repository.UserRepository;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.Random;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository,
                       BCryptPasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    // ================= COMMON METHOD =================
    private String normalizeEmail(String email) {
        return email.trim().toLowerCase();
    }

    // ================= REGISTER =================
    public User registerUser(RegisterRequest request) {

        String email = normalizeEmail(request.getEmail());

        userRepository.findByEmailIgnoreCase(email)
                .ifPresent(u -> {
                    throw new RuntimeException("Email already registered");
                });

        User user = new User();
        user.setName(request.getName());
        user.setEmail(email); // ✅ normalized
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(request.getRole());

        user.setInstitution(request.getInstitution());
        user.setSubjectExpertise(request.getSubjectExpertise());
        user.setExperienceYears(request.getExperienceYears());
        user.setOrganization(request.getOrganization());

        user.setActive(true);

        return userRepository.save(user);
    }

    // ================= LOGIN =================
    public LoginResponse login(LoginRequest request) {

        String email = normalizeEmail(request.getEmail());

        User user = userRepository.findByEmailIgnoreCase(email)
                .orElseThrow(() -> new RuntimeException("Invalid email or password"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid email or password");
        }

        LoginResponse response = new LoginResponse();
        response.setId(user.getId());
        response.setName(user.getName());
        response.setEmail(user.getEmail());
        response.setRole(user.getRole());

        return response;
    }

    // ================= SEND OTP =================
    public String sendOtp(String email) {

        email = normalizeEmail(email);

        System.out.println("Searching email: " + email);

        Optional<User> userOpt = userRepository.findByEmailIgnoreCase(email);

        if (userOpt.isEmpty()) {
            throw new RuntimeException("User not found");
        }

        User user = userOpt.get();

        String otp = String.valueOf(new Random().nextInt(900000) + 100000);

        user.setOtp(otp);
        userRepository.save(user);

        System.out.println("OTP for " + email + " is: " + otp);

        return "OTP sent";
    }

    // ================= RESET PASSWORD =================
    public String resetPassword(String email, String otp, String newPassword) {

        email = normalizeEmail(email);

        User user = userRepository.findByEmailIgnoreCase(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (user.getOtp() == null || !user.getOtp().equals(otp)) {
            throw new RuntimeException("Invalid OTP");
        }

        user.setPassword(passwordEncoder.encode(newPassword));
        user.setOtp(null);

        userRepository.save(user);

        return "Password reset successful";
    }
}