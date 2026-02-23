package com.quizapp.quiz_backend.dto;


public class RecommendedQuizDTO {

    private Long id;
    private String title;
    private String coverImageUrl;
    private int questionCount;

    public RecommendedQuizDTO(Long id, String title, String coverImageUrl, int questionCount) {
        this.id = id;
        this.title = title;
        this.coverImageUrl = coverImageUrl;
        this.questionCount = questionCount;
    }

    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getCoverImageUrl() {
        return coverImageUrl;
    }

    public int getQuestionCount() {
        return questionCount;
    }
}

