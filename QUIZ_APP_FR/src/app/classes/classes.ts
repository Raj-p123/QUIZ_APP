import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentService } from '../services/student-service';


@Component({
  selector: 'app-classes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './classes.html',
  styleUrl: './classes.css'
})
export class ClassesComponent implements OnInit {

  classes: any[] = [];
  stats: any;

  constructor(private studentService: StudentService) {}

  ngOnInit() {
    this.loadClasses();
  }

  loadClasses() {
    this.studentService.getStudentClasses(1).subscribe(res => {
      this.classes = res.classes;
      this.stats = res.stats;
    });
  }

}