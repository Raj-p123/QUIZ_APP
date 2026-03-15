import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-teacher-layout',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './teacher-layout.html',
  styleUrls: ['./teacher-layout.css']
})
export class TeacherLayout {

  collapsed = false;

  constructor(private router: Router) {}

  toggleSidebar() {
    this.collapsed = !this.collapsed;
  }

  logout() {
    this.router.navigate(['/'], { replaceUrl: true });
  }

}