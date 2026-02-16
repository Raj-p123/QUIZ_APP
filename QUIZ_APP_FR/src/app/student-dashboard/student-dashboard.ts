import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StudentService } from '../services/student-service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-student-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './student-dashboard.html',
  styleUrl: './student-dashboard.css',
})
export class StudentDashboard implements OnInit {

  studentName = 'Alex Chen';
  averageScore = 88;
  highestScore = 95;
  attemptedQuizzes = 4;

  recentHistory = [
    { title: 'Math Basics', score: 92, date: 'April 10, 2026' },
    { title: 'Physics Fundamentals', score: 85, date: 'April 7, 2026' }
  ];

  recommended = [
    { title: 'Advanced Algebra', time: '10 mins', coverImageUrl: null },
    { title: 'Logic Building', time: '8 mins', coverImageUrl: null }
  ];

  leaderboard = [
    { name: 'Emily R.', score: 94 },
    { name: 'John D.', score: 91 },
    { name: 'Alex S.', score: 89 }
  ];

  private dashboardDataSubject = new BehaviorSubject<any>(null);
  dashboardData$ = this.dashboardDataSubject.asObservable();

  constructor(
    private studentService: StudentService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.refreshData();
  }

  refreshData(): void {
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

  goHome(): void {
    this.router.navigate(['/student-dashboard'], { replaceUrl: true });
  }

  handleImageError(event: any) {
  event.target.src = 'assets/default-quiz.jpg';
}

}