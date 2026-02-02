package com.quizapp.quiz_backend.repository;

import com.quizapp.quiz_backend.model.Question;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface QuestionRepository extends JpaRepository<Question, Long> {

    List<Question> findByQuizId(Long quizId);

    // ✅ NEW
    int countByQuizId(Long quizId);
}
