import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { StudentService } from '../services/student-service';

@Component({
  selector: 'app-student-dashboard',
  imports: [CommonModule],
  templateUrl: './student-dashboard.html',
  styleUrl: './student-dashboard.css',
})
export class StudentDashboard {
     
@Input() studentName = 'Alex Chen';
  @Input() totalQuizzes = 12;
  @Input() completed = 9;
  @Input() averageScore = 88;
  @Input() quizzes: any[] = [
    { title: 'Calculus I - Midterm Prep', details: '15 Questions' },
    { title: 'World History - Renaissance', details: '15 Questions' }
  ];

  
}