import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { UserCredentials } from '../security/security.models';

export interface User {
  email: string;
  password: string;
  userName: string;
  profileImagePath?: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private ApiURL = environment.apiURL + '/users';

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.ApiURL);
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>(this.ApiURL, user);
  }

  deleteUser(email: string): Observable<void> {
    return this.http.delete<void>(`${this.ApiURL}/${email}`);
  }

  getUserByEmail(email: string): Observable<any> {
    return this.http.get<any>(`${this.ApiURL}/${email}`);
  }

  updateUser(user: UserCredentials): Observable<any> {
    return this.http.put(`${this.ApiURL}/${user.email}`, user);
  }

  addRoleToUser(email: string, role: string): Observable<void> {
    return this.http.post<void>(`${this.ApiURL}/${email}/roles`, { role });
  }

  removeRoleFromUser(email: string, role: string): Observable<void> {
    return this.http.delete<void>(`${this.ApiURL}/${email}/roles`, { body: { role } });
  }
}
