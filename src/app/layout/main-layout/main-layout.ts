import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Usuario } from '../../models/usuario.model';
import { SalonListComponent } from '../../components/salon-list/salon-list';
import { MainPanelComponent } from '../../components/main-panel/main-panel';
import { ConfigMenuComponent } from '../../components/config-menu/config-menu';


@Component({
  selector: 'app-main-layout',
  imports: [CommonModule, SalonListComponent, ConfigMenuComponent],
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
