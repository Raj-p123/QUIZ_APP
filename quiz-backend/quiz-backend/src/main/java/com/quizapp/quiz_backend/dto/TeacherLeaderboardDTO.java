package com.quizapp.quiz_backend.dto;

public class TeacherLeaderboardDTO {

    private int rank;
    private String studentName;
    private int score;
    private double percentage;

    public TeacherLeaderboardDTO(int rank, String studentName, int score, double percentage) {
        this.rank = rank;
        this.studentName = studentName;
        this.score = score;
        this.percentage = percentage;
    }

    public int getRank() {
        return rank;
    }

    public String getStudentName() {
        return studentName;
    }

    public int getScore() {
        return score;
    }

    public double getPercentage() {
        return percentage;
    }
}