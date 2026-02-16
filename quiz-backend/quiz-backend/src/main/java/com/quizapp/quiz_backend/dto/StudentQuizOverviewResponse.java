package com.quizapp.quiz_backend.dto;

public class StudentQuizOverviewResponse {

    private Long quizId;
    private String title;
    private String description;
    private int totalQuestions;

    // 🔥 NEW
    private int timePerQuestionSeconds;

    // student-related (future-ready)
    private int attempts;
    private Integer lastScore; // null if never attempted

    // ===== constructors =====

    public StudentQuizOverviewResponse() {
    }

    public StudentQuizOverviewResponse(
            Long quizId,
            String title,
            String description,
            int totalQuestions,
            int timePerQuestionSeconds,
            int attempts,
            Integer lastScore
    ) {
        this.quizId = quizId;
        this.title = title;
        this.description = description;
        this.totalQuestions = totalQuestions;
        this.timePerQuestionSeconds = timePerQuestionSeconds;
        this.attempts = attempts;
        this.lastScore = lastScore;
    }

    // ===== getters & setters =====

    public Long getQuizId() {
        return quizId;
    }

    public void setQuizId(Long quizId) {
        this.quizId = quizId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getTotalQuestions() {
        return totalQuestions;
    }

    public void setTotalQuestions(int totalQuestions) {
        this.totalQuestions = totalQuestions;
    }

    public int getTimePerQuestionSeconds() {
        return timePerQuestionSeconds;
    }

    public void setTimePerQuestionSeconds(int timePerQuestionSeconds) {
        this.timePerQuestionSeconds = timePerQuestionSeconds;
    }

    public int getAttempts() {
        return attempts;
    }

    public void setAttempts(int attempts) {
        this.attempts = attempts;
    }

    public Integer getLastScore() {
        return lastScore;
    }

    public void setLastScore(Integer lastScore) {
        this.lastScore = lastScore;
    }
}
