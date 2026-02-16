package com.quizapp.quiz_backend.service;

import com.quizapp.quiz_backend.dto.*;
import com.quizapp.quiz_backend.model.*;
import com.quizapp.quiz_backend.repository.*;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TeacherQuizService {

    private final QuizRepository quizRepository;
    private final UserRepository userRepository;
    private final CategoryRepository categoryRepository;
    private final QuestionRepository questionRepository;
    private final OptionRepository optionRepository;

    public TeacherQuizService(
            QuizRepository quizRepository,
            UserRepository userRepository,
            CategoryRepository categoryRepository,
            QuestionRepository questionRepository,
            OptionRepository optionRepository
    ) {
        this.quizRepository = quizRepository;
        this.userRepository = userRepository;
        this.categoryRepository = categoryRepository;
        this.questionRepository = questionRepository;
        this.optionRepository = optionRepository;
    }

    // ================= CREATE QUIZ (CLOUDINARY URL ONLY) =================
    public Quiz createQuiz(CreateQuizRequest request) {

        User teacher = userRepository.findById(request.getTeacherId())
                .orElseThrow(() -> new RuntimeException("Teacher not found"));

        if (teacher.getRole() != Role.TEACHER) {
            throw new RuntimeException("Only teachers can create quizzes");
        }

        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Category not found"));

        Quiz quiz = new Quiz();
        quiz.setTitle(request.getTitle());
        quiz.setDescription(request.getDescription());
        quiz.setTeacherId(teacher.getId());
        quiz.setCategory(category);
        quiz.setTimePerQuestionSeconds(request.getTimePerQuestionSeconds());

        // ✅ Cloudinary image URL (already uploaded from frontend)
        quiz.setCoverImageUrl(request.getCoverImageUrl());

        quiz.setPublished(false);

        return quizRepository.save(quiz);
    }

    // ================= LIST QUIZZES =================
    public List<QuizResponse> getQuizzesByTeacher(Long teacherId) {

        User teacher = userRepository.findById(teacherId)
                .orElseThrow(() -> new RuntimeException("Teacher not found"));

        if (teacher.getRole() != Role.TEACHER) {
            throw new RuntimeException("User is not a teacher");
        }

        return quizRepository.findByTeacherId(teacherId)
                .stream()
                .map(quiz -> {
                    QuizResponse dto = new QuizResponse();
                    dto.setId(quiz.getId());
                    dto.setTitle(quiz.getTitle());
                    dto.setDescription(quiz.getDescription());
                    dto.setTimePerQuestionSeconds(quiz.getTimePerQuestionSeconds());
                    dto.setPublished(quiz.isPublished());
                    dto.setCreatedAt(quiz.getCreatedAt());
                    dto.setCategoryName(quiz.getCategory().getName());
                    dto.setCoverImageUrl(quiz.getCoverImageUrl());
                    return dto;
                })
                .collect(Collectors.toList());
    }

    // ================= ADD QUESTION =================
    public QuestionResponse addQuestionToQuiz(CreateQuestionRequest request) {

        Quiz quiz = quizRepository.findById(request.getQuizId())
                .orElseThrow(() -> new RuntimeException("Quiz not found"));

        if (quiz.isPublished()) {
            throw new RuntimeException("Cannot add questions to a published quiz");
        }

        Question question = new Question();
        question.setQuestionText(request.getQuestionText());
        question.setTimeLimitSeconds(request.getTimeLimitSeconds());
        question.setQuiz(quiz);

        Question saved = questionRepository.save(question);

        QuestionResponse response = new QuestionResponse();
        response.setId(saved.getId());
        response.setQuestionText(saved.getQuestionText());
        response.setQuizId(quiz.getId());

        return response;
    }

    // ================= ADD OPTION =================
    public OptionResponse addOptionToQuestion(CreateOptionRequest request) {

        Question question = questionRepository.findById(request.getQuestionId())
                .orElseThrow(() -> new RuntimeException("Question not found"));

        if (request.isCorrect()) {
            boolean alreadyHasCorrect =
                    optionRepository.existsByQuestionIdAndCorrectTrue(request.getQuestionId());

            if (alreadyHasCorrect) {
                throw new RuntimeException("Correct option already exists for this question");
            }
        }

        Option option = new Option();
        option.setOptionText(request.getOptionText());
        option.setCorrect(request.isCorrect());
        option.setQuestion(question);

        Option saved = optionRepository.save(option);

        OptionResponse response = new OptionResponse();
        response.setId(saved.getId());
        response.setOptionText(saved.getOptionText());
        response.setCorrect(saved.isCorrect());

        return response;
    }

    // ================= LIST QUESTIONS =================
    public List<QuestionWithOptionsResponse> getQuestionsByQuiz(Long quizId) {

        quizRepository.findById(quizId)
                .orElseThrow(() -> new RuntimeException("Quiz not found"));

        return questionRepository.findByQuizId(quizId)
                .stream()
                .map(question -> {

                    QuestionWithOptionsResponse qDto = new QuestionWithOptionsResponse();
                    qDto.setId(question.getId());
                    qDto.setQuestionText(question.getQuestionText());

                    List<OptionResponse> options = optionRepository
                            .findByQuestionId(question.getId())
                            .stream()
                            .map(option -> {
                                OptionResponse oDto = new OptionResponse();
                                oDto.setId(option.getId());
                                oDto.setOptionText(option.getOptionText());
                                oDto.setCorrect(option.isCorrect());
                                return oDto;
                            })
                            .collect(Collectors.toList());

                    qDto.setOptions(options);
                    return qDto;
                })
                .collect(Collectors.toList());
    }

    // ================= PUBLISH QUIZ =================
    public void publishQuiz(Long quizId) {

        Quiz quiz = quizRepository.findById(quizId)
                .orElseThrow(() -> new RuntimeException("Quiz not found"));

        if (quiz.isPublished()) {
            throw new RuntimeException("Quiz already published");
        }

        List<Question> questions = questionRepository.findByQuizId(quizId);

        if (questions.isEmpty()) {
            throw new RuntimeException("Quiz must have at least one question");
        }

        for (Question question : questions) {

            if (question.getTimeLimitSeconds() <= 0) {
                throw new RuntimeException("Each question must have a valid time limit");
            }

            List<Option> options = optionRepository.findByQuestionId(question.getId());

            if (options.size() < 2) {
                throw new RuntimeException("Each question must have at least 2 options");
            }

            long correctCount = options.stream()
                    .filter(Option::isCorrect)
                    .count();

            if (correctCount != 1) {
                throw new RuntimeException(
                        "Each question must have exactly one correct option"
                );
            }
        }

        quiz.setPublished(true);
        quizRepository.save(quiz);
    }

    // ================= DELETE QUIZ =================
    public void deleteQuiz(Long quizId) {

        Quiz quiz = quizRepository.findById(quizId)
                .orElseThrow(() -> new RuntimeException("Quiz not found"));

        if (quiz.isPublished()) {
            throw new RuntimeException("Cannot delete a published quiz");
        }

        List<Question> questions = questionRepository.findByQuizId(quizId);

        for (Question question : questions) {
            optionRepository.deleteAll(
                    optionRepository.findByQuestionId(question.getId())
            );
        }

        questionRepository.deleteAll(questions);
        quizRepository.delete(quiz);
    }

    // ================= DELETE QUESTION =================
    public void deleteQuestion(Long questionId) {

        Question question = questionRepository.findById(questionId)
                .orElseThrow(() -> new RuntimeException("Question not found"));

        if (question.getQuiz().isPublished()) {
            throw new RuntimeException("Cannot delete question from published quiz");
        }

        optionRepository.deleteAll(
                optionRepository.findByQuestionId(questionId)
        );

        questionRepository.delete(question);
    }

    // ================= GET QUIZ BY ID =================
    public QuizResponse getQuizById(Long quizId) {

        Quiz quiz = quizRepository.findById(quizId)
                .orElseThrow(() -> new RuntimeException("Quiz not found"));

        QuizResponse dto = new QuizResponse();
        dto.setId(quiz.getId());
        dto.setTitle(quiz.getTitle());
        dto.setDescription(quiz.getDescription());
        dto.setTimePerQuestionSeconds(quiz.getTimePerQuestionSeconds());
        dto.setPublished(quiz.isPublished());
        dto.setCreatedAt(quiz.getCreatedAt());
        dto.setCategoryName(quiz.getCategory().getName());
        dto.setCoverImageUrl(quiz.getCoverImageUrl());

        return dto;
    }
}
