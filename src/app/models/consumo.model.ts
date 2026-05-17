import { Mesa } from './mesa.model';
import { Plato } from './platillo.model';

export enum EstadoOrden {
  PENDIENTE = 'pendiente',
  PREPARACION = 'preparacion',
  LISTA = 'lista',
  ENTREGADA = 'entregada',
  CANCELADA = 'cancelada',
}

export enum EstadoPago {
  PENDIENTE = 'pendiente',
  PARCIAL = 'parcial',
  PAGADO = 'pagado',
  ANULADO = 'anulado',
}

// export interface ItemOrden {
//   id: string;
//   platilloId: string;
//   cantidad: number;
//   precio: number; // precio unitario
//   subtotal: number;
//   notas?: string;
//   horaOrden: Date;
//   estado: EstadoOrden;
// }

export interface Orden {
  id: string;
  items: Plato[];
  total: number;
  observaciones?: string;
  mesaId: Mesa['id'];
  // subtotal: number;
  // estadoPago: EstadoPago;
  // mesaId: string;
  // salonId: string;
  // descuento: number;
  // impuesto?: number;
  // horaInicio: Date;
  // horaFinalizacion?: Date;
  // meseroId?: string;
}

export interface Consumo {
  id: string;
  mesaId: string;
  salonId: string;
  ordenes: Orden[];
  consumoTotal: number;
  duracion: number; // en minutos
  horaLlegada: Date;
  horaSalida?: Date;
  clientesAtendidos: number;
  propina?: number;
  estadoPago: EstadoPago;
  observaciones?: string;
}

export interface CrearOrdenRequest {
  mesaId: string;
  items: {
    platilloId: string;
    cantidad: number;
    notas?: string;
  }[];
}

export interface ActualizarOrdenRequest {
  items?: {
    platilloId: string;
    cantidad: number;
    notas?: string;
  }[];
  estadoPago?: EstadoPago;
  observaciones?: string;
}

export interface ProcesarPagoRequest {
  ordenId: string;
  monto: number;
  metodoPago: string;
  propina?: number;
}
