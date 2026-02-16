package com.quizapp.quiz_backend.dto;

public class CreateQuizRequest {

    private String title;
    private String description;
    private Long teacherId;
    private Long categoryId;
    private int timePerQuestionSeconds;

    // ⭐ Cloudinary image URL
    private String coverImageUrl;

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public Long getTeacherId() { return teacherId; }
    public void setTeacherId(Long teacherId) { this.teacherId = teacherId; }

    public Long getCategoryId() { return categoryId; }
    public void setCategoryId(Long categoryId) { this.categoryId = categoryId; }

    public int getTimePerQuestionSeconds() {
        return timePerQuestionSeconds;
    }
    public void setTimePerQuestionSeconds(int timePerQuestionSeconds) {
        this.timePerQuestionSeconds = timePerQuestionSeconds;
    }

    public String getCoverImageUrl() {
        return coverImageUrl;
    }
    public void setCoverImageUrl(String coverImageUrl) {
        this.coverImageUrl = coverImageUrl;
    }
}
