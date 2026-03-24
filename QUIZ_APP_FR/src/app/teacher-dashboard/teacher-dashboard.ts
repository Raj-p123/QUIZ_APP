import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ApiService } from '../services/api.service';

/* Lucide Icons */
import { LucideAngularModule, BookOpen, Users, BarChart3, Clock, AlertCircle } from 'lucide-angular';

@Component({
  selector: 'app-teacher-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, LucideAngularModule],
  templateUrl: './teacher-dashboard.html',
  styleUrls: ['./teacher-dashboard.css']
})
export class TeacherDashboard implements OnInit {

  teacherName = 'Smruti Ranjan';

  quizzes: any[] = [];

  stats: any = {
    activeQuizzes: 0,
    totalAttempts: 0,
    underModeration: 0,
    totalQuizzes: 0
  };

  readonly icons = {
    BookOpen,
    Users,
    BarChart3,
    Clock,
    AlertCircle
  };

  constructor(
    private api: ApiService,
    public router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    console.log("🚀 Dashboard Loaded");

    // 🔥 IMPORTANT: delay execution
    setTimeout(() => {
      this.loadDashboardData();
    }, 0);
  }

  getTeacherId(): number {
    try {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      return user?.id || 1;
    } catch {
      return 1;
    }
  }

  loadDashboardData(): void {

    const teacherId = this.getTeacherId();

    console.log("📡 Loading dashboard for teacher:", teacherId);

    // ================= QUIZZES =================
    this.api.getLatestTeacherQuizzes(teacherId).subscribe({
      next: (data) => {

        console.log("📚 Quizzes API:", data);

        this.quizzes = data ? [...data] : [];

        // 🔥 delay UI update
        setTimeout(() => {
          this.cdr.detectChanges();
        }, 0);
      },
      error: (err) => {
        console.error("❌ Quiz API error:", err);
      }
    });

    // ================= STATS =================
    this.api.getTeacherDashboardStats(teacherId).subscribe({
      next: (data) => {

        console.log("📊 Stats API:", data);

        this.stats = data || this.stats;

        // 🔥 delay UI update
        setTimeout(() => {
          this.cdr.detectChanges();
        }, 0);
      },
      error: (err) => {
        console.error("❌ Stats API error:", err);
      }
    });
  }

  logout(): void {
    this.router.navigate(['/'], { replaceUrl: true });
  }

  goToDashboard(): void {
    this.router.navigate(['/teacher-dashboard']);
  }
}