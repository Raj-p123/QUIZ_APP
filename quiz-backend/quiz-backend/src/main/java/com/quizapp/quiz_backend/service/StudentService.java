package com.quizapp.quiz_backend.service;

import com.quizapp.quiz_backend.dto.*;
import com.quizapp.quiz_backend.model.Quiz;
import com.quizapp.quiz_backend.model.Question;
import com.quizapp.quiz_backend.model.Option;
import com.quizapp.quiz_backend.model.User;
import com.quizapp.quiz_backend.model.QuizAttempt;
import com.quizapp.quiz_backend.model.AttemptAnswer;
import com.quizapp.quiz_backend.model.ClassRoom;
import com.quizapp.quiz_backend.repository.*;
import org.springframework.stereotype.Service;


import com.quizapp.quiz_backend.dto.RecommendedQuizDTO;




import java.time.LocalDateTime;
import java.util.List;
import java.util.ArrayList;
import java.util.Collections;
import java.util.stream.Collectors;

@Service
public class StudentService {

    private final QuizRepository quizRepository;
    private final QuizAttemptRepository quizAttemptRepository;
    private final AttemptAnswerRepository attemptAnswerRepository;
    private final UserRepository userRepository;
    private final ClassRepository classRepository;

    public StudentService(
            QuizRepository quizRepository,
            QuizAttemptRepository quizAttemptRepository,
            AttemptAnswerRepository attemptAnswerRepository,
            UserRepository userRepository,
            ClassRepository classRepository
    ) {
        this.quizRepository = quizRepository;
        this.quizAttemptRepository = quizAttemptRepository;
        this.attemptAnswerRepository = attemptAnswerRepository;
        this.userRepository = userRepository;
        this.classRepository = classRepository;
    }


    // ================= AVAILABLE QUIZZES =================
    public List<StudentQuizResponse> getPublishedQuizzes() {
        return quizRepository.findByPublishedTrue()
                .stream()
                .map(q -> new StudentQuizResponse(
                        q.getId(),
                        q.getTitle(),
                        q.getQuestions() != null ? q.getQuestions().size() : 0,
                        q.getTimePerQuestionSeconds(),
                        q.getCoverImageUrl()
                ))
                .collect(Collectors.toList());
    }

    // ================= QUIZ OVERVIEW =================
    public StudentQuizOverviewResponse getQuizOverview(Long quizId, Long studentId) {

        Quiz quiz = quizRepository.findByIdAndPublishedTrue(quizId)
                .orElseThrow(() -> new RuntimeException("Quiz not found or not published"));

        int totalQuestions = quiz.getQuestions() != null
                ? quiz.getQuestions().size()
                : 0;

        List<QuizAttempt> attempts =
                quizAttemptRepository.findByStudentIdAndQuizIdOrderBySubmittedAtAsc(
                        studentId,
                        quizId
                );

        List<AttemptDTO> history = attempts.stream()
                .map(a -> new AttemptDTO(
                		a.getId(), 
                        a.getSubmittedAt(),
                        a.getScore()
                ))
                .toList();

        Integer lastScore = attempts.isEmpty()
                ? null
                : attempts.get(attempts.size() - 1).getScore();

        return new StudentQuizOverviewResponse(
                quiz.getId(),
                quiz.getTitle(),
                quiz.getDescription(),
                totalQuestions,
                quiz.getTimePerQuestionSeconds(),
                attempts.size(),
                lastScore,
                history
        );
    }

 // ================= PLAY QUIZ =================
    public List<StudentQuestionResponse> getQuizQuestions(Long quizId) {

        Quiz quiz = quizRepository.findByIdAndPublishedTrue(quizId)
                .orElseThrow(() -> new RuntimeException("Quiz not found or not published"));

        List<Question> shuffledQuestions = new ArrayList<>(quiz.getQuestions());
        Collections.shuffle(shuffledQuestions);

        return shuffledQuestions.stream()
                .map(q -> {

                    List<StudentOptionResponse> optionResponses = new ArrayList<>();

                    // Only MCQ / TRUE_FALSE should send options
                    if (q.getType() != null &&
                            (q.getType().name().equals("MCQ")
                            || q.getType().name().equals("TRUE_FALSE"))) {

                        if (q.getOptions() != null) {

                            List<Option> shuffledOptions = new ArrayList<>(q.getOptions());
                            Collections.shuffle(shuffledOptions);

                            optionResponses = shuffledOptions.stream()
                                    .map(o -> new StudentOptionResponse(
                                            o.getId(),
                                            o.getOptionText()
                                    ))
                                    .collect(Collectors.toList());
                        }
                    }

                    return new StudentQuestionResponse(
                            q.getId(),
                            q.getQuestionText(),
                            q.getTimeLimitSeconds(),
                            q.getType(),
                            optionResponses
                    );

                })
                .collect(Collectors.toList());
    }

