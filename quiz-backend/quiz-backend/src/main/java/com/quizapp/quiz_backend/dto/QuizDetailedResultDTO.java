package com.quizapp.quiz_backend.dto;

import java.util.List;

public class QuizDetailedResultDTO {

    private Long totalAttempts;
    private Double averageScore;
    private List<TopStudentDTO> topStudents;
    private List<QuestionAnalysisDTO> questionAnalysis;

    public QuizDetailedResultDTO(
            Long totalAttempts,
            Double averageScore,
            List<TopStudentDTO> topStudents,
            List<QuestionAnalysisDTO> questionAnalysis
    ) {
        this.totalAttempts = totalAttempts;
        this.averageScore = averageScore;
        this.topStudents = topStudents;
        this.questionAnalysis = questionAnalysis;
    }

    public Long getTotalAttempts() { return totalAttempts; }
    public Double getAverageScore() { return averageScore; }
    public List<TopStudentDTO> getTopStudents() { return topStudents; }
    public List<QuestionAnalysisDTO> getQuestionAnalysis() { return questionAnalysis; }
}
