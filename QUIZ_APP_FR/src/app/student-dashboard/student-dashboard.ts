import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { StudentService } from '../services/student-service';

import { PerformanceChartComponent } from '../performance-chart/performance-chart';
import { SubjectAnalyticsComponent } from '../subject-analytics/subject-analytics';

@Component({
  selector: 'app-student-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    PerformanceChartComponent,
    SubjectAnalyticsComponent
  ],
  templateUrl: './student-dashboard.html',
  styleUrl: './student-dashboard.css'
})
export class StudentDashboard implements OnInit, OnDestroy {

studentName = '';

attemptedQuizzes = 0;
averageScore = 0;
highestScore = 0;

streakDays = 0;
longestStreak = 0;

/* XP SYSTEM */
xp = 0;
nextLevelXp = 1000;
level = 1;

dailyChallenge:any = {};

recommended:any[] = [];
leaderboard:any[] = [];

refreshInterval:any;

private dashboardDataSubject = new BehaviorSubject<any>(null);
dashboardData$ = this.dashboardDataSubject.asObservable();

constructor(
private studentService: StudentService,
private router: Router
) {}

ngOnInit(): void {

const name = localStorage.getItem('studentName');
this.studentName = name ? name : 'Student';

this.loadStreak();
this.loadProgress();
this.loadDashboardStats();
this.loadAvailableQuizzes();
this.loadDailyChallenge();

this.studentService.getLeaderboard()
.subscribe(data=>{
this.leaderboard = data;
});

/* AUTO REFRESH */
this.refreshInterval = setInterval(()=>{

this.loadDashboardStats();
this.loadAvailableQuizzes();

},20000);

}

/* ================= DASHBOARD STATS ================= */

loadDashboardStats(): void {

const studentId = Number(localStorage.getItem('studentId'));

if(studentId){

this.studentService
.getDashboardStats(studentId)
.subscribe(data=>{

this.attemptedQuizzes = data.attempted;
this.averageScore = data.averageScore;
this.highestScore = data.highestScore;

});

}

}

/* ================= XP + LEVEL ================= */

loadProgress(){

const studentId = Number(localStorage.getItem('studentId'));

if(studentId){

this.studentService
.getStudentProgress(studentId)
.subscribe(data=>{

this.xp = data.xp;
this.level = data.level;
this.nextLevelXp = data.nextLevelXp;

});

}

}

/* ================= AVAILABLE QUIZZES ================= */

loadAvailableQuizzes(): void {

this.studentService
.getAvailableQuizzes()
.subscribe(data=>{

const mapped = data.map((q:any)=>({

id:q.id,
title:q.title,
details:`${q.questionCount} Qs • ${q.timePerQuestionSeconds}s/q`,
coverImageUrl:q.coverImageUrl

}));

this.dashboardDataSubject.next({

totalAvailable:mapped.length,
visibleQuizzes:mapped.slice(0,4)

});

});

}


/* ================= DAILY CHALLENGE ================= */

loadDailyChallenge(){

this.studentService
.getDailyChallenge()
.subscribe(data=>{

this.dailyChallenge = {

id:data.id,
title:data.title,
questions:data.questionCount,
time:data.duration

};

});

}

/* ================= STREAK ================= */

loadStreak(){

const studentId = Number(localStorage.getItem('studentId'));

if(studentId){

this.studentService
.getStreak(studentId)
.subscribe(data=>{

this.streakDays = data.currentStreak;
this.longestStreak = data.longestStreak;

});

}

}

/* ================= NAVIGATION ================= */

startQuiz(id:number){

this.router.navigate([
'/student/quiz',
id,
'overview'
]);

}

viewAllQuizzes(){

this.router.navigate(['/student/quizzes']);

}

/* ================= CLEANUP ================= */

ngOnDestroy(){

if(this.refreshInterval){
clearInterval(this.refreshInterval);
}

}

}