import { Routes } from '@angular/router';
import { authGuard, noAuthGuard } from './guards/auth.guard';
import { Login } from './layout/login/login';
import { MainLayout } from './layout/main-layout/main-layout';
import { MainPanelComponent } from './components/main-panel/main-panel';
import { PlatoListComponent } from './components/plato-list/plato-list';

export const routes: Routes = [
  {
    path: 'login',
    component: Login,
    canActivate: [noAuthGuard],
  },
  {
    path: '',
    component: MainLayout,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        component: MainPanelComponent,
      },
      {
        path: 'menu-platos',
        component: PlatoListComponent,
      },
    ]
  },
  {
    path: '**',
    redirectTo: 'dashboard',
  },
];
