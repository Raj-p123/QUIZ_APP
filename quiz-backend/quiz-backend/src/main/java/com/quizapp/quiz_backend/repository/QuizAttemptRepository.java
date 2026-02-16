package com.quizapp.quiz_backend.repository;

import com.quizapp.quiz_backend.model.QuizAttempt;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuizAttemptRepository extends JpaRepository<QuizAttempt, Long> {
}
