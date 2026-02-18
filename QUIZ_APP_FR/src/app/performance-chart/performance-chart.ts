import { Component, OnInit } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { StudentService } from '../services/student-service';

@Component({
  selector: 'app-performance-chart',
  standalone: true,
  imports: [BaseChartDirective],
  template: `
    <div class="widget-card">
      <h3>Performance Progress</h3>
      <canvas baseChart
        [data]="chartData"
        chartType="line">
      </canvas>
    </div>
  `
})
export class PerformanceChartComponent implements OnInit {

  chartData: any = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'Score %',
        borderColor: '#6366f1',
        backgroundColor: 'rgba(99,102,241,0.2)',
        fill: true
      }
    ]
  };

  constructor(private studentService: StudentService) {}

  ngOnInit(): void {
    const studentId = localStorage.getItem('studentId');

    if (studentId) {
      this.studentService.getPerformance(studentId).subscribe(data => {
        this.chartData = {
          labels: data.labels,
          datasets: [
            {
              data: data.scores,
              label: 'Score %',
              borderColor: '#6366f1',
              backgroundColor: 'rgba(99,102,241,0.2)',
              fill: true
            }
          ]
        };
      });
    }
  }
}
