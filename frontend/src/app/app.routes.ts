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
import { StudentsComponent } from './components/dashboard/students/students.component';
import { StudentsViewComponent } from './components/dashboard/students/students-view/students-view.component';
import { StudentInsertComponent } from './components/dashboard/students/student-insert/student-insert.component';
import { StudentDetailsComponent } from './components/dashboard/students/student-details/student-details.component';
import { TeacherUpdateComponent } from './components/dashboard/teachers/teacher-update/teacher-update.component';
import { StudentUpdateComponent } from './components/dashboard/students/student-update/student-update.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { RoleGuard } from './shared/guards/role.guard';
import { NotFoundPageComponent } from './components/shared/not-found-page/not-found-page.component';
import { UnauthorizedComponent } from './components/shared/unauthorized/unauthorized.component';

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
    path: 'page-not-found',
    component: NotFoundPageComponent,
  },
  {
    path: 'unauthorized',
    component: UnauthorizedComponent,
  },

  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
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
            canActivate: [RoleGuard],
            data: { roles: ['ADMIN', 'EDITOR'] },
          },
          {
            path: 'teacher/:teacherId',
            component: TeacherDetailsComponent,
          },
          {
            path: 'teacher/:teacherId/update',
            component: TeacherUpdateComponent,
            canActivate: [RoleGuard],
            data: { roles: ['ADMIN', 'EDITOR'] },
          },
        ],
      },
      {
        path: 'students',
        component: StudentsComponent,
        children: [
          {
            path: '',
            component: StudentsViewComponent,
          },
          {
            path: 'insert',
            component: StudentInsertComponent,
            canActivate: [RoleGuard],
            data: { roles: ['ADMIN', 'EDITOR'] },
          },
          {
            path: 'student/:studentId',
            component: StudentDetailsComponent,
          },
          {
            path: 'student/:studentId/update',
            component: StudentUpdateComponent,
            canActivate: [RoleGuard],
            data: { roles: ['ADMIN', 'EDITOR'] },
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
  {
    path: '**',
    redirectTo: 'page-not-found',
    pathMatch: 'full',
  },
];
