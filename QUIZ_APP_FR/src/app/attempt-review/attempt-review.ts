import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from '../services/student-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-attempt-review',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './attempt-review.html',
  styleUrls: ['./attempt-review.css']
})
export class AttemptReviewComponent implements OnInit {

  attemptId!: number;
  review: any[] = [];
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private studentService: StudentService
  ) {}

  ngOnInit(): void {

    this.route.params.subscribe(params => {

      this.attemptId = Number(params['attemptId']);

      if (!this.attemptId) {
        console.warn('Invalid attemptId');
        return;
      }

      this.fetchReview();

    });

  }

  fetchReview() {

    this.loading = true;

    this.studentService.getAttemptReview(this.attemptId).subscribe({

      next: (data: any) => {
        this.review = data || [];
        this.loading = false;
      },

      error: (err) => {
        console.error('Review load error', err);
        this.loading = false;
      }

    });

  }

  goBack() {
    this.router.navigate(['/student/quizzes']);
  }

}