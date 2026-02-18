package com.quizapp.quiz_backend.dto;

import java.util.List;

public class PerformanceDTO {

    private List<String> labels;
    private List<Integer> scores;

    public PerformanceDTO(List<String> labels, List<Integer> scores) {
        this.labels = labels;
        this.scores = scores;
    }

    public List<String> getLabels() {
        return labels;
    }

    public List<Integer> getScores() {
        return scores;
    }
}
