import { Component } from '@angular/core';
import { Project, ProjectService } from '../../../services/project.service';
import { Router } from '@angular/router';
import { ProjectStatusEnum } from '../project-status.enum';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrl: './add-project.component.css'
})
export class AddProjectComponent {
  newProject: Project = {
    projectID: 0,
    name: '',
    description: '',
    status: ProjectStatusEnum.New,
    createdDate: new Date(),
    updatedDate: new Date()
  };

  constructor(private projectService: ProjectService, public router: Router) {}

  addProject(): void {
    if (this.newProject.name.length > 1) {
      this.newProject.status = ProjectStatusEnum.New;
      this.projectService.addProject(this.newProject).subscribe((project) => {
        this.router.navigate(['/projects']);
      }, error => {
        console.error('Error adding Project', error);
      });
    }
  }
}
