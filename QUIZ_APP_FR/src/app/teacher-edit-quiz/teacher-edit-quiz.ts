import { Component, OnInit, ChangeDetectorRef } from '@angular/core'; // 1. Added ChangeDetectorRef
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { forkJoin, of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';

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

  // 2. Inject ChangeDetectorRef in the constructor
  constructor(
    private route: ActivatedRoute, 
    private api: ApiService,
    private cdr: ChangeDetectorRef 
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
    this.api.getQuizById(this.quizId).pipe(
      catchError(() => {
        alert("Failed to load quiz");
        return of(null);
      })
    ).subscribe(q => {
      if (!q) { this.loading = false; return; }
      this.quiz = q;
      this.refreshQuestions();
    });
  }

  refreshQuestions() {
    this.api.getQuestionsByQuiz(this.quizId).pipe(
      finalize(() => {
        this.loading = false;
        this.cdr.detectChanges(); // Ensure the list updates on screen
      }),
      catchError(() => of([]))
    ).subscribe(res => {
      this.questions = res.map((q: any) => ({ ...q, selected: false }));
    });
  }

  openAddQuestionModal() {
    if (this.viewOnly || this.quiz.published) return;
    this.modalMode = 'question';
    this.newQuestionText = '';
    this.showModal = true;
  }

  submitQuestion() {
    const text = this.newQuestionText.trim();
    if (!text) return;
    
    this.api.addQuestion({
      quizId: this.quizId,
      questionText: text,
      timeLimitSeconds: this.quiz.timePerQuestionSeconds || 30
    }).subscribe({
      next: () => {
        this.showModal = false; // Close modal immediately
        this.newQuestionText = ''; // Clear text
        this.showSuccess('Question added! 🎉');
        
        // 3. Force the UI to realize showModal is now false
        this.cdr.detectChanges(); 
        
        this.refreshQuestions();
      },
      error: () => alert('Failed to add question')
    });
  }

  openEditOptionModal(q: any) {
    if (this.viewOnly || this.quiz.published) return;
    this.modalMode = 'option';
    this.selectedQuestion = q;
    this.isEditMode = (q.options && q.options.length > 0);
    this.options = [
      { text: '', correct: false }, { text: '', correct: false },
      { text: '', correct: false }, { text: '', correct: false }
    ];
    this.showModal = true;
  }

  submitOptions() {
    const validOptions = this.options.filter(o => o.text.trim());
    if (validOptions.length < 2) return alert("Min 2 options required");
    if (!this.options.some(o => o.correct)) return alert("Select one correct answer");

    const addTasks = validOptions.map(opt => this.api.addOption({
      questionId: this.selectedQuestion.id,
      optionText: opt.text,
      correct: opt.correct
    }));

    forkJoin(addTasks).subscribe({
      next: () => {
        this.showModal = false;
        this.cdr.detectChanges(); // Force modal close
        this.showSuccess('Options added! ✅');
        this.refreshQuestions();
      },
      error: (err) => alert(err.error || 'Failed to add options')
    });
  }

  deleteSelectedQuestions() {
    const selectedIds = this.questions.filter(q => q.selected).map(q => q.id);
    if (!confirm('Delete selected questions?')) return;
    
    forkJoin(selectedIds.map(id => this.api.deleteQuestion(id))).subscribe(() => {
      this.showSuccess('Deleted successfully');
      this.refreshQuestions();
    });
  }

  selectCorrect(index: number) { 
    this.options.forEach((o, i) => o.correct = i === index); 
  }

  closeModal() { 
    this.showModal = false; 
    this.cdr.detectChanges(); // Ensure modal disappears
  }

  toggleSelection(q: any) { q.selected = !q.selected; }
  hasSelectedQuestions() { return this.questions.some(q => q.selected); }
  hasOptions(q: any) { return q.options && q.options.length > 0; }
  
  publishQuiz() {
    this.api.publishQuiz(this.quizId).subscribe(() => {
      this.quiz.published = true;
      this.showSuccess('Quiz published! 🚀');
    });
  }

  showSuccess(msg: string) {
    this.successMessage = msg;
    this.cdr.detectChanges(); // Show message immediately
    setTimeout(() => {
      this.successMessage = '';
      this.cdr.detectChanges(); // Hide message after 3s
    }, 3000);
  }
}