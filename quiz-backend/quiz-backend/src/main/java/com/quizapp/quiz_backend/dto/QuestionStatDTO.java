package com.quizapp.quiz_backend.dto;

public class QuestionStatDTO {

    private Long questionId;
    private String questionText;
    private double correctPercentage;
    private double wrongPercentage;

    public QuestionStatDTO() {
    }

    public Long getQuestionId() {
        return questionId;
    }

    public void setQuestionId(Long questionId) {
        this.questionId = questionId;
    }

    public String getQuestionText() {
        return questionText;
    }

    public void setQuestionText(String questionText) {
        this.questionText = questionText;
    }

    public double getCorrectPercentage() {
        return correctPercentage;
    }

    public void setCorrectPercentage(double correctPercentage) {
        this.correctPercentage = correctPercentage;
    }

    public double getWrongPercentage() {
        return wrongPercentage;
    }

    public void setWrongPercentage(double wrongPercentage) {
        this.wrongPercentage = wrongPercentage;
    }
}
