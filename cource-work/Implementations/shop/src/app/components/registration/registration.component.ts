import { Component } from '@angular/core';
import RegistrationService from '../../services/registration.service';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent {
  emailAlreadyExists: boolean = false;

  constructor(private registrationService: RegistrationService, private router: Router, private notification: NotificationService) {}

  onSubmit(form: NgForm): void {
    if (form.invalid) {
      return;
    }

    const { username, fullName, email, age, password, confirmPassword } =
      form.value;

    if (password !== confirmPassword) {
      this.notification.showError('Passwords do not match.', 'Oops!');
      return;
    }

    const user = {
      username,
      fullName,
      email,
      age,
      password,
    };

    this.registrationService.registerUser(user).subscribe({
      next: (response) => {
        this.notification.showSuccess('Successful registration!', 'Well done!');
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.emailAlreadyExists = true;
        this.notification.showError('Something went wrong. Please try again.', 'Oops!');
      },
    });
  }
}
