import { Component, OnInit } from '@angular/core';
import { ProjectService, Project } from '../services/project.service';
import { ProjectStatusEnum } from './project-status.enum';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  projects: Project[] = [];
  selectedProject: Project | null = null;
  filteredProjects: Project[] = [];
  searchTerm: string = '';

  constructor(private projectService: ProjectService) { }

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects(): void {
    this.projectService.getProjects().subscribe((projects) => {
      this.projects = projects;
      this.filteredProjects = projects;
    }, error => {
      console.error('Error loading projects', error);
    });
  }

  viewProject(id: number): void {
    if (id !== undefined) {
      this.projectService.getProjectById(id).subscribe((project) => {
        this.selectedProject = project;
      }, error => {
        console.error('Error loading project', error);
      });
    }
  }

  addProject(newProject: Project): void {
    this.projectService.addProject(newProject).subscribe((project) => {
      this.projects.push(project);
    }, error => {
      console.error('Error adding project', error);
    });
  }

  updateProject(project: Project): void {
    if (!project.projectID) return;

    this.projectService.updateProject(project).subscribe(() => {
      this.loadProjects();
    }, error => {
      console.error('Error updating project', error);
    });
  }

  deleteProject(id: number): void {
    if (id !== undefined && confirm("Are you sure to delete " + name)) {
      this.projectService.deleteProject(id).subscribe(() => {
        this.projects = this.projects.filter(p => p.projectID !== id);
        this.loadProjects();
      }, error => {
        console.error('Error deleting Project', error);
      });
    }
  }

  editProject(project: Project): void {
    this.projectService.updateProject(project).subscribe({
      next: () => {
        console.log('Project updated successfuly');
        this.loadProjects();
      },
      error: (err) => {
        console.error('Error updating Project', err);
      },
    });
  }

  getEnumName(status: ProjectStatusEnum): string {
    return ProjectStatusEnum[status];
  }

  filterProjects(): void {
    if (this.searchTerm === '') {
      this.filteredProjects = this.projects;
    } else {
      this.filteredProjects = this.projects.filter(project =>
        project.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }
}
