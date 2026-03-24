package com.quizapp.quiz_backend.dto;

public class QuestionAnalysisDTO {

    private Long questionId;
    private String questionText;
    private double correctPercentage;
    private double wrongPercentage;

    // 🔥 NEW FIELDS
    private int correctCount;
    private int wrongCount;

    public QuestionAnalysisDTO(
            Long questionId,
            String questionText,
            double correctPercentage,
            double wrongPercentage,
            int correctCount,
            int wrongCount
    ) {
        this.questionId = questionId;
        this.questionText = questionText;
        this.correctPercentage = correctPercentage;
        this.wrongPercentage = wrongPercentage;
        this.correctCount = correctCount;
        this.wrongCount = wrongCount;
    }

    public Long getQuestionId() { return questionId; }
    public String getQuestionText() { return questionText; }
    public double getCorrectPercentage() { return correctPercentage; }
    public double getWrongPercentage() { return wrongPercentage; }

    // 🔥 NEW GETTERS
    public int getCorrectCount() { return correctCount; }
    public int getWrongCount() { return wrongCount; }
}