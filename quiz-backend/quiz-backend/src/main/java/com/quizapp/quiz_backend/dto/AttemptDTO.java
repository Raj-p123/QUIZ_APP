package com.quizapp.quiz_backend.dto;

import java.time.LocalDateTime;

public class AttemptDTO {

    private Long id;
    private LocalDateTime date;
    private Integer score;

    // ✅ THIS MUST MATCH YOUR SERVICE CALL
    public AttemptDTO(Long id, LocalDateTime date, Integer score) {
        this.id = id;
        this.date = date;
        this.score = score;
    }

    // ===== Getters =====

    public Long getId() {
        return id;
    }

    public LocalDateTime getDate() {
        return date;
    }

    public Integer getScore() {
        return score;
    }
}