import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css'
})
export class Profile implements OnInit {

  user: any = null;

  constructor(private router: Router) {}

  ngOnInit(): void {

    const storedUser = localStorage.getItem('user');

    if (!storedUser) {
      alert('Please login first');
      this.router.navigate(['/select-role']);
      return;
    }

    this.user = JSON.parse(storedUser);
  }

  logout(): void {
    localStorage.removeItem('user');
    this.router.navigate(['/select-role']);
  }

  goBack(): void {
    if (this.user.role === 'STUDENT') {
      this.router.navigate(['/student-dashboard']);
    } else if (this.user.role === 'TEACHER') {
      this.router.navigate(['/teacher-dashboard']);
    } else if (this.user.role === 'ADMIN') {
      this.router.navigate(['/admin-dashboard']);
    }
  }
}
