import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private http = inject(HttpClient);
  private API_URL = 'http://localhost:3000/usuarios';

  private usuariosSubject = new BehaviorSubject<Usuario[]>([]);
  public usuarios$ = this.usuariosSubject.asObservable();

  // =========================
  // HTTP / BACKEND
  // =========================

  getUsuariosBackend() {
    return this.http.get(`${this.API_URL}`);
  }

  getUsuarioByIdBackend(id: string) {
    return this.http.get(`${this.API_URL}/${id}`);
  }

  addUsuarioBackend(usuario: Usuario) {
    return this.http.post(`${this.API_URL}`, usuario, {
      headers: { 'X-Toast-Message': 'Usuario añadido con éxito'}
    });
  }

  updateUsuarioBackend(
    id: string,
    usuario: Usuario
  ) {
    return this.http.put(`${this.API_URL}/${id}`, usuario, {
      headers: { 'X-Toast-Message': 'Usuario actualizado con éxito'}
    });
  }

  deleteUsuarioBackend(id: string) {
  return this.http.delete(`${this.API_URL}/${id}`, {
      headers: { 'X-Toast-Message': 'Usuario eliminado con éxito'}
    });
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
    const usuarios = this.usuariosSubject.value;

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