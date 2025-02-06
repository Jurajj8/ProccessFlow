import { NgModule, inject } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ProductsComponent } from './products/products.component';
import { HomeComponent } from './home/home.component';
import { ProjectsComponent } from './projects/projects.component';
import { AddProjectComponent } from './projects/add-project/add-project.component';
import { PartCheckingComponent } from './part-checking/part-checking.component';
import { AddPartCheckingComponent } from './part-checking/add-part-checking/add-part-checking.component';
import { EditPartCheckingComponent } from './part-checking/edit-part-checking/edit-part-checking.component';
import { IsAdminGuard } from './shared/guards/is-admin.guard';
import { LoginComponent } from './security/login/login.component';
import { RegisterComponent } from './security/register/register.component';
import { isLoggedIn } from './shared/guards/is-logged.guard';
import { EditProjectComponent } from './projects/edit-project/edit-project.component';
import { AssemblyLineComponent } from './assembly-line/assembly-line.component';
import { AddAssemblyLineComponent } from './assembly-line/add-assembly-line/add-assembly-line.component';
import { EditAssemblyLineComponent } from './assembly-line/edit-assembly-line/edit-assembly-line.component';
import { ProjectDetailsComponent } from './projects/project-details/project-details.component';
import { ProfileComponent } from './profile/profile.component';
import { UsersComponent } from './users/users.component';
import { WeatherComponent } from './weather/weather.component';

const routes: Routes = [
  {
    path: '', component: HomeComponent
  },
  {
    path: 'projects', component: ProjectsComponent, canActivate: [isLoggedIn]
  },
  {
    path: 'projects/add', component: AddProjectComponent, canActivate: [isLoggedIn]
  },
  {
    path: 'projects/edit/:id', component: EditProjectComponent, canActivate: [isLoggedIn]
  },
  {
    path: 'projects/:projectID', component: ProjectDetailsComponent, canActivate: [isLoggedIn]
  },
  {
    path: 'projects/:projectID/assembly-lines/add', component: AddAssemblyLineComponent, canActivate: [isLoggedIn]
  },
  {
    path: 'projects/:projectId/assembly-lines/edit/:lineId', component: EditAssemblyLineComponent, canActivate: [isLoggedIn]
  },
  {
    path: 'partCheckings', component: PartCheckingComponent, canActivate: [isLoggedIn]
  },
  {
    path: 'partCheckings/add', component: AddPartCheckingComponent, canActivate: [isLoggedIn]
  },
  {
    path: 'partCheckings/edit/:id', component: EditPartCheckingComponent, canActivate: [isLoggedIn]
  },
  {
    path: 'assemblyLines', component: AssemblyLineComponent, canActivate: [isLoggedIn]
  },
  //{
  //  path: 'assemblyLines/add', component: AddAssemblyLineComponent
  //},
  //{
  //  path: 'assemblyLines/edit/:id', component: EditAssemblyLineComponent
  //},
  {
    path: 'profile', component: ProfileComponent
  },
  {
    path: 'users', component: UsersComponent, canActivate: [IsAdminGuard]
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'register', component: RegisterComponent
  },
  {
    path: 'weather', component: WeatherComponent
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
