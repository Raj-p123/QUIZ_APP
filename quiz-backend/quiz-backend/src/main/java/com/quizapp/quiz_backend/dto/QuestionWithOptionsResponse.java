package com.quizapp.quiz_backend.dto;

import java.util.List;
import com.quizapp.quiz_backend.model.QuestionType;

public class QuestionWithOptionsResponse {

    private Long id;
    private String questionText;

    // 🔥 NEW
    private QuestionType type;

    // 🔥 Used for fill blank
    private String correctAnswer;

    private List<OptionResponse> options;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public List<OptionResponse> getOptions() {
        return options;
    }

    public void setOptions(List<OptionResponse> options) {
        this.options = options;
    }
}