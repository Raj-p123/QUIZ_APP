import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // dashboard stats
  getDashboardData(studentId: number) {
    return this.http.get(
      `${this.apiUrl}/api/student/dashboard/${studentId}`
    );
  }
}
