import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../types/users';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfilesService {
  private baseUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient) { }

  getAllProfiles(): Observable<User[]>{
    return this.http.get<User[]>(this.baseUrl);
  }
}
