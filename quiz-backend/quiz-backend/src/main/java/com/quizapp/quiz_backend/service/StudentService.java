package com.quizapp.quiz_backend.service;

import com.quizapp.quiz_backend.dto.*;
import com.quizapp.quiz_backend.model.*;
import com.quizapp.quiz_backend.repository.*;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.ArrayList;
import java.util.stream.Collectors;

@Service
public class StudentService {

    private final QuizRepository quizRepository;
    private final QuizAttemptRepository quizAttemptRepository;
    private final AttemptAnswerRepository attemptAnswerRepository;
    private final UserRepository userRepository;

    public StudentService(
            QuizRepository quizRepository,
            QuizAttemptRepository quizAttemptRepository,
            AttemptAnswerRepository attemptAnswerRepository,
            UserRepository userRepository
    ) {
        this.quizRepository = quizRepository;
        this.quizAttemptRepository = quizAttemptRepository;
        this.attemptAnswerRepository = attemptAnswerRepository;
        this.userRepository = userRepository;
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
    public StudentQuizOverviewResponse getQuizOverview(Long quizId) {
        Quiz quiz = quizRepository.findByIdAndPublishedTrue(quizId)
                .orElseThrow(() -> new RuntimeException("Quiz not found or not published"));

        int totalQuestions = quiz.getQuestions() != null ? quiz.getQuestions().size() : 0;

        return new StudentQuizOverviewResponse(
                quiz.getId(),
                quiz.getTitle(),
                quiz.getDescription(),
                totalQuestions,
                quiz.getTimePerQuestionSeconds(),
                0,
                null
        );
    }

    // ================= PLAY QUIZ =================
    public List<StudentQuestionResponse> getQuizQuestions(Long quizId) {
        Quiz quiz = quizRepository.findByIdAndPublishedTrue(quizId)
                .orElseThrow(() -> new RuntimeException("Quiz not found or not published"));

        return quiz.getQuestions()
                .stream()
                .map(q -> new StudentQuestionResponse(
                        q.getId(),
                        q.getQuestionText(),
                        q.getTimeLimitSeconds(),
                        q.getOptions()
                                .stream()
                                .map(o -> new StudentOptionResponse(
                                        o.getId(),
                                        o.getOptionText()
                                ))
                                .collect(Collectors.toList())
                ))
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

        // Create attempt
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

            // 🔥 Safety Check: Try to find the selected option only if an ID was provided
            Option selected = null;
            if (ans.getOptionId() != null && ans.getOptionId() > 0) {
                selected = question.getOptions().stream()
                        .filter(o -> o.getId().equals(ans.getOptionId()))
                        .findFirst()
                        .orElse(null);
            }

            // If an option was actually selected, save it and check if correct
            if (selected != null) {
                AttemptAnswer attemptAnswer = new AttemptAnswer();
                attemptAnswer.setAttempt(attempt);
                attemptAnswer.setQuestion(question);
                attemptAnswer.setSelectedOption(selected);
                attemptAnswerRepository.save(attemptAnswer);

                if (selected.isCorrect()) {
                    score++;
                }
            }

            // Build review options for the frontend
            List<SubmitQuizResponse.OptionReview> optionReviews = question.getOptions().stream()
                    .map(o -> new SubmitQuizResponse.OptionReview(
                            o.getId(),
                            o.getOptionText(),
                            o.isCorrect()
                    ))
                    .collect(Collectors.toList());

            reviewList.add(new SubmitQuizResponse.QuestionReview(
                    question.getQuestionText(),
                    optionReviews,
                    ans.getOptionId() // This carries the user's choice (or null/-1) back to UI
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
}