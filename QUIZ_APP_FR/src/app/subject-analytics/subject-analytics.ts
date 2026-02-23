import { Component, OnInit } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { StudentService } from '../services/student-service';
import { AuthService } from '../services/auth';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-subject-analytics',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  template: `
    <div class="widget-card">
      <h3>Subject Strength</h3>

      <div *ngIf="radarData.labels.length === 0" class="empty-state">
        No subject data available.
      </div>

      <canvas *ngIf="radarData.labels.length > 0"
              baseChart
              [data]="radarData"
              [options]="radarOptions"
              chartType="radar">
      </canvas>
    </div>
  `
})
export class SubjectAnalyticsComponent implements OnInit {

  radarData: any = {
    labels: [],
    datasets: []
  };

  radarOptions = {
    responsive: true,
    scales: {
      r: {
        min: 0,
        max: 100
      }
    }
  };

  constructor(
    private studentService: StudentService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const studentId = this.authService.getCurrentUserId();

    if (studentId) {
      this.loadSubjectData(studentId);
    }
  }

  loadSubjectData(studentId: number) {
    this.studentService.getSubjectAnalytics(studentId).subscribe({
      next: (data: any[]) => {

        if (!data || data.length === 0) return;

        // ✅ Convert average raw score to percentage
        const percentageScores = data.map(d =>
          Math.round((d.averageScore / 20) * 100)
        );

        this.radarData = {
          labels: data.map(d => d.subject),
          datasets: [
            {
              data: percentageScores,
              label: 'Subject Strength %',
              backgroundColor: 'rgba(14,165,233,0.3)',
              borderColor: '#0ea5e9',
              borderWidth: 2,
              pointBackgroundColor: '#0ea5e9'
            }
          ]
        };
      }
    });
  }
}