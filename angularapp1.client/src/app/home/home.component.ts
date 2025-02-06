import { Component, OnInit } from '@angular/core';
import { Project, ProjectService } from '../services/project.service';
import { ProjectStatusEnum } from '../projects/project-status.enum';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  projects: Project[] = [];

  constructor(private projectService: ProjectService) { }
  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects(): void {
    this.projectService.getProjects().subscribe((projects) => {
      this.projects = projects;
    }, error => {
      console.error('Error loading projects', error);
    });
  }



  getEnumName(status: ProjectStatusEnum): string {
    return ProjectStatusEnum[status];
  }
}
