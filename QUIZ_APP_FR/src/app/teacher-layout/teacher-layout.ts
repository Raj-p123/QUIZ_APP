import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-teacher-layout',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './teacher-layout.html',
  styleUrls: ['./teacher-layout.css'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class TeacherLayout {

  collapsed = false;

  constructor(private router: Router) {}

  toggleSidebar() {
    this.collapsed = !this.collapsed;
  }

  // 🔥 FIXED LOGOUT
  logout() {
    // later: clear token/session
    localStorage.clear(); // optional
    this.router.navigate(['/']);
  }

  // 🔥 PROFILE NAVIGATION
  goToProfile() {
    this.router.navigate(['/teacher-profile']);
  }

}