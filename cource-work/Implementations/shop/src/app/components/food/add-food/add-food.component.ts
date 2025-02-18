import { Component, OnInit } from '@angular/core';
import { FoodService } from '../../../services/food.service';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Food } from '../../../../types/food';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from '../../../services/notification.service';

@Component({
  selector: 'app-add-food',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './add-food.component.html',
  styleUrl: './add-food.component.css'
})
export class AddFoodComponent implements OnInit{
  food: Food = {} as Food;
  isEditMode: boolean = false;

  constructor(private foodService: FoodService, private router: Router, private route: ActivatedRoute, private notification: NotificationService){}

  ngOnInit(): void {
    const foodId = this.route.snapshot.paramMap.get('id');
    if (foodId) {
      this.isEditMode = true;
      this.foodService.getFoodById(foodId).subscribe({
        next: (data: Food) => {
          this.food = data; // Populate the form with fetched data
        },
        error: () => {
          this.router.navigate(['/all/food']); // Redirect in case of failure
        },
      });
    }
  }

  onSubmit(foodForm: NgForm){
    if (foodForm.valid) {
      if (this.isEditMode) {
        this.updateFood();
      } else {
        this.addFood();
      }
    }
  }

  private addFood(): void {
    this.foodService.createFood(this.food).subscribe({
      next: () => {
        this.notification.showSuccess('Food created successfully!', 'Well done!');
        this.router.navigate(['/all/food']);
      },
      error: () => {
        this.notification.showError('Something went wrong!', 'Oops!');
      },
    });
  }

  private updateFood(): void {
    this.foodService.updateFood(this.food).subscribe({
      next: () => {
        this.notification.showSuccess('Food updated successfully!', 'Well done!');
        this.router.navigate(['/food/details/', this.food.id]);
      },
      error: () => {
        this.notification.showError('Something went wrong!', 'Oops!');
      },
    });
  }
}
