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
            @PathVariable Long quizId,
            @RequestParam Long studentId
    ) {
        return studentService.getQuizOverview(quizId, studentId);
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


    
    
    @GetMapping("/recommended")
    public List<RecommendedQuizDTO> getRecommended() {
        return studentService.getRecommendedQuizzes();
    }

    
    
    @GetMapping("/streak/{studentId}")
    public StreakDTO getStreak(@PathVariable Long studentId) {
        return studentService.getStreak(studentId);
    }

    @GetMapping("/performance/{studentId}")
    public PerformanceDTO getPerformance(@PathVariable Long studentId) {
        return studentService.getPerformance(studentId);
    }

    @GetMapping("/subject-analytics/{studentId}")
    public List<SubjectAnalyticsDTO> getSubjectAnalytics(@PathVariable Long studentId) {
        return studentService.getSubjectAnalytics(studentId);
    }

    @GetMapping("/notifications/{studentId}")
    public List<NotificationDTO> getNotifications(@PathVariable Long studentId) {
        return studentService.getNotifications(studentId);
    }


    
    @GetMapping("/leaderboard")
    public List<LeaderboardDTO> getLeaderboard() {
        return studentService.getLeaderboard();
    }

    
    
    @GetMapping("/dashboard-stats/{studentId}")
    public DashboardStatsDTO getDashboardStats(@PathVariable Long studentId) {
        return studentService.getDashboardStats(studentId);
    }

    
    
    
    @GetMapping("/activity/{studentId}")
    public List<ActivityDTO> getActivity(@PathVariable Long studentId) {
        return studentService.getStudentActivity(studentId);
    }

    
    
    
    @GetMapping("/classes/{studentId}")
    public List<ClassDTO> getClasses(@PathVariable Long studentId) {
        return studentService.getStudentClasses(studentId);
    }


    
    @GetMapping("/achievements/{studentId}")
    public List<String> getAchievements(@PathVariable Long studentId) {
        return studentService.getAchievements(studentId);
    }
    
    
    
    @GetMapping("/attempt-review/{attemptId}")
    public List<AttemptReviewDTO> getAttemptReview(
            @PathVariable Long attemptId) {
        return studentService.getAttemptReview(attemptId);
    }
}
