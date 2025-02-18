import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, of, Subscription, tap } from 'rxjs';
import { LoginUser, User, UserAuthResponse, UserForRegistration } from '../../types/users';
import { Router } from '@angular/router';
import { TOKEN_NAME } from '../commons/constants';
import { JwtUserToken } from '../../types/jwt';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export default class RegistrationService {
  private registerApiUrl = 'http://localhost:3000/register';
  private loginApiUrl = 'http://localhost:3000/login';


  private user$$ = new BehaviorSubject<User | null>(null);
  private user$ = this.user$$.asObservable();
  user: User | null = null;
  userSubscription: Subscription | null = null;

  constructor(private http: HttpClient, private router: Router) {
    this.userSubscription = this.user$.subscribe((user) => {
      this.user = user;
    });
    this.checkToken();
  }

  login(body: LoginUser): Observable<User> {
    return this.http.post<UserAuthResponse>(this.loginApiUrl, body)
      .pipe(tap((user) => this.user$$.next(user.user))).pipe(tap((user) => {
          this.user$$.next(user.user);
          this.setToken(user.accessToken)
        }),
        map((user) => {
          return user.user
        }));
  }

  registerUser(body: UserForRegistration): Observable<User> {
    return this.http.post<UserAuthResponse>(this.registerApiUrl, this.addDefaultRoleToRequest(body))
      .pipe(tap((user) => {
          this.user$$.next(user.user);
          this.setToken(user.accessToken)
        }),
        map((user) => {
          return user.user;
        }));
  }

  private addDefaultRoleToRequest(user: UserForRegistration): any {
    return {username: user.username, fullName: user.fullName, email: user.email, age: user.age, password: user.password, role: 'user'};
  }

  ngOnDestroy(): void {
    this.userSubscription?.unsubscribe();
  }

  private setToken(token: string): void {
    localStorage.setItem(TOKEN_NAME, token);
  }

  getToken(): string | null {
    return localStorage.getItem(TOKEN_NAME)
  }

  logOut(): void {
    localStorage.removeItem(TOKEN_NAME);
    this.user$$.next(null);
    this.router.navigate(['/login']);
  }

  get isLogged(): boolean {
    return !!this.user;
  }

  get isAdmin(): boolean {
    return this.user?.role == 'admin';
  }

  get username(): string {
    return this.user?.username || '';
  }

  get userid(): string | null {
    return this.user?.id || null;
  }

  checkToken(): void {
    const token: string | null = localStorage.getItem(TOKEN_NAME);
    if (!token) {
      return;
    }

    const decodedToken: JwtUserToken | null = this.decodeToken(token);
    if (!decodedToken) {
      return;
    }

    const currentTime = Math.floor(Date.now() / 1000);
    const isValid = decodedToken.exp && decodedToken.exp > currentTime;
    const sub = decodedToken.sub;

    if (isValid && !this.isLogged && sub) {
      this.http.get<User>('http://localhost:3000' + `/users/${sub}`).subscribe(user => {
        this.user$$.next(user);
      })
    }

  }

  private decodeToken(token: string): JwtUserToken | null {
    try {
      return jwtDecode<JwtUserToken>(token);
    } catch (Error) {
      return null;
    }
  }

  private parseToken(): Observable<void> {
    const token: string | null = localStorage.getItem(TOKEN_NAME);
    if (!token) {
      return of(void 0);
    }

    const decodedToken: JwtUserToken | null = this.decodeToken(token);
    if (!decodedToken) {
      return of(void 0);
    }

    const currentTime = Math.floor(Date.now() / 1000);
    const isValid = decodedToken.exp && decodedToken.exp > currentTime;
    const sub = decodedToken.sub;

    if (isValid && !this.isLogged && sub) {
      return this.http.get<User>('http://localhost:3000' + `/users/${sub}`).pipe(
        tap(user => this.user$$.next(user)),
        map(() => void 0),
        catchError(() => {
          localStorage.removeItem(TOKEN_NAME);
          return of(void 0);
        }));
    } else {
      localStorage.removeItem(TOKEN_NAME);
    }

    return of(void 0);
  }

  init(): Observable<void> {
    return this.parseToken();
  }
}
