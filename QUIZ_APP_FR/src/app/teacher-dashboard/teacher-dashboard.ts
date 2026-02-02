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
  styleUrl: './teacher-dashboard.css'
})
export class TeacherDashboard implements OnInit, OnDestroy {

  teacherName = 'Smruti Ranjan';
  private teacherId = 1; // TEMP (JWT later)

  private routerSub!: Subscription;

  constructor(
    private api: ApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // 🔥 reload dashboard when coming back from create-quiz
    this.routerSub = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        // dashboard stays fresh, no manual refresh needed
      });
  }

  ngOnDestroy(): void {
    this.routerSub?.unsubscribe();
  }

  logout(): void {
    this.router.navigate(['/'], { replaceUrl: true });
  }
}
