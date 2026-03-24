import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-teacher-leaderboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './teacher-leaderboard.html',
  styleUrl: './teacher-leaderboard.css'
})
export class TeacherLeaderboardComponent implements OnInit {

  // 🔥 GLOBAL LEADERBOARD
  globalLeaderboard: any[] = [];

  // 🔥 QUIZ-WISE LEADERBOARD
  quizLeaderboard: any[] = [];

  // 🔥 QUIZ LIST (for dropdown)
  quizzes: any[] = [];

  selectedQuizId: number | null = null;

  loadingGlobal = true;
  loadingQuiz = false;

  constructor(
    private api: ApiService,
    private cdr: ChangeDetectorRef // 🔥 ADD THIS
  ) {}

  ngOnInit(): void {
    this.loadGlobalLeaderboard();
    this.loadQuizzes();
  }

  // ================= GLOBAL LEADERBOARD =================
  loadGlobalLeaderboard() {
    this.loadingGlobal = true;

    this.api.getGlobalLeaderboard().subscribe({
      next: (data: any[]) => {
        console.log("Global Leaderboard:", data);

        this.globalLeaderboard = data;
        this.loadingGlobal = false;

        this.cdr.detectChanges(); // 🔥 FORCE UPDATE
      },
      error: (err) => {
        console.error(err);
        this.loadingGlobal = false;
        this.cdr.detectChanges(); // 🔥 SAFE
      }
    });
  }

  // ================= LOAD QUIZ LIST =================
  loadQuizzes() {
    this.api.getTeacherResults(1).subscribe({
      next: (data: any[]) => {
        console.log("Quizzes:", data);

        this.quizzes = data;

        this.cdr.detectChanges(); // 🔥 FIX MAIN ISSUE
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  // ================= ON QUIZ SELECT =================
  onQuizSelect(event: any) {
    const quizId = Number(event.target.value);

    if (!quizId) return;

    this.selectedQuizId = quizId;
    this.loadQuizLeaderboard(quizId);
  }

  // ================= QUIZ LEADERBOARD =================
  loadQuizLeaderboard(quizId: number) {
    this.loadingQuiz = true;

    this.api.getTeacherLeaderboard(quizId).subscribe({
      next: (data: any[]) => {
        console.log("Quiz Leaderboard:", data);

        this.quizLeaderboard = data;
        this.loadingQuiz = false;

        this.cdr.detectChanges(); // 🔥 IMPORTANT
      },
      error: (err) => {
        console.error(err);
        this.loadingQuiz = false;
        this.cdr.detectChanges();
      }
    });
  }

  // ================= HELPERS =================
  getTop3(list: any[]) {
    return list.slice(0, 3);
  }

  getOthers(list: any[]) {
    return list.slice(3);
  }
}