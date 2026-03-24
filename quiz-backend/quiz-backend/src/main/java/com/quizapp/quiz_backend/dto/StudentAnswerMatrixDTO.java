package com.quizapp.quiz_backend.dto;

import java.util.List;

public class StudentAnswerMatrixDTO {

    private String name;
    private List<Boolean> answers;

    public StudentAnswerMatrixDTO() {}

    public StudentAnswerMatrixDTO(String name, List<Boolean> answers) {
        this.name = name;
        this.answers = answers;
    }

    public String getName() {
        return name;
    }

    public List<Boolean> getAnswers() {
        return answers;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setAnswers(List<Boolean> answers) {
        this.answers = answers;
    }
}