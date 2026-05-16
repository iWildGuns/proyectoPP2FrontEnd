
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Usuario, RolUsuario, LoginRequest } from '../models';
import api from '../../lib/axios';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private usuarioActualSubject =
    new BehaviorSubject<Usuario | null>(null);

  public usuarioActual$ =
    this.usuarioActualSubject.asObservable();

  // Usuarios de prueba registrados en el sistema
  private usuariosRegistrados: {
    [email: string]: {
      password: string;
      usuario: Usuario;
    }
  } = {
    'juan@restaurant.com': {
      password: 'password123',
      usuario: {
        id: '1',
        nombre: 'Juan',
        apellido: 'Pérez',
        email: 'juan@restaurant.com',
        telefono: '+34 912 345 678',
        rol: RolUsuario.ADMIN,
        activo: true,
        fechaCreacion: new Date(),
        fechaModificacion: new Date(),
      },
    },

    'maria@restaurant.com': {
      password: 'password123',
      usuario: {
        id: '2',
        nombre: 'María',
        apellido: 'García',
        email: 'maria@restaurant.com',
        telefono: '+34 912 345 679',
        rol: RolUsuario.GERENTE,
        activo: true,
        fechaCreacion: new Date(),
        fechaModificacion: new Date(),
      },
    },
  };

  constructor() {
    this.cargarUsuarioDelStorage();
  }

  // =========================
  // AXIOS / BACKEND
  // =========================

  loginBackend(credentials: LoginRequest) {
    return api.post('/auth/login', credentials);
  }

  registerBackend(usuario: any) {
    return api.post('/auth/register', usuario);
  }

  getProfileBackend() {
    return api.get('/auth/profile');
  }

  logoutBackend() {
    return api.post('/auth/logout');
  }

  // =========================
  // STORAGE LOCAL
  // =========================

  /**
   * Carga el usuario guardado
   * en localStorage
   */
  private cargarUsuarioDelStorage(): void {

    const usuarioGuardado =
      localStorage.getItem('usuarioActual');

    if (usuarioGuardado) {

      try {

        const usuario =
          JSON.parse(usuarioGuardado);

        this.usuarioActualSubject.next(usuario);

      } catch (error) {

        console.error(
          'Error al cargar usuario del storage:',
          error
        );

        localStorage.removeItem('usuarioActual');
      }
    }
  }

  /**
   * Login local de prueba
   */
  login(credentials: LoginRequest): Observable<boolean> {

    return new Observable((observer) => {

      setTimeout(() => {

        const usuarioData =
          this.usuariosRegistrados[
            credentials.email
          ];

        if (
          usuarioData &&
          usuarioData.password === credentials.password
        ) {

          this.usuarioActualSubject.next(
            usuarioData.usuario
          );

          localStorage.setItem(
            'usuarioActual',
            JSON.stringify(usuarioData.usuario)
          );

          localStorage.setItem(
            'token',
            `token_${Date.now()}`
          );

          observer.next(true);

        } else {

          observer.next(false);
        }

        observer.complete();

      }, 800);
    });
  }

  /**
   * Usuario actual observable
   */
  getUsuarioActual():
    Observable<Usuario | null> {

    return this.usuarioActual$;
  }

  /**
   * Usuario actual síncrono
   */
  getCurrentUser():
    Usuario | null {

    return this.usuarioActualSubject.value;
  }

  /**
   * Verificar login
   */
  isLoggedIn(): boolean {

    return (
      this.usuarioActualSubject.value !== null
    );
  }

  /**
   * Logout
   */
  logout(): void {

    this.usuarioActualSubject.next(null);

    localStorage.removeItem('usuarioActual');

    localStorage.removeItem('token');
  }

  /**
   * Verificar admin
   */
  isAdmin(): boolean {

    return (
      this.usuarioActualSubject.value?.rol ===
      RolUsuario.ADMIN
    );
  }

  /**
   * Verificar gerente
   */
  isGerente(): boolean {

    return (
      this.usuarioActualSubject.value?.rol ===
      RolUsuario.GERENTE
    );
  }
}
