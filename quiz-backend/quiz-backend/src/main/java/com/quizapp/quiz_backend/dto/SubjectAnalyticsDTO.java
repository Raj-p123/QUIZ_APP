package com.quizapp.quiz_backend.dto;

public class SubjectAnalyticsDTO {

    private String subject;
    private int averageScore;

    public SubjectAnalyticsDTO(String subject, int averageScore) {
        this.subject = subject;
        this.averageScore = averageScore;
    }

    public String getSubject() {
        return subject;
    }

    public int getAverageScore() {
        return averageScore;
    }
}
