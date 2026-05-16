import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Platillo } from '../models';
import api from '../../lib/b';

@Injectable({
  providedIn: 'root'
})
export class PlatoService {

  private platosSubject =
    new BehaviorSubject<Platillo[]>([]);

  public platos$ =
    this.platosSubject.asObservable();

  constructor() {}

  // =========================
  // AXIOS / BACKEND
  // =========================

  getPlatosBackend() {
    return api.get('/platos');
  }

  getPlatoByIdBackend(id: string) {
    return api.get(`/platos/${id}`);
  }

  addPlatoBackend(plato: Platillo) {
    return api.post('/platos', plato);
  }

  updatePlatoBackend(
    id: string,
    plato: Platillo
  ) {
    return api.put(`/platos/${id}`, plato);
  }

  deletePlatoBackend(id: string) {
    return api.delete(`/platos/${id}`);
  }

  // =========================
  // ESTADO LOCAL
  // =========================

  getPlatos(): Observable<Platillo[]> {
    return this.platos$;
  }

  setPlatos(platos: Platillo[]): void {
    this.platosSubject.next(platos);
  }

  addPlato(plato: Platillo): void {

    const platos =
      this.platosSubject.value;

    this.platosSubject.next([
      ...platos,
      plato
    ]);
  }

  updatePlato(plato: Platillo): void {

    const platos =
      this.platosSubject.value.map(p =>
        p.id === plato.id ? plato : p
      );

    this.platosSubject.next(platos);
  }

  deletePlato(id: string): void {

    const platos =
      this.platosSubject.value.filter(
        p => p.id !== id
      );

    this.platosSubject.next(platos);
  }
}