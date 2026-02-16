package com.quizapp.quiz_backend.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "attempt_answers")
public class AttemptAnswer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // 🔹 Link to QuizAttempt
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "attempt_id", nullable = false)
    private QuizAttempt attempt;

    // 🔹 Link to Question
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "question_id", nullable = false)
    private Question question;

    // 🔹 Selected Option
    // 🔥 UPDATED: nullable = true allows the database to save even if a question is skipped
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "selected_option_id", nullable = true)
    private Option selectedOption;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    // ================= Constructor =================
    public AttemptAnswer() {
        this.createdAt = LocalDateTime.now();
    }

    // ================= Getters & Setters =================

    public Long getId() {
        return id;
    }

    public QuizAttempt getAttempt() {
        return attempt;
    }

    public void setAttempt(QuizAttempt attempt) {
        this.attempt = attempt;
    }

    public Question getQuestion() {
        return question;
    }

    public void setQuestion(Question question) {
        this.question = question;
    }

    public Option getSelectedOption() {
        return selectedOption;
    }

    public void setSelectedOption(Option selectedOption) {
        this.selectedOption = selectedOption;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
}