import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-streak-card',
  standalone: true,
  template: `
    <div class="stat-card-modern">
      <div class="stat-icon-box">🔥</div>
      <div class="stat-content">
        <span class="stat-label">Streak</span>
        <span class="stat-value">{{ streak }} Days</span>
      </div>
    </div>
  `
})
export class StreakCardComponent {
  @Input() streak!: number;
}
