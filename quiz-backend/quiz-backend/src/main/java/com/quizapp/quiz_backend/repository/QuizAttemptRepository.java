package com.quizapp.quiz_backend.repository;

import com.quizapp.quiz_backend.model.QuizAttempt;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface QuizAttemptRepository extends JpaRepository<QuizAttempt, Long> {

    // ================= QUIZ BASED =================

    // Get all attempts of a specific quiz
    List<QuizAttempt> findByQuizId(Long quizId);

    // Get attempts of one quiz ordered by score DESC (Top scores)
    List<QuizAttempt> findByQuizIdOrderByScoreDesc(Long quizId);

    // Count attempts of quiz
    long countByQuizId(Long quizId);

    // Average score of quiz
    @Query("""
        SELECT AVG(qa.score) FROM QuizAttempt qa
        WHERE qa.quiz.id = :quizId
    """)
    Double findAverageScoreByQuizId(@Param("quizId") Long quizId);

    // Highest score
    @Query("""
        SELECT MAX(qa.score) FROM QuizAttempt qa
        WHERE qa.quiz.id = :quizId
    """)
    Integer findHighestScoreByQuizId(@Param("quizId") Long quizId);

    // Lowest score
    @Query("""
        SELECT MIN(qa.score) FROM QuizAttempt qa
        WHERE qa.quiz.id = :quizId
    """)
    Integer findLowestScoreByQuizId(@Param("quizId") Long quizId);

    // ================= STUDENT BASED =================

    List<QuizAttempt> findByStudentId(Long studentId);

    List<QuizAttempt> findByStudentIdOrderByIdAsc(Long studentId);

    List<QuizAttempt> findByStudentIdOrderBySubmittedAtDesc(Long studentId);

    // 🔥 VERY IMPORTANT (for overview page)
    List<QuizAttempt> findByStudentIdAndQuizIdOrderBySubmittedAtAsc(
            Long studentId,
            Long quizId
    );

    // ================= TEACHER =================

    @Query("""
        SELECT qa FROM QuizAttempt qa
        WHERE qa.quiz.teacherId = :teacherId
    """)
    List<QuizAttempt> findAllByTeacherId(@Param("teacherId") Long teacherId);

    // ================= ANALYTICS =================

    @Query("""
        SELECT qa.quiz.category.name, AVG(qa.score)
        FROM QuizAttempt qa
        WHERE qa.student.id = :studentId
        GROUP BY qa.quiz.category.name
    """)
    List<Object[]> findAverageScoreByCategory(@Param("studentId") Long studentId);

    // ================= LEADERBOARD =================

    @Query("""
        SELECT qa.student.name,
               AVG(qa.score),
               COUNT(qa.id),
               MAX(qa.score)
        FROM QuizAttempt qa
        GROUP BY qa.student.id, qa.student.name
        ORDER BY AVG(qa.score) DESC
    """)
    List<Object[]> getLeaderboardData();
    
    
    
    Optional<QuizAttempt> findById(Long id);
    
    

}	