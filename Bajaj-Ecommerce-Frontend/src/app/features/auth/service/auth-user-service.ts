// import { HttpClient } from '@angular/common/http';
// import { Injectable, inject } from '@angular/core';
// import { User } from '../model/user-model';
// import { BehaviorSubject, Observable, tap } from 'rxjs';
// import { Router } from '@angular/router';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthUserService {
//   private http = inject(HttpClient);
//   private router = inject(Router);
  
//   // Your backend API URL
//   private apiUrl = 'http://localhost:9090/api/auth';

//   // --- State Management ---
//   // Keep track of login state and role
//   private isLoggedIn$ = new BehaviorSubject<boolean>(this.hasToken());
//   private userRole$ = new BehaviorSubject<'customer' | 'admin' | null>(this.getRoleFromToken());

//   // Public observables for components to listen to (like your navbar)
//   public isLoggedIn: Observable<boolean> = this.isLoggedIn$.asObservable();
//   public userRole: Observable<'customer' | 'admin' | null> = this.userRole$.asObservable();

//   // --- API Calls ---

//   /**
//    * Register a new user
//    */
//   register(user: User): Observable<any> {
//     return this.http.post<any>(`${this.apiUrl}/register`, user).pipe(
//       tap(response => {
//         // Automatically log the user in after they register
//         this.setAuth(response.token, response.user.role);
//       })
//     );
//   }

//   /**
//    * Log in an existing user
//    */
//   login(credentials: any): Observable<any> {
//     return this.http.post<any>(`${this.apiUrl}/login`, credentials).pipe(
//       tap(response => {
//         // On success, save token and role
//         this.setAuth(response.token, response.user.role);
//       })
//     );
//   }

//   /**
//    * Log the user out
//    */
//   logout(): void {
//     localStorage.removeItem('token');
//     localStorage.removeItem('role');
    
//     this.isLoggedIn$.next(false);
//     this.userRole$.next(null);
    
//     // Go back to signin page
//     this.router.navigate(['/signin']);
//   }

//   // --- Helper Methods ---

//   /**
//    * Save token and role to localStorage and update state
//    */
//   private setAuth(token: string, role: 'customer' | 'admin'): void {
//     localStorage.setItem('token', token);
//     localStorage.setItem('role', role); // Also save role for quick access
    
//     this.isLoggedIn$.next(true);
//     this.userRole$.next(role);
//   }

//   /**
//    * Check if a token exists
//    */
//   hasToken(): boolean {
//     return !!localStorage.getItem('token');
//   }

//   /**
//    * Get the token
//    */
//   getToken(): string | null {
//     return localStorage.getItem('token');
//   }

//   /**
//    * Get the user's role
//    */
//   getRoleFromToken(): 'customer' | 'admin' | null {
//     return localStorage.getItem('role') as 'customer' | 'admin' | null;
//   }
// }
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { User } from '../model/user-model';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthUserService {
  private http = inject(HttpClient);
  private router = inject(Router);
  
  // Make sure this matches your backend port
  private apiUrl = 'http://localhost:9090/api/auth'; 

  // --- State Management ---
  private isLoggedIn$ = new BehaviorSubject<boolean>(this.hasToken());
  private userRole$ = new BehaviorSubject<'customer' | 'admin' | null>(this.getRoleFromToken());

  // Public observables for your navbar
  public isLoggedIn: Observable<boolean> = this.isLoggedIn$.asObservable();
  public userRole: Observable<'customer' | 'admin' | null> = this.userRole$.asObservable();

  // --- API Calls ---

  /**
   * Register a new user
   */
  register(user: User): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, user).pipe(
      tap(response => {
        // This is the success part!
        // Save the token and role from the response.
        this.setAuth(response.token, response.user.role);
      })
    );
  }

  /**
   * Log in an existing user
   */
  login(credentials: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, credentials).pipe(
      tap(response => {
        // This is the success part!
        // Save the token and role from the response.
        this.setAuth(response.token, response.user.role);
      })
    );
  }

  /**
   * Log the user out
   */
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    
    this.isLoggedIn$.next(false);
    this.userRole$.next(null);
    
    this.router.navigate(['/signin']);
  }

  // --- Helper Methods ---

  /**
   * Save token and role to localStorage and update state
   */
  private setAuth(token: string, role: 'customer' | 'admin'): void {
    localStorage.setItem('token', token);
    localStorage.setItem('role', role); // Also save role
    
    this.isLoggedIn$.next(true);
    this.userRole$.next(role);
  }

  /**
   * Check if a token exists (for the auth guard)
   */
  hasToken(): boolean {
    return !!localStorage.getItem('token');
  }

  /**
   * Get the token
   */
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  /**
   * Get the user's role
   */
  getRoleFromToken(): 'customer' | 'admin' | null {
    return localStorage.getItem('role') as 'customer' | 'admin' | null;
  }
}