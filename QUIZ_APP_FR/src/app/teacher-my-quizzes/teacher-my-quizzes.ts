import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Observable, BehaviorSubject, switchMap, map, tap } from 'rxjs';

@Component({
  selector: 'app-teacher-my-quizzes',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  templateUrl: './teacher-my-quizzes.html',
  styleUrl: './teacher-my-quizzes.css'
})
export class TeacherMyQuizzes implements OnInit {

  teacherId!: number;
  
  // Use a BehaviorSubject to trigger refreshes
  private refreshSignal$ = new BehaviorSubject<void>(undefined);
  quizzes$!: Observable<any[]>;

  totalQuizzes = 0;
  draftQuizzes = 0;
  publishedQuizzes = 0;

  searchText = '';

  constructor(
    private api: ApiService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const userData = localStorage.getItem('user');
    if (!userData) {
      alert('Session expired. Please login again.');
      this.router.navigate(['/login']);
      return;
    }

    const user = JSON.parse(userData);
    if (!user || !user.id) {
      alert('Invalid user session.');
      this.router.navigate(['/login']);
      return;
    }

    this.teacherId = user.id;

    // Set up the reactive pipeline
    this.quizzes$ = this.refreshSignal$.pipe(
      switchMap(() => this.api.getTeacherQuizzes(this.teacherId)),
      map(quizzes => {
        // Filter based on search text
        const filtered = quizzes.filter((q: any) =>
          q.title.toLowerCase().includes(this.searchText.toLowerCase())
        );

        // Update stats
        this.totalQuizzes = filtered.length;
        this.draftQuizzes = filtered.filter((q: any) => !q.published).length;
        this.publishedQuizzes = filtered.filter((q: any) => q.published).length;

        return filtered;
      })
    );
  }

  // Instead of re-assigning the observable, we just tell the subject to "next"
  loadQuizzes(): void {
    this.refreshSignal$.next();
  }

  deleteQuiz(quizId: number): void {
    if (!confirm('Are you sure you want to delete this quiz? This action cannot be undone.')) {
      return;
    }

    this.api.deleteQuiz(quizId).subscribe({
      next: () => {
        alert('Quiz deleted successfully ✅');
        this.loadQuizzes(); // This now correctly triggers the refreshSignal$
      },
      error: (err) => {
        console.error('Delete error:', err);
        alert('Failed to delete quiz ❌');
      }
    });
  }
}