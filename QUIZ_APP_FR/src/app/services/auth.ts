import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // ================= AUTH =================

  signup(data: any) {
    return this.http.post(`${this.apiUrl}/api/auth/register`, data);
  }

  login(data: any) {
    return this.http.post(`${this.apiUrl}/api/auth/login`, data);
  }

  // ================= USER STATE =================

  private userSubject = new BehaviorSubject<any>(null);
  user$ = this.userSubject.asObservable();

  setUser(user: any) {
    this.userSubject.next(user);
  }

  getCurrentUserId(): number | null {
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    return user ? user.id : null;
  }

  // ================= FORGOT PASSWORD =================

  sendOtp(email: string) {
    return this.http.post(
      `${this.apiUrl}/api/auth/send-otp`,
      { email },
      {
        responseType: 'text' // 🔥 FIX JSON ERROR
      }
    );
  }

  resetPassword(data: any) {
    return this.http.post(
      `${this.apiUrl}/api/auth/reset-password`,
      data,
      {
        responseType: 'text' // 🔥 keep consistent
      }
    );
  }
}