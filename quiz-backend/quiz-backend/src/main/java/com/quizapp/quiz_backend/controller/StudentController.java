package com.quizapp.quiz_backend.controller;

import com.quizapp.quiz_backend.dto.*;
import com.quizapp.quiz_backend.service.StudentService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/student")
@CrossOrigin(origins = "http://localhost:4200")
public class StudentController {

    private final StudentService studentService;

    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    // ================= AVAILABLE QUIZZES =================
    @GetMapping("/quizzes")
    public List<StudentQuizResponse> getAvailableQuizzes() {
        return studentService.getPublishedQuizzes();
    }

    // ================= QUIZ OVERVIEW =================
    @GetMapping("/quizzes/{quizId}/overview")
    public StudentQuizOverviewResponse getQuizOverview(
            @PathVariable Long quizId
    ) {
        return studentService.getQuizOverview(quizId);
    }

    // ================= PLAY QUIZ (NEW 🔥) =================
    @GetMapping("/quizzes/{quizId}/play")
    public List<StudentQuestionResponse> playQuiz(
            @PathVariable Long quizId
    ) {
        return studentService.getQuizQuestions(quizId);
    }
    
 // ================= SUBMIT QUIZ =================
    @PostMapping("/quizzes/submit")
    public SubmitQuizResponse submitQuiz(
            @RequestBody SubmitQuizRequest request
    ) {
        return studentService.submitQuiz(request);
    }


}
