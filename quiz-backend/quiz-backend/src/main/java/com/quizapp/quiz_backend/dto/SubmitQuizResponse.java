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

    // ================= QUESTION REVIEW =================

    public static class QuestionReview {

        private String questionText;
        private String type;
        private List<OptionReview> options;
        private Long selectedOptionId;
        private String studentAnswer;
        private String correctAnswer;

        public QuestionReview(
                String questionText,
                String type,
                List<OptionReview> options,
                Long selectedOptionId,
                String studentAnswer,
                String correctAnswer
        ) {
            this.questionText = questionText;
            this.type = type;
            this.options = options;
            this.selectedOptionId = selectedOptionId;
            this.studentAnswer = studentAnswer;
            this.correctAnswer = correctAnswer;
        }

        public String getQuestionText() {
            return questionText;
        }

        public String getType() {
            return type;
        }

        public List<OptionReview> getOptions() {
            return options;
        }

        public Long getSelectedOptionId() {
            return selectedOptionId;
        }

        public String getStudentAnswer() {
            return studentAnswer;
        }

        public String getCorrectAnswer() {
            return correctAnswer;
        }
    }

    // ================= OPTION REVIEW =================

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