package com.quizapp.quiz_backend.controller;

import com.quizapp.quiz_backend.dto.*;
import com.quizapp.quiz_backend.model.Quiz;
import com.quizapp.quiz_backend.service.TeacherQuizService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/teacher/quizzes")
@CrossOrigin(origins = "*")
public class TeacherQuizController {

    private final TeacherQuizService teacherQuizService;

    public TeacherQuizController(TeacherQuizService teacherQuizService) {
        this.teacherQuizService = teacherQuizService;
    }

    // ✅ CREATE QUIZ (JSON ONLY)
    @PostMapping
    public Quiz createQuiz(@RequestBody CreateQuizRequest request) {
        return teacherQuizService.createQuiz(request);
    }

    @GetMapping("/teacher/{teacherId}")
    public List<QuizResponse> getTeacherQuizzes(@PathVariable Long teacherId) {
        return teacherQuizService.getQuizzesByTeacher(teacherId);
    }

    @PostMapping("/questions")
    public QuestionResponse addQuestion(@RequestBody CreateQuestionRequest request) {
        return teacherQuizService.addQuestionToQuiz(request);
    }

    @PostMapping("/options")
    public OptionResponse addOption(@RequestBody CreateOptionRequest request) {
        return teacherQuizService.addOptionToQuestion(request);
    }

    @GetMapping("/{quizId}/questions")
    public List<QuestionWithOptionsResponse> getQuestionsByQuiz(
            @PathVariable Long quizId
    ) {
        return teacherQuizService.getQuestionsByQuiz(quizId);
    }

    @PutMapping("/{quizId}/publish")
    public String publishQuiz(@PathVariable Long quizId) {
        teacherQuizService.publishQuiz(quizId);
        return "Quiz published successfully";
    }

    @DeleteMapping("/{quizId}")
    public ResponseEntity<Void> deleteQuiz(@PathVariable Long quizId) {
        teacherQuizService.deleteQuiz(quizId);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/questions/{questionId}")
    public ResponseEntity<Void> deleteQuestion(@PathVariable Long questionId) {
        teacherQuizService.deleteQuestion(questionId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{quizId}")
    public QuizResponse getQuizById(@PathVariable Long quizId) {
        return teacherQuizService.getQuizById(quizId);
    }
}
