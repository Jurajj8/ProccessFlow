import { Component } from '@angular/core';
import { BreadcrumbService } from '../../services/breadcrumb.service';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css']
})
export class BreadcrumbComponent {
  breadcrumbs$ = this.breadcrumbService.breadcrumbs;

  constructor(private breadcrumbService: BreadcrumbService) { }
}
