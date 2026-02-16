package com.quizapp.quiz_backend.dto;

import java.util.List;

public class StudentQuestionResponse {

    private Long id;
    private String questionText;
    private int timeLimitSeconds;
    private List<StudentOptionResponse> options;

    public StudentQuestionResponse(
            Long id,
            String questionText,
            int timeLimitSeconds,
            List<StudentOptionResponse> options
    ) {
        this.id = id;
        this.questionText = questionText;
        this.timeLimitSeconds = timeLimitSeconds;
        this.options = options;
    }

    public Long getId() {
        return id;
    }

    public String getQuestionText() {
        return questionText;
    }

    public int getTimeLimitSeconds() {
        return timeLimitSeconds;
    }

    public List<StudentOptionResponse> getOptions() {
        return options;
    }
}
