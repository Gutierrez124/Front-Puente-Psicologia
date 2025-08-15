import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:3000/auth';

  private getStoredRole(): string | null {
    return localStorage.getItem('userRole');
  }

  private userRoleSubject = new BehaviorSubject<string | null>(this.getStoredRole());
  public userRole$ = this.userRoleSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) { }

  login(email: string, password: string) {
    return this.http.post<any>(`${this.baseUrl}/login`, { email, password }).pipe(
      tap(response => {
        localStorage.setItem('token', response.access_token);
        localStorage.setItem('userRole', response.user.role);
        this.userRoleSubject.next(response.user.role);
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
  this.router.navigate(['/dashboard']);
});

      })
    );
  }

  logout(force: boolean = false) {
  localStorage.removeItem('token');
  localStorage.removeItem('userRole');
  this.userRoleSubject.next(null);

  if (force) {
    this.router.navigate(['/login'], { replaceUrl: true });
  } else {
    this.router.navigate(['/login']);
  }
}


 hasRole(roles: string[]): boolean {
  const currentRole = this.userRoleSubject.value?.toLowerCase() || '';
  return roles.some(role => role.toLowerCase() === currentRole);
}

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}
