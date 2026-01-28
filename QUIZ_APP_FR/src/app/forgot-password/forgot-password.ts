import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './forgot-password.html',
  styleUrl: './forgot-password.css',
})
export class ForgotPassword {

  email = '';

  sendResetLink() {
    if (!this.email) {
      alert('❌ Please enter your email');
      return;
    }

    // Demo logic
    alert(`📩 Password reset link sent to ${this.email}`);
  }
}
