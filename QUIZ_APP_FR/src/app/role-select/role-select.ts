import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-role-select',
  imports: [],
  templateUrl: './role-select.html',
  styleUrl: './role-select.css',
})
export class RoleSelect {
  constructor(private router: Router) {}

  goToLogin(role: 'student' | 'teacher' | 'admin') {
    this.router.navigate(['/login'], {
      queryParams: { role }
    });
  }
  
}
