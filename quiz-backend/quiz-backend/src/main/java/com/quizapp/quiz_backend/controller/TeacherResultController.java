package com.quizapp.quiz_backend.controller;

import com.quizapp.quiz_backend.dto.TeacherQuizResultSummary;
import com.quizapp.quiz_backend.dto.QuizDetailedResultDTO;
import com.quizapp.quiz_backend.dto.TeacherDashboardStatsDTO;
import com.quizapp.quiz_backend.dto.TeacherGlobalLeaderboardDTO;
import com.quizapp.quiz_backend.dto.TeacherLeaderboardDTO;
import com.quizapp.quiz_backend.dto.TeacherQuizDetailedResult;
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
    public TeacherQuizDetailedResult getQuizDetailedResult( // ✅ FIXED RETURN TYPE
            @PathVariable Long quizId
    ) {
        return teacherResultService.getQuizDetailedResult(quizId);
    }
    
    @GetMapping("/leaderboard/{quizId}")
    public List<TeacherLeaderboardDTO> getLeaderboard(@PathVariable Long quizId) {
        return teacherResultService.getLeaderboard(quizId);
    }
    
    @GetMapping("/leaderboard/global")
    public List<TeacherGlobalLeaderboardDTO> getGlobalLeaderboard() {
        return teacherResultService.getGlobalLeaderboard();
    }
    
}
