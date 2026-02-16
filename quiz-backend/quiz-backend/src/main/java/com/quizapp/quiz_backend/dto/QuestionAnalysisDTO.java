package com.quizapp.quiz_backend.dto;

public class QuestionAnalysisDTO {

    private Long questionId;
    private String questionText;
    private double correctPercentage;
    private double wrongPercentage;

    public QuestionAnalysisDTO(
            Long questionId,
            String questionText,
            double correctPercentage,
            double wrongPercentage
    ) {
        this.questionId = questionId;
        this.questionText = questionText;
        this.correctPercentage = correctPercentage;
        this.wrongPercentage = wrongPercentage;
    }

    public Long getQuestionId() { return questionId; }
    public String getQuestionText() { return questionText; }
    public double getCorrectPercentage() { return correctPercentage; }
    public double getWrongPercentage() { return wrongPercentage; }
}
