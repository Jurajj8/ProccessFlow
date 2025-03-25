import { Component, OnInit } from '@angular/core';
import { ProjectService, Project } from '../../services/project.service';
import { ProjectStatusEnum } from './project-status.enum';
import * as XLSX from 'xlsx';
import { AssemblyLine, AssemblyLineService } from '../../services/assembly-line.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  projects: Project[] = [];
  assemblyLines: AssemblyLine[] = [];
  selectedProject: Project | null = null;
  filteredProjects: Project[] = [];
  searchTerm: string = '';
  fileName: string = Date.now().toString() + '.xlsx';

  constructor(private projectService: ProjectService, private assemblyLineService: AssemblyLineService) { }

  ngOnInit(): void {
    this.loadProjects();
    this.loadAssemblyLines();
  }

  loadProjects(): void {
    this.projectService.getProjects().subscribe((projects) => {
      this.projects = projects;
      this.filteredProjects = projects;
    }, error => {
      console.error('Error loading projects', error);
    });
  }

  loadAssemblyLines(): void {
    this.assemblyLineService.getAssemblyLines().subscribe((assemblyLines) => {
      this.assemblyLines = assemblyLines;
    }, error => {
      console.error('Error loading Assembly Lines', error);
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

  exportExcel(): void {
    const projectsSheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.projects);
    this.autoFitColumns(projectsSheet, this.projects);

    const assemblyLinesSheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.assemblyLines);
    this.autoFitColumns(assemblyLinesSheet, this.assemblyLines);

    const wb: XLSX.WorkBook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(wb, projectsSheet, 'Projects');
    XLSX.utils.book_append_sheet(wb, assemblyLinesSheet, 'Assembly Lines');

    XLSX.writeFile(wb, this.fileName);
  }

  autoFitColumns(sheet: XLSX.WorkSheet, data: any[]): void {
    const objectMaxLength: number[] = [];

    data.forEach((row) => {
      Object.values(row).forEach((value, index) => {
        const length = value ? value.toString().length : 10;
        objectMaxLength[index] = Math.max(objectMaxLength[index] || 0, length);
      });
    });

    const wscols = objectMaxLength.map((width) => ({ width: width + 2 }));
    sheet['!cols'] = wscols;
  }
}
