import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // ✅ CALL CORRECT ENDPOINT
  signup(data: any) {
    return this.http.post(
      `${this.apiUrl}/api/auth/register`,
      data
    );
  }

  login(data: any) {
    return this.http.post(
      `${this.apiUrl}/api/auth/login`,
      data
    );
  }




  private userSubject = new BehaviorSubject<any>(null);
  user$ = this.userSubject.asObservable();

  setUser(user: any) {
    this.userSubject.next(user);
  }

  getCurrentUserId(): number | null {
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  return user ? user.id : null;
}

}
