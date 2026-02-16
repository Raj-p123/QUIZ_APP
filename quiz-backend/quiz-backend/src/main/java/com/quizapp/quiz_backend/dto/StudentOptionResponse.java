package com.quizapp.quiz_backend.dto;

public class StudentOptionResponse {

    private Long id;
    private String optionText;

    public StudentOptionResponse(Long id, String optionText) {
        this.id = id;
        this.optionText = optionText;
    }

    public Long getId() {
        return id;
    }

    public String getOptionText() {
        return optionText;
    }
}
