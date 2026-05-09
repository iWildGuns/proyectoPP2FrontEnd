import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Usuario } from '../../models';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-config-menu',
  imports: [CommonModule],
  templateUrl: './config-menu.html',
  styleUrl: './config-menu.css',
})
export class ConfigMenuComponent implements OnInit {
  usuarioActual$: Observable<Usuario | null>;
  menuExpandido = false;

  constructor(private authService: AuthService) {
    this.usuarioActual$ = this.authService.getUsuarioActual();
  }

  ngOnInit(): void {}

  toggleMenu(): void {
    this.menuExpandido = !this.menuExpandido;
  }

  logout(): void {
    this.authService.logout();
  }
}
