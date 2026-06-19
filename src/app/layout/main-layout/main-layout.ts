import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';

import { ConfigMenuComponent } from '../../components/config-menu/config-menu';
import { MainPanelComponent } from '../../components/main-panel/main-panel';

@Component({
  selector: 'app-main-layout',

  standalone: true,

  imports: [CommonModule, MainPanelComponent, ConfigMenuComponent],

  templateUrl: './main-layout.html',

  styleUrl: './main-layout.css',
})
export class MainLayout {
  private authService = inject(AuthService);
  private router = inject(Router);

  currentUser$ = this.authService.getUsuarioActual();

  logout(): void {
    if (confirm('¿Estás seguro de que deseas cerrar sesión?')) {
      this.authService.logout();

      this.router.navigate(['/login']);
    }
  }
}
