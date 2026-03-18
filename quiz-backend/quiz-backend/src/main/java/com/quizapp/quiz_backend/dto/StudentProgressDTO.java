package com.quizapp.quiz_backend.dto;

public class StudentProgressDTO {

    private int xp;
    private int level;
    private int nextLevelXp;

    public StudentProgressDTO(int xp, int level, int nextLevelXp) {
        this.xp = xp;
        this.level = level;
        this.nextLevelXp = nextLevelXp;
    }

    public int getXp() {
        return xp;
    }

    public int getLevel() {
        return level;
    }

    public int getNextLevelXp() {
        return nextLevelXp;
    }
}