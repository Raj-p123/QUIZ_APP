package com.quizapp.quiz_backend.dto;

public class DailyChallengeDTO {

    private Long id;
    private String title;
    private int questionCount;
    private int duration;

    public DailyChallengeDTO(Long id, String title, int questionCount, int duration) {
        this.id = id;
        this.title = title;
        this.questionCount = questionCount;
        this.duration = duration;
    }

    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public int getQuestionCount() {
        return questionCount;
    }

    public int getDuration() {
        return duration;
    }
}