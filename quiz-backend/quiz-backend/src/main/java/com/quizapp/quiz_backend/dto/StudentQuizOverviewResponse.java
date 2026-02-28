package com.quizapp.quiz_backend.dto;

import java.util.List;

public class StudentQuizOverviewResponse {

    private Long quizId;
    private String title;
    private String description;
    private int totalQuestions;
    private int timePerQuestionSeconds;

    private int attempts;
    private Integer lastScore;

    // 🔥 NEW
    private List<AttemptDTO> attemptHistory;

    public StudentQuizOverviewResponse() {}

    public StudentQuizOverviewResponse(
            Long quizId,
            String title,
            String description,
            int totalQuestions,
            int timePerQuestionSeconds,
            int attempts,
            Integer lastScore,
            List<AttemptDTO> attemptHistory
    ) {
        this.quizId = quizId;
        this.title = title;
        this.description = description;
        this.totalQuestions = totalQuestions;
        this.timePerQuestionSeconds = timePerQuestionSeconds;
        this.attempts = attempts;
        this.lastScore = lastScore;
        this.attemptHistory = attemptHistory;
    }

    // getters & setters

    public Long getQuizId() { return quizId; }
    public void setQuizId(Long quizId) { this.quizId = quizId; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public int getTotalQuestions() { return totalQuestions; }
    public void setTotalQuestions(int totalQuestions) { this.totalQuestions = totalQuestions; }

    public int getTimePerQuestionSeconds() { return timePerQuestionSeconds; }
    public void setTimePerQuestionSeconds(int timePerQuestionSeconds) {
        this.timePerQuestionSeconds = timePerQuestionSeconds;
    }

    public int getAttempts() { return attempts; }
    public void setAttempts(int attempts) { this.attempts = attempts; }

    public Integer getLastScore() { return lastScore; }
    public void setLastScore(Integer lastScore) { this.lastScore = lastScore; }

    public List<AttemptDTO> getAttemptHistory() { return attemptHistory; }
    public void setAttemptHistory(List<AttemptDTO> attemptHistory) {
        this.attemptHistory = attemptHistory;
    }
}