package com.quizapp.quiz_backend.service;

import com.quizapp.quiz_backend.dto.*;
import com.quizapp.quiz_backend.model.Question;
import com.quizapp.quiz_backend.model.Quiz;
import com.quizapp.quiz_backend.model.QuizAttempt;
import com.quizapp.quiz_backend.repository.AttemptAnswerRepository;
import com.quizapp.quiz_backend.repository.QuizAttemptRepository;
import com.quizapp.quiz_backend.repository.QuizRepository;
import com.quizapp.quiz_backend.repository.QuestionRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class TeacherResultService {

    private final QuizRepository quizRepository;
    private final QuizAttemptRepository quizAttemptRepository;
    private final AttemptAnswerRepository attemptAnswerRepository;
    private final QuestionRepository questionRepository;

    public TeacherResultService(
            QuizRepository quizRepository,
            QuizAttemptRepository quizAttemptRepository,
            AttemptAnswerRepository attemptAnswerRepository,
            QuestionRepository questionRepository
    ) {
        this.quizRepository = quizRepository;
        this.quizAttemptRepository = quizAttemptRepository;
        this.attemptAnswerRepository = attemptAnswerRepository;
        this.questionRepository = questionRepository;
    }

    // =========================================================
    // 1️⃣ MAIN RESULTS PAGE
    // =========================================================

    public List<TeacherQuizResultSummary> getTeacherQuizResults(Long teacherId) {

        List<Quiz> quizzes = quizRepository.findByTeacherId(teacherId);
        List<TeacherQuizResultSummary> results = new ArrayList<>();

        for (Quiz quiz : quizzes) {

            long attempts = quizAttemptRepository.countByQuizId(quiz.getId());
            Double avg = quizAttemptRepository.findAverageScoreByQuizId(quiz.getId());
            Integer high = quizAttemptRepository.findHighestScoreByQuizId(quiz.getId());
            Integer low = quizAttemptRepository.findLowestScoreByQuizId(quiz.getId());

            int totalMarks = questionRepository.countByQuizId(quiz.getId()); // ✅ NEW

            double averageScore = avg == null ? 0 : avg;
            double averagePercentage = totalMarks == 0
                    ? 0
                    : Math.round(((averageScore * 100.0) / totalMarks) * 100.0) / 100.0; // ✅ NEW

            TeacherQuizResultSummary dto = new TeacherQuizResultSummary();
            dto.setQuizId(quiz.getId());
            dto.setTitle(quiz.getTitle());
            dto.setTotalAttempts((int) attempts);
            dto.setAverageScore(averageScore);
            dto.setHighestScore(high == null ? 0 : high);
            dto.setLowestScore(low == null ? 0 : low);
            dto.setTotalMarks(totalMarks); // ✅ NEW
            dto.setAveragePercentage(averagePercentage); // ✅ NEW
            dto.setPublished(quiz.isPublished());

            results.add(dto);
        }

        return results;
    }


    // =========================================================
    // 2️⃣ QUIZ DETAILED RESULT
    // =========================================================

    public TeacherQuizDetailedResult getQuizDetailedResult(Long quizId) {

        long totalAttempts = quizAttemptRepository.countByQuizId(quizId);
        Double avgScore = quizAttemptRepository.findAverageScoreByQuizId(quizId);
        Integer high = quizAttemptRepository.findHighestScoreByQuizId(quizId);
        Integer low = quizAttemptRepository.findLowestScoreByQuizId(quizId);

        int totalMarks = questionRepository.countByQuizId(quizId);

        double averageScore = avgScore == null ? 0 : avgScore;

        double averagePercentage = totalMarks == 0
                ? 0
                : (averageScore * 100.0) / totalMarks;

        // Top students
        List<QuizAttempt> topAttempts =
                quizAttemptRepository.findByQuizIdOrderByScoreDesc(quizId);

        List<TopStudentDTO> topStudents = new ArrayList<>();

        for (int i = 0; i < Math.min(5, topAttempts.size()); i++) {
            QuizAttempt attempt = topAttempts.get(i);

            topStudents.add(
                    new TopStudentDTO(
                            attempt.getStudent().getName(),
                            attempt.getScore()
                    )
            );
        }

        // Question analysis
        List<Question> questions = questionRepository.findByQuizId(quizId);
        List<QuestionAnalysisDTO> analysisList = new ArrayList<>();

        for (Question question : questions) {

            long totalAnswers =
                    attemptAnswerRepository.countByQuestionId(question.getId());

            long correctAnswers =
                    attemptAnswerRepository.countByQuestionIdAndCorrectTrue(question.getId());

            double correctPercent = totalAnswers == 0
                    ? 0
                    : (correctAnswers * 100.0) / totalAnswers;

            double wrongPercent = 100 - correctPercent;

            analysisList.add(new QuestionAnalysisDTO(
                    question.getId(),
                    question.getQuestionText(),
                    correctPercent,
                    wrongPercent
            ));
        }

        return new TeacherQuizDetailedResult(
                totalAttempts,
                averageScore,
                high == null ? 0 : high,
                low == null ? 0 : low,
                totalMarks,
                averagePercentage,
                topStudents,
                analysisList
        );
    }
}
