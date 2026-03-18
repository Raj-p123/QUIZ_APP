import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface AdminStats {
  students: number;
  teachers: number;
  quizzes: number;
  attempts: number;
}

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private api = 'http://localhost:8080/api/admin';

  constructor(private http: HttpClient) {}

  getStats(): Observable<AdminStats> {
    return this.http.get<AdminStats>(`${this.api}/stats`);
  }

}