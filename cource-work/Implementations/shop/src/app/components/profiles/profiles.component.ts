import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { User } from '../../../types/users';
import RegistrationService from '../../services/registration.service';
import { ProfilesService } from '../../services/profiles.service';

@Component({
  selector: 'app-profiles',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profiles.component.html',
  styleUrl: './profiles.component.css'
})
export class ProfilesComponent implements OnInit{
  profiles: User[] = [];

  constructor(private profileService: ProfilesService){}

  ngOnInit(): void {
    this.profileService.getAllProfiles().subscribe((data) => {
      this.profiles = data;
    });
  }
}
