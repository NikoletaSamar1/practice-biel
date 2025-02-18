import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
import { Order } from '../../types/order';
import { Food } from '../../types/food';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = 'http://localhost:3000/orders';

  constructor(private http: HttpClient) {}

  // Get all food for the order for a specific user
  getAllFoodForOrder(userId: string): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.apiUrl}?userId=${userId}`);
  }

  // Add food to the order for a specific user
  addFoodToOrder(userId: string, food: Food): Observable<Order> {
    return this.http.get<Order[]>(`${this.apiUrl}?userId=${userId}`).pipe(
      switchMap((orders: Order[]) => {
        if (orders.length === 0) {
          // No order exists for this user, create a new order
          const newOrder: Order = {
            id: this.generateId(),
            userId,
            food: [food],
            totalValue: food.price
          };
          return this.http.post<Order>(this.apiUrl, newOrder);
        } else {
          // Update the existing order for the user
          const order = orders[0];
          order.food.push(food);
          order.totalValue += food.price;
          return this.http.put<Order>(`${this.apiUrl}/${order.id}`, order);
        }
      })
    );
  }

  // Remove food from the order for a specific user
  removeFoodFromOrder(userId: string, foodId: string): Observable<Order> {
    return this.http.get<Order[]>(`${this.apiUrl}?userId=${userId}`).pipe(
      switchMap((orders: Order[]) => {
        if (orders.length === 0) {
          throw new Error('Order not found for the user');
        }
        const order = orders[0];
        const foodIndex = order.food.findIndex(f => f.id === foodId);
        if (foodIndex === -1) {
          throw new Error('Food item not found in the order');
        }
        // Remove the food item
        const removedFood = order.food.splice(foodIndex, 1)[0];
        order.totalValue -= removedFood.price;
        return this.http.put<Order>(`${this.apiUrl}/${order.id}`, order);
      })
    );
  }


  deleteOrder(userId: string): Observable<void> {
    return this.http.get<Order[]>(`${this.apiUrl}?userId=${userId}`).pipe(
      switchMap((orders: Order[]) => {
        if (orders.length === 0) {
          throw new Error('Order not found for the user');
        }
        const order = orders[0];
        return this.http.delete<void>(`${this.apiUrl}/${order.id}`);
      })
    );
  }

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }
}
