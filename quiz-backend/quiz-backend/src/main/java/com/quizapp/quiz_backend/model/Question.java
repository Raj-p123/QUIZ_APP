package com.quizapp.quiz_backend.model;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "questions")
public class Question {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "question_text", nullable = false, length = 1000)
    private String questionText;

    // ✅ Time limit per question (seconds)
    @Column(name = "time_limit_seconds", nullable = false)
    private int timeLimitSeconds;

    @Column(name = "question_order")
    private Integer questionOrder;

    // ================= RELATIONSHIPS =================

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "quiz_id", nullable = false)
    private Quiz quiz;

    // 🔥 REQUIRED FOR PLAY QUIZ
    @OneToMany(
        mappedBy = "question",
        fetch = FetchType.LAZY,
        cascade = CascadeType.ALL,
        orphanRemoval = true
    )
    private List<Option> options;

    // ================= GETTERS & SETTERS =================

    public Long getId() {
        return id;
    }

    public String getQuestionText() {
        return questionText;
    }

    public void setQuestionText(String questionText) {
        this.questionText = questionText;
    }

    public int getTimeLimitSeconds() {
        return timeLimitSeconds;
    }

    public void setTimeLimitSeconds(int timeLimitSeconds) {
        this.timeLimitSeconds = timeLimitSeconds;
    }

    public Integer getQuestionOrder() {
        return questionOrder;
    }

    public void setQuestionOrder(Integer questionOrder) {
        this.questionOrder = questionOrder;
    }

    public Quiz getQuiz() {
        return quiz;
    }

    public void setQuiz(Quiz quiz) {
        this.quiz = quiz;
    }

    // ✅ THIS FIXES THE ERROR
    public List<Option> getOptions() {
        return options;
    }

    public void setOptions(List<Option> options) {
        this.options = options;
    }
}
