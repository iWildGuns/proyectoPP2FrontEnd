export enum CategoriaPlatillo {
  ENTRADA = 'entrada',
  PLATO_FUERTE = 'plato_fuerte',
  POSTRE = 'postre',
  BEBIDA = 'bebida',
  SNACK = 'snack'
}

export interface Platillo {
  id: string;
  nombre: string;
  descripcion: string;
  categoria: CategoriaPlatillo;
  precio: number;
  disponible: boolean;
  tiempoPreparacion: number; // en minutos
  imagenUrl?: string;
  ingredientes?: string[];
  calorias?: number;
  alergenos?: string[];
  fechaCreacion: Date;
  fechaModificacion: Date;
}

export interface CrearPlatilloRequest {
  nombre: string;
  descripcion: string;
  categoria: CategoriaPlatillo;
  precio: number;
  tiempoPreparacion: number;
  imagenUrl?: string;
  ingredientes?: string[];
  calorias?: number;
  alergenos?: string[];
}

export interface ActualizarPlatilloRequest {
  nombre?: string;
  descripcion?: string;
  categoria?: CategoriaPlatillo;
  precio?: number;
  disponible?: boolean;
  tiempoPreparacion?: number;
  imagenUrl?: string;
  ingredientes?: string[];
  calorias?: number;
  alergenos?: string[];
}
