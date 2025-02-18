import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import RegistrationService from '../../services/registration.service';

@Component({
  selector: 'app-app-navigation',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './app-navigation.component.html',
  styleUrl: './app-navigation.component.css'
})
export class AppNavigationComponent {
  constructor(private registerService: RegistrationService){}

  logout(){
    this.registerService.logOut();
  }

  isLoggedIn(): boolean{
    return this.registerService.isLogged;
  }

  isAdmin(): boolean {
    return this.registerService.isAdmin;
  }
}
