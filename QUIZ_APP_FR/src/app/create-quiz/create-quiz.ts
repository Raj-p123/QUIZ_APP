import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-create-quiz',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-quiz.html',
  styleUrl: './create-quiz.css'
})
export class CreateQuiz implements OnInit {

  quiz = {
    title: '',
    description: '',
    durationMinutes: 20,
    categoryId: null as number | null
  };

  categories: any[] = [];
  filteredCategories: any[] = [];

  categorySearch = '';
  showCategoryList = false;

  loading = false;

  constructor(
    private api: ApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.api.getCategories().subscribe({
      next: (data) => {
        this.categories = data;
        this.filteredCategories = data;
      },
      error: () => {
        alert('Failed to load categories');
      }
    });
  }

  filterCategories() {
    const value = this.categorySearch.toLowerCase();
    this.filteredCategories = this.categories.filter(c =>
      c.name.toLowerCase().includes(value)
    );
    this.showCategoryList = true;
  }

  selectCategory(cat: any) {
    this.quiz.categoryId = cat.id;
    this.categorySearch = cat.name;
    this.showCategoryList = false;
  }

  // ✅ FIXED: Cancel is now a proper component method
  cancel() {
    this.router.navigate(['/teacher-dashboard'], {
      replaceUrl: true
    });
  }

  submit() {
    if (!this.quiz.title || !this.quiz.categoryId) {
      alert('Quiz title and category are required');
      return;
    }

    const payload = {
      title: this.quiz.title,
      description: this.quiz.description,
      durationMinutes: this.quiz.durationMinutes,
      teacherId: 1, // TEMP
      categoryId: this.quiz.categoryId
    };

    this.loading = true;

    this.api.createQuiz(payload).subscribe({
  next: () => {
    this.router.navigate(['/teacher-dashboard'], {
      replaceUrl: true
    });
  }
});

  }
}
