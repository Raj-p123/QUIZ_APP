package com.quizapp.quiz_backend.dto;

import com.quizapp.quiz_backend.model.QuestionType;
import java.util.List;

public class StudentQuestionResponse {

    private Long id;
    private String questionText;
    private int timeLimitSeconds;
    private QuestionType type;
    private List<StudentOptionResponse> options;

    public StudentQuestionResponse(
            Long id,
            String questionText,
            int timeLimitSeconds,
            QuestionType type,
            List<StudentOptionResponse> options
    ) {
        this.id = id;
        this.questionText = questionText;
        this.timeLimitSeconds = timeLimitSeconds;
        this.type = type;
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

    public QuestionType getType() {
        return type;
    }

    public List<StudentOptionResponse> getOptions() {
        return options;
    }
}