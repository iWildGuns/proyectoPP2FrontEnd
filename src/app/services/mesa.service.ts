import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Mesa, EstadoMesa } from '../models';

@Injectable({
  providedIn: 'root'
})
export class MesaService {
  private selectedMesaSubject = new BehaviorSubject<Mesa | null>(null);
  public selectedMesa$ = this.selectedMesaSubject.asObservable();

  private mesasSubject = new BehaviorSubject<Mesa[]>([
    {
      id: 'M1',
      numero: 1,
      capacidad: 4,
      salonId: '1',
      estado: EstadoMesa.OCUPADA,
      clientesActuales: 3,
      meseroAsignado: 'Carlos',
      horaOcupacion: new Date(Date.now() - 45 * 60000), // hace 45 minutos
      duracionEstimada: 90,
      consumoActual: 85.50,
      ordenes: ['ORD001', 'ORD002'],
      fechaCreacion: new Date(),
      fechaModificacion: new Date()
    },
    {
      id: 'M2',
      numero: 2,
      capacidad: 2,
      salonId: '1',
      estado: EstadoMesa.DISPONIBLE,
      ordenes: [],
      fechaCreacion: new Date(),
      fechaModificacion: new Date()
    },
    {
      id: 'M3',
      numero: 3,
      capacidad: 6,
      salonId: '1',
      estado: EstadoMesa.OCUPADA,
      clientesActuales: 5,
      meseroAsignado: 'María',
      horaOcupacion: new Date(Date.now() - 20 * 60000), // hace 20 minutos
      duracionEstimada: 120,
      consumoActual: 125.75,
      ordenes: ['ORD003', 'ORD004', 'ORD005'],
      fechaCreacion: new Date(),
      fechaModificacion: new Date()
    },
    {
      id: 'M4',
      numero: 4,
      capacidad: 4,
      salonId: '1',
      estado: EstadoMesa.RESERVADA,
      ordenes: [],
      fechaCreacion: new Date(),
      fechaModificacion: new Date()
    },
    {
      id: 'M5',
      numero: 5,
      capacidad: 2,
      salonId: '1',
      estado: EstadoMesa.DISPONIBLE,
      ordenes: [],
      fechaCreacion: new Date(),
      fechaModificacion: new Date()
    },
    {
      id: 'M6',
      numero: 6,
      capacidad: 4,
      salonId: '2',
      estado: EstadoMesa.OCUPADA,
      clientesActuales: 2,
      meseroAsignado: 'Juan',
      horaOcupacion: new Date(Date.now() - 60 * 60000), // hace 60 minutos
      duracionEstimada: 120,
      consumoActual: 95.00,
      ordenes: ['ORD006'],
      fechaCreacion: new Date(),
      fechaModificacion: new Date()
    },
    {
      id: 'M7',
      numero: 7,
      capacidad: 6,
      salonId: '2',
      estado: EstadoMesa.DISPONIBLE,
      ordenes: [],
      fechaCreacion: new Date(),
      fechaModificacion: new Date()
    },
    {
      id: 'M8',
      numero: 8,
      capacidad: 4,
      salonId: '2',
      estado: EstadoMesa.DISPONIBLE,
      ordenes: [],
      fechaCreacion: new Date(),
      fechaModificacion: new Date()
    }
  ]);

  public mesas$ = this.mesasSubject.asObservable();

  constructor() {}

  getMesas(): Observable<Mesa[]> {
    return this.mesas$;
  }

  getMesasBySalon(salonId: string): Observable<Mesa[]> {
    return new Observable(observer => {
      this.mesasSubject.subscribe(mesas => {
        observer.next(mesas.filter(m => m.salonId === salonId));
      });
    });
  }

  selectMesa(mesa: Mesa): void {
    this.selectedMesaSubject.next(mesa);
  }

  getSelectedMesa(): Observable<Mesa | null> {
    return this.selectedMesa$;
  }

  deselectMesa(): void {
    this.selectedMesaSubject.next(null);
  }

  // Calcular tiempo transcurrido desde que se ocupó la mesa
  getTiempoOcupacion(mesa: Mesa): string {
    if (!mesa.horaOcupacion) return '0 minutos';
    
    const ahora = new Date();
    const diferencia = ahora.getTime() - mesa.horaOcupacion.getTime();
    const minutos = Math.floor(diferencia / (1000 * 60));
    const horas = Math.floor(minutos / 60);
    
    if (horas > 0) {
      return `${horas}h ${minutos % 60}m`;
    }
    return `${minutos}m`;
  }

  // Calcular porcentaje de ocupación
  getOcupacionPorcentaje(mesa: Mesa): number {
    if (!mesa.clientesActuales || !mesa.capacidad) return 0;
    return Math.round((mesa.clientesActuales / mesa.capacidad) * 100);
  }

  addMesa(mesa: Mesa): void {
    const mesas = this.mesasSubject.value;
    this.mesasSubject.next([...mesas, mesa]);
  }

  updateMesa(mesa: Mesa): void {
    const mesas = this.mesasSubject.value.map(m => 
      m.id === mesa.id ? mesa : m
    );
    this.mesasSubject.next(mesas);
    
    if (this.selectedMesaSubject.value?.id === mesa.id) {
      this.selectedMesaSubject.next(mesa);
    }
  }

  deleteMesa(id: string): void {
    const mesas = this.mesasSubject.value.filter(m => m.id !== id);
    this.mesasSubject.next(mesas);
    
    if (this.selectedMesaSubject.value?.id === id) {
      this.selectedMesaSubject.next(null);
    }
  }
}
