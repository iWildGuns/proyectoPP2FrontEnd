import { Consumo, Orden } from './consumo.model';
import { Salon } from './salon.model';

export enum EstadoMesa {
  DISPONIBLE = 'disponible',
  OCUPADA = 'ocupada',
  RESERVADA = 'reservada',
  MANTENIMIENTO = 'mantenimiento',
}

export interface Mesa {
  id: string;
  numero: number;
  capacidad: number;
  salonId: Salon['id'];
  estado: EstadoMesa;
  meseroAsignado?: string;
  consumoActual?: number; // total actual
  consumo: Orden;
  // clientesActuales?: number;
  // ordenes: Orden[]; // IDs de órdenes
  // horaOcupacion?: Date;
  // duracionEstimada?: number; // en minutos
  // fechaCreacion: Date;
  // fechaModificacion: Date;
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
