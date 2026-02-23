import { CommonModule } from '@angular/common';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { StudentService } from '../services/student-service';
import { PerformanceChartComponent } from '../performance-chart/performance-chart';
import { AuthService } from '../services/auth';
import { SubjectAnalyticsComponent } from "../subject-analytics/subject-analytics";

@Component({
  selector: 'app-activity',
  standalone: true,
  imports: [
    CommonModule,
    PerformanceChartComponent,
    SubjectAnalyticsComponent
],
  templateUrl: './activity.html',
  styleUrl: './activity.css'
})
export class ActivityComponent implements OnInit {

  attempts: any[] = [];
  totalAttempts = 0;
  avgScore = 0;
  highestScore = 0;
  loading = true;

  constructor(
    private studentService: StudentService,
    private authService: AuthService,
    private cd: ChangeDetectorRef   // ✅ injected
  ) {}

  ngOnInit(): void {

    const studentId = this.authService.getCurrentUserId();

    if (!studentId) {
      this.loading = false;
      this.cd.detectChanges();   // ✅ trigger UI update
      return;
    }

    this.studentService.getActivity(studentId).subscribe({
      next: (data: any[]) => {

        if (!data || data.length === 0) {
          this.attempts = [];
          this.loading = false;
          this.cd.detectChanges();   // ✅ important
          return;
        }

        this.attempts = data.map(a => ({
          ...a,
          percentage: Math.round((a.score / a.totalQuestions) * 100)
        }));

        this.totalAttempts = this.attempts.length;

        const percentages = this.attempts.map(a => a.percentage);

        this.avgScore = Math.round(
          percentages.reduce((sum, val) => sum + val, 0) / percentages.length
        );

        this.highestScore = Math.max(...percentages);

        this.loading = false;

        this.cd.detectChanges();   // ✅ VERY IMPORTANT
      },
      error: () => {
        this.loading = false;
        this.cd.detectChanges();   // ✅ also here
      }
    });
  }
}