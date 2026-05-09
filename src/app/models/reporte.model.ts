export interface ReporteOcupacion {
  fecha: Date;
  salonId: string;
  mesasDisponibles: number;
  mesasOcupadas: number;
  mesasReservadas: number;
  porcentajeOcupacion: number;
  horaMaximaOcupacion: string;
  duracionPromedioMesa: number; // en minutos
}

export interface ReporteIngresos {
  fecha: Date;
  salonId?: string;
  ingresoTotal: number;
  cantidadOrdenes: number;
  ticketPromedio: number;
  platillosMasVendidos: PlatilloVendido[];
  categoriaMasVendida: string;
  metodoPagoPrimordial: string;
}

export interface PlatilloVendido {
  platilloId: string;
  nombre: string;
  cantidad: number;
  ingresoTotal: number;
  porcentajeDelTotal: number;
}

export interface ReporteDesempenoMesero {
  meseroId: string;
  nombreMesero: string;
  ordenesTomadas: number;
  ordenesCompletadas: number;
  tiempoPromedioAtencion: number; // en minutos
  propinasRecibidas: number;
  ingresoGenerado: number;
  calificacionPromedio: number;
}

export interface ReportePeriodico {
  fechaInicio: Date;
  fechaFin: Date;
  ventasTotales: number;
  ordenesTotales: number;
  clientesTotales: number;
  ticketPromedio: number;
  horaConMayorVentas: string;
  diaConMayorVentas: string;
  platillosTopVentas: PlatilloVendido[];
}

export interface ParamsReporte {
  fechaInicio?: Date;
  fechaFin?: Date;
  salonId?: string;
  meseroId?: string;
  tipoReporte: 'ocupacion' | 'ingresos' | 'desempenoMesero' | 'periodico';
}
