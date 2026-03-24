import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, RouterModule, NavigationEnd } from '@angular/router';
import { BehaviorSubject, forkJoin } from 'rxjs';
import { filter } from 'rxjs/operators';
import { StudentService } from '../services/student-service';

@Component({
  selector: 'app-student-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './student-dashboard.html',
  styleUrl: './student-dashboard.css'
})
export class StudentDashboard implements OnInit, OnDestroy {

  studentName = '';

  attemptedQuizzes = 0;
  averageScore = 0;
  highestScore = 0;

  streakDays = 0;
  longestStreak = 0;

  xp = 0;
  nextLevelXp = 1000;
  level = 1;

  dailyChallenge: any = {};

  allLeaderboard: any[] = [];
  visibleLeaderboard: any[] = [];

  refreshInterval: any;

  private dashboardDataSubject = new BehaviorSubject<any>({
    totalAvailable: 0,
    visibleQuizzes: []
  });

  dashboardData$ = this.dashboardDataSubject.asObservable();

  constructor(
    private studentService: StudentService,
    private router: Router
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit(): void {

    const name = localStorage.getItem('studentName');
    this.studentName = name ? name : 'Student';

    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.loadDashboard();
      });

    this.loadDashboard();
    this.loadDailyChallenge();
    this.loadLeaderboard();

    this.refreshInterval = setInterval(() => {
      this.loadStreakOnly();
    }, 5000);
  }

  loadDashboard() {

    const studentId = Number(localStorage.getItem('studentId'));
    if (!studentId) return;

    forkJoin({
      stats: this.studentService.getDashboardStats(studentId),
      progress: this.studentService.getStudentProgress(studentId),
      quizzes: this.studentService.getAvailableQuizzes(),
      streak: this.studentService.getStreak(studentId)
    }).subscribe(res => {

      this.attemptedQuizzes = res.stats.attempted;
      this.averageScore = res.stats.averageScore;
      this.highestScore = res.stats.highestScore;

      this.xp = res.progress.xp;
      this.level = res.progress.level;
      this.nextLevelXp = res.progress.nextLevelXp;

      this.streakDays = res.streak.currentStreak;
      this.longestStreak = res.streak.longestStreak;

      const mapped = res.quizzes.map((q: any) => ({
        id: q.id,
        title: q.title,
        details: `${q.questionCount} Qs • ${q.timePerQuestionSeconds}s/q`,
        coverImageUrl: q.coverImageUrl
      }));

      this.dashboardDataSubject.next({
        totalAvailable: mapped.length,
        visibleQuizzes: mapped.slice(0, 2)
      });

    });
  }

  loadStreakOnly() {
    const studentId = Number(localStorage.getItem('studentId'));
    if (!studentId) return;

    this.studentService.getStreak(studentId)
      .subscribe(data => {
        this.streakDays = data.currentStreak;
        this.longestStreak = data.longestStreak;
      });
  }

  loadDailyChallenge() {
    this.studentService.getDailyChallenge()
      .subscribe(data => {
        this.dailyChallenge = {
          id: data.id,
          title: data.title,
          questions: data.questionCount,
          time: data.duration
        };
      });
  }

  loadLeaderboard() {
    this.studentService.getLeaderboard()
      .subscribe(data => {
        this.allLeaderboard = data;
        this.visibleLeaderboard = this.allLeaderboard.slice(0, 5);
      });
  }

  startQuiz(id: number) {
    this.router.navigate(['/student/quiz', id, 'overview']);
  }

  viewAllQuizzes() {
    this.router.navigate(['/student/quizzes']);
  }

  goToLeaderboard() {
    this.router.navigate(['/leaderboard']);
  }

  ngOnDestroy(): void {
    if (this.refreshInterval) {
      clearInterval(this.refreshInterval);
    }
  }
}