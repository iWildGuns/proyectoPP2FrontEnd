import { Routes } from '@angular/router';
import { Login } from './layout/login/login';
import { MainLayout } from './layout/main-layout/main-layout';
import { authGuard, noAuthGuard } from './guards/auth.guard';
import { MainPanelComponent } from './components/main-panel/main-panel';
import { SalonConfig } from './components/salon-config/salon-config';
import { SalonDetail } from './components/salon-detail/salon-detail';
import { MesaDetail } from './components/mesa-detail/mesa-detail';

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
    children: [
      { path: '', component: MainPanelComponent },
      { path: 'salon/:salonId', component: SalonDetail },
      { path: 'salon/:salonId/config', component: SalonConfig },
      { path: 'salon/:salonId/mesa/:mesaId', component: MesaDetail },
    ],
  },
  {
    path: '**',
    redirectTo: '/main',
  },
];
