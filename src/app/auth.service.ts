import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../environments/environment';

import { JwtHelperService } from '@auth0/angular-jwt';

const helper = new JwtHelperService();

import { User } from './User';
import { RegisterUser } from './RegisterUser';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  getToken(): String {
    return localStorage.getItem('access_token');
  }

  readToken(): User {
    let token = localStorage.getItem('access_token');
    return helper.decodeToken(token);
  }

  isAuthenticated(): Boolean {
    const token = localStorage.getItem('access_token');

    if (token) {
      console.log('token exists');
      return true;
    } else {
      console.log('no token');
      return false;
    }
  }

  login(user: User): Observable<any> {
    return this.http.post<any>(`${environment.userAPIBase}/login`, user);
  }

  logout() {
    localStorage.removeItem('access_token');
  }

  register(registerUser: RegisterUser): Observable<any> {
    return this.http.post<any>(
      `${environment.userAPIBase}/register`,
      registerUser
    );
  }
}
