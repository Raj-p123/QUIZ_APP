import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from '../services/student-service';
import { Subscription, interval, BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-play-quiz',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './play-quiz.html',
  styleUrl: './play-quiz.css',
})
export class PlayQuiz implements OnInit, OnDestroy {
  quizId!: number;
  questions: any[] = [];
  currentIndex = 0;
  currentQuestion: any;

  selectedOptionId: number | null = null;

  timeLeft$ = new BehaviorSubject<number>(0);
  private timerSub: Subscription | null = null;

  loading = true;
  quizFinished = false;
  isSubmitting = false;

  score = 0;
  totalQuestions = 0;

  review: any[] = [];
  answers = new Map<number, number>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private studentService: StudentService,
    private cdr: ChangeDetectorRef
  ) {}

  get timerPercentage(): number {
    if (!this.currentQuestion || this.currentQuestion.timeLimitSeconds <= 0)
      return 0;
    return (
      (this.timeLeft$.value /
        this.currentQuestion.timeLimitSeconds) *
      100
    );
  }

  get timerColor(): string {
    const pct = this.timerPercentage;
    if (pct > 50) return '#22c55e';
    if (pct > 20) return '#f97316';
    return '#ef4444';
  }

  ngOnInit(): void {
    this.quizId = Number(
      this.route.snapshot.paramMap.get('quizId')
    );
    this.loadQuestions();
  }

  ngOnDestroy(): void {
    this.stopTimer();
  }

  loadQuestions(): void {
    this.loading = true;

    this.studentService.getQuizQuestions(this.quizId).subscribe({
      next: (data) => {
        // 🔥 Backend already shuffles questions + options
        this.questions = data;
        this.currentIndex = 0;

        setTimeout(() => {
          this.loading = false;
          this.loadCurrentQuestion();
          this.cdr.detectChanges();
        }, 800);
      },
      error: (err) => {
        console.error('Failed to load questions', err);
        this.loading = false;
      },
    });
  }

  loadCurrentQuestion(): void {
    this.currentQuestion = this.questions[this.currentIndex];
    this.selectedOptionId =
      this.answers.get(this.currentQuestion.id) ?? null;
    this.startTimer(
      this.currentQuestion.timeLimitSeconds
    );
  }

  selectOption(optionId: number): void {
    if (this.quizFinished || this.isSubmitting) return;
    this.selectedOptionId = optionId;
    this.answers.set(this.currentQuestion.id, optionId);
  }

  nextQuestion(): void {
    if (this.isSubmitting) return;
    this.stopTimer();

    if (this.currentIndex < this.questions.length - 1) {
      this.currentIndex++;
      this.loadCurrentQuestion();
    } else {
      this.submitQuiz();
    }
  }

  startTimer(seconds: number): void {
    this.stopTimer();
    this.timeLeft$.next(seconds);

    this.timerSub = interval(1000).subscribe(() => {
      const current = this.timeLeft$.value;

      if (current > 0) {
        this.timeLeft$.next(current - 1);
        this.cdr.detectChanges();
      } else {
        if (!this.answers.has(this.currentQuestion.id)) {
          this.answers.set(this.currentQuestion.id, -1);
        }
        this.nextQuestion();
      }
    });
  }

  stopTimer(): void {
    if (this.timerSub) {
      this.timerSub.unsubscribe();
      this.timerSub = null;
    }
  }

  submitQuiz(): void {
    if (this.isSubmitting) return;

    this.isSubmitting = true;
    this.stopTimer();

    const userData = localStorage.getItem('user');
    const user = userData ? JSON.parse(userData) : {};

    const payload = {
      quizId: this.quizId,
      studentId: user.id,
      answers: Array.from(this.answers.entries()).map(
        ([questionId, optionId]) => ({
          questionId,
          optionId: optionId === -1 ? null : optionId,
        })
      ),
    };

    this.studentService.submitQuiz(payload).subscribe({
      next: (res: any) => {
        this.score = res.score;
        this.totalQuestions = res.totalQuestions;
        this.review = res.review;
        this.quizFinished = true;
        this.isSubmitting = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Submission failed', err);
        this.isSubmitting = false;
        alert(
          'An error occurred while calculating your score.'
        );
        this.cdr.detectChanges();
      },
    });
  }

  goBack(): void {
    this.router.navigate(['/student-dashboard']);
  }

  isCorrectOption(option: any): boolean {
    return option.correct === true;
  }

  isWrongSelected(
    option: any,
    selectedId: number
  ): boolean {
    return option.id === selectedId && !option.correct;
  }
}