import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import RegistrationService from '../../services/registration.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  errorMessage: string | null = null;

  constructor(private authService: RegistrationService,  private router: Router, private notification: NotificationService){}

  onSubmit(loginForm: NgForm): void {
    if (loginForm.valid) {
      const { email, password } = loginForm.value;
      const user = { email, password };
      this.authService.login(user).subscribe({
        next: (response) => {
          this.notification.showSuccess('Successful login!', 'Well done!');
          this.router.navigate(['/']);
        },
        error: (err) => {
          this.notification.showError('Your LOG IN template is not filled correctly!', 'Oops!');
          this.errorMessage = 'Your LOG IN template is not filled correctly!'
        },
      });
      
    }
  }
}
