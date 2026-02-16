package com.quizapp.quiz_backend.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "quizzes")
public class Quiz {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // ================= BASIC INFO =================

    @Column(nullable = false)
    private String title;

    @Column(length = 500)
    private String description;

    // 🖼️ QUIZ COVER IMAGE (NEW)
    // This will store image URL / file path
    @Column(name = "cover_image_url")
    private String coverImageUrl;

    // 🔥 Time per question (seconds)
    @Column(name = "time_per_question_seconds", nullable = false)
    private int timePerQuestionSeconds = 15;

    @Column(name = "teacher_id", nullable = false)
    private Long teacherId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;

    @Column(nullable = false)
    private boolean published = false;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    // ================= RELATIONS =================

    @OneToMany(
        mappedBy = "quiz",
        cascade = CascadeType.ALL,
        orphanRemoval = true
    )
    private List<Question> questions;

    // ================= GETTERS & SETTERS =================

    public Long getId() {
        return id;
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

    // 🖼️ Cover Image
    public String getCoverImageUrl() {
        return coverImageUrl;
    }

    public void setCoverImageUrl(String coverImageUrl) {
        this.coverImageUrl = coverImageUrl;
    }

    public int getTimePerQuestionSeconds() {
        return timePerQuestionSeconds;
    }

    public void setTimePerQuestionSeconds(int timePerQuestionSeconds) {
        this.timePerQuestionSeconds = timePerQuestionSeconds;
    }

    public Long getTeacherId() {
        return teacherId;
    }

    public void setTeacherId(Long teacherId) {
        this.teacherId = teacherId;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public boolean isPublished() {
        return published;
    }

    public void setPublished(boolean published) {
        this.published = published;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public List<Question> getQuestions() {
        return questions;
    }

    public void setQuestions(List<Question> questions) {
        this.questions = questions;
    }
}
