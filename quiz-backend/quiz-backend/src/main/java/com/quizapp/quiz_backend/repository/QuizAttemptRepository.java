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
    
    
    
    
    List<QuizAttempt> findByStudentIdOrderByIdAsc(Long studentId);

    // 🔥 ADD THIS
    @Query("""
        SELECT q.quiz.category.name, AVG(q.score)
        FROM QuizAttempt q
        WHERE q.student.id = :studentId
        GROUP BY q.quiz.category.name
    """)
    List<Object[]> findAverageScoreByCategory(@Param("studentId") Long studentId);
    
    
    
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

    	
    	
    	List<QuizAttempt> findByStudentId(Long studentId);

    	
    	List<QuizAttempt> findByStudentIdOrderBySubmittedAtDesc(Long studentId);

    	
    	

    
    
}
