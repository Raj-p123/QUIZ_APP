package com.quizapp.quiz_backend.repository;

import com.quizapp.quiz_backend.model.Quiz;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface QuizRepository extends JpaRepository<Quiz, Long> {

    // Teacher
    List<Quiz> findByTeacherId(Long teacherId);

    // Student - list
    List<Quiz> findByPublishedTrue();

    // Student - overview (SAFE)
    Optional<Quiz> findByIdAndPublishedTrue(Long id);
    
    List<Quiz> findTop5ByOrderByIdDesc();
}
