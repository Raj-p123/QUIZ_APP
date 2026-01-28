import { Component } from '@angular/core';

@Component({
  selector: 'app-quiz',
  imports: [],
  templateUrl: './quiz.html',
  styleUrl: './quiz.css',
})
export class Quiz {
    correct = 0;
  wrong = 0;
  attempts = 0;

  answer(isCorrect: boolean) {
    this.attempts++;
    isCorrect ? this.correct++ : this.wrong++;
  }
}
