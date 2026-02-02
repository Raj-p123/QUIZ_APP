import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-teacher-edit-quiz',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './teacher-edit-quiz.html',
  styleUrl: './teacher-edit-quiz.css'
})
export class TeacherEditQuiz implements OnInit {

  quizId!: number;
  quiz: any;
  questions: any[] = [];

  loading = true;
  viewOnly = false;

  showModal = false;
  modalMode: 'question' | 'option' = 'question';
  isEditMode = false;

  newQuestionText = '';
  selectedQuestion: any;

  successMessage = '';

  options = [
    { text: '', correct: false },
    { text: '', correct: false },
    { text: '', correct: false },
    { text: '', correct: false }
  ];

  constructor(
    private route: ActivatedRoute,
    private api: ApiService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.quizId = Number(params.get('quizId'));
      this.viewOnly = this.route.snapshot.url.some(s => s.path === 'view');
      this.loadAll();
    });
  }

  loadAll() {
    this.loading = true;
    this.api.getQuizById(this.quizId).subscribe(q => {
      this.quiz = q;
      this.api.getQuestionsByQuiz(this.quizId).subscribe(res => {
        this.questions = res.map((q: any) => ({ ...q, selected: false }));
        this.loading = false;
      });
    });
  }

  /* ================= QUESTIONS ================= */

  openAddQuestionModal() {
    if (this.viewOnly || this.quiz.published) return;
    this.modalMode = 'question';
    this.newQuestionText = '';
    this.showModal = true;
  }

  submitQuestion() {
    const text = this.newQuestionText.trim();
    if (!text) return;

    this.closeModal();
    this.newQuestionText = '';

    this.api.addQuestion({
      quizId: this.quizId,
      questionText: text
    }).subscribe(savedQuestion => {
      this.questions.unshift({
        ...savedQuestion,
        options: [],
        selected: false
      });
    });
  }

  deleteSelectedQuestions() {
    const ids = this.questions.filter(q => q.selected).map(q => q.id);
    ids.forEach(id => this.api.deleteQuestion(id).subscribe());
    this.questions = this.questions.filter(q => !q.selected);
  }

  toggleSelection(q: any) {
    q.selected = !q.selected;
  }

  hasSelectedQuestions() {
    return this.questions.some(q => q.selected);
  }

  /* ================= OPTIONS ================= */

  hasOptions(q: any) {
    return q.options && q.options.length > 0;
  }

  openAddOptionModal(q: any) {
    if (this.viewOnly || this.quiz.published) return;
    this.modalMode = 'option';
    this.isEditMode = false;
    this.selectedQuestion = q;
    this.resetOptions();
    this.showModal = true;
  }

  openEditOptionModal(q: any) {
    if (this.viewOnly || this.quiz.published) return;
    this.modalMode = 'option';
    this.isEditMode = true;
    this.selectedQuestion = q;
    this.options = q.options.map((o: any) => ({
      text: o.optionText,
      correct: o.correct
    }));
    this.showModal = true;
  }

  selectCorrect(index: number) {
    this.options.forEach((o, i) => o.correct = i === index);
  }

  submitOptions() {
    const validOptions = this.options.filter(o => o.text.trim());
    if (validOptions.length === 0) return;

    this.closeModal();

    this.selectedQuestion.options = validOptions.map(o => ({
      optionText: o.text,
      correct: o.correct
    }));

    const requests = validOptions.map(opt =>
      this.api.addOption({
        questionId: this.selectedQuestion.id,
        optionText: opt.text,
        correct: opt.correct
      })
    );

    Promise.all(requests.map(r => r.toPromise()))
      .catch(err => console.error(err));
  }

  resetOptions() {
    this.options = [
      { text: '', correct: false },
      { text: '', correct: false },
      { text: '', correct: false },
      { text: '', correct: false }
    ];
  }

  /* ================= PUBLISH ================= */

  publishQuiz() {
    if (this.quiz.published) return;

    this.api.publishQuiz(this.quizId).subscribe(() => {
      this.quiz.published = true;
      this.showSuccess('Quiz published successfully 🚀');
    });
  }

  showSuccess(msg: string) {
    this.successMessage = msg;
    setTimeout(() => this.successMessage = '', 3000);
  }

  /* ================= MODAL ================= */

  closeModal() {
    this.showModal = false;
  }
}
