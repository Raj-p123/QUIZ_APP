import { Component } from '@angular/core';

@Component({
  selector: 'app-notifications',
  standalone: true,
  template: `
    <div class="widget-card">
      <h3>Notifications</h3>
      <ul>
        <li>New quiz added: Java Basics</li>
        <li>You reached top 10%</li>
        <li>Result published</li>
      </ul>
    </div>
  `
})
export class NotificationsComponent {}
