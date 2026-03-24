package com.quizapp.quiz_backend.dto;

public class TeacherGlobalLeaderboardDTO {

    private int rank;
    private String studentName;
    private int totalScore;

    public TeacherGlobalLeaderboardDTO(int rank, String studentName, int totalScore) {
        this.rank = rank;
        this.studentName = studentName;
        this.totalScore = totalScore;
    }

    public int getRank() {
        return rank;
    }

    public String getStudentName() {
        return studentName;
    }

    public int getTotalScore() {
        return totalScore;
    }
}