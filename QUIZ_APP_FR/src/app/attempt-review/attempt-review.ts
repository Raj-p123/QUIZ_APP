import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudentService } from '../services/student-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-attempt-review',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './attempt-review.html',
  styleUrl: './attempt-review.css',
})
export class AttemptReview implements OnInit {

  reviewData: any[] = [];
  attemptId!: number;

  constructor(
    private route: ActivatedRoute,
    private studentService: StudentService
  ) {}

  ngOnInit(): void {
  this.attemptId = Number(this.route.snapshot.paramMap.get('attemptId'));

  console.log("Attempt ID:", this.attemptId);

  this.studentService.getAttemptReview(this.attemptId)
    .subscribe((data: any[]) => {
      console.log("Review Data:", data);  // 🔥 ADD THIS
      this.reviewData = data;
    });
}

  isWrongSelected(option: any, selectedId: number): boolean {
    return option.id === selectedId && !option.correct;
  }
}