package com.quizapp.quiz_backend.repository;

import com.quizapp.quiz_backend.model.AttemptAnswer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AttemptAnswerRepository extends JpaRepository<AttemptAnswer, Long> {

    // ✅ Get all answers of a specific quiz
    List<AttemptAnswer> findByAttemptQuizId(Long quizId);

    // ✅ Count correct answers of a question
    long countByQuestionIdAndCorrectTrue(Long questionId);

    // ✅ Count total answers of a question
    long countByQuestionId(Long questionId);
}
