import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService, Project } from '../../services/project.service';
import { ProjectStatusEnum, StatusMaping } from '../project-status.enum';

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.css']
})
export class EditProjectComponent implements OnInit {
  public Status2Map = StatusMaping;
  public statusTypes = Object.values(ProjectStatusEnum).filter(value => typeof value === 'number') as ProjectStatusEnum[];
  project: Project = {
    projectID: 0,
    name: '',
    description: '',
    status: ProjectStatusEnum.New,
    createdDate: new Date(),
    updatedDate: new Date()
  };
  projectStatuses = Object.values(ProjectStatusEnum).filter(value => typeof value === 'number');

  constructor(
    private projectService: ProjectService,
    private route: ActivatedRoute,
    public router: Router
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.projectService.getProjectById(+id).subscribe((project) => {
        this.project = project;
      }, error => {
        console.error('Error loading project', error);
      });
    }
  }

  getEnumName(status: ProjectStatusEnum): string {
    return ProjectStatusEnum[status];
  }

  updateProject(): void {
    if (!this.project) return;

    this.projectService.updateProject(this.project).subscribe({
      next: () => {
        console.log('PartChecking updated successfuly');
        this.router.navigate(['/projects']);
      },
      error: (err) => {
        console.error('Error updating Project', err);
      },
    });
  }

  cancel(): void {
    this.router.navigate(['/projects']);
  }
}
