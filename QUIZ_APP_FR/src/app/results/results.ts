import { Component, OnInit, ChangeDetectorRef, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-results',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './results.html',
  styleUrl: './results.css'
})
export class ResultsComponent implements OnInit {

  teacherId: number | null = null;
  quizzes: any[] = [];
  loading = true;

  // SUMMARY PROPERTIES
  totalAttemptsAll: number = 0;
  overallAveragePercentage: number = 0;
  totalQuizzes: number = 0;

  constructor(
    private api: ApiService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    // Check if we are in the browser to access localStorage
    if (isPlatformBrowser(this.platformId)) {
      const storedUser = localStorage.getItem('user');
      
      if (!storedUser) {
        this.router.navigate(['/select-role']);
        return;
      }

      try {
        const user = JSON.parse(storedUser);
        this.teacherId = user.id;
        
        if (this.teacherId) {
          this.loadSummary();
        } else {
          this.loading = false;
          this.cdr.detectChanges();
        }
      } catch (e) {
        console.error("Error parsing user data", e);
        this.router.navigate(['/login']);
      }
    }
  }

  loadSummary() {
    if (!this.teacherId) return;
    
    this.loading = true;
    this.quizzes = [];

    this.api.getTeacherResults(this.teacherId).subscribe({
      next: (data) => {
        console.log("SUMMARY RESPONSE RECEIVED:", data);
        this.quizzes = data ? [...data] : [];
        this.calculateSummary();
        this.loading = false;
        // Force refresh for Zoneless mode
        this.cdr.detectChanges(); 
      },
      error: (err) => {
        console.error("SUMMARY ERROR:", err);
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  calculateSummary() {
    if (!this.quizzes || this.quizzes.length === 0) {
      this.totalAttemptsAll = 0;
      this.overallAveragePercentage = 0;
      this.totalQuizzes = 0;
      return;
    }

    this.totalQuizzes = this.quizzes.length;
    this.totalAttemptsAll = this.quizzes.reduce((sum, q) => sum + (q.totalAttempts || 0), 0);
    const totalPercentage = this.quizzes.reduce((sum, q) => sum + (q.averagePercentage || 0), 0);
    this.overallAveragePercentage = totalPercentage / this.totalQuizzes;
  }

  viewDetails(quizId: number) {
    this.router.navigate(['/results', quizId]);
  }
}