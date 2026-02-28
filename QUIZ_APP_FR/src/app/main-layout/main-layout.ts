import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, HostListener, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.css'
})
export class MainLayout implements OnInit {

  studentName: string = '';
  studentEmail: string = '';
  userRole: string | null = null;

  showProfileMenu = false;

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const userData = localStorage.getItem('user');

      if (userData) {
        const user = JSON.parse(userData);
        this.studentName = user.name || '';
        this.studentEmail = user.email || '';
        this.userRole = user.role || null;
      }
    }
  }

  // ✅ Check if logged user is student
  isStudent(): boolean {
    return this.userRole === 'STUDENT';
  }

  toggleProfile() {
    this.showProfileMenu = !this.showProfileMenu;
  }

  goProfile() {
    this.showProfileMenu = false;
    this.router.navigate(['/profile']);
  }

  logout() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.clear();
    }
    this.router.navigate(['/']);
  }

  @HostListener('document:click', ['$event'])
  clickOutside(event: any) {
    if (!event.target.closest('.profile-wrapper')) {
      this.showProfileMenu = false;
    }
  }
}