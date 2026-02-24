import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, NavigationEnd } from '@angular/router';
import { ApiService } from '../services/api.service';
import { Subscription, filter } from 'rxjs';

@Component({
  selector: 'app-teacher-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './teacher-dashboard.html',
  styleUrls: ['./teacher-dashboard.css']
})
export class TeacherDashboard implements OnInit, OnDestroy {
  teacherName = 'Smruti Ranjan';
  isSidebarCollapsed = false;
  
  private routerSub!: Subscription;

  constructor(private api: ApiService, public router: Router) {}

  toggleSidebar(): void {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }

  ngOnInit(): void {
    this.routerSub = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        window.scrollTo(0, 0);
      });
  }

  ngOnDestroy(): void {
    if (this.routerSub) this.routerSub.unsubscribe();
  }

  logout(): void {
    this.router.navigate(['/'], { replaceUrl: true });
  }

  goToDashboard(): void {
    this.router.navigate(['/teacher-dashboard']);
  }
}