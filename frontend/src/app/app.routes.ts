import { Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { LandingComponent } from './components/landing/landing.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DashboardHomeComponent } from './components/dashboard/dashboard-home/dashboard-home.component';
import { TeachersComponent } from './components/dashboard/teachers/teachers.component';
import { TeacherDetailsComponent } from './components/dashboard/teachers/teacher-details/teacher-details.component';
import { TeachersViewComponent } from './components/dashboard/teachers/teachers-view/teachers-view.component';
import { TeacherInsertComponent } from './components/dashboard/teachers/teacher-insert/teacher-insert.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'home',
    component: LandingComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      {
        path: '',
        component: DashboardHomeComponent,
      },
      {
        path: 'teachers',
        component: TeachersComponent,
        children: [
          {
            path: '',
            component: TeachersViewComponent,
          },
          {
            path: 'insert',
            component: TeacherInsertComponent,
          },
          {
            path: 'teacher/:teacherId',
            component: TeacherDetailsComponent,
          },
        ],
      },
    ],
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];
