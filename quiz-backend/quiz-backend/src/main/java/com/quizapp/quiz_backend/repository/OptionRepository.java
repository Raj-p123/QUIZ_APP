package com.quizapp.quiz_backend.repository;

import com.quizapp.quiz_backend.model.Option;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OptionRepository extends JpaRepository<Option, Long> {

    // already used
    boolean existsByQuestionIdAndCorrectTrue(Long questionId);

    // already used
    List<Option> findByQuestionId(Long questionId);

    // ✅ NEW (for publish validation)
    int countByQuestionId(Long questionId);

    // ✅ NEW (for publish validation)
    int countByQuestionIdAndCorrectTrue(Long questionId);
}
