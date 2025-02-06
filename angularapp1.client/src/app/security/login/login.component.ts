import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { SecurityService } from '../security-service';
import { UserCredentials } from '../security.models';
import { extractErrorsIdentity } from '../../shared/functions/extractErrors';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  securityService = inject(SecurityService);
  router = inject(Router);
  errors: string[] = [];
  loginError: string | null = null;


  login(credentials: UserCredentials) {
    this.securityService.login(credentials).subscribe({
      next: () => {
        this.loginError = null;
        this.router.navigate(['/']);
      },
      error: err => {
        this.loginError = 'Wrong password or email';
        this.errors = extractErrorsIdentity(err);
      }
    })
  }
}
