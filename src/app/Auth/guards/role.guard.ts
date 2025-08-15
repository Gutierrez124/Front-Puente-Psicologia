import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';
import { state } from '@angular/animations';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor( private  authService: AuthService, private router: Router){}

  canActivate(
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): boolean {
  const expectedRoles: string[] = next.data['roles'] || [];

  if (this.authService.isLoggedIn() && this.authService.hasRole(expectedRoles)) {
    return true;
  }

   this.router.navigate(['/login'], { replaceUrl: true });
  return false;
}  
 }
  

