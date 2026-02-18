package com.quizapp.quiz_backend.dto;


public class StreakDTO {

    private int currentStreak;
    private int longestStreak;

    public StreakDTO(int currentStreak, int longestStreak) {
        this.currentStreak = currentStreak;
        this.longestStreak = longestStreak;
    }

    public int getCurrentStreak() {
        return currentStreak;
    }

    public int getLongestStreak() {
        return longestStreak;
    }
}

