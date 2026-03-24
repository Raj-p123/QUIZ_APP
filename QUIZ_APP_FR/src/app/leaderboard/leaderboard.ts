import { CommonModule } from '@angular/common';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { StudentService } from '../services/student-service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-leaderboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './leaderboard.html',
  styleUrl: './leaderboard.css'
})
export class LeaderboardComponent implements OnInit {

  leaderboard: any[] = [];
  filteredLeaderboard: any[] = [];

  studentName = '';
  searchText = '';

  isLoading = true; // ✅ FIX

  constructor(
    private studentService: StudentService,
    private router: Router,
    private cdr: ChangeDetectorRef // ✅ IMPORTANT
  ) {}

  ngOnInit(): void {

    const name = localStorage.getItem('studentName');
    this.studentName = name ? name : '';

    this.loadLeaderboard();
  }

  /* ================= LOAD ================= */

  loadLeaderboard() {
    this.isLoading = true;

    this.studentService.getLeaderboard()
      .subscribe({
        next: (data) => {

          this.leaderboard = data.sort(
            (a: any, b: any) => b.averageScore - a.averageScore
          );

          this.filteredLeaderboard = [...this.leaderboard];

          this.isLoading = false;

          // ✅ FORCE UI UPDATE (MAIN FIX)
          this.cdr.detectChanges();
        },
        error: () => {
          this.isLoading = false;
        }
      });
  }

  /* ================= SEARCH ================= */

  onSearch() {
    const text = this.searchText.toLowerCase().trim();

    this.filteredLeaderboard = this.leaderboard.filter(user =>
      user.name.toLowerCase().includes(text)
    );
  }

  /* ================= HELPERS ================= */

  goBack() {
    this.router.navigate(['/student-dashboard']);
  }

  isMe(name: string): boolean {
    return name?.toLowerCase().trim() ===
           this.studentName?.toLowerCase().trim();
  }
}