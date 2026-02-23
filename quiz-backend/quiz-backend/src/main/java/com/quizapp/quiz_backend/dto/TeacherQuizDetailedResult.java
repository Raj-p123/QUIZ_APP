package com.quizapp.quiz_backend.dto;

import java.util.List;

public class TeacherQuizDetailedResult {

    private int totalAttempts;
    private double averageScore;
    private int highestScore;
    private int lowestScore;
    private int totalMarks;
    private double averagePercentage;
    private List<TopStudentDTO> topStudents;
    private List<QuestionAnalysisDTO> questionAnalysis;

    public TeacherQuizDetailedResult() {
    }

    public TeacherQuizDetailedResult(
            long totalAttempts,
            double averageScore,
            int highestScore,
            int lowestScore,
            int totalMarks,
            double averagePercentage,
            List<TopStudentDTO> topStudents,
            List<QuestionAnalysisDTO> questionAnalysis
    ) {
        this.totalAttempts = (int) totalAttempts;
        this.averageScore = averageScore;
        this.highestScore = highestScore;
        this.lowestScore = lowestScore;
        this.totalMarks = totalMarks;
        this.averagePercentage = averagePercentage;
        this.topStudents = topStudents;
        this.questionAnalysis = questionAnalysis;
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

    public int getHighestScore() {
        return highestScore;
    }

    public void setHighestScore(int highestScore) {
        this.highestScore = highestScore;
    }

    public int getLowestScore() {
        return lowestScore;
    }

    public void setLowestScore(int lowestScore) {
        this.lowestScore = lowestScore;
    }

    public int getTotalMarks() {
        return totalMarks;
    }

    public void setTotalMarks(int totalMarks) {
        this.totalMarks = totalMarks;
    }

    public double getAveragePercentage() {
        return averagePercentage;
    }

    public void setAveragePercentage(double averagePercentage) {
        this.averagePercentage = averagePercentage;
    }

    public List<TopStudentDTO> getTopStudents() {
        return topStudents;
    }

    public void setTopStudents(List<TopStudentDTO> topStudents) {
        this.topStudents = topStudents;
    }

    public List<QuestionAnalysisDTO> getQuestionAnalysis() {
        return questionAnalysis;
    }

    public void setQuestionAnalysis(List<QuestionAnalysisDTO> questionAnalysis) {
        this.questionAnalysis = questionAnalysis;
    }
}