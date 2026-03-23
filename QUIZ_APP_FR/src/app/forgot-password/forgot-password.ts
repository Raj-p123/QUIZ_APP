import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // ✅ ADD THIS
import { AuthService } from '../services/auth';

@Component({
  selector: 'app-forgot-password',
  standalone: true, // ✅ IMPORTANT
  imports: [CommonModule, FormsModule], // ✅ ADD HERE
  templateUrl: './forgot-password.html',
  styleUrl: './forgot-password.css'
})
export class ForgotPassword {

  email = '';
  otp = '';
  newPassword = '';
  otpSent = false;

  constructor(private authService: AuthService) {}

  sendOtp() {
    if (!this.email) {
      alert('❌ Enter email');
      return;
    }

    this.authService.sendOtp(this.email).subscribe({
      next: (res: any) => {
        alert('✅ ' + res);
        this.otpSent = true;
      },
      error: (err) => {
        alert('❌ ' + (err.error || 'Something went wrong'));
      }
    });
  }

  resetPassword() {
    if (!this.otp || !this.newPassword) {
      alert('❌ Fill all fields');
      return;
    }

    const data = {
      email: this.email,
      otp: this.otp,
      newPassword: this.newPassword
    };

    this.authService.resetPassword(data).subscribe({
      next: (res: any) => {
        alert('✅ ' + res);
      },
      error: (err) => {
        alert('❌ ' + (err.error || 'Invalid OTP'));
      }
    });
  }
}