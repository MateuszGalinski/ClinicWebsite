import {inject, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {RouterModule, Routes} from "@angular/router";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {HomeComponent} from "./home/home.component";
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {httpInterceptorProviders} from "./auth/auth-interceptor";
import {authGuard} from "./guards/auth.guard";
import { SidebarComponent } from './sidebar/sidebar.component';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatListModule} from "@angular/material/list";
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ProfileComponent } from './profile/profile.component';
import {MatCardModule} from "@angular/material/card";
import { VisitsComponent } from './visits/visits.component';
import {MatExpansionModule} from "@angular/material/expansion";
import { BookvisitComponent } from './bookvisit/bookvisit.component';
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import { VisitsDoctorComponent } from './visits-doctor/visits-doctor.component';
import { RegisterDoctorComponent } from './register-doctor/register-doctor.component';
import { RegisterAdminComponent } from './register-admin/register-admin.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { DoctorListAdminComponent } from './doctor-list-admin/doctor-list-admin.component';




const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [authGuard], data: { roles: ['ROLE_USER', 'ROLE_DOCTOR']} },
  { path: 'visits', component: VisitsComponent, canActivate: [authGuard], data: { roles: ['ROLE_USER']} },
  { path: 'doctor-visits', component: VisitsDoctorComponent, canActivate: [authGuard], data: { roles: ['ROLE_DOCTOR']} },
  { path: 'booking', component: BookvisitComponent, canActivate: [authGuard], data: { roles: ['ROLE_USER']}},
  { path: 'auth/login', component: LoginComponent },
  { path: 'signup', component: RegisterComponent },
  { path: 'admin-panel', component: AdminPanelComponent, canActivate: [authGuard], data: { roles: ['ROLE_ADMIN']}},
  { path: 'admin-doctor-list', component: DoctorListAdminComponent, canActivate: [authGuard], data: {roles: ['ROLE_ADMIN']}},
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    SidebarComponent,
    ProfileComponent,
    VisitsComponent,
    BookvisitComponent,
    VisitsDoctorComponent,
    RegisterDoctorComponent,
    RegisterAdminComponent,
    AdminPanelComponent,
    DoctorListAdminComponent,
  ],
  imports: [
    BrowserModule,
    // import HttpClientModule after BrowserModule.
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatExpansionModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule
  ],
  providers: [
    httpInterceptorProviders,
    MatDatepickerModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
