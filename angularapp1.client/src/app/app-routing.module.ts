import { NgModule, inject } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ProductsComponent } from './products/products.component';
import { HomeComponent } from './home/home.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { AddProjectComponent } from './components/projects/add-project/add-project.component';
import { PartCheckingComponent } from './components/part-checking/part-checking.component';
import { AddPartCheckingComponent } from './components/part-checking/add-part-checking/add-part-checking.component';
import { EditPartCheckingComponent } from './components/part-checking/edit-part-checking/edit-part-checking.component';
import { IsAdminGuard } from './shared/guards/is-admin.guard';
import { LoginComponent } from './security/login/login.component';
import { RegisterComponent } from './security/register/register.component';
import { isLoggedIn } from './shared/guards/is-logged.guard';
import { EditProjectComponent } from './components/projects/edit-project/edit-project.component';
import { AssemblyLineComponent } from './components/assembly-line/assembly-line.component';
import { AddAssemblyLineComponent } from './components/assembly-line/add-assembly-line/add-assembly-line.component';
import { EditAssemblyLineComponent } from './components/assembly-line/edit-assembly-line/edit-assembly-line.component';
import { ProjectDetailsComponent } from './components/projects/project-details/project-details.component';
import { ProfileComponent } from './profile/profile.component';
import { UsersComponent } from './users/users.component';
import { WeatherComponent } from './weather/weather.component';
import { ProjectSchemaComponent } from './components/projects/project-schema/project-schema.component';
import { StationComponent } from './components/station/station.component';
import { AssemblyLineDetailsComponent } from './components/assembly-line/assembly-line-details/assembly-line-details.component';
import { EditStationComponent } from './components/station/edit-station/edit-station.component';
import { AddStationComponent } from './components/station/add-station/add-station.component';

const routes: Routes = [
  {
    path: '', component: HomeComponent, data: { breadcrumb: 'Home' }
  },
  {
    path: 'projects', component: ProjectsComponent, canActivate: [isLoggedIn], data: {
      breadcrumb: 'Projects'
    }
  },
  {
    path: 'projects/add', component: AddProjectComponent, canActivate: [isLoggedIn], data: {
      breadcrumb: 'Add Project'
    }
  },
  {
    path: 'projects/edit/:id', component: EditProjectComponent, canActivate: [isLoggedIn], data: {
      breadcrumb: 'Edit Project'
    }
  },
  {
    path: 'projects/:projectID', component: ProjectDetailsComponent, canActivate: [isLoggedIn], data: {
      breadcrumb: 'Project Details'
    }
  },
  {
    path: 'projects/:projectID/projectSchema', component: ProjectSchemaComponent, canActivate: [isLoggedIn], data: {
      breadcrumb: 'Project Schema'
    }
  },
  {
    path: 'projects/:projectID/assembly-lines/add', component: AddAssemblyLineComponent, canActivate: [isLoggedIn], data: {
      breadcrumb: 'Add Assembly Line'
    }
  },
  {
    path: 'projects/:projectId/assembly-lines/edit/:lineId', component: EditAssemblyLineComponent, canActivate: [isLoggedIn], data: {
      breadcrumb: 'Edit Assembly Line'
    }
  },
  {
    path: 'partCheckings', component: PartCheckingComponent, canActivate: [isLoggedIn], data: {
      breadcrumb: 'Part Checkings'
    }
  },
  {
    path: 'partCheckings/add', component: AddPartCheckingComponent, canActivate: [isLoggedIn], data: {
      breadcrumb: 'Add Part Checking'
    }
  },
  {
    path: 'partCheckings/edit/:id', component: EditPartCheckingComponent, canActivate: [isLoggedIn], data: {
      breadcrumb: 'Edit Part Checking'
    }
  },
  {
    path: 'assemblyLines', component: AssemblyLineComponent, canActivate: [isLoggedIn], data: {
      breadcrumb: 'Assembly Lines'
    }
  },
  {
    path: 'assemblyLines/add', component: AddAssemblyLineComponent, data: {
      breadcrumb: 'Add Assembly Line'
    }
  },
  {
    path: 'assemblyLines/edit/:id', component: EditAssemblyLineComponent
  },
  {
    path: 'projects/:projectId/assembly-lines/:lineID', component: AssemblyLineDetailsComponent, canActivate: [isLoggedIn], data: {
      breadcrumb: 'Assembly Line'
    }
  },
  {
    path: 'stations', component: StationComponent, canActivate: [isLoggedIn]
  },
  {
    path: 'projects/:projectId/assembly-lines/:lineID/stations/edit/:stationID', component: EditStationComponent, canActivate: [isLoggedIn]
  },
  {
    path: 'projects/:projectId/assembly-lines/:lineID/stations/add', component: AddStationComponent, canActivate: [isLoggedIn]
  },
  {
    path: 'profile', component: ProfileComponent, data: {
      breadcrumb: 'Profile'
    }
  },
  {
    path: 'users', component: UsersComponent, canActivate: [IsAdminGuard], data: {
      breadcrumb: 'Users'
    }
  },
  {
    path: 'login', component: LoginComponent, data: {
      breadcrumb: 'Login'
    }
  },
  {
    path: 'register', component: RegisterComponent, data: {
      breadcrumb: 'Register'
    }
  },
  {
    path: 'weather', component: WeatherComponent, data: {
      breadcrumb: 'Weather'
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
