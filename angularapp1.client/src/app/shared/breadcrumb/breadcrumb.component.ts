import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css']
})
export class BreadcrumbComponent implements OnInit {
  breadcrumbs: Array<{ label: string, url: string }> = [];

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.breadcrumbs = this.createBreadcrumbs(this.route.root);
      console.log('Breadcrumbs:', this.breadcrumbs);
    });
  }

  createBreadcrumbs(route: ActivatedRoute): Array<{ label: string, url: string }> {
    let breadcrumbs: Array<{ label: string, url: string }> = [];
    let url = '';

    route.pathFromRoot.forEach((route) => {
      const routeURL: string = route.snapshot.url.map(segment => segment.path).join('/');
      const label = route.snapshot.data['breadcrumb'];
      console.log('Current route:', route);
      console.log('Route URL:', routeURL);
      console.log('Label:', label);

      if (routeURL !== '' && label) {
        url += `/${routeURL}`;
        breadcrumbs.push({ label: label, url: url });
      }
    });

    return breadcrumbs;
  }
}
