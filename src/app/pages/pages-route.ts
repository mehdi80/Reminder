import {Routes} from '@angular/router';
import {AuthGuard} from '../guards/auth.guard';


export const PagesRoute: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadComponent: () => import('./login-page/login-page.component').then(m => m.LoginPageComponent),
  },
  {
    path: 'register',
    loadComponent: () => import('./register-page/register-page.component').then(m => m.RegisterPageComponent),
  },
  {
    path:'dashboard',
    canActivate: [AuthGuard],
    loadComponent: () => import('./dashboard/dashboard.component').then(dashboard => dashboard.DashboardComponent),
  }
]
