export enum EstadoMesa {
  DISPONIBLE = 'disponible',
  OCUPADA = 'ocupada',
  RESERVADA = 'reservada',
  MANTENIMIENTO = 'mantenimiento'
}

export interface Mesa {
  id: string;
  numero: number;
  capacidad: number;
  salonId: string;
  estado: EstadoMesa;
  clientesActuales?: number;
  meseroAsignado?: string;
  horaOcupacion?: Date;
  duracionEstimada?: number; // en minutos
  consumoActual?: number; // total actual
  ordenes: string[]; // IDs de órdenes
  fechaCreacion: Date;
  fechaModificacion: Date;
}

export interface CrearMesaRequest {
  numero: number;
  capacidad: number;
  salonId: string;
}

export interface ActualizarMesaRequest {
  numero?: number;
  capacidad?: number;
  salonId?: string;
  estado?: EstadoMesa;
  clientesActuales?: number;
  meseroAsignado?: string;
}

export interface CambiarEstadoMesaRequest {
  estado: EstadoMesa;
  clientesActuales?: number;
  meseroAsignado?: string;
}
