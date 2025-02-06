import { Component, inject } from '@angular/core';
import { SecurityService } from '../security-service';
import { Router } from '@angular/router';
import { UserCredentials } from '../security.models';
import { extractErrorsIdentity } from '../../shared/functions/extractErrors';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registrationError: string | null = null;

  securityService = inject(SecurityService);
  router = inject(Router);
  errors: string[] = [];

  register(credentials: UserCredentials) {
    this.securityService.register(credentials).subscribe({
      next: () => {
        this.registrationError = null;
        this.router.navigate(['']);
      },
      error: err => {
        if (err.error && err.error.length > 0) {
          this.registrationError = err.error[0].description;
        } else {
          this.registrationError = 'Registration failed';
          this.errors = extractErrorsIdentity(err);
        }
      }
    })
  }


}
