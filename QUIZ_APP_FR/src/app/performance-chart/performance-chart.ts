import { Component, OnInit } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { CommonModule } from '@angular/common';
import { StudentService } from '../services/student-service';
import { AuthService } from '../services/auth';

@Component({
  selector: 'app-performance-chart',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  template: `
    <div class="widget-card">
      <h3>Performance Progress</h3>

      <div *ngIf="chartData.labels.length === 0" class="empty-state">
        No performance data available.
      </div>

      <canvas *ngIf="chartData.labels.length > 0"
              baseChart
              [data]="chartData"
              [options]="chartOptions"
              chartType="line">
      </canvas>
    </div>
  `
})
export class PerformanceChartComponent implements OnInit {

  chartData: any = {
    labels: [],
    datasets: []
  };

  chartOptions = {
    responsive: true,
    scales: {
      y: {
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
      this.loadPerformance(studentId);
    }
  }

  loadPerformance(studentId: number) {
    this.studentService.getPerformance(studentId).subscribe({
      next: (data: any) => {

        if (!data || !data.labels || data.labels.length === 0) return;

        // ✅ Convert raw score to percentage
        const percentageScores = data.scores.map((score: number) =>
          Math.round((score / 20) * 100) // 20 = totalQuestions
        );

        this.chartData = {
          labels: data.labels,
          datasets: [
            {
              data: percentageScores,
              label: 'Score %',
              borderColor: '#6366f1',
              backgroundColor: 'rgba(99,102,241,0.2)',
              fill: true,
              tension: 0.4,
              pointBackgroundColor: '#6366f1'
            }
          ]
        };
      }
    });
  }
}