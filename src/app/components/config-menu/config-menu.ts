import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../../models/usuario.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-config-menu',
  standalone:true,
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
