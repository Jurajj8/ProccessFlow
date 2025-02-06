import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

export interface PartChecking {
  partCheckID ?: number
  name: string
  type: string
}

@Injectable({
  providedIn: 'root'
})
export class PartCheckingService {
  private ApiURL = environment.apiURL +  '/PartCheckings';

  constructor(private http: HttpClient) { }

  getPartCheckings(): Observable<PartChecking[]> {
    return this.http.get<PartChecking[]>(this.ApiURL);
  }
  getPartCheckingById(id: number): Observable<PartChecking> {
    return this.http.get<PartChecking>(`${this.ApiURL}/${id}`);
  }

  addPartChecking(PartChecking: PartChecking): Observable<PartChecking> {
    return this.http.post<PartChecking>(this.ApiURL, PartChecking);
  }

  updatePartChecking(PartChecking: PartChecking): Observable<void> {
    return this.http.put<void>(`${this.ApiURL}/${PartChecking.partCheckID}`, PartChecking);
  }

  deletePartChecking(id: number): Observable<void> {
    return this.http.delete<void>(`${this.ApiURL}/${id}`);
  }
}
