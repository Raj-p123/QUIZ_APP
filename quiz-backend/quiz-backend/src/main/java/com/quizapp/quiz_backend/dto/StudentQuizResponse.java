package com.quizapp.quiz_backend.dto;

public class StudentQuizResponse {

    private Long id;
    private String title;
    private int questionCount;
    private int timePerQuestionSeconds;

    // ✅ ADD THIS
    private String coverImageUrl;

    public StudentQuizResponse(
            Long id,
            String title,
            int questionCount,
            int timePerQuestionSeconds,
            String coverImageUrl
    ) {
        this.id = id;
        this.title = title;
        this.questionCount = questionCount;
        this.timePerQuestionSeconds = timePerQuestionSeconds;
        this.coverImageUrl = coverImageUrl;
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

    public int getTimePerQuestionSeconds() {
        return timePerQuestionSeconds;
    }

    // ✅ ADD THIS
    public String getCoverImageUrl() {
        return coverImageUrl;
    }
}
