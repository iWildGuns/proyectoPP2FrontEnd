import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Mesa } from '../types';

@Injectable({
  providedIn: 'root',
})
export class MesaService {
  private http = inject(HttpClient);
  private API_URL = 'http://localhost:1500/api';

  private selectedMesaSubject = new BehaviorSubject<Mesa | null>(null);
  public selectedMesa$ = this.selectedMesaSubject.asObservable();
  
  public mesas: Mesa[] = [];

  setMesas(id: Mesa['id'], data: {}): void {
    this.http.put(`${this.API_URL}/mesas/${id}`, data);
  }

  // =========================
  // FRONTEND
  // =========================

  getMesas(): Observable<Mesa[]> {
    return this.http.get<Mesa[]>(`${this.API_URL}/mesas`);
  }

  getMesaById(id: Mesa['id']): Observable<Mesa> {
    return this.http.get<Mesa>(`${this.API_URL}/mesas/${id}`);
  }

  createMesa(mesaData: Partial<Mesa>): Observable<Mesa> {
    return this.http.post<Mesa>(`${this.API_URL}/mesas`, mesaData, {
      headers: { 'X-Toast-Message': 'Mesa creada con éxito'}
    });
  }

  getSelectedMesa(): Observable<Mesa | null> {
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
    if (!mesa.capacidad || !mesa.clientesActuales) {
      return 0;
    }
    return Math.round((parseInt(mesa.clientesActuales) / parseInt(mesa.capacidad)) * 100);
  }
}
