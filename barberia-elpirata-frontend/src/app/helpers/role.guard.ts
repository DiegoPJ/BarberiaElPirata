import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
	const expectedRoles = next.data['expectedRoles'] as Array<string>;
    const userRoles = this.authService.getUserRoles();

    // Verificar si el usuario tiene al menos uno de los roles esperados
    const hasExpectedRole = expectedRoles.some(role => userRoles.includes(role));

    if (!hasExpectedRole) {
      // Si el usuario no tiene uno de los roles esperados, redirigirlo a otra vista
      this.router.navigate(['/']);
      return false;
    }

    return true;
  }
}
