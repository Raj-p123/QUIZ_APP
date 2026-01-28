import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth';

@Component({
  selector: 'app-signup',
  imports: [CommonModule, RouterLink,FormsModule],
  templateUrl: './signup.html',
  styleUrl: './signup.css',
})
export class Signup {
 // ================= ROLE =================
  role: 'student' | 'teacher' | 'admin' = 'student';

  // ================= COMMON FIELDS =================
  name: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';

  // ================= ROLE-SPECIFIC FIELDS =================
  institution: string = '';          // student
  subjectExpertise: string = '';      // teacher
  experienceYears: number | null = null; // teacher
  organization: string = '';          // admin

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  // ================= INIT =================
  ngOnInit(): void {
    const roleParam = this.route.snapshot.queryParamMap.get('role');

    if (
      roleParam === 'student' ||
      roleParam === 'teacher' ||
      roleParam === 'admin'
    ) {
      this.role = roleParam;
    }
  }

  // ================= REGISTER =================
  register(): void {

    if (!this.name || !this.email || !this.password) {
      alert('❌ All fields are required');
      return;
    }

    if (this.password !== this.confirmPassword) {
      alert('❌ Passwords do not match');
      return;
    }

    // 🔥 payload MUST be any (we add dynamic fields)
    const payload: any = {
      name: this.name,
      email: this.email,
      password: this.password,
      role: this.role.toUpperCase() // ENUM-safe
    };

    // ===== ROLE-SPECIFIC DATA =====
    if (this.role === 'student') {
      payload.institution = this.institution;
    }

    if (this.role === 'teacher') {
      payload.subjectExpertise = this.subjectExpertise;
      payload.experienceYears = this.experienceYears;
    }

    if (this.role === 'admin') {
      payload.organization = this.organization;
    }

    console.log('REGISTER PAYLOAD 👉', payload);

    this.authService.signup(payload).subscribe({
      next: () => {
        alert('✅ Registration successful');
        this.router.navigate(['/login'], {
          queryParams: { role: this.role }
        });
      },
      error: (err) => {
        console.error(err);
        alert('❌ Registration failed (backend error)');
      }
    });
  }

  signupWithGoogle(): void {
    alert('Google Signup clicked (Demo)');
  }
}