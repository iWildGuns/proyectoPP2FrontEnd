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
  estado: EstadoMesa;
  meseroAsignado?: string;
  consumoActual?: number; // total actual
  //consumo: number;
  clientesActuales?: number;
  horaOcupacion?: Date;
  duracionEstimada?: number; // en minutos
  fechaCreacion: Date;
  fechaModificacion: Date;
}

export interface CrearMesaRequest {
  numero: number;
  capacidad: number;
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
