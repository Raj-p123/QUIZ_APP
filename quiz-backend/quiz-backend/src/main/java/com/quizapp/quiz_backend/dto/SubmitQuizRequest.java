package com.quizapp.quiz_backend.dto;

import java.util.List;

public class SubmitQuizRequest {

    private Long quizId;

    // 🔥 NEW FIELD (REQUIRED)
    private Long studentId;

    private List<Answer> answers;

    // ================= GETTERS & SETTERS =================

    public Long getQuizId() {
        return quizId;
    }

    public void setQuizId(Long quizId) {
        this.quizId = quizId;
    }

    public Long getStudentId() {
        return studentId;
    }

    public void setStudentId(Long studentId) {
        this.studentId = studentId;
    }

    public List<Answer> getAnswers() {
        return answers;
    }

    public void setAnswers(List<Answer> answers) {
        this.answers = answers;
    }

    // ================= INNER ANSWER CLASS =================

    public static class Answer {

        private Long questionId;
        private Long optionId;

        public Long getQuestionId() {
            return questionId;
        }

        public void setQuestionId(Long questionId) {
            this.questionId = questionId;
        }

        public Long getOptionId() {
            return optionId;
        }

        public void setOptionId(Long optionId) {
            this.optionId = optionId;
        }
    }
}
