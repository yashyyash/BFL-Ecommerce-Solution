import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { User } from '../model/user-model';


@Injectable({
  providedIn: 'root'
})
export class AuthUserService {
  
private _http = inject(HttpClient);
  private baseUrl = 'http://localhost:9090/api/auth';
  private _isLoggedIn = new BehaviorSubject<boolean>(false);
  private _userRole = new BehaviorSubject<'customer' | 'admin' | null>(null);

  isLoggedIn$ = this._isLoggedIn.asObservable();
  userRole$ = this._userRole.asObservable();

  register(user: User): Observable<User> {
    return this._http.post<User>(`${this.baseUrl}/register`, user);
  }

  login(credentials: { email: string; password: string }): Observable<any> {
    return this._http.post(`${this.baseUrl}/login`, credentials);
  }

  setAuth(token: string, role: 'customer' | 'admin') {
    localStorage.setItem('token', token);
    this._isLoggedIn.next(true);
    this._userRole.next(role);
  }

  logout() {
    localStorage.removeItem('token');
    this._isLoggedIn.next(false);
    this._userRole.next(null);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
}
