import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // ================= AUTH =================
  login(data: any) {
    return this.http.post(
      `${this.baseUrl}/api/auth/login`,
      data
    );
  }

  // ================= TEACHER QUIZZES =================
  getTeacherQuizzes(teacherId: number): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.baseUrl}/api/teacher/quizzes/teacher/${teacherId}`
    );
  }

  createQuiz(payload: any) {
    return this.http.post(
      `${this.baseUrl}/api/teacher/quizzes`,
      payload
    );
  }

  publishQuiz(quizId: number) {
    return this.http.put(
      `${this.baseUrl}/api/teacher/quizzes/${quizId}/publish`,
      {},
      { responseType: 'text' }
    );
  }

  deleteQuiz(quizId: number) {
    return this.http.delete(
      `${this.baseUrl}/api/teacher/quizzes/${quizId}`
    );
  }

  // ================= QUIZ DETAILS =================
  getQuizById(quizId: number) {
    return this.http.get<any>(
      `${this.baseUrl}/api/teacher/quizzes/${quizId}`
    );
  }

  // ================= QUESTIONS =================
  getQuestionsByQuiz(quizId: number) {
    return this.http.get<any[]>(
      `${this.baseUrl}/api/teacher/quizzes/${quizId}/questions`
    );
  }

  // ✅ UPDATED: supports time per question
  addQuestion(payload: {
    quizId: number;
    questionText: string;
    timeLimitSeconds: number;
  }) {
    return this.http.post(
      `${this.baseUrl}/api/teacher/quizzes/questions`,
      payload
    );
  }

  deleteQuestion(questionId: number) {
    return this.http.delete(
      `${this.baseUrl}/api/teacher/quizzes/questions/${questionId}`
    );
  }

  // ================= OPTIONS =================
  addOption(payload: {
    questionId: number;
    optionText: string;
    correct: boolean;
  }) {
    return this.http.post(
      `${this.baseUrl}/api/teacher/quizzes/options`,
      payload
    );
  }

  // ================= CATEGORIES =================
  getCategories(): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.baseUrl}/api/categories`
    );
  }

  // ==================================================
  // ================= TEACHER RESULTS ================
  // ==================================================

  // Summary page: /results
  getTeacherResults(teacherId: number): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.baseUrl}/api/teacher/results/${teacherId}`
    );
  }

  // Detail page: /results/:quizId
  getQuizDetailedResult(quizId: number): Observable<any> {
    return this.http.get<any>(
      `${this.baseUrl}/api/teacher/results/quiz/${quizId}`
    );
  }
}
