import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-role-select2',
  imports: [],
  templateUrl: './role-select2.html',
  styleUrl: './role-select2.css',
})
export class RoleSelect2 {

  constructor(private router: Router) {}

  goToSignup(role: 'student' | 'teacher' | 'admin') {
    this.router.navigate(['/signup'], {
      queryParams: { role }
    });
  }
}
