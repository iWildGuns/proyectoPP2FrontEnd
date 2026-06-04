export interface Salon {
  id: string;
  nombre: string;
  descripcion?: string;
  capacidad: number;
  habilitado: boolean;
  mesas: string[]; // IDs de mesas
  fechaCreacion: Date;
  fechaModificacion: Date;
}

export interface CrearSalonRequest {
  nombre: string;
  descripcion?: string;
  capacidad: number;
}

export interface ActualizarSalonRequest {
  nombre?: string;
  descripcion?: string;
  capacidad?: number;
  habilitado?: boolean;
}
