package com.quizapp.quiz_backend.dto;

import java.util.List;

public class TeacherQuizDetailedResult {

    private int totalAttempts;
    private double averageScore;
    private List<TopStudentDTO> topStudents;
    private List<QuestionStatDTO> questionStats;

    public TeacherQuizDetailedResult() {
    }

    public int getTotalAttempts() {
        return totalAttempts;
    }

    public void setTotalAttempts(int totalAttempts) {
        this.totalAttempts = totalAttempts;
    }

    public double getAverageScore() {
        return averageScore;
    }

    public void setAverageScore(double averageScore) {
        this.averageScore = averageScore;
    }

    public List<TopStudentDTO> getTopStudents() {
        return topStudents;
    }

    public void setTopStudents(List<TopStudentDTO> topStudents) {
        this.topStudents = topStudents;
    }

    public List<QuestionStatDTO> getQuestionStats() {
        return questionStats;
    }

    public void setQuestionStats(List<QuestionStatDTO> questionStats) {
        this.questionStats = questionStats;
    }
}
