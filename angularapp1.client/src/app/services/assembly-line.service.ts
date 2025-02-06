import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

export interface AssemblyLine {
  lineID: number
  projectID: number
  name: string
  description: string
}

@Injectable({
  providedIn: 'root'
})
export class AssemblyLineService {
  private ApiURL = environment.apiURL + '/AssemblyLines';

  constructor(private http: HttpClient) { }

  getAssemblyLines(): Observable<AssemblyLine[]> {
    return this.http.get<AssemblyLine[]>(this.ApiURL);
  }
  getAssemblyLineByID(id: number): Observable<AssemblyLine> {
    return this.http.get<AssemblyLine>(`${this.ApiURL}/${id}`);
  }

  getAssemblyLineByProject(projectID: number): Observable<AssemblyLine[]> {
    return this.http.get<AssemblyLine[]>(`${this.ApiURL}?projectID=${projectID}`);
  }

  addAssemblyLine(assemblyLine: AssemblyLine): Observable<AssemblyLine> {
    return this.http.post<AssemblyLine>(this.ApiURL, assemblyLine);
  }

  updateAssemblyLine(assemblyLine: AssemblyLine): Observable<void> {
    return this.http.put<void>(`${this.ApiURL}/${assemblyLine.lineID}`, assemblyLine);
  }

  deleteAssemblyLine(id: number): Observable<void> {
    return this.http.delete<void>(`${this.ApiURL}/${id}`);
  }
}
