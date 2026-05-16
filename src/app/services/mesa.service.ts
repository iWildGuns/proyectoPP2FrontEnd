import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { Mesa, EstadoMesa } from '../models';

import api from '../../lib/axios';

@Injectable({
  providedIn: 'root'
})

export class MesaService {

  private selectedMesaSubject =
    new BehaviorSubject<Mesa | null>(null);

  public selectedMesa$ =
    this.selectedMesaSubject.asObservable();

  private mesasSubject =
    new BehaviorSubject<Mesa[]>([
      {
        id: 'M1',
        numero: 1,
        capacidad: 4,
        salonId: '1',
        estado: EstadoMesa.OCUPADA,
        clientesActuales: 3,
        meseroAsignado: 'Carlos',
        horaOcupacion: new Date(),
        duracionEstimada: 90,
        consumoActual: 100,
        ordenes: [],
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
      }
    ]);

  public mesas$ =
    this.mesasSubject.asObservable();

  constructor() {}

  // =========================
  // BACKEND
  // =========================

  getMesasBackend() {

    return api.get('/mesas');

  }

  setMesas(mesas: Mesa[]): void {

    this.mesasSubject.next(mesas);

  }

  // =========================
  // FRONTEND
  // =========================

  getMesas(): Observable<Mesa[]> {

    return this.mesas$;

  }

  getSelectedMesa():
    Observable<Mesa | null> {

    return this.selectedMesa$;

  }

  selectMesa(mesa: Mesa): void {

    this.selectedMesaSubject.next(mesa);

  }

  deselectMesa(): void {

    this.selectedMesaSubject.next(null);

  }

  getTiempoOcupacion(mesa: Mesa): string {

    return '45m';

  }

  getOcupacionPorcentaje(mesa: Mesa): number {

    if (
      !mesa.capacidad ||
      !mesa.clientesActuales
    ) {

      return 0;

    }

    return Math.round(
      (mesa.clientesActuales / mesa.capacidad) * 100
    );
  }
}
