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

  constructor(
    private studentService: StudentService,
    private router: Router
  ) {}

  /* ================= STATE ================= */

  searchText = '';
  sortBy = 'latest';

  filteredQuizzes$!: Observable<any[]>;

  private searchSubject = new BehaviorSubject<string>('');
  private sortSubject = new BehaviorSubject<string>('latest');

  selectedFilter = 'All';
  selectedCategory = 'All';

  /* ================= INIT ================= */

  ngOnInit(): void {

    const quizzes$ = this.studentService.getAvailableQuizzes().pipe(

      map((data: any[]) => data.map(q => ({
        id: q.id,
        title: q.title,
        details: `${q.questionCount || 0} Qs • ${q.timePerQuestionSeconds || 15}s/q`,
        coverImageUrl: q.coverImageUrl || null,
        level: q.level || 'Medium',
        category: q.category || 'Java',
        attempts: q.attempts || 0
      }))),

      catchError(() => of([]))
    );

    this.filteredQuizzes$ = combineLatest([
      quizzes$,
      this.searchSubject.pipe(startWith('')),
      this.sortSubject.pipe(startWith('latest'))
    ]).pipe(

      map(([quizzes, searchText, sortBy]) => {

        let result = [...quizzes];

        // 🔍 SEARCH
        if (searchText) {
          const text = searchText.toLowerCase();
          result = result.filter(q =>
            q.title.toLowerCase().includes(text)
          );
        }

        // 🎯 LEVEL FILTER
        if (this.selectedFilter !== 'All') {
          result = result.filter(q => q.level === this.selectedFilter);
        }

        // 📂 CATEGORY FILTER
        if (this.selectedCategory !== 'All') {
          result = result.filter(q => q.category === this.selectedCategory);
        }

        // 🔽 SORT
        if (sortBy === 'popular') {
          result.sort((a, b) => b.attempts - a.attempts);
        } else {
          result.sort((a, b) => b.id - a.id);
        }

        return result;
      })

    );
  }

  /* ================= SEARCH ================= */

  onSearchChange() {
    this.searchSubject.next(this.searchText);
  }

  /* ================= SORT ================= */

  onSortChange() {
    this.sortSubject.next(this.sortBy);
  }

  /* ================= IMAGE ================= */

  getImage(url: string | null): string {
    if (!url || url === 'null' || url.trim() === '') {
      return 'assets/default-quiz.jpg';
    }
    return url;
  }

  handleImageError(event: any) {
    event.target.src = 'assets/default-quiz.jpg';
  }

  /* ================= DETAILS ================= */

  extractTime(details: string): string {
    const parts = details.split('•');
    return parts[1]?.trim() || '15s/q';
  }

  extractQuestions(details: string): string {
    const parts = details.split('•');
    return parts[0]?.trim() || '0 Qs';
  }

  /* ================= NAVIGATION ================= */

  openQuiz(id: number) {
    this.router.navigate(['/student/quiz', id, 'overview']);
  }

  goBack() {
    this.router.navigate(['/student-dashboard']);
  }
}