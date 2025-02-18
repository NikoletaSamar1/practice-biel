import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Food } from '../../../types/food';
import { FoodService } from '../../services/food.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import RegistrationService from '../../services/registration.service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit{
  foods: Food[] = [];
  @Output() filtered = new EventEmitter<Food[]>();

  constructor(private foodService: FoodService, private auth: RegistrationService){}

  searchCriteria = {
    name: '',
    category: '',
    caloriesMin: 0,
    caloriesMax: 0
  };

  filteredFoods: Food[] = [];

  ngOnInit() {
    this.foodService.getFood().subscribe(data => {
      this.filteredFoods = data;
    })
  }

  onSubmit(){
    this.applyFilters();
  }

  applyFilters() {
    this.foodService.getFoodByFilters(this.searchCriteria.name, this.searchCriteria.category, this.searchCriteria.caloriesMin, 
      this.searchCriteria.caloriesMax).subscribe(data => {
        this.filteredFoods = data;
      })
      // this.filtered.emit(this.filteredFoods);
  }


  isAuthenticated(): boolean{
    return this.auth.isLogged;
  }
}
