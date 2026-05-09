export enum RolUsuario {
  ADMIN = 'admin',
  GERENTE = 'gerente',
  MESERO = 'mesero',
  COCINERO = 'cocinero',
  CAJA = 'caja'
}

export interface Usuario {
  id: string;
  nombre: string;
  apellido: string;
  email: string;
  telefono?: string;
  rol: RolUsuario;
  activo: boolean;
  salonAsignado?: string; // para meseros y cocineros
  fechaCreacion: Date;
  fechaModificacion: Date;
}

export interface CrearUsuarioRequest {
  nombre: string;
  apellido: string;
  email: string;
  telefono?: string;
  rol: RolUsuario;
  password: string;
  salonAsignado?: string;
}

export interface ActualizarUsuarioRequest {
  nombre?: string;
  apellido?: string;
  email?: string;
  telefono?: string;
  rol?: RolUsuario;
  activo?: boolean;
  salonAsignado?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  usuario: Usuario;
}
