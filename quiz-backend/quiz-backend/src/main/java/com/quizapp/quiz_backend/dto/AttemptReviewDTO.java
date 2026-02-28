package com.quizapp.quiz_backend.dto;

import java.util.List;

public class AttemptReviewDTO {

    private String question;
    private List<OptionReviewDTO> options;
    private Long selectedOptionId;

    public AttemptReviewDTO(String question,
                            List<OptionReviewDTO> options,
                            Long selectedOptionId) {
        this.question = question;
        this.options = options;
        this.selectedOptionId = selectedOptionId;
    }

    public String getQuestion() { return question; }
    public List<OptionReviewDTO> getOptions() { return options; }
    public Long getSelectedOptionId() { return selectedOptionId; }
}