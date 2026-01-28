package com.quizapp.quiz_backend.service;

import com.quizapp.quiz_backend.dto.LoginRequest;
import com.quizapp.quiz_backend.dto.LoginResponse;
import com.quizapp.quiz_backend.dto.RegisterRequest;
import com.quizapp.quiz_backend.model.User;
import com.quizapp.quiz_backend.repository.UserRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    // constructor injection
    public UserService(UserRepository userRepository,
                       BCryptPasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    // ================= REGISTER =================
    public User registerUser(RegisterRequest request) {

        // check if email already exists
        userRepository.findByEmail(request.getEmail())
                .ifPresent(u -> {
                    throw new RuntimeException("Email already registered");
                });

        // convert DTO -> Entity
        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());

        // encrypt password
        user.setPassword(passwordEncoder.encode(request.getPassword()));

        user.setRole(request.getRole());

        // role-specific fields
        user.setInstitution(request.getInstitution());
        user.setSubjectExpertise(request.getSubjectExpertise());
        user.setExperienceYears(request.getExperienceYears());
        user.setOrganization(request.getOrganization());

        user.setActive(true);

        return userRepository.save(user);
    }

    // ================= LOGIN =================
    public LoginResponse login(LoginRequest request) {

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Invalid email or password"));

        // compare encrypted password
        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid email or password");
        }

        // prepare safe response (NO password)
        LoginResponse response = new LoginResponse();
        response.setId(user.getId());
        response.setName(user.getName());
        response.setEmail(user.getEmail());
        response.setRole(user.getRole());

        return response;
    }
}
