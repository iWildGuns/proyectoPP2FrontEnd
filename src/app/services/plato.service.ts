import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { BehaviorSubject, Observable } from 'rxjs';

import { Plato } from '../models/platillo.model';

@Injectable({
  providedIn: 'root',
})
export class PlatoService {
  private platosSubject = new BehaviorSubject<Plato[]>([]);

  public platos$ = this.platosSubject.asObservable();

  constructor(private http: HttpClient) {}

  // =========================
  // HTTP / BACKEND
  // =========================

  getPlatosBackend() {
    return this.http.get<Plato[]>('http://localhost:3000/platos');
  }

  getPlatoByIdBackend(id: string) {
    return this.http.get<Plato>('http://localhost:3000/platos/${id}');
  }

  addPlatoBackend(plato: Plato) {
    return this.http.post('http://localhost:3000/platos', plato);
  }

  updatePlatoBackend(id: string, plato: Plato) {
    return this.http.put('http://localhost:3000/platos/${id}', plato);
  }

  deletePlatoBackend(id: string) {
    return this.http.delete('http://localhost:3000/platos/${id}');
  }

  // =========================
  // ESTADO LOCAL
  // =========================

  getPlatos(): Observable<Plato[]> {
    return this.platos$;
  }

  setPlatos(platos: Plato[]): void {
    this.platosSubject.next(platos);
  }

  addPlato(plato: Plato): void {
    const platos = this.platosSubject.value;

    this.platosSubject.next([...platos, plato]);
  }

  updatePlato(plato: Plato): void {
    const platos = this.platosSubject.value.map((p) => (p.id === plato.id ? plato : p));

    this.platosSubject.next(platos);
  }

  deletePlato(id: string): void {
    const platos = this.platosSubject.value.filter((p) => p.id !== id);

    this.platosSubject.next(platos);
  }
}
