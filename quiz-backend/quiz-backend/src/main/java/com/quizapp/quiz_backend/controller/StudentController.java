package com.quizapp.quiz_backend.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/student")
@CrossOrigin
(origins = "http://localhost:4200")
public class StudentController {

    @GetMapping("/dashboard/{id}")
    public Map<String, Object> getDashboard(@PathVariable Long id) {

        Map<String, Object> data = new HashMap<>();

        data.put("name", "Rajendra");
        data.put("totalQuizzes", 12);
        data.put("completed", 8);
        data.put("averageScore", 78);

        List<Map<String, String>> quizzes = new ArrayList<>();

        quizzes.add(Map.of(
                "title", "Java Basics",
                "details", "20 Questions • 30 mins"
        ));

        quizzes.add(Map.of(
                "title", "Angular Fundamentals",
                "details", "15 Questions • 20 mins"
        ));

        data.put("quizzes", quizzes);

        return data;
    }
}

