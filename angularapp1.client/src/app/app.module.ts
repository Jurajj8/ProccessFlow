import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { ProductsComponent } from './products/products.component';
import { HomeComponent } from './home/home.component';
import { ProjectsComponent } from './projects/projects.component'
import { AddProjectComponent } from './projects/add-project/add-project.component';
import { PartCheckingComponent } from './part-checking/part-checking.component';
import { AddPartCheckingComponent } from './part-checking/add-part-checking/add-part-checking.component';
import { EditPartCheckingComponent } from './part-checking/edit-part-checking/edit-part-checking.component';
import { LoginComponent } from './security/login/login.component';
import { AuthenticationFormComponent } from './security/authentication-form/authentication-form.component';
import { RegisterComponent } from './security/register/register.component';
import { AuthorizedComponent } from './security/authorized/authorized.component';
import { EditProjectComponent } from './projects/edit-project/edit-project.component';
import { AssemblyLineComponent } from './assembly-line/assembly-line.component';
import { AddAssemblyLineComponent } from './assembly-line/add-assembly-line/add-assembly-line.component';
import { EditAssemblyLineComponent } from './assembly-line/edit-assembly-line/edit-assembly-line.component';

import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card'
import { MatChipsModule } from '@angular/material/chips';
import { ProjectDetailsComponent } from './projects/project-details/project-details.component';
import { ProfileComponent } from './profile/profile.component';
import { MatMenuModule } from '@angular/material/menu';
import { UsersComponent } from './users/users.component';
import { WeatherComponent } from './weather/weather.component';
import { AuthInterceptor } from './security/auth.interceptor';
import { ProjectSchemaComponent } from './projects/project-schema/project-schema.component';




@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ProductsComponent,
    HomeComponent,
    ProjectsComponent,
    AddProjectComponent,
    PartCheckingComponent,
    AddPartCheckingComponent,
    EditPartCheckingComponent,
    LoginComponent,
    AuthenticationFormComponent,
    RegisterComponent,
    AuthorizedComponent,
    EditProjectComponent,
    AssemblyLineComponent,
    AddAssemblyLineComponent,
    EditAssemblyLineComponent,
    ProjectDetailsComponent,
    ProfileComponent,
    UsersComponent,
    WeatherComponent,
    ProjectSchemaComponent
  ],
  imports: [
    BrowserModule, HttpClientModule, FormsModule,
    AppRoutingModule, RouterLink, RouterOutlet,
    MatSidenavModule, MatIconModule, MatToolbarModule,
    MatListModule, MatFormFieldModule, ReactiveFormsModule, MatInputModule,
    MatButtonModule, MatCardModule, MatChipsModule, MatMenuModule
  ],
  providers: [
    provideAnimationsAsync(), {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
