import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {

  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // ================= AUTH =================
  login(data: any) {
    return this.http.post(`${this.baseUrl}/api/auth/login`, data);
  }

  // ================= TEACHER QUIZZES =================
  getTeacherQuizzes(teacherId: number): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.baseUrl}/api/teacher/quizzes/teacher/${teacherId}`
    );
  }

  publishQuiz(quizId: number) {
  return this.http.put(
    `${this.baseUrl}/api/teacher/quizzes/${quizId}/publish`,
    {},
    { responseType: 'text' }   // 👈 IMPORTANT
  );
}


  // ✅ REQUIRED METHOD (THIS FIXES YOUR ERROR)
  deleteQuiz(quizId: number) {
    return this.http.delete(
      `${this.baseUrl}/api/teacher/quizzes/${quizId}`
    );
  }
}
