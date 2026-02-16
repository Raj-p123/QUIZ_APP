package com.quizapp.quiz_backend.dto;

import java.time.LocalDateTime;

public class QuizResponse {

    private Long id;
    private String title;
    private String description;
    private int timePerQuestionSeconds;
    private boolean published;
    private String categoryName;
    private LocalDateTime createdAt;

    // 🖼️ NEW FIELD (REQUIRED)
    private String coverImageUrl;

    // ================= GETTERS & SETTERS =================

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getTimePerQuestionSeconds() {
        return timePerQuestionSeconds;
    }

    public void setTimePerQuestionSeconds(int timePerQuestionSeconds) {
        this.timePerQuestionSeconds = timePerQuestionSeconds;
    }

    public boolean isPublished() {
        return published;
    }

    public void setPublished(boolean published) {
        this.published = published;
    }

    public String getCategoryName() {
        return categoryName;
    }

    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    // 🖼️ NEW
    public String getCoverImageUrl() {
        return coverImageUrl;
    }

    public void setCoverImageUrl(String coverImageUrl) {
        this.coverImageUrl = coverImageUrl;
    }
}
