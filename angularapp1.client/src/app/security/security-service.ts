import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development'
import { Observable, tap } from 'rxjs';
import { AuthenticatorResponse, UserCredentials } from './security.models';
import { Token } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})

export class SecurityService {

  constructor() { }

  private http = inject(HttpClient);
  private baseURL = environment.apiURL + '/users';
  private readonly keyToken = 'token';
  private readonly keyExpiration = 'token-expiration';

  register(credentials: UserCredentials): Observable<AuthenticatorResponse>
  {
    return this.http.post<AuthenticatorResponse>(`${this.baseURL}/register`, credentials)
      .pipe(
      tap(authenticatorResponse => this.storeToken(authenticatorResponse))
    )
  }

  login(credentials: UserCredentials): Observable<AuthenticatorResponse> {
    return this.http.post<AuthenticatorResponse>(`${this.baseURL}/login`, credentials)
      .pipe(
        tap(authenticatorResponse => {
          this.storeToken(authenticatorResponse);
          console.log('Logged in as:', this.getUsername());
          console.log('Roles:', this.getRoles());
        })
      );
  }

  storeToken(authenticatorResponse: AuthenticatorResponse) {
    localStorage.setItem(this.keyToken, authenticatorResponse.token);
    localStorage.setItem(this.keyExpiration, authenticatorResponse.expiration.toString());
  }

  isLoggedIn(): boolean {
    const token = this.getJWTToken();

    if (!token) {
      return false;
    }

    const expiration = localStorage.getItem(this.keyExpiration)!;
    const expirationDate = new Date(expiration);

    if (expirationDate < new Date()) {
      return false;
    }

    return true;

  }

  getJWTClaim(field: string): string {
    const token = this.getJWTToken();
    if (!token) { return ''; }

    const dataToken = JSON.parse(atob(token.split('.')[1]));
    return dataToken[field];
  }

  logout() {
    localStorage.removeItem(this.keyToken);
    localStorage.removeItem(this.keyExpiration);
  }

  getJWTToken(): string | null {
    return localStorage.getItem(this.keyToken);
  }

  getUsername() {
    return this.capitalizeFirstLetter(this.getJWTClaim('username'));
  }

  getRoles(): string[] {
  const token = this.getJWTToken();
  if (!token) return [];

  const payload = JSON.parse(atob(token.split('.')[1]));
  const roles = payload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
  return roles ? roles : [];
}

  getRoleAdmin(): boolean {
    return this.getRoles().includes('admin');

  }
  capitalizeFirstLetter(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
  }
}
