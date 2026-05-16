import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Usuario } from '../models';
import api from '../../lib/axios';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private usuariosSubject =
    new BehaviorSubject<Usuario[]>([]);

  public usuarios$ =
    this.usuariosSubject.asObservable();

  constructor() {}

  // =========================
  // AXIOS / BACKEND
  // =========================

  getUsuariosBackend() {
    return api.get('/usuarios');
  }

  getUsuarioByIdBackend(id: string) {
    return api.get(`/usuarios/${id}`);
  }

  addUsuarioBackend(usuario: Usuario) {
    return api.post('/usuarios', usuario);
  }

  updateUsuarioBackend(
    id: string,
    usuario: Usuario
  ) {
    return api.put(`/usuarios/${id}`, usuario);
  }

  deleteUsuarioBackend(id: string) {
    return api.delete(`/usuarios/${id}`);
  }

  // =========================
  // ESTADO LOCAL
  // =========================

  getUsuarios(): Observable<Usuario[]> {
    return this.usuarios$;
  }

  setUsuarios(usuarios: Usuario[]): void {
    this.usuariosSubject.next(usuarios);
  }

  addUsuario(usuario: Usuario): void {

    const usuarios =
      this.usuariosSubject.value;

    this.usuariosSubject.next([
      ...usuarios,
      usuario
    ]);
  }

  updateUsuario(usuario: Usuario): void {

    const usuarios =
      this.usuariosSubject.value.map(u =>
        u.id === usuario.id ? usuario : u
      );

    this.usuariosSubject.next(usuarios);
  }

  deleteUsuario(id: string): void {

    const usuarios =
      this.usuariosSubject.value.filter(
        u => u.id !== id
      );

    this.usuariosSubject.next(usuarios);
  }
}