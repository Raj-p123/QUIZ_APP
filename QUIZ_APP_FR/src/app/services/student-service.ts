import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // ================= DASHBOARD (FUTURE) =================
  getDashboardData(studentId: number) {
    return this.http.get(
      `${this.apiUrl}/api/student/dashboard/${studentId}`
    );
  }

  // ================= AVAILABLE QUIZZES =================
  getAvailableQuizzes(): Observable<any[]> {
  // 2. Define headers to bypass browser caching
  const headers = new HttpHeaders({
    'Cache-Control': 'no-cache, no-store, must-revalidate, post-check=0, pre-check=0',
    'Pragma': 'no-cache',
    'Expires': '0'
  });

  return this.http.get<any[]>(
    `${this.apiUrl}/api/student/quizzes`, 
    { headers } // 3. Pass the headers here
  );
}

  // ================= QUIZ OVERVIEW (NEW 🔥) =================
  getQuizOverview(quizId: number): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}/api/student/quizzes/${quizId}/overview`
    );
  }

  getQuizQuestions(quizId: number): Observable<any[]> {
  return this.http.get<any[]>(
    `${this.apiUrl}/api/student/quizzes/${quizId}/play`
  );

  
}
// ================= SUBMIT QUIZ =================
submitQuiz(payload: any): Observable<any> {
  return this.http.post(
    `${this.apiUrl}/api/student/quizzes/submit`,
    payload
  );
}


}
