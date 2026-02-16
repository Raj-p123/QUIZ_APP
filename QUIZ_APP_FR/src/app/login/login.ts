import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
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
    private authService: AuthService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {

    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('user');
    }

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

        const selectedRole = this.role?.toUpperCase();
        const dbRole = res.role;

        if (selectedRole !== dbRole) {
          alert(`❌ This account is not a ${this.role}`);
          return;
        }

        if (dbRole === 'ADMIN') {
          if (this.enteredAdminCode !== this.ADMIN_SECRET) {
            alert('❌ Invalid Admin Secret Code');
            return;
          }
        }

        // ✅ Save logged in user
        if (isPlatformBrowser(this.platformId)) {
          localStorage.setItem('user', JSON.stringify(res));
        }

        // ✅ Role based redirect
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
