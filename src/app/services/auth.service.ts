import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { UserResponse, LoginRequest, UserRegisterRequest } from '../models/auth.model';

@Injectable({
  providedIn: 'root' 
})
export class AuthService {
  
  private readonly API_URL = 'http://localhost:8080/api/users';
  private loggedIn = new BehaviorSubject<boolean>(this.checkToken());

  constructor(private http: HttpClient, private router: Router) { }
  get isLoggedIn$(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  isLoggedIn(): boolean {
    return this.loggedIn.value;
  }

  private checkToken(): boolean {
    return !!localStorage.getItem('user_info');
  }

  login(credentials: LoginRequest): Observable<UserResponse> {
    return this.http.post<UserResponse>(`${this.API_URL}/auth`, credentials, { withCredentials: true })
      .pipe(
        tap(user => {
          localStorage.setItem('user_info', JSON.stringify(user));
          this.loggedIn.next(true); 
        })
      );
  }

  register(userData: UserRegisterRequest): Observable<any> {
    return this.http.post(`${this.API_URL}`, userData);
  }

  logout() {
    localStorage.removeItem('user_info');
    this.loggedIn.next(false); 
    this.router.navigate(['/login']);
  }

  getUserName(): string {
    const user = localStorage.getItem('user_info');
    return user ? JSON.parse(user).nome : '';
  }
}