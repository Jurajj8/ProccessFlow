import { Component, Input, inject } from '@angular/core';
import { SecurityService } from '../security-service';

@Component({
  selector: 'app-authorized',
  templateUrl: './authorized.component.html',
  styleUrls: ['./authorized.component.css']
})
export class AuthorizedComponent {
  securityService = inject(SecurityService);

  @Input()
  role?: string;

  isAuthorized(): boolean {
    if (this.role) {
      return this.securityService.getRoles().includes(this.role);
    } else {
      return this.securityService.isLoggedIn();
    }
  }
}
