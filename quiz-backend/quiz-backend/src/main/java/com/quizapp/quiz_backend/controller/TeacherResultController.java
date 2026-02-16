package com.quizapp.quiz_backend.controller;

import com.quizapp.quiz_backend.dto.TeacherQuizResultSummary;
import com.quizapp.quiz_backend.dto.QuizDetailedResultDTO;
import com.quizapp.quiz_backend.service.TeacherResultService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/teacher/results")
@CrossOrigin(origins = "*")
public class TeacherResultController {

    private final TeacherResultService teacherResultService;

    public TeacherResultController(TeacherResultService teacherResultService) {
        this.teacherResultService = teacherResultService;
    }

    // ============================================
    // 1️⃣ MAIN RESULTS PAGE (All quizzes summary)
    // ============================================
    @GetMapping("/{teacherId}")
    public List<TeacherQuizResultSummary> getTeacherResults(
            @PathVariable Long teacherId
    ) {
        return teacherResultService.getTeacherQuizResults(teacherId);
    }

    // ============================================
    // 2️⃣ DETAILED RESULT FOR ONE QUIZ
    // ============================================
    @GetMapping("/quiz/{quizId}")
    public QuizDetailedResultDTO getQuizDetailedResult(
            @PathVariable Long quizId
    ) {
        return teacherResultService.getQuizDetailedResult(quizId);
    }
}
