import { Component, OnInit } from '@angular/core';
import { Project, ProjectService } from '../services/project.service';
import { ProjectStatusEnum, StatusMaping } from '../projects/project-status.enum';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  projects: Project[] = [];
  statusArray: string[] = [];

  constructor(private projectService: ProjectService) { }

  ngOnInit(): void {
    this.loadProjects();
    this.statusArray = Object.values(StatusMaping);
  }

  loadProjects(): void {
    this.projectService.getProjects().subscribe((projects) => {
      this.projects = projects;
    }, error => {
      console.error('Error loading projects', error);
    });
  }

  getProjectsByStatus(status: ProjectStatusEnum): any[] {
    return this.projects.filter(project => project.status === status);
  }

  getEnumName(status: ProjectStatusEnum): string {
    return StatusMaping[status];
  }

  getEnumValue(statusName: string): ProjectStatusEnum {
    return (ProjectStatusEnum as any)[statusName];
  }
}
