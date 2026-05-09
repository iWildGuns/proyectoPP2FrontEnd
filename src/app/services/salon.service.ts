import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Salon } from '../models';

@Injectable({
  providedIn: 'root'
})
export class SalonService {
  private selectedSalonSubject = new BehaviorSubject<Salon | null>(null);
  public selectedSalon$ = this.selectedSalonSubject.asObservable();

  private salonesSubject = new BehaviorSubject<Salon[]>([
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

  public salones$ = this.salonesSubject.asObservable();

  constructor() {}

  getSalones(): Observable<Salon[]> {
    return this.salones$;
  }

  selectSalon(salon: Salon): void {
    this.selectedSalonSubject.next(salon);
  }

  getSelectedSalon(): Observable<Salon | null> {
    return this.selectedSalon$;
  }

  addSalon(salon: Salon): void {
    const salones = this.salonesSubject.value;
    this.salonesSubject.next([...salones, salon]);
  }

  updateSalon(salon: Salon): void {
    const salones = this.salonesSubject.value.map(s => 
      s.id === salon.id ? salon : s
    );
    this.salonesSubject.next(salones);
    
    // Si es el salón seleccionado, actualizar también el seleccionado
    if (this.selectedSalonSubject.value?.id === salon.id) {
      this.selectedSalonSubject.next(salon);
    }
  }

  deleteSalon(id: string): void {
    const salones = this.salonesSubject.value.filter(s => s.id !== id);
    this.salonesSubject.next(salones);
    
    // Si es el salón seleccionado, desseleccionar
    if (this.selectedSalonSubject.value?.id === id) {
      this.selectedSalonSubject.next(null);
    }
  }
}
