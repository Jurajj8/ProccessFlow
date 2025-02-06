import { Component, OnInit } from '@angular/core';
import { Project, ProjectService } from '../../services/project.service';
import { AssemblyLine, AssemblyLineService } from '../../services/assembly-line.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrl: './project-details.component.css'
})
export class ProjectDetailsComponent implements OnInit {
  project: Project | undefined;
  assemblyLines: AssemblyLine[] = [];

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private assemblyLineService: AssemblyLineService
  ) { }

  ngOnInit(): void {
    const projectID = Number(this.route.snapshot.paramMap.get('projectID'));
    this.loadProject(projectID);
    this.loadAssemblyLines(projectID);
  }

  loadProject(projectID: number): void {
    this.projectService.getProjectById(projectID).subscribe((project) => {
      this.project = project;
    }, error => {
      console.error('Error loading project', error);
    });
  }

  loadAssemblyLines(projectID: number): void {
    this.assemblyLineService.getAssemblyLineByProject(projectID).subscribe((assemblyLines) => {
      this.assemblyLines = assemblyLines;
    }, error => {
      console.error('Error loading assembly lines', error);
    });
  }

  deleteAssemblyLine(lineID: number): void {
    if (confirm('Are you sure you want to delete this assembly line?')) {
      this.assemblyLineService.deleteAssemblyLine(lineID).subscribe(() => {
        this.assemblyLines = this.assemblyLines.filter(al => al.lineID !== lineID);
      }, error => {
        console.error('Error deleting AssemblyLine', error);
      });
    }
  }
}
