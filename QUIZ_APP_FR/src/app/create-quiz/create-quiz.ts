import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-create-quiz',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-quiz.html',
  styleUrl: './create-quiz.css'
})
export class CreateQuiz implements OnInit {

  teacherId!: number; // ✅ REAL teacher ID

  quiz = {
    title: '',
    description: '',
    timePerQuestionSeconds: 15,
    categoryId: null as number | null
  };

  categories: any[] = [];
  filteredCategories: any[] = [];

  categorySearch = '';
  showCategoryList = false;
  loading = false;

  selectedFile: File | null = null;
  imagePreview: string | null = null;

  constructor(
    private api: ApiService,
    private router: Router,
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {

    // ✅ Get logged-in teacher ID safely
    if (isPlatformBrowser(this.platformId)) {
      const userData = localStorage.getItem('user');

      if (!userData) {
        alert('Session expired. Please login again.');
        this.router.navigate(['/login']);
        return;
      }

      const user = JSON.parse(userData);

      if (!user.id) {
        alert('Invalid session.');
        this.router.navigate(['/login']);
        return;
      }

      this.teacherId = user.id;
    }

    // Load categories
    this.api.getCategories().subscribe({
      next: (data) => {
        this.categories = data;
        this.filteredCategories = data;
      },
      error: () => {
        console.error('Failed to load categories');
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

  cancel() {
    this.router.navigate(['/teacher-dashboard'], {
      replaceUrl: true
    });
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (!file) return;

    this.selectedFile = file;

    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  async uploadToCloudinary(): Promise<string | null> {
    if (!this.selectedFile) return null;

    const formData = new FormData();
    formData.append('file', this.selectedFile);
    formData.append('upload_preset', 'quiz_unsigned_upload');

    try {
      const response: any = await this.http.post(
        'https://api.cloudinary.com/v1_1/dphwzkibx/image/upload',
        formData
      ).toPromise();

      return response.secure_url;
    } catch (error) {
      console.error('Cloudinary upload failed', error);
      return null;
    }
  }

  async submit() {

    if (!this.quiz.title || !this.quiz.categoryId) {
      alert('Please fill all required fields');
      return;
    }

    this.loading = true;

    try {

      const imageUrl = await this.uploadToCloudinary();

      const payload = {
        title: this.quiz.title,
        description: this.quiz.description,
        teacherId: this.teacherId, // ✅ REAL teacher ID used
        categoryId: this.quiz.categoryId,
        timePerQuestionSeconds: this.quiz.timePerQuestionSeconds,
        coverImageUrl: imageUrl
      };

      console.log('Creating quiz with payload:', payload);

      this.api.createQuiz(payload).subscribe({
        next: () => {
          this.router.navigate(['/teacher-quizzes'], {
            replaceUrl: true
          });
        },
        error: (err) => {
          console.error(err);
          alert('Failed to create quiz');
          this.loading = false;
        }
      });

    } catch (err) {
      console.error(err);
      alert('Something went wrong');
      this.loading = false;
    }
  }
}
