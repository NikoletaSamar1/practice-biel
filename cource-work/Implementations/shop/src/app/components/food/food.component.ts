import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { FoodService } from '../../services/food.service';
import { Food } from '../../../types/food';
import RegistrationService from '../../services/registration.service';

@Component({
  selector: 'app-food',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './food.component.html',
  styleUrl: './food.component.css'
})
export class FoodComponent implements OnInit{
  food: Food[] = [];
  constructor(private foodService: FoodService, private auth: RegistrationService){}

  //todo add title to page, add details page/service/data/etc and make it work
  ngOnInit(): void {
    this.loadAllFood();
  }

  loadAllFood(): void{
    this.foodService.getFood().subscribe(data => {
      this.food = data;
    });
  }

  isAuthenticated(): boolean{
    return this.auth.isLogged;
  }
}
