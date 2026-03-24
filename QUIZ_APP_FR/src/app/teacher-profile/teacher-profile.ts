import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './teacher-profile.html',
  styleUrl: './teacher-profile.css'
})
export class Profile implements OnInit {

  user: any = null;

  constructor(private router: Router) {}

  ngOnInit(): void {
    // 🔥 TEMP DATA (later replace with API)
    this.user = {
      name: 'Smruti Ranjan',
      email: 'smruti@gmail.com',
      role: 'Teacher',
      photo: 'https://i.pravatar.cc/150?u=teacher'
    };
  }

  logout() {
    // 🔥 Later: clear token/session
    this.router.navigate(['/login']);
  }
}