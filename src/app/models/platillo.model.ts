import { Orden } from './consumo.model';

export enum CategoriaPlato {
  ENTRADA = 'entrada',
  PLATO_FUERTE = 'plato_fuerte',
  POSTRE = 'postre',
  BEBIDA = 'bebida',
  SNACK = 'snack',
}

export interface Plato {
  id: string;
  ordenId: Orden['id'];
  nombre: string;
  descripcion: string;
  categoria: CategoriaPlato;
  precio: number;
  disponible: boolean;
  sinGluten: boolean;
  // imagenUrl?: string;
  // fechaCreacion: Date;
  // fechaModificacion: Date;
}

export interface CrearPlatoRequest {
  nombre: string;
  descripcion: string;
  categoria: CategoriaPlato;
  precio: number;
  tiempoPreparacion: number;
  imagenUrl?: string;
  ingredientes?: string[];
  calorias?: number;
  alergenos?: string[];
}

export interface ActualizarPlatoRequest {
  nombre?: string;
  descripcion?: string;
  categoria?: CategoriaPlato;
  precio?: number;
  disponible?: boolean;
  tiempoPreparacion?: number;
  imagenUrl?: string;
  ingredientes?: string[];
  calorias?: number;
  alergenos?: string[];
}
