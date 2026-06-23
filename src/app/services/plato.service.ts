import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Plato } from '../models/platillo.model';

@Injectable({
  providedIn: 'root',
})
export class PlatoService {
  private http = inject(HttpClient);
  private API_URL = 'http://localhost:3000/platos';
  
  private platosSubject = new BehaviorSubject<Plato[]>([]);
  public platos$ = this.platosSubject.asObservable();

  // =========================
  // HTTP / BACKEND
  // =========================

  getPlatosBackend() {
    return this.http.get<Plato[]>(`${this.API_URL}`);
  }

  getPlatoByIdBackend(id: string) {
    return this.http.get<Plato>(`${this.API_URL}/${id}`);
  }

  addPlatoBackend(plato: Plato) {
    return this.http.post(`${this.API_URL}`, plato, {
      headers: { 'X-Toast-Message': 'Plato añadido con éxito'}
    });
  }

  updatePlatoBackend(id: string, plato: Plato) {
    return this.http.put(`${this.API_URL}/${id}`, plato, {
      headers: { 'X-Toast-Message': 'Plato actualizado con éxito'}
    });
  }

  deletePlatoBackend(id: string) {
    return this.http.delete(`${this.API_URL}/${id}`, {
      headers: { 'X-Toast-Message': 'Plato eliminado con éxito'}
    });
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
