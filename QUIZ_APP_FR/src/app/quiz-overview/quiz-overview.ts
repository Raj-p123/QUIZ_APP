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
  styleUrl: './quiz-overview.css',
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
        this.quizId = Number(params.get('quizId'));
        return this.quizId;
      }),
      switchMap(id =>
        this.studentService.getQuizOverview(id).pipe(
          map((quiz: any) => {

            if (quiz?.attemptHistory?.length) {

              this.totalAttempts = quiz.attemptHistory.length;

              const scores = quiz.attemptHistory.map((a: any) => a.score ?? 0);

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
          })
        )
      ),
      shareReplay(1)
    );
  }

  startQuiz(): void {
    this.router.navigate(['/student/quiz', this.quizId, 'play']);
  }

  goBack(): void {
    this.router.navigate(['/student/quizzes']);
  }



goToReview(attemptId: number): void {
  this.router.navigate(['/student/attempt-review', attemptId]);
}


}