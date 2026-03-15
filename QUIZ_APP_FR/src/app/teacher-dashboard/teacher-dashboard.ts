import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, NavigationEnd } from '@angular/router';
import { ApiService } from '../services/api.service';
import { Subscription, filter } from 'rxjs';

/* Lucide Icons */
import { LucideAngularModule, BookOpen, Users, BarChart3, Clock, AlertCircle } from 'lucide-angular';

@Component({
  selector: 'app-teacher-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, LucideAngularModule],
  templateUrl: './teacher-dashboard.html',
  styleUrls: ['./teacher-dashboard.css']
})
export class TeacherDashboard implements OnInit, OnDestroy {

  teacherName = 'Smruti Ranjan';
  isSidebarCollapsed = false;

  /* Lucide icon map */
  readonly icons = {
    BookOpen,
    Users,
    BarChart3,
    Clock,
    AlertCircle
  };

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