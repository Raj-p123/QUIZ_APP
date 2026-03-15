package com.quizapp.quiz_backend.dto;

import com.quizapp.quiz_backend.model.QuestionType;

public class CreateQuestionRequest {

    private Long quizId;
    private String questionText;

    // 🔥 NEW: Question type
    private QuestionType type;

    // 🔥 Used for fill blank / short answer
    private String correctAnswer;

    // ⏱ Time per question (seconds)
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

    public QuestionType getType() {
        return type;
    }

    public void setType(QuestionType type) {
        this.type = type;
    }

    public String getCorrectAnswer() {
        return correctAnswer;
    }

    public void setCorrectAnswer(String correctAnswer) {
        this.correctAnswer = correctAnswer;
    }

    public int getTimeLimitSeconds() {
        return timeLimitSeconds;
    }

    public void setTimeLimitSeconds(int timeLimitSeconds) {
        this.timeLimitSeconds = timeLimitSeconds;
    }
}