 // ================= SUBMIT QUIZ =================
    public SubmitQuizResponse submitQuiz(SubmitQuizRequest request) {

        if (request.getAnswers() == null) {
            throw new RuntimeException("No answers submitted");
        }

        Quiz quiz = quizRepository.findById(request.getQuizId())
                .orElseThrow(() -> new RuntimeException("Quiz not found"));

        User student = userRepository.findById(request.getStudentId())
                .orElseThrow(() -> new RuntimeException("Student not found"));

        QuizAttempt attempt = new QuizAttempt();
        attempt.setQuiz(quiz);
        attempt.setStudent(student);
        attempt.setStartedAt(LocalDateTime.now());
        attempt.setSubmittedAt(LocalDateTime.now());
        attempt.setScore(0);
        quizAttemptRepository.save(attempt);

        int score = 0;
        List<SubmitQuizResponse.QuestionReview> reviewList = new ArrayList<>();

        for (SubmitQuizRequest.Answer ans : request.getAnswers()) {

            Question question = quiz.getQuestions().stream()
                    .filter(q -> q.getId().equals(ans.getQuestionId()))
                    .findFirst()
                    .orElse(null);

            if (question == null) continue;

            boolean correct = false;

            // ================= MCQ / TRUE_FALSE =================
            if (ans.getOptionId() != null) {

                Option selected = question.getOptions().stream()
                        .filter(o -> o.getId().equals(ans.getOptionId()))
                        .findFirst()
                        .orElse(null);

                if (selected != null) {

                    AttemptAnswer attemptAnswer = new AttemptAnswer();
                    attemptAnswer.setAttempt(attempt);
                    attemptAnswer.setQuestion(question);
                    attemptAnswer.setSelectedOption(selected);
                    attemptAnswer.setCorrect(selected.isCorrect());

                    attemptAnswerRepository.save(attemptAnswer);

                    correct = selected.isCorrect();

                    if (correct) score++;
                }
            }

         // ================= FILL BLANK =================
            if (ans.getTextAnswer() != null && question.getCorrectAnswer() != null) {

                String studentAnswer = ans.getTextAnswer().trim().toLowerCase();
                String correctAnswer = question.getCorrectAnswer().trim().toLowerCase();

                correct = studentAnswer.equals(correctAnswer);

                AttemptAnswer attemptAnswer = new AttemptAnswer();
                attemptAnswer.setAttempt(attempt);
                attemptAnswer.setQuestion(question);
                attemptAnswer.setSelectedOption(null);

                // 🔥 STORE STUDENT ANSWER
                attemptAnswer.setTextAnswer(ans.getTextAnswer());

                attemptAnswer.setCorrect(correct);

                attemptAnswerRepository.save(attemptAnswer);

                if (correct) score++;
            }

            List<SubmitQuizResponse.OptionReview> optionReviews =
                    question.getOptions().stream()
                            .map(o -> new SubmitQuizResponse.OptionReview(
                                    o.getId(),
                                    o.getOptionText(),
                                    o.isCorrect()
                            ))
                            .collect(Collectors.toList());

            reviewList.add(new SubmitQuizResponse.QuestionReview(
                    question.getQuestionText(),
                    optionReviews,
                    ans.getOptionId()
            ));
        }

        attempt.setScore(score);
        quizAttemptRepository.save(attempt);

        return new SubmitQuizResponse(
                score,
                quiz.getQuestions().size(),
                reviewList
        );
    }
    
    
    
    public List<RecommendedQuizDTO> getRecommendedQuizzes() {

        return quizRepository.findTop5ByOrderByIdDesc()
                .stream()
                .map(q -> new RecommendedQuizDTO(
                        q.getId(),
                        q.getTitle(),
                        q.getCoverImageUrl(),
                        q.getQuestions().size()
                ))
                .collect(Collectors.toList());
    }
    
    
    
