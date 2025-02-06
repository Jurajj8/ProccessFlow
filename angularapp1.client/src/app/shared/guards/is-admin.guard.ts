import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { SecurityService } from '../../security/security-service';

@Injectable({
  providedIn: 'root'
})
export class IsAdminGuard implements CanActivate {

  constructor(private securityService: SecurityService, private router: Router) { }

  canActivate(): boolean {
    const userRoles = this.securityService.getRoles();
    console.log(userRoles);
    if (userRoles.includes('admin')) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
