import { Component, Input, OnChanges } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { CommonModule } from '@angular/common';
import { Attempt } from '../models/attempt';

@Component({
  selector: 'app-subject-analytics',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  template: `
    <div class="widget-card">
      <h3>Subject Strength</h3>

      <div *ngIf="radarData.labels.length === 0" class="empty-state">
        No subject data available
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
export class SubjectAnalyticsComponent implements OnChanges {

  @Input() data: Attempt[] = [];

  radarData: any = {
    labels: [],
    datasets: []
  };

  radarOptions = {
    responsive: true,
    scales: {
      r: {
        min: 0,
        max: 100,
        ticks: {
          stepSize: 20
        }
      }
    },
    plugins: {
      legend: {
        display: true
      }
    }
  };

  ngOnChanges(): void {
    if (!this.data || this.data.length === 0) {
      this.radarData = { labels: [], datasets: [] };
      return;
    }

    const subjectMap: Record<string, number[]> = {};

    this.data.forEach((a: Attempt) => {

      // ✅ FIX: Use subject OR fallback to quizTitle
      const subject = this.getSubjectName(a);

      if (!subjectMap[subject]) {
        subjectMap[subject] = [];
      }

      subjectMap[subject].push(a.percentage);
    });

    const labels = Object.keys(subjectMap);

    const values = labels.map((subject: string) => {
      const arr = subjectMap[subject];
      return Math.round(arr.reduce((x, y) => x + y, 0) / arr.length);
    });

    this.radarData = {
      labels: labels,
      datasets: [
        {
          data: values,
          label: 'Subject Strength %',
          backgroundColor: 'rgba(14,165,233,0.3)',
          borderColor: '#0ea5e9',
          borderWidth: 2,
          pointBackgroundColor: '#0ea5e9'
        }
      ]
    };
  }

  // ✅ SMART SUBJECT DETECTION
  getSubjectName(a: Attempt): string {

    // 1. If backend provides subject
    if (a.subject && a.subject.trim() !== '') {
      return a.subject;
    }

    // 2. Try extract from quiz title
    const title = a.quizTitle?.toLowerCase() || '';

    if (title.includes('java')) return 'Java';
    if (title.includes('python')) return 'Python';
    if (title.includes('dbms')) return 'DBMS';
    if (title.includes('sql')) return 'SQL';
    if (title.includes('c++')) return 'C++';
    if (title.includes('c ')) return 'C';
    if (title.includes('javascript')) return 'JavaScript';
    if (title.includes('html')) return 'HTML';
    if (title.includes('css')) return 'CSS';

    // 3. Fallback → show quiz title
    return a.quizTitle || 'Other';
  }
}