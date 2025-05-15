import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class RoleGuard implements CanActivate {
  private authService = inject(AuthService);
  private router = inject(Router);

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRoles = route.data['roles'] as (
      | 'ADMIN'
      | 'EDITOR'
      | 'USER'
    )[];

    if (this.authService.hasAnyRole(expectedRoles)) {
      return true;
    }

    this.router.navigate(['/unauthorized']);
    return false;
  }
}
