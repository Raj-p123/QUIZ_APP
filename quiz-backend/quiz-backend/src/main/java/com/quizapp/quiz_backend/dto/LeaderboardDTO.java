package com.quizapp.quiz_backend.dto;

public class LeaderboardDTO {

    private int rank;
    private String name;
    private double averageScore;
    private int totalAttempts;
    private int highestScore;

    public LeaderboardDTO(int rank,
                          String name,
                          double averageScore,
                          int totalAttempts,
                          int highestScore) {
        this.rank = rank;
        this.name = name;
        this.averageScore = averageScore;
        this.totalAttempts = totalAttempts;
        this.highestScore = highestScore;
    }

    public int getRank() { return rank; }
    public String getName() { return name; }
    public double getAverageScore() { return averageScore; }
    public int getTotalAttempts() { return totalAttempts; }
    public int getHighestScore() { return highestScore; }
}
