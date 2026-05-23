import { Mesa } from './mesa.model';

export interface Salon {
  id: string;
  nombre: string;
  descripcion?: string;
  capacidad: number;
  habilitado: boolean;
  mesas: Mesa[]; // IDs de mesas
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
