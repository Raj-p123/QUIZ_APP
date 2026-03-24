package com.quizapp.quiz_backend.service;

import com.quizapp.quiz_backend.dto.*;
import com.quizapp.quiz_backend.model.AttemptAnswer;
import com.quizapp.quiz_backend.model.Question;
import com.quizapp.quiz_backend.model.Quiz;
import com.quizapp.quiz_backend.model.QuizAttempt;
import com.quizapp.quiz_backend.repository.AttemptAnswerRepository;
import com.quizapp.quiz_backend.repository.QuizAttemptRepository;
import com.quizapp.quiz_backend.repository.QuizRepository;
import com.quizapp.quiz_backend.repository.QuestionRepository;
import org.springframework.stereotype.Service;

import java.util.*;

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

            int totalMarks = questionRepository.countByQuizId(quiz.getId());

            double averageScore = avg == null ? 0 : avg;
            double averagePercentage = totalMarks == 0
                    ? 0
                    : Math.round(((averageScore * 100.0) / totalMarks) * 100.0) / 100.0;

            TeacherQuizResultSummary dto = new TeacherQuizResultSummary();
            dto.setQuizId(quiz.getId());
            dto.setTitle(quiz.getTitle());
            dto.setTotalAttempts((int) attempts);
            dto.setAverageScore(averageScore);
            dto.setHighestScore(high == null ? 0 : high);
            dto.setLowestScore(low == null ? 0 : low);
            dto.setTotalMarks(totalMarks);
            dto.setAveragePercentage(averagePercentage);
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
        double averagePercentage = totalMarks == 0 ? 0 : (averageScore * 100.0) / totalMarks;

        // =========================
        // 🔝 Top Students
        // =========================
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

        // =========================
        // 📊 QUESTIONS
        // =========================
        List<Question> questions = questionRepository.findByQuizId(quizId);
        questions.sort(Comparator.comparing(Question::getId));

        // =========================
        // 🔥 BEST ATTEMPT PER STUDENT
        // =========================
        List<QuizAttempt> attempts =
                quizAttemptRepository.findByQuizIdOrderByScoreDesc(quizId);

        Map<Long, QuizAttempt> bestAttempts = new LinkedHashMap<>();

        for (QuizAttempt attempt : attempts) {
            Long studentId = attempt.getStudent().getId();

            if (!bestAttempts.containsKey(studentId)) {
                bestAttempts.put(studentId, attempt);
            }
        }

        List<QuizAttempt> filteredAttempts = new ArrayList<>(bestAttempts.values());

        // =========================
        // 🔥 MATRIX
        // =========================
        List<StudentAnswerMatrixDTO> studentMatrix = new ArrayList<>();

        for (QuizAttempt attempt : filteredAttempts) {

            String studentName = attempt.getStudent().getName();
            List<Boolean> answers = new ArrayList<>();

            List<AttemptAnswer> attemptAnswers =
                    attemptAnswerRepository.findByAttemptId(attempt.getId());

            for (Question question : questions) {

                boolean found = false;

                for (AttemptAnswer ans : attemptAnswers) {
                    if (ans.getQuestion().getId().equals(question.getId())) {
                        answers.add(ans.isCorrect());
                        found = true;
                        break;
                    }
                }

                if (!found) {
                    answers.add(false);
                }
            }

            studentMatrix.add(new StudentAnswerMatrixDTO(studentName, answers));
        }

        // =========================
        // 🔥 QUESTION ANALYSIS (FIXED POSITION)
        // =========================
        List<QuestionAnalysisDTO> analysisList = new ArrayList<>();

        for (Question question : questions) {

            int correctCount = 0;
            int wrongCount = 0;

            for (QuizAttempt attempt : filteredAttempts) {

                List<AttemptAnswer> attemptAnswers =
                        attemptAnswerRepository.findByAttemptId(attempt.getId());

                boolean found = false;

                for (AttemptAnswer ans : attemptAnswers) {
                    if (ans.getQuestion().getId().equals(question.getId())) {

                        if (ans.isCorrect()) correctCount++;
                        else wrongCount++;

                        found = true;
                        break;
                    }
                }

                if (!found) wrongCount++;
            }

            int total = correctCount + wrongCount;

            double correctPercent = total == 0 ? 0 : (correctCount * 100.0) / total;
            double wrongPercent = 100 - correctPercent;

            analysisList.add(new QuestionAnalysisDTO(
                    question.getId(),
                    question.getQuestionText(),
                    correctPercent,
                    wrongPercent,
                    correctCount,
                    wrongCount
            ));
        }

        // =========================
        // FINAL RETURN
        // =========================
        return new TeacherQuizDetailedResult(
                totalAttempts,
                averageScore,
                high == null ? 0 : high,
                low == null ? 0 : low,
                totalMarks,
                averagePercentage,
                topStudents,
                analysisList,
                studentMatrix
        );
    }

    public TeacherDashboardStatsDTO getDashboardStats(Long teacherId) {

        List<Quiz> quizzes = quizRepository.findByTeacherId(teacherId);

        int totalQuizzes = quizzes.size();

        int activeQuizzes = (int) quizzes.stream()
                .filter(Quiz::isPublished)
                .count();

        int underModeration = (int) quizzes.stream()
                .filter(q -> !q.isPublished())
                .count();

        int totalAttempts = quizzes.stream()
                .mapToInt(q -> (int) quizAttemptRepository.countByQuizId(q.getId()))
                .sum();

        TeacherDashboardStatsDTO dto = new TeacherDashboardStatsDTO();
        dto.setActiveQuizzes(activeQuizzes);
        dto.setUnderModeration(underModeration);
        dto.setTotalAttempts(totalAttempts);
        dto.setTotalQuizzes(totalQuizzes);

        return dto;
    }
    
    public List<TeacherLeaderboardDTO> getLeaderboard(Long quizId) {

        List<QuizAttempt> attempts =
                quizAttemptRepository.findByQuizIdOrderByScoreDesc(quizId);

        // 🔥 BEST ATTEMPT PER STUDENT
        Map<Long, QuizAttempt> bestAttempts = new LinkedHashMap<>();

        for (QuizAttempt attempt : attempts) {
            Long studentId = attempt.getStudent().getId();

            if (!bestAttempts.containsKey(studentId)) {
                bestAttempts.put(studentId, attempt);
            }
        }

        List<QuizAttempt> filteredAttempts = new ArrayList<>(bestAttempts.values());

        int totalMarks = questionRepository.countByQuizId(quizId);

        List<TeacherLeaderboardDTO> leaderboard = new ArrayList<>();

        int rank = 1;

        for (QuizAttempt attempt : filteredAttempts) {

            double percentage = totalMarks == 0
                    ? 0
                    : (attempt.getScore() * 100.0) / totalMarks;

            leaderboard.add(new TeacherLeaderboardDTO(
                    rank++,
                    attempt.getStudent().getName(),
                    attempt.getScore(),
                    percentage
            ));
        }

        return leaderboard;
    }
    
    public List<TeacherGlobalLeaderboardDTO> getGlobalLeaderboard() {

        List<QuizAttempt> attempts = quizAttemptRepository.findAll();

        // 🔥 GROUP BY STUDENT → SUM SCORES
        Map<Long, Integer> studentTotalScore = new HashMap<>();
        Map<Long, String> studentNames = new HashMap<>();

        for (QuizAttempt attempt : attempts) {

            Long studentId = attempt.getStudent().getId();
            String name = attempt.getStudent().getName();

            studentNames.put(studentId, name);

            studentTotalScore.put(
                    studentId,
                    studentTotalScore.getOrDefault(studentId, 0) + attempt.getScore()
            );
        }

        // 🔥 CONVERT TO LIST
        List<Map.Entry<Long, Integer>> sortedList =
                new ArrayList<>(studentTotalScore.entrySet());

        // 🔥 SORT DESC
        sortedList.sort((a, b) -> b.getValue() - a.getValue());

        // 🔥 BUILD DTO
        List<TeacherGlobalLeaderboardDTO> leaderboard = new ArrayList<>();

        int rank = 1;

        for (Map.Entry<Long, Integer> entry : sortedList) {

            Long studentId = entry.getKey();
            int totalScore = entry.getValue();

            leaderboard.add(new TeacherGlobalLeaderboardDTO(
                    rank++,
                    studentNames.get(studentId),
                    totalScore
            ));
        }

        return leaderboard;
    }
}