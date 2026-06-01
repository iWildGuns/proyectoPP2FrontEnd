import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Usuario } from '../models/usuario.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {


  private usuariosSubject =
    new BehaviorSubject<Usuario[]>([]);

  public usuarios$ =
    this.usuariosSubject.asObservable();

  constructor(private http:HttpClient) {}

  // =========================
  // HTTP / BACKEND
  // =========================

  getUsuariosBackend() {
    return this.http.get ('http://localhost:3000/usuarios');
  }

  getUsuarioByIdBackend(id: string) {
    return this.http.get ('http://localhost:3000/usuarios/${id}');
  }

  addUsuarioBackend(usuario: Usuario) {
    return this.http.post ('http://localhost:3000/usuarios', usuario);
  }

  updateUsuarioBackend(
    id: string,
    usuario: Usuario
  ) {
    return this.http.put ('http://localhost:3000/usuarios/${id}', usuario);
  }

  deleteUsuarioBackend(id: string) {
  return this.http.delete ('http://localhost:3000/usuarios/${id}');
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