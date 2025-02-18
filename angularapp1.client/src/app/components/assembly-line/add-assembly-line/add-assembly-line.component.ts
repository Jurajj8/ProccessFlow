import { Component, OnInit } from '@angular/core';
import { AssemblyLine, AssemblyLineService } from '../../../services/assembly-line.service';
import { Router } from '@angular/router';
import { Project, ProjectService } from '../../../services/project.service';

@Component({
  selector: 'app-add-assembly-line',
  templateUrl: './add-assembly-line.component.html',
  styleUrl: './add-assembly-line.component.css'
})
export class AddAssemblyLineComponent implements OnInit {
  newAssemblyLine: AssemblyLine = {
    lineID: 0,
    name: '',
    description: '',
    projectID: 0
  };
  projects: Project[] = [];

  constructor(private assemblyLineService: AssemblyLineService, public router: Router,private projectService: ProjectService) { }

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects() {
    this.projectService.getProjects().subscribe((projects) => {
      this.projects = projects;
    }, error => {
      console.error('Error loading projects', error);
    });
  }

  addAssemblyLine(): void {
    if (this.newAssemblyLine.name.length > 1 && this.newAssemblyLine.description.length > 1 && this.newAssemblyLine.projectID) {
      this.assemblyLineService.addAssemblyLine(this.newAssemblyLine).subscribe((assemblyLine) => {
        this.router.navigate(['/assemblyLines']);
      }, error => {
        console.error('Error adding AssemblyLine', error);
      });
    } else {
      console.error('Validation failed: All fields are required.');
    }
  }
}
