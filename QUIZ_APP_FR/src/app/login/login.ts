import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

 role: 'student' | 'teacher' | 'admin' | null = null;

  email: string = '';
  password: string = '';
  enteredAdminCode: string = '';

  private readonly ADMIN_SECRET = 'QUIZADMIN@2024';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const roleParam = this.route.snapshot.queryParamMap.get('role');

    if (
      roleParam !== 'student' &&
      roleParam !== 'teacher' &&
      roleParam !== 'admin'
    ) {
      this.router.navigate(['/select-role']);
      return;
    }

    this.role = roleParam;
  }

  login(): void {

    // ✅ BASIC VALIDATION
    if (!this.email || !this.password) {
      alert('❌ Email and password required');
      return;
    }

    const payload = {
      email: this.email,
      password: this.password
    };

    this.authService.login(payload).subscribe({
      next: (res: any) => {

        const selectedRole = this.role?.toUpperCase(); // STUDENT / TEACHER / ADMIN
        const dbRole = res.role;                        // role from backend

        // 🔴 ROLE MISMATCH BLOCK
        if (selectedRole !== dbRole) {
          alert(`❌ This account is not a ${this.role}`);
          return;
        }

        // 🔐 EXTRA ADMIN SECURITY
        if (dbRole === 'ADMIN') {
          if (this.enteredAdminCode !== this.ADMIN_SECRET) {
            alert('❌ Invalid Admin Secret Code');
            return;
          }
        }

        // ✅ SAVE SESSION
        localStorage.setItem('user', JSON.stringify(res));

        // ✅ ROLE-BASED REDIRECT
        if (dbRole === 'STUDENT') {
          this.router.navigate(['/student-dashboard']);
        }
        else if (dbRole === 'TEACHER') {
          this.router.navigate(['/teacher-dashboard']);
        }
        else if (dbRole === 'ADMIN') {
          this.router.navigate(['/admin-dashboard']);
        }
      },
      error: () => {
        alert('❌ Invalid email or password');
      }
    });
  }
}