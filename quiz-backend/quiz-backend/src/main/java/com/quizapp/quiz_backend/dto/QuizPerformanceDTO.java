package com.quizapp.quiz_backend.dto;

public class QuizPerformanceDTO {

    private Long quizId;
    private String quizTitle;
    private Long attempts;
    private Double averageScore;
    private Integer highestScore;
    private Integer lowestScore;

    public QuizPerformanceDTO(
            Long quizId,
            String quizTitle,
            Long attempts,
            Double averageScore,
            Integer highestScore,
            Integer lowestScore
    ) {
        this.quizId = quizId;
        this.quizTitle = quizTitle;
        this.attempts = attempts;
        this.averageScore = averageScore;
        this.highestScore = highestScore;
        this.lowestScore = lowestScore;
    }

    public Long getQuizId() { return quizId; }
    public String getQuizTitle() { return quizTitle; }
    public Long getAttempts() { return attempts; }
    public Double getAverageScore() { return averageScore; }
    public Integer getHighestScore() { return highestScore; }
    public Integer getLowestScore() { return lowestScore; }
}
