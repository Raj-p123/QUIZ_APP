package com.quizapp.quiz_backend.repository;

import com.quizapp.quiz_backend.model.QuizAttempt;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface QuizAttemptRepository extends JpaRepository<QuizAttempt, Long> {

    // ✅ Get all attempts of a specific quiz
    List<QuizAttempt> findByQuizId(Long quizId);

    // ✅ Get all attempts of all quizzes created by a teacher
    @Query("""
        SELECT qa FROM QuizAttempt qa
        WHERE qa.quiz.teacherId = :teacherId
    """)
    List<QuizAttempt> findAllByTeacherId(@Param("teacherId") Long teacherId);

    // ✅ Get attempts of one quiz ordered by score DESC (for Top 5)
    List<QuizAttempt> findByQuizIdOrderByScoreDesc(Long quizId);

    // ✅ Count attempts of quiz
    long countByQuizId(Long quizId);

    // ✅ Average score of quiz
    @Query("""
        SELECT AVG(qa.score) FROM QuizAttempt qa
        WHERE qa.quiz.id = :quizId
    """)
    Double findAverageScoreByQuizId(@Param("quizId") Long quizId);

    // ✅ Highest score
    @Query("""
        SELECT MAX(qa.score) FROM QuizAttempt qa
        WHERE qa.quiz.id = :quizId
    """)
    Integer findHighestScoreByQuizId(@Param("quizId") Long quizId);

    // ✅ Lowest score
    @Query("""
        SELECT MIN(qa.score) FROM QuizAttempt qa
        WHERE qa.quiz.id = :quizId
    """)
    Integer findLowestScoreByQuizId(@Param("quizId") Long quizId);
}
