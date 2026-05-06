import { Injectable, PLATFORM_ID, inject} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { UserResponse, LoginRequest, UserRegisterRequest } from '../models/auth.model';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root' 
})
export class AuthService {
  private platformId = inject(PLATFORM_ID);
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
    if (isPlatformBrowser(this.platformId)) {
      return !!localStorage.getItem('user_info');
    }
    return false;
  }

  login(credentials: LoginRequest) {
    return this.http.post<UserResponse>(`${this.API_URL}/auth`, credentials, { withCredentials: true })
      .pipe(
        tap(user => {
          if (isPlatformBrowser(this.platformId)) {
            localStorage.setItem('user_info', JSON.stringify(user));
          }
          this.loggedIn.next(true);
        })
      );
  }

  register(userData: UserRegisterRequest): Observable<any> {
    return this.http.post(`${this.API_URL}`, userData);
  }

  logout() {
  this.http.post(`${this.API_URL}/logout`, {}, { withCredentials: true }).subscribe({
    next: () => {
      this.limparDadosLocais();
    },
    error: () => {
      this.limparDadosLocais();
    }
  });
}

  getUserName(): string {
    if (isPlatformBrowser(this.platformId)) {
      const user = localStorage.getItem('user_info');
      return user ? JSON.parse(user).nome : '';
    }
    return '';
  }

  private limparDadosLocais() {
  if (isPlatformBrowser(this.platformId)) {
    localStorage.removeItem('user_info');
  }
  this.loggedIn.next(false);
  this.router.navigate(['/login']);
}
}