import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // ================= DASHBOARD =================
  getDashboardData(studentId: number): Observable<any> {
    return this.http.get(
      `${this.apiUrl}/api/student/dashboard/${studentId}`
    );
  }

  getDashboardStats(studentId: any): Observable<any> {
    return this.http.get(
      `${this.apiUrl}/api/student/dashboard-stats/${studentId}`
    );
  }

  // ================= AVAILABLE QUIZZES =================
  getAvailableQuizzes(): Observable<any[]> {

    const headers = new HttpHeaders({
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0'
    });

    return this.http.get<any[]>(
      `${this.apiUrl}/api/student/quizzes`,
      { headers }
    );
  }

  // ================= QUIZ OVERVIEW =================
  getQuizOverview(quizId: number): Observable<any> {

    const userData = localStorage.getItem('user');
    const user = userData ? JSON.parse(userData) : null;

    const studentId = user?.id || 0;

    return this.http.get<any>(
      `${this.apiUrl}/api/student/quizzes/${quizId}/overview?studentId=${studentId}`
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

  // ================= RECOMMENDED QUIZZES =================
  getRecommendedQuizzes(): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.apiUrl}/api/student/recommended`
    );
  }

  // ================= DAILY CHALLENGE (NEW 🔥) =================
  getDailyChallenge(): Observable<any> {
  return this.http.get<any>(
    `${this.apiUrl}/api/student/daily-challenge`
  );
}

  // ================= LEADERBOARD =================
  getLeaderboard(): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.apiUrl}/api/student/leaderboard`
    );
  }

  // ================= PERFORMANCE =================
  getPerformance(studentId: any): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}/api/student/performance/${studentId}`
    );
  }

  // ================= SUBJECT ANALYTICS =================
  getSubjectAnalytics(studentId: any): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.apiUrl}/api/student/subject-analytics/${studentId}`
    );
  }

  // ================= NOTIFICATIONS =================
  getNotifications(studentId: number): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.apiUrl}/api/student/notifications/${studentId}`
    );
  }

  // ================= ACHIEVEMENTS =================
  getAchievements(studentId: number): Observable<string[]> {
    return this.http.get<string[]>(
      `${this.apiUrl}/api/student/achievements/${studentId}`
    );
  }

  // ================= RECENT ACTIVITY =================
  getActivity(studentId: number): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.apiUrl}/api/student/activity/${studentId}`
    );
  }

  // ================= STUDENT CLASSES =================
  getClasses(studentId: number): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.apiUrl}/api/student/classes/${studentId}`
    );
  }

  getStudentClasses(studentId: number): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}/api/student/classes/${studentId}`
    );
  }

  // ================= QUIZ ATTEMPT REVIEW =================
  getAttemptReview(attemptId: number): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.apiUrl}/api/student/attempt-review/${attemptId}`
    );
  }
//================STRAK =================
getStreak(studentId: number){
  return this.http.get<any>(
    `${this.apiUrl}/api/student/streak/${studentId}`
  );
}



// ================= PROGRESS =================
getStudentProgress(studentId: number): Observable<any> {
  return this.http.get<any>(
    `${this.apiUrl}/api/student/progress/${studentId}`
  );
}

}