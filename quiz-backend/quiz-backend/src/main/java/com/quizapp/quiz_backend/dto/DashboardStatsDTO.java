package com.quizapp.quiz_backend.dto;

public class DashboardStatsDTO {

    private int attempted;
    private double averageScore;
    private int highestScore;

    public DashboardStatsDTO(int attempted, double averageScore, int highestScore) {
        this.attempted = attempted;
        this.averageScore = averageScore;
        this.highestScore = highestScore;
    }

    public int getAttempted() { return attempted; }
    public double getAverageScore() { return averageScore; }
    public int getHighestScore() { return highestScore; }
}
