import { CommonModule } from '@angular/common';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { StudentService } from '../services/student-service';
import { PerformanceChartComponent } from '../performance-chart/performance-chart';
import { AuthService } from '../services/auth';
import { SubjectAnalyticsComponent } from "../subject-analytics/subject-analytics";
import { Attempt } from '../models/attempt';

@Component({
  selector: 'app-activity',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    PerformanceChartComponent,
    SubjectAnalyticsComponent
  ],
  templateUrl: './activity.html',
  styleUrl: './activity.css'
})
export class ActivityComponent implements OnInit {

  attempts: Attempt[] = [];

  totalAttempts = 0;
  avgScore = 0;
  highestScore = 0;

  searchText = '';
  trend = 0;
  loading = true;

  constructor(
    private studentService: StudentService,
    private authService: AuthService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadActivity();
  }

  loadActivity() {
    const studentId = this.authService.getCurrentUserId();

    if (!studentId) {
      this.resetData();
      return;
    }

    this.studentService.getActivity(studentId).subscribe({
      next: (data: any[]) => {

        if (!data || data.length === 0) {
          this.resetData();
          return;
        }

        // ✅ ADD %
        const mapped: Attempt[] = data.map(a => ({
          ...a,
          percentage: a.totalQuestions
            ? Math.round((a.score / a.totalQuestions) * 100)
            : 0
        }));

        // ✅ KEEP ONLY BEST PER QUIZ
        const uniqueMap = new Map<string, Attempt>();

        mapped.forEach((a: Attempt) => {
          const existing = uniqueMap.get(a.quizTitle);

          if (!existing || a.percentage > existing.percentage) {
            uniqueMap.set(a.quizTitle, a);
          }
        });

        this.attempts = Array.from(uniqueMap.values());

        // ✅ SORT BEST FIRST
        this.attempts.sort((a, b) => b.percentage - a.percentage);

        this.totalAttempts = this.attempts.length;

        const percentages = this.attempts.map(a => a.percentage);

        this.avgScore = Math.round(
          percentages.reduce((x, y) => x + y, 0) / percentages.length
        );

        this.highestScore = Math.max(...percentages);

        this.trend = percentages.length >= 2
          ? percentages[0] - percentages[1]
          : 0;

        this.loading = false;
        this.cd.detectChanges();
      },

      error: () => {
        this.resetData();
      }
    });
  }

  resetData() {
    this.attempts = [];
    this.totalAttempts = 0;
    this.avgScore = 0;
    this.highestScore = 0;
    this.trend = 0;
    this.loading = false;
    this.cd.detectChanges();
  }

  filteredAttempts(): Attempt[] {
    if (!this.searchText) return this.attempts;

    return this.attempts.filter(a =>
      a.quizTitle.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  getScoreClass(score: number) {
    if (score >= 75) return 'high';
    if (score >= 50) return 'medium';
    return 'low';
  }
}