    public StreakDTO getStreak(Long studentId) {

        User user = userRepository.findById(studentId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return new StreakDTO(
                user.getCurrentStreak(),
                user.getLongestStreak()
        );
    }

    
    
    public PerformanceDTO getPerformance(Long studentId) {

        List<QuizAttempt> attempts = quizAttemptRepository
                .findByStudentIdOrderByIdAsc(studentId);

        List<String> labels = new ArrayList<>();
        List<Integer> scores = new ArrayList<>();

        int count = 1;
        for (QuizAttempt attempt : attempts) {
            labels.add("Quiz " + count++);
            scores.add(attempt.getScore());
        }

        return new PerformanceDTO(labels, scores);
    }

    
    public List<SubjectAnalyticsDTO> getSubjectAnalytics(Long studentId) {

        List<Object[]> results =
                quizAttemptRepository.findAverageScoreByCategory(studentId);

        return results.stream()
                .map(obj -> new SubjectAnalyticsDTO(
                        (String) obj[0],
                        ((Double) obj[1]).intValue()
                ))
                .toList();
    }

    
    public List<NotificationDTO> getNotifications(Long studentId) {

        return List.of(
                new NotificationDTO("New quiz added: Java Basics"),
                new NotificationDTO("You reached top 10%"),
                new NotificationDTO("Result published")
        );
    }

    
    
    
    public List<LeaderboardDTO> getLeaderboard() {

        List<Object[]> results = quizAttemptRepository.getLeaderboardData();
        List<LeaderboardDTO> leaderboard = new ArrayList<>();

        int rank = 1;

        for (Object[] row : results) {

            String name = (String) row[0];
            Double avgScore = (Double) row[1];
            Long attempts = (Long) row[2];
            Integer highest = (Integer) row[3];

            leaderboard.add(
                    new LeaderboardDTO(
                            rank++,
                            name,
                            Math.round(avgScore * 100.0) / 100.0,
                            attempts.intValue(),
                            highest
                    )
            );
        }

        return leaderboard;
    }

    
    
    
    public DashboardStatsDTO getDashboardStats(Long studentId) {

        List<QuizAttempt> attempts =
                quizAttemptRepository.findByStudentId(studentId);

        if (attempts.isEmpty()) {
            return new DashboardStatsDTO(0, 0, 0);
        }

        int attempted = attempts.size();

        int highest = attempts.stream()
                .mapToInt(QuizAttempt::getScore)
                .max()
                .orElse(0);

        double average = attempts.stream()
                .mapToInt(QuizAttempt::getScore)
                .average()
                .orElse(0);

        return new DashboardStatsDTO(
                attempted,
                Math.round(average * 10.0) / 10.0,
                highest
        );
    }

    
    
    
    
    public List<ActivityDTO> getStudentActivity(Long studentId) {

        List<QuizAttempt> attempts =
                quizAttemptRepository.findByStudentIdOrderBySubmittedAtDesc(studentId);

        return attempts.stream().map(a -> {

            int total = a.getQuiz().getQuestions().size();

            String result = (a.getScore() >= total * 0.5)
                    ? "PASS"
                    : "FAIL";

            return new ActivityDTO(
                    a.getQuiz().getTitle(),
                    a.getSubmittedAt(),
                    a.getScore(),
                    total,
                    result
            );

        }).toList();
    }


    
    public List<ClassDTO> getStudentClasses(Long studentId) {

        List<ClassRoom> classes =
                classRepository.findByStudents_Id(studentId);

        return classes.stream().map(c ->
                new ClassDTO(
                        c.getId(),
                        c.getClassName(),
                        c.getTeacher().getName(),
                        c.getClassCode(),
                        c.getQuizzes() != null
                                ? c.getQuizzes().size()
                                : 0
                )
        ).toList();
    }

    
    
    
 // ================= ACHIEVEMENTS =================
    public List<String> getAchievements(Long studentId) {

        List<QuizAttempt> attempts =
                quizAttemptRepository.findByStudentId(studentId);

        List<String> achievements = new ArrayList<>();

        if (attempts.isEmpty()) {
            return achievements;
        }

        // 🎉 First Attempt Badge
        achievements.add("First Quiz Completed 🎉");

        // 🧠 Explorer Badge
        if (attempts.size() >= 5) {
            achievements.add("Quiz Explorer 🧠");
        }

        // 🏆 High Score Badge
        for (QuizAttempt attempt : attempts) {
            int total = attempt.getQuiz().getQuestions().size();
            int percentage = (attempt.getScore() * 100) / total;

            if (percentage >= 80) {
                achievements.add("High Scorer 🏆");
                break;
            }
        }

        // 🔥 Consistency Badge (3 consecutive attempts)
        if (attempts.size() >= 3) {
            achievements.add("Consistent Learner 🔥");
        }

        return achievements;
    }

    
    
    
    
    
    
    
    public List<AttemptReviewDTO> getAttemptReview(Long attemptId) {

        QuizAttempt attempt = quizAttemptRepository.findById(attemptId)
                .orElseThrow(() -> new RuntimeException("Attempt not found"));

        return attempt.getAnswers().stream()
                .map(answer -> {

                    Question question = answer.getQuestion();

                    List<OptionReviewDTO> options =
                            question.getOptions().stream()
                                    .map(o -> new OptionReviewDTO(
                                            o.getId(),
                                            o.getOptionText(),
                                            o.isCorrect()
                                    ))
                                    .toList();

                    return new AttemptReviewDTO(
                            question.getQuestionText(),
                            options,
                            answer.getSelectedOption() != null
                                    ? answer.getSelectedOption().getId()
                                    : null
                    );
                })
                .toList();
    }
    
}

