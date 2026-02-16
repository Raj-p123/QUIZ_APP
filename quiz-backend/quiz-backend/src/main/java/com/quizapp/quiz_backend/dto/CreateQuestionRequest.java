package com.quizapp.quiz_backend.dto;

public class CreateQuestionRequest {

    private Long quizId;
    private String questionText;

    // ✅ NEW: time per question (seconds)
    private int timeLimitSeconds;

    // ===== getters & setters =====

    public Long getQuizId() {
        return quizId;
    }

    public void setQuizId(Long quizId) {
        this.quizId = quizId;
    }

    public String getQuestionText() {
        return questionText;
    }

    public void setQuestionText(String questionText) {
        this.questionText = questionText;
    }

    public int getTimeLimitSeconds() {
        return timeLimitSeconds;
    }

    public void setTimeLimitSeconds(int timeLimitSeconds) {
        this.timeLimitSeconds = timeLimitSeconds;
    }
}
