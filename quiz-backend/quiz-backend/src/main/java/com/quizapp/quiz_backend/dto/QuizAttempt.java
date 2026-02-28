package com.quizapp.quiz_backend.dto;

import java.time.LocalDateTime;

import com.quizapp.quiz_backend.model.Quiz;
import com.quizapp.quiz_backend.model.User;

public class QuizAttempt {

    private Long id;
    private Quiz quiz;
    private User student;
    private Integer score;
    private LocalDateTime startedAt;
    private LocalDateTime submittedAt;
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public Quiz getQuiz() {
		return quiz;
	}
	public void setQuiz(Quiz quiz) {
		this.quiz = quiz;
	}
	public User getStudent() {
		return student;
	}
	public void setStudent(User student) {
		this.student = student;
	}
	public Integer getScore() {
		return score;
	}
	public void setScore(Integer score) {
		this.score = score;
	}
	public LocalDateTime getStartedAt() {
		return startedAt;
	}
	public void setStartedAt(LocalDateTime startedAt) {
		this.startedAt = startedAt;
	}
	public LocalDateTime getSubmittedAt() {
		return submittedAt;
	}
	public void setSubmittedAt(LocalDateTime submittedAt) {
		this.submittedAt = submittedAt;
	}
	@Override
	public String toString() {
		return "QuizAttempt [id=" + id + ", quiz=" + quiz + ", student=" + student + ", score=" + score + ", startedAt="
				+ startedAt + ", submittedAt=" + submittedAt + ", getId()=" + getId() + ", getQuiz()=" + getQuiz()
				+ ", getStudent()=" + getStudent() + ", getScore()=" + getScore() + ", getStartedAt()=" + getStartedAt()
				+ ", getSubmittedAt()=" + getSubmittedAt() + ", getClass()=" + getClass() + ", hashCode()=" + hashCode()
				+ ", toString()=" + super.toString() + "]";
	}

    // ❌ NO answers field here
}
