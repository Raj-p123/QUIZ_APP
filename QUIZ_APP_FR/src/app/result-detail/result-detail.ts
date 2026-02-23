import { Component, OnInit, Inject, PLATFORM_ID, ChangeDetectorRef } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-result-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './result-detail.html',
  styleUrl: './result-detail.css'
})
export class ResultDetailComponent implements OnInit {

  quizId!: number;
  result: any = null;
  loading = true;

  // ✅ Derived properties (safe additions)
  performanceLabel: string = '';
  performanceClass: string = '';

  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    this.route.paramMap.subscribe(params => {
      const id = params.get('quizId');
      if (!id) {
        this.router.navigate(['/results']);
        return;
      }

      this.quizId = Number(id);
      this.fetchData();
    });
  }

  fetchData() {
    this.loading = true;

    this.api.getQuizDetailedResult(this.quizId).subscribe({
      next: (data) => {
        console.log("API Response Received:", data);

        // ✅ Sort top students descending
        if (data?.topStudents?.length) {
          data.topStudents = [...data.topStudents].sort((a: any, b: any) => b.score - a.score);
        }

        this.result = data;

        this.calculatePerformance();

        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error("API Error:", err);
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  // ✅ Performance classifier
  calculatePerformance() {
    if (!this.result?.averageScore || !this.result?.totalMarks) {
      this.performanceLabel = 'No Data';
      this.performanceClass = 'neutral';
      return;
    }

    const percentage = (this.result.averageScore / this.result.totalMarks) * 100;

    if (percentage >= 75) {
      this.performanceLabel = 'Strong Performance';
      this.performanceClass = 'strong';
    } else if (percentage >= 50) {
      this.performanceLabel = 'Moderate Performance';
      this.performanceClass = 'moderate';
    } else {
      this.performanceLabel = 'Students Struggling';
      this.performanceClass = 'weak';
    }
  }

  // ✅ Difficulty classifier for questions
  getDifficultyClass(percent: number): string {
    if (percent >= 75) return 'easy';
    if (percent >= 50) return 'medium';
    return 'hard';
  }

  round(value: number): number {
    return Math.round(value);
  }

  goBack() {
    this.router.navigate(['/results']);
  }
}