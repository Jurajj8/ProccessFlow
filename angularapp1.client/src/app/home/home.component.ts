import { Component, OnInit } from '@angular/core';
import { Project, ProjectService } from '../services/project.service';
import { ProjectStatusEnum, StatusMaping } from '../projects/project-status.enum';
import { User, UserService } from '../services/user.service';
import { AssemblyLine, AssemblyLineService } from '../services/assembly-line.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  projects: Project[] = [];
  statusArray: string[] = [];
  users: User[] = [];
  assemblyLines: AssemblyLine[] = [];

  constructor(private projectService: ProjectService, private userService: UserService, private assemblyLineService: AssemblyLineService) { }

  ngOnInit(): void {
    this.loadProjects();
    this.loadUsers();
    this.loadAssemblyLines();
    this.statusArray = Object.values(StatusMaping);
  }

  loadProjects(): void {
    this.projectService.getProjects().subscribe((projects) => {
      this.projects = projects.sort((a, b) => new Date(b.updatedDate).getTime() - new Date(a.updatedDate).getTime());
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

  loadUsers(): void {
    this.userService.getUsers().subscribe((users) => {
      this.users = users;
    }, error => {
      console.error('Error loading users', error);
    });
  }

  loadAssemblyLines(): void {
    this.assemblyLineService.getAssemblyLines().subscribe((assemblyLines) => {
      this.assemblyLines = assemblyLines;
    }, error => {
      console.error('Error loading AssemblyLines', error);
    });
  }
}
