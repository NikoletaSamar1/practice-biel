import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FoodService } from '../../../services/food.service';
import { Food } from '../../../../types/food';
import { CommonModule } from '@angular/common';
import RegistrationService from '../../../services/registration.service';
import { OrderService } from '../../../services/order.service';
import { NotificationService } from '../../../services/notification.service';

@Component({
  selector: 'app-food-details',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './food-details.component.html',
  styleUrl: './food-details.component.css'
})
export class FoodDetailsComponent implements OnInit{
  food: Food | null = null;
  
  constructor(private foodService: FoodService, private auth: RegistrationService, private route: ActivatedRoute,
              private orderService: OrderService, private router: Router, private notification: NotificationService) {}

  ngOnInit(): void {
    const foodId = this.route.snapshot.paramMap.get('id');
    if (foodId !== null){
      this.foodService.findDetailsById(foodId).subscribe(data => {
        this.food = data;
      });
    }
    
  }

  isLogged(): boolean {
    return this.auth.isLogged;
  }


  isAdmin(): boolean {
    return this.auth.isAdmin;
  }

  addToOrder(food: Food): void {
    const userId = this.auth.userid;
    if (userId === null) {
      //todo handle message
      return;
    }
    this.orderService.addFoodToOrder(userId, food).subscribe({
      next: () => {
        this.notification.showSuccess('Food successfully added to order!', 'Well done!');
        this.router.navigate(['/order/review']);
      }
    });
  }
}
