import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { Salon } from '../models/salon.model';

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class SalonService {

  private selectedSalonSubject =
    new BehaviorSubject<Salon | null>(null);

  public selectedSalon$ =
    this.selectedSalonSubject.asObservable();

  private salonesSubject =
    new BehaviorSubject<Salon[]>([
      {
        id: '1',
        nombre: 'Salón Principal',
        descripcion: 'Salón principal del restaurante',
        capacidad: 60,
        habilitado: true,
        mesas: ['M1', 'M2', 'M3', 'M4', 'M5'],
        fechaCreacion: new Date(),
        fechaModificacion: new Date()
      },

      {
        id: '2',
        nombre: 'Salón VIP',
        descripcion: 'Salón exclusivo para eventos',
        capacidad: 30,
        habilitado: true,
        mesas: ['M6', 'M7', 'M8'],
        fechaCreacion: new Date(),
        fechaModificacion: new Date()
      },

      {
        id: '3',
        nombre: 'Terraza',
        descripcion: 'Área abierta con vista al jardín',
        capacidad: 40,
        habilitado: true,
        mesas: ['M9', 'M10', 'M11'],
        fechaCreacion: new Date(),
        fechaModificacion: new Date()
      }
    ]);

  public salones$ =
    this.salonesSubject.asObservable();

  constructor( private http: HttpClient) {}

  // =========================
  // BACKEND
  // =========================

  getSalonesBackend() {
  return this.http.get('URL_DEL_BACKEND/salones');
}

getSalonByIdBackend(id: string) {
  return this.http.get('http://localhost:3000/salones/${id}');
}

addSalonBackend(salon: Salon) {
  return this.http.post('URL_DEL_BACKEND/salones', salon);
}

updateSalonBackend(id: string, salon: Salon) {
  return this.http.put('http://localhost:3000/salones/${id}', salon);
}

deleteSalonBackend(id: string) {
  return this.http.delete('http://localhost:3000/salones/${id}');
}

  // =========================
  // ESTADO LOCAL
  // =========================

  getSalones(): Observable<Salon[]> {

    return this.salones$;

  }

  setSalones(salones: Salon[]): void {

    this.salonesSubject.next(salones);

  }

  selectSalon(salon: Salon): void {

    this.selectedSalonSubject.next(salon);

  }

  getSelectedSalon():
    Observable<Salon | null> {

    return this.selectedSalon$;

  }

  addSalon(salon: Salon): void {

    const salones =
      this.salonesSubject.value;

    this.salonesSubject.next([
      ...salones,
      salon
    ]);

  }

  updateSalon(salon: Salon): void {

    const salones =
      this.salonesSubject.value.map(s =>

        s.id === salon.id
          ? salon
          : s

      );

    this.salonesSubject.next(
      salones
    );

    if (
      this.selectedSalonSubject.value?.id === salon.id
    ) {

      this.selectedSalonSubject.next(
        salon
      );

    }
  }

  deleteSalon(id: string): void {

    const salones =
      this.salonesSubject.value.filter(
        s => s.id !== id
      );

    this.salonesSubject.next(
      salones
    );

    if (
      this.selectedSalonSubject.value?.id === id
    ) {

      this.selectedSalonSubject.next(
        null
      );

    }
  }
}