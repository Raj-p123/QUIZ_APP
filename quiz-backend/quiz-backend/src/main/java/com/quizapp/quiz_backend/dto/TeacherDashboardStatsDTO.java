package com.quizapp.quiz_backend.dto;

public class TeacherDashboardStatsDTO {

    private int activeQuizzes;
    private int totalAttempts;
    private int underModeration;
    private int totalQuizzes;

    // ===== GETTERS & SETTERS =====

    public int getActiveQuizzes() {
        return activeQuizzes;
    }

    public void setActiveQuizzes(int activeQuizzes) {
        this.activeQuizzes = activeQuizzes;
    }

    public int getTotalAttempts() {
        return totalAttempts;
    }

    public void setTotalAttempts(int totalAttempts) {
        this.totalAttempts = totalAttempts;
    }

    public int getUnderModeration() {
        return underModeration;
    }

    public void setUnderModeration(int underModeration) {
        this.underModeration = underModeration;
    }

    public int getTotalQuizzes() {
        return totalQuizzes;
    }

    public void setTotalQuizzes(int totalQuizzes) {
        this.totalQuizzes = totalQuizzes;
    }
}