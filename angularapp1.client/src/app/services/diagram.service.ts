import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
export interface DiagramData {
  id: number;
  name: string;
  jsonData: string;
  projectID: number;
}

@Injectable({
  providedIn: 'root'
})

export class DiagramService {
  private apiUrl = environment.apiURL + '/Diagrams';

  constructor(private http: HttpClient) { }

  getDiagram(projectID: number): Observable<DiagramData> {
    return this.http.get<DiagramData>(`${this.apiUrl}/${projectID}`);
  }

  saveDiagram(diagramData: any): Observable<any> {
    return this.http.post(this.apiUrl, diagramData);
  }

  updateDiagram(id: number, diagramData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, diagramData);
  }
}
