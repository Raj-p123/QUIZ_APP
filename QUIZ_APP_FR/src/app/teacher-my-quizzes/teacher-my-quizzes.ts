import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Observable, map } from 'rxjs';

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
export class TeacherMyQuizzes {

  teacherId = 1;

  quizzes$!: Observable<any[]>;

  totalQuizzes = 0;
  draftQuizzes = 0;
  publishedQuizzes = 0;

  searchText = '';
  successMessage = '';


  constructor(private api: ApiService) {
    this.loadQuizzes();
  }

  loadQuizzes() {
    this.quizzes$ = this.api.getTeacherQuizzes(this.teacherId).pipe(
      map(quizzes => {
        const filtered = quizzes.filter(q =>
          q.title.toLowerCase().includes(this.searchText.toLowerCase())
        );

        this.totalQuizzes = filtered.length;
        this.draftQuizzes = filtered.filter(q => !q.published).length;
        this.publishedQuizzes = filtered.filter(q => q.published).length;

        return filtered;
      })
    );
  }

  deleteQuiz(quizId: number): void {
  if (!confirm('Are you sure you want to delete this quiz?')) {
    return;
  }

  this.api.deleteQuiz(quizId).subscribe({
    next: () => {
      alert('Quiz deleted successfully ✅');
      this.loadQuizzes();
    },
    error: (err) => {
      console.error(err);
      alert('Failed to delete quiz ❌');
    }
  });
}


}
