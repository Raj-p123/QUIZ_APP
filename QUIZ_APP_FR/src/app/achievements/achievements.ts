import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';   // ✅ ADD THIS
import { StudentService } from '../services/student-service';

@Component({
  selector: 'app-achievements',
  standalone: true,
  imports: [CommonModule],   // ✅ ADD THIS
  template: `
    <div class="widget-card">
      <h3>Achievements</h3>

      <div *ngIf="achievements.length > 0">
        <p *ngFor="let a of achievements">{{ a }}</p>
      </div>

      <div *ngIf="achievements.length === 0">
        <p>No achievements yet.</p>
      </div>
    </div>
  `
})
export class AchievementsComponent implements OnInit {

  achievements: string[] = [];

  constructor(private studentService: StudentService) {}

  ngOnInit(): void {
    const studentId = localStorage.getItem('studentId');

    if (studentId) {
      this.studentService.getPerformance(studentId).subscribe(data => {

        const scores = data.scores;

        if (!scores || scores.length === 0) return;

        const maxScore = Math.max(...scores);
        const avgScore = scores.reduce((a: number, b: number) => a + b, 0) / scores.length;

        if (maxScore >= 95) {
          this.achievements.push('🏆 Top Scorer');
        }

        if (avgScore >= 90) {
          this.achievements.push('🎯 90%+ Accuracy');
        }

        if (scores.length >= 5) {
          this.achievements.push('🔥 Consistent Performer');
        }
      });
    }
  }
}
