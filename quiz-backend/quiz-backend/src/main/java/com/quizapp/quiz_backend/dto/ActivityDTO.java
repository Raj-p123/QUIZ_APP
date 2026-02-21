package com.quizapp.quiz_backend.dto;

import java.time.LocalDateTime;

public class ActivityDTO {

    private String quizTitle;
    private LocalDateTime attemptedAt;
    private int score;
    private int totalQuestions;
    private String result;

    public ActivityDTO(String quizTitle,
                       LocalDateTime attemptedAt,
                       int score,
                       int totalQuestions,
                       String result) {
        this.quizTitle = quizTitle;
        this.attemptedAt = attemptedAt;
        this.score = score;
        this.totalQuestions = totalQuestions;
        this.result = result;
    }

    public String getQuizTitle() { return quizTitle; }
    public LocalDateTime getAttemptedAt() { return attemptedAt; }
    public int getScore() { return score; }
    public int getTotalQuestions() { return totalQuestions; }
    public String getResult() { return result; }
}
