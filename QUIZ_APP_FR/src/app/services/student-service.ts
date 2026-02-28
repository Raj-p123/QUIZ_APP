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

  const userData = localStorage.getItem('user');
  const user = userData ? JSON.parse(userData) : null;

  if (!user || !user.id) {
    console.error("No logged-in user found!");
    return this.http.get<any>(
      `${this.apiUrl}/api/student/quizzes/${quizId}/overview?studentId=0`
    );
  }

  return this.http.get<any>(
    `${this.apiUrl}/api/student/quizzes/${quizId}/overview?studentId=${user.id}`
  );
}

  // ================= PLAY QUIZ =================
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





getRecommendedQuizzes() {
  return this.http.get<any[]>(
    `${this.apiUrl}/api/student/recommended`
  );
}



getLeaderboard() {
  return this.http.get<any[]>(
    `${this.apiUrl}/api/student/leaderboard`
  );
}


getPerformance(studentId: any) {
  return this.http.get<any>(
    `${this.apiUrl}/api/student/performance/${studentId}`
  );
}

getSubjectAnalytics(studentId: any) {
  return this.http.get<any[]>(
    `${this.apiUrl}/api/student/subject-analytics/${studentId}`
  );
}



getDashboardStats(studentId: any) {
  return this.http.get<any>(
    `${this.apiUrl}/api/student/dashboard-stats/${studentId}`
  );
}



// ================= NOTIFICATIONS =================
getNotifications(studentId: number) {
  return this.http.get<any[]>(
    `${this.apiUrl}/api/student/notifications/${studentId}`
  );
}

// ================= ACHIEVEMENTS =================
getAchievements(studentId: number) {
  return this.http.get<string[]>(
    `${this.apiUrl}/api/student/achievements/${studentId}`
  );
}




getActivity(studentId: number) {
  return this.http.get<any[]>(
    `${environment.apiUrl}/api/student/activity/${studentId}`
  );
}



getClasses(studentId: number) {
  return this.http.get<any[]>(`${this.apiUrl}/api/student/classes/${studentId}`);
}


getStudentClasses(studentId: number) {
  return this.http.get<any>(`/api/student/classes/${studentId}`);
}




getAttemptReview(attemptId: number) {
  return this.http.get<any[]>(
    `${this.apiUrl}/api/student/attempt-review/${attemptId}`
  );
}

}
