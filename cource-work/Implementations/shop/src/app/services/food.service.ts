import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Food } from '../../types/food';

@Injectable({
  providedIn: 'root'
})
export class FoodService {
  private baseUrl = 'http://localhost:3000/food'; // JSON server URL

  constructor(private http: HttpClient) { }

  getFood(): Observable<Food[]>{
    return this.http.get<Food[]>(this.baseUrl);
  }

  getFoodById(id: string): Observable<Food> {
    return this.http.get<Food>(`${this.baseUrl}/${id}`);
  }

  updateFood(food: Food): Observable<Food> {
    return this.http.put<Food>(`${this.baseUrl}/${food.id}`, food);
  }

  findDetailsById(id: string): Observable<Food> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Food>(url);
  }

  createFood(food: Food): Observable<Food> {
    return this.http.post<Food>(this.baseUrl, food);
  }

  getFoodByFilters(
    name: string,
    category: string,
    caloriesMin: number,
    caloriesMax: number
  ): Observable<Food[]> {
    let url = `${this.baseUrl}?`;
    if (name) {
      url += `name_like=${name}&`;
    }
    if (category) {
      url += `category_like=${category}&`;
    }
    if (caloriesMin || caloriesMax) {
      url += `calories_gte=${caloriesMin}&calories_lte=${caloriesMax}&`;
    }

    // Remove trailing "&"
    url = url.slice(0, -1);

    return this.http.get<Food[]>(url);
  }
}
