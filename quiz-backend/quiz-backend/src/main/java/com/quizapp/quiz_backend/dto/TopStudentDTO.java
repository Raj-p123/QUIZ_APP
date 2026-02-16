package com.quizapp.quiz_backend.dto;

public class TopStudentDTO {

    private String studentName;
    private Integer score;

    // ✅ Default constructor
    public TopStudentDTO() {
    }

    // ✅ Required constructor for service usage
    public TopStudentDTO(String studentName, Integer score) {
        this.studentName = studentName;
        this.score = score;
    }

    // ================= GETTERS & SETTERS =================

    public String getStudentName() {
        return studentName;
    }

    public void setStudentName(String studentName) {
        this.studentName = studentName;
    }

    public Integer getScore() {
        return score;
    }

    public void setScore(Integer score) {
        this.score = score;
    }
}
