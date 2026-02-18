import { Component, OnInit } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { StudentService } from '../services/student-service';

@Component({
  selector: 'app-subject-analytics',
  standalone: true,
  imports: [BaseChartDirective],
  template: `
    <div class="widget-card">
      <h3>Subject Strength</h3>
      <canvas baseChart
        [data]="radarData"
        chartType="radar">
      </canvas>
    </div>
  `
})
export class SubjectAnalyticsComponent implements OnInit {

  radarData: any = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'Strength',
        backgroundColor: 'rgba(14,165,233,0.3)',
        borderColor: '#0ea5e9'
      }
    ]
  };

  constructor(private studentService: StudentService) {}

  ngOnInit(): void {
    const studentId = localStorage.getItem('studentId');

    if (studentId) {
      this.studentService.getSubjectAnalytics(studentId).subscribe(data => {

        const labels = data.map((d: any) => d.subject);
        const scores = data.map((d: any) => d.averageScore);

        this.radarData = {
          labels: labels,
          datasets: [
            {
              data: scores,
              label: 'Strength',
              backgroundColor: 'rgba(14,165,233,0.3)',
              borderColor: '#0ea5e9'
            }
          ]
        };
      });
    }
  }
}
