import { Component, Input, OnChanges } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { CommonModule } from '@angular/common';
import { Attempt } from '../models/attempt';

@Component({
  selector: 'app-performance-chart',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  template: `
    <div class="widget-card">
      <h3>Performance Progress</h3>

      <div *ngIf="chartData.labels.length === 0">
        No data available
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
export class PerformanceChartComponent implements OnChanges {

  @Input() data: Attempt[] = [];

  chartData: any = {
    labels: [],
    datasets: []
  };

  chartOptions = {
    responsive: true,
    scales: {
      y: { min: 0, max: 100 }
    }
  };

  ngOnChanges(): void {
    if (!this.data || this.data.length === 0) return;

    this.chartData = {
      labels: this.data.map(d => d.quizTitle),
      datasets: [
        {
          data: this.data.map(d => d.percentage),
          label: 'Best Score %',
          borderColor: '#6366f1',
          backgroundColor: 'rgba(99,102,241,0.2)',
          fill: true,
          tension: 0.4
        }
      ]
    };
  }
}