package com.quizapp.quiz_backend.dto;

import java.util.List;

public class SubmitQuizResponse {

    private int score;
    private int totalQuestions;
    private List<QuestionReview> review;

    public SubmitQuizResponse(int score, int totalQuestions, List<QuestionReview> review) {
        this.score = score;
        this.totalQuestions = totalQuestions;
        this.review = review;
    }

    public int getScore() {
        return score;
    }

    public int getTotalQuestions() {
        return totalQuestions;
    }

    public List<QuestionReview> getReview() {
        return review;
    }

    // ================= INNER CLASSES =================

    public static class QuestionReview {

        private String questionText;
        private List<OptionReview> options;
        private Long selectedOptionId;

        public QuestionReview(String questionText,
                              List<OptionReview> options,
                              Long selectedOptionId) {
            this.questionText = questionText;
            this.options = options;
            this.selectedOptionId = selectedOptionId;
        }

        public String getQuestionText() {
            return questionText;
        }

        public List<OptionReview> getOptions() {
            return options;
        }

        public Long getSelectedOptionId() {
            return selectedOptionId;
        }
    }

    public static class OptionReview {

        private Long id;
        private String optionText;
        private boolean correct;

        public OptionReview(Long id, String optionText, boolean correct) {
            this.id = id;
            this.optionText = optionText;
            this.correct = correct;
        }

        public Long getId() {
            return id;
        }

        public String getOptionText() {
            return optionText;
        }

        public boolean isCorrect() {
            return correct;
        }
    }
}
