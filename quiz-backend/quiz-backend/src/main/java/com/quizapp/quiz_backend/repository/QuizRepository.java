package com.quizapp.quiz_backend.repository;

import com.quizapp.quiz_backend.model.Quiz;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface QuizRepository extends JpaRepository<Quiz, Long> {

    List<Quiz> findByTeacherId(Long teacherId);
}
