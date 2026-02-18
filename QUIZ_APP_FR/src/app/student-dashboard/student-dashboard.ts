import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { StudentService } from '../services/student-service';

import { PerformanceChartComponent } from '../performance-chart/performance-chart';
import { AchievementsComponent } from '../achievements/achievements';
import { NotificationsComponent } from '../notifications/notifications';
import { SubjectAnalyticsComponent } from '../subject-analytics/subject-analytics';
import { StreakCardComponent } from '../streak-card/streak-card';

@Component({
  selector: 'app-student-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    PerformanceChartComponent,
    AchievementsComponent,
    NotificationsComponent,
    SubjectAnalyticsComponent,
    StreakCardComponent
  ],
  templateUrl: './student-dashboard.html',
  styleUrl: './student-dashboard.css',
})
export class StudentDashboard implements OnInit {

  studentName = '';
  currentStreak = 5;
  attemptedQuizzes: number = 0;
averageScore: number = 0;
highestScore: number = 0;


  recommended: any[] = [];

 leaderboard: any[] = [];


  private dashboardDataSubject = new BehaviorSubject<any>(null);
  dashboardData$ = this.dashboardDataSubject.asObservable();

  constructor(
    private studentService: StudentService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const name = localStorage.getItem('studentName');
    this.studentName = name ? name : 'Student';

    this.loadAvailableQuizzes();
    this.loadRecommendedQuizzes();
     this.loadDashboardStats();

    this.studentService.getLeaderboard().subscribe(data => {
  this.leaderboard = data;

  this.loadDashboardStats();

});


  }

  // ================= loadDASHBOARD stats =================
  loadDashboardStats(): void {
  const studentId = localStorage.getItem('studentId');

  if (studentId) {
    this.studentService.getDashboardStats(studentId).subscribe({
      next: (data) => {
        console.log("Dashboard Data:", data); 
        this.attemptedQuizzes = data.attempted;
        this.averageScore = data.averageScore;
        this.highestScore = data.highestScore;
      },
      error: (err) => console.error('Error loading dashboard stats', err)
    });
  }
}


  // ================= AVAILABLE QUIZZES =================
  loadAvailableQuizzes(): void {
    this.studentService.getAvailableQuizzes().subscribe({
      next: (data) => {
        const mappedQuizzes = data.map((q: any) => ({
          id: q.id,
          title: q.title,
          details: `${q.questionCount} Qs • ${q.timePerQuestionSeconds}s/q`,
          coverImageUrl: q.coverImageUrl
        }));

        this.dashboardDataSubject.next({
          totalAvailable: mappedQuizzes.length,
          visibleQuizzes: mappedQuizzes.slice(0, 4)
        });
      },
      error: (err) => console.error('Error loading quizzes', err)
    });
  }

  // ================= RECOMMENDED QUIZZES =================
  loadRecommendedQuizzes(): void {
    this.studentService.getRecommendedQuizzes().subscribe({
      next: (data) => {
        this.recommended = data.map(q => ({
          id: q.id,
          title: q.title,
          time: q.questionCount + ' Questions',
          coverImageUrl: q.coverImageUrl
        }));
      },
      error: (err) => console.error('Error loading recommended', err)
    });
  }

  // ================= NAVIGATION =================
  startQuiz(id: number): void {
    this.router.navigate(['/student/quiz', id, 'overview']);
  }

  viewAllQuizzes(): void {
    this.router.navigate(['/student/quizzes']);
  }

  openProfile(): void {
    this.router.navigate(['/profile']);
  }

  goHome(): void {
    this.router.navigate(['/student-dashboard'], { replaceUrl: true });
  }
}
