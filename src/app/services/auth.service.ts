import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Usuario, RolUsuario, LoginRequest } from '../models';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private usuarioActualSubject = new BehaviorSubject<Usuario | null>(null);
  public usuarioActual$ = this.usuarioActualSubject.asObservable();

  // Usuarios de prueba registrados en el sistema
  private usuariosRegistrados: { [email: string]: { password: string; usuario: Usuario } } = {
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

  /**
   * Carga el usuario guardado en localStorage al iniciar la aplicación
   */
  private cargarUsuarioDelStorage(): void {
    const usuarioGuardado = localStorage.getItem('usuarioActual');
    if (usuarioGuardado) {
      try {
        const usuario = JSON.parse(usuarioGuardado);
        this.usuarioActualSubject.next(usuario);
      } catch (error) {
        console.error('Error al cargar usuario del storage:', error);
        localStorage.removeItem('usuarioActual');
      }
    }
  }

  /**
   * Intenta iniciar sesión con las credenciales proporcionadas
   */
  login(credentials: LoginRequest): Observable<boolean> {
    // Simular delay de red
    return new Observable((observer) => {
      setTimeout(() => {
        const usuarioData = this.usuariosRegistrados[credentials.email];

        if (usuarioData && usuarioData.password === credentials.password) {
          // Login exitoso
          this.usuarioActualSubject.next(usuarioData.usuario);
          localStorage.setItem('usuarioActual', JSON.stringify(usuarioData.usuario));
          localStorage.setItem('token', `token_${Date.now()}`);
          observer.next(true);
        } else {
          // Login fallido
          observer.next(false);
        }
        observer.complete();
      }, 800);
    });
  }

  /**
   * Obtiene el usuario actual como Observable
   */
  getUsuarioActual(): Observable<Usuario | null> {
    return this.usuarioActual$;
  }

  /**
   * Obtiene el usuario actual de forma síncrona
   */
  getCurrentUser(): Usuario | null {
    return this.usuarioActualSubject.value;
  }

  /**
   * Verifica si hay un usuario logueado
   */
  isLoggedIn(): boolean {
    return this.usuarioActualSubject.value !== null;
  }

  /**
   * Cierra la sesión del usuario actual
   */
  logout(): void {
    this.usuarioActualSubject.next(null);
    localStorage.removeItem('usuarioActual');
    localStorage.removeItem('token');
  }

  /**
   * Verifica si el usuario actual es administrador
   */
  isAdmin(): boolean {
    return this.usuarioActualSubject.value?.rol === RolUsuario.ADMIN;
  }

  /**
   * Verifica si el usuario actual es gerente
   */
  isGerente(): boolean {
    return this.usuarioActualSubject.value?.rol === RolUsuario.GERENTE;
  }
}
