import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quiz-type',
  standalone: true,
  imports: [],
  templateUrl: './quiz-type.html',
  styleUrl: './quiz-type.css'
})
export class QuizTypeComponent {

  constructor(private router: Router) {}

  goClassicQuiz() {
    this.router.navigate(['/create-quiz']);
  }

}