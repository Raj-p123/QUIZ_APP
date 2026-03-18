import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from '../services/student-service';
import { Observable, switchMap, map, catchError, of, shareReplay } from 'rxjs';

@Component({
  selector: 'app-quiz-overview',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quiz-overview.html',
  styleUrls: ['./quiz-overview.css']
})
export class QuizOverview implements OnInit {

  quizData$!: Observable<any>;
  quizId!: number;

  totalAttempts = 0;
  bestScore = 0;
  averageScore = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private studentService: StudentService
  ) {}

  ngOnInit(): void {

    this.quizData$ = this.route.paramMap.pipe(

      map(params => {
        const id = params.get('quizId');
        this.quizId = id ? Number(id) : 0;
        return this.quizId;
      }),

      switchMap(id => {

        if (!id) {
          return of({ error: true });
        }

        return this.studentService.getQuizOverview(id);
      }),

      map((quiz: any) => {

        if (quiz?.attemptHistory?.length) {

          const scores = quiz.attemptHistory.map((a: any) => a.score ?? 0);

          this.totalAttempts = scores.length;
          this.bestScore = Math.max(...scores);

          const sum = scores.reduce((acc: number, val: number) => acc + val, 0);

          this.averageScore = Math.round(sum / scores.length);

        } else {

          this.totalAttempts = 0;
          this.bestScore = 0;
          this.averageScore = 0;

        }

        return quiz;

      }),

      catchError(err => {
        console.error('Failed to load quiz overview', err);
        return of({ error: true });
      }),

      shareReplay(1)

    );
  }

  startQuiz(): void {
    if (!this.quizId) return;

    this.router.navigate(['/student/quiz', this.quizId, 'play']);
  }

  goBack(): void {
    this.router.navigate(['/student/quizzes']);
  }

  goToReview(attemptId: number): void {

  if (!attemptId) return;

  // force reload of route
  this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
    this.router.navigate(['/student/attempt-review', attemptId]);
  });

}

}