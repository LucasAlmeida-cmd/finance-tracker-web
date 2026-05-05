import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserResponse, LoginRequest, UserRegisterRequest } from '../models/auth.model';

@Injectable({
  providedIn: 'root' 
})
export class AuthService {
  
  private readonly API_URL = 'http://localhost:8080/api/users';
  private readonly API_URL_AUTH = 'http://localhost:8080/api/users';
  constructor(private http: HttpClient) { }

  login(credentials: LoginRequest): Observable<UserResponse> {
    return this.http.post<UserResponse>(`${this.API_URL_AUTH}/auth`, credentials, { withCredentials: true });
  }

  register(userData: UserRegisterRequest): Observable<any> {
    return this.http.post(`${this.API_URL}`, userData);
  }
}