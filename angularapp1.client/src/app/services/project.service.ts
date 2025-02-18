import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { ProjectStatusEnum } from '../components/projects/project-status.enum';

export interface Project {
  projectID: number;
  name: string;
  status: ProjectStatusEnum,
  description: string;
  createdDate: Date;
  updatedDate: Date;
  diagramId?: number;
}

@Injectable({
  providedIn: 'root'
})


export class ProjectService {
  private ApiURL = environment.apiURL + '/Projects';

  constructor(private http : HttpClient) {}

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.ApiURL);
  }
  getProjectById(id: number): Observable<Project> {
    return this.http.get<Project>(`${this.ApiURL}/${id}`);
  }

  addProject(Project: Project): Observable<Project> {
    return this.http.post<Project>(this.ApiURL, Project);
  }

  updateProject(Project: Project): Observable<void> {
    return this.http.put<void>(`${this.ApiURL}/${Project.projectID}`, Project);
  }

  deleteProject(id: number): Observable<void> {
    return this.http.delete<void>(`${this.ApiURL}/${id}`);
  }
}
