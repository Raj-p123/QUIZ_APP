import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
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
    RouterModule,
    PerformanceChartComponent,
    SubjectAnalyticsComponent,
  ],
  templateUrl: './student-dashboard.html',
  styleUrl: './student-dashboard.css',
})
export class StudentDashboard implements OnInit {
studentName = '';
  attemptedQuizzes = 0;
  averageScore = 0;
  highestScore = 0;

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
    });
  }

  loadDashboardStats(): void {
    const studentId = localStorage.getItem('studentId');

    if (studentId) {
      this.studentService.getDashboardStats(studentId).subscribe({
        next: (data) => {
          this.attemptedQuizzes = data.attempted;
          this.averageScore = data.averageScore;
          this.highestScore = data.highestScore;
        }
      });
    }
  }

  loadAvailableQuizzes(): void {
    this.studentService.getAvailableQuizzes().subscribe({
      next: (data) => {
        const mapped = data.map((q: any) => ({
          id: q.id,
          title: q.title,
          details: `${q.questionCount} Qs • ${q.timePerQuestionSeconds}s/q`,
          coverImageUrl: q.coverImageUrl
        }));

        this.dashboardDataSubject.next({
          totalAvailable: mapped.length,
          visibleQuizzes: mapped.slice(0, 4)
        });
      }
    });
  }

  loadRecommendedQuizzes(): void {
    this.studentService.getRecommendedQuizzes().subscribe({
      next: (data) => {
        this.recommended = data.map((q: any) => ({
          id: q.id,
          title: q.title,
          time: q.questionCount + ' Questions',
          coverImageUrl: q.coverImageUrl
        }));
      }
    });
  }

  startQuiz(id: number): void {
    this.router.navigate(['/student/quiz', id, 'overview']);
  }

  viewAllQuizzes(): void {
    this.router.navigate(['/student/quizzes']);
  }

  openProfile(): void {
    this.router.navigate(['/profile']);
  }
}