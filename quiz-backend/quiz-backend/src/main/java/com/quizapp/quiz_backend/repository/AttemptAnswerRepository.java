package com.quizapp.quiz_backend.repository;

import com.quizapp.quiz_backend.model.AttemptAnswer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AttemptAnswerRepository extends JpaRepository<AttemptAnswer, Long> {
}
