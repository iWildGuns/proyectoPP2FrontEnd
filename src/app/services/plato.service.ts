import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Plato } from '../types';

@Injectable({
  providedIn: 'root',
})
export class PlatoService {
  private http = inject(HttpClient);
  private API_URL = 'http://localhost:1500/api';

  private platosSubject = new BehaviorSubject<Plato[]>([]);
  public platos$ = this.platosSubject.asObservable();

  getPlatosBackend(): Observable<Plato[]> {
    return this.http.get<Plato[]>(`${this.API_URL}/platos`);
  }

  getPlatoByIdBackend(id: string) {
    return this.http.get<Plato>(`${this.API_URL}/${id}`);
  }

  addPlatoBackend(plato: Plato) {
    return this.http.post(`${this.API_URL}`, plato, {
      headers: { 'X-Toast-Message': 'Plato añadido con éxito' },
    });
  }

  updatePlatoBackend(id: string, plato: Plato) {
    return this.http.put(`${this.API_URL}/${id}`, plato, {
      headers: { 'X-Toast-Message': 'Plato actualizado con éxito' },
    });
  }

  deletePlatoBackend(id: string) {
    return this.http.delete(`${this.API_URL}/${id}`, {
      headers: { 'X-Toast-Message': 'Plato eliminado con éxito' },
    });
  }
}
