import { Routes } from '@angular/router';
import { authGuard, noAuthGuard } from './guards/auth.guard';
import { Login } from './layout/login/login';
import { MainLayout } from './layout/main-layout/main-layout';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/main',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: Login,
    canActivate: [noAuthGuard],
  },
  {
    path: 'main',
    component: MainLayout,
    canActivate: [authGuard],
  },
  {
    path: '**',
    redirectTo: '/main',
  },
];
