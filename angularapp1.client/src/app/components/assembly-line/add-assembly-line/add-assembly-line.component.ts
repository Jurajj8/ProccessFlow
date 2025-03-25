import { Component, OnInit } from '@angular/core';
import { AssemblyLine, AssemblyLineService } from '../../../services/assembly-line.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Project, ProjectService } from '../../../services/project.service';
import { Location } from '@angular/common';


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
  projectID: number | null = null;


  constructor(private assemblyLineService: AssemblyLineService, public router: Router, private projectService: ProjectService, private _location: Location, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadProjects();
    this.extractProjectID();
  }

  loadProjects() {
    this.projectService.getProjects().subscribe((projects) => {
      this.projects = projects;
    }, error => {
      console.error('Error loading projects', error);
    });
  }

  extractProjectID() {
    this.route.paramMap.subscribe(params => {
      const projectIDParam = params.get('projectID');
      if (projectIDParam !== null) {
        this.projectID = +projectIDParam;
        this.newAssemblyLine.projectID = this.projectID;
        console.log('Project ID:', this.projectID);
      } else {
        console.error('Project ID parameter is missing');
      }
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

  back(): void {
    this._location.back();
  }
}
