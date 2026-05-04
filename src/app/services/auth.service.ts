import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthResponse, LoginRequest, UserRegisterRequest } from '../models/auth.model';

@Injectable({
  providedIn: 'root' 
})
export class AuthService {
  
  private readonly API_URL = 'http://localhost:8080/api/auth';

  constructor(private http: HttpClient) { }

  login(credentials: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.API_URL}/login`, credentials);
  }

  register(userData: UserRegisterRequest): Observable<any> {
    return this.http.post(`${this.API_URL}/register`, userData);
  }
}