import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, filter } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BreadcrumbService {
  private breadcrumbsSubject = new BehaviorSubject<Array<{ label: string, url: string }>>([]);
  breadcrumbs = this.breadcrumbsSubject.asObservable(); 

  constructor(private router: Router) {
    this.router.events.pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        const newBreadcrumbs = this.createBreadcrumbs();
        this.breadcrumbsSubject.next(newBreadcrumbs);
      });
  }

  private createBreadcrumbs(): Array<{ label: string, url: string }> {
    let breadcrumbs: Array<{ label: string, url: string }> = [];
    let urlSegments = this.router.url.split('/').filter(segment => segment); 

    let url = '';
    for (let segment of urlSegments) {
      url += `/${segment}`;

      let matchingRoute = this.findMatchingRoute(url);
      if (matchingRoute) {
        breadcrumbs.push({ label: matchingRoute['breadcrumb'], url });
      }
    }

    return breadcrumbs;
  }


  private findMatchingRoute(url: string) {
    for (let route of this.router.config) {
      const routePath = `/${route.path}`;

      const routeRegex = new RegExp(`^${routePath.replace(/:\w+/g, '[^/]+')}$`);

      if (routeRegex.test(url) && route.data?.['breadcrumb']) {
        return { breadcrumb: route.data['breadcrumb'] };
      }
    }
    return null;
  }

}
