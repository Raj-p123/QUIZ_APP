import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StudentService } from '../services/student-service';
import { FormsModule } from '@angular/forms';
import { Observable, map, combineLatest, BehaviorSubject, startWith, catchError, of } from 'rxjs';

@Component({
  selector: 'app-available-quizzes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './available-quizzes.html',
  styleUrl: './available-quizzes.css',
})
export class AvailableQuizzes implements OnInit {

  filteredQuizzes$!: Observable<any[]>;
  searchText: string = '';
  private searchSubject = new BehaviorSubject<string>('');

  constructor(
    private studentService: StudentService,
    private router: Router
  ) {}

  ngOnInit(): void {

    const quizzesStream$ = this.studentService.getAvailableQuizzes().pipe(
      map(data => data.map(q => ({
        id: q.id,
        title: q.title,
        details: `${q.questionCount || 0} Qs • ${q.timePerQuestionSeconds || 15}s/q`,
        coverImageUrl: q.coverImageUrl || null
      }))),
      catchError(err => {
        console.error('Stream Error:', err);
        return of([]);
      })
    );

    this.filteredQuizzes$ = combineLatest([
      quizzesStream$, 
      this.searchSubject.asObservable()
    ]).pipe(
      map(([quizzes, searchText]) => {
        if (!searchText) return quizzes;
        const text = searchText.toLowerCase().trim();
        return quizzes.filter(q => q.title.toLowerCase().includes(text));
      }),
      startWith([])
    );
  }

  // 🔥 FIX IMAGE LOGIC
  getImage(url: string | null): string {
    if (!url || url === 'null' || url.trim() === '') {
      return 'assets/default-quiz.jpg';
    }
    return url;
  }

  handleImageError(event: any) {
    event.target.src = 'assets/default-quiz.jpg';
  }

  extractTime(details: string): string {
    const parts = details.split('•');
    return parts[1]?.trim() || '15s/q';
  }

  extractQuestions(details: string): string {
    const parts = details.split('•');
    return parts[0]?.trim() || '0 Qs';
  }

  onSearchChange(): void {
    this.searchSubject.next(this.searchText);
  }

  goBack(): void {
    this.router.navigate(['/student-dashboard']);
  }

  goProfile(): void {
    this.router.navigate(['/profile']);
  }

  openQuiz(quizId: number) {
    this.router.navigate(['/student/quiz', quizId, 'overview']);
  }
}
