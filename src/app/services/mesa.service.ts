import { inject, Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { Mesa } from '../types';

@Injectable({
  providedIn: 'root',
})
export class MesaService {
  private API_URL = `http://localhost:1500/api`;
  private httpMesasService = inject(HttpClient);
  private selectedMesaSubject = new BehaviorSubject<Mesa | null>(null);
  public selectedMesa$ = this.selectedMesaSubject.asObservable();
  public mesas: Mesa[] = [];

  setMesas(id: Mesa['id'], data: {}): void {
    this.httpMesasService.put(`${this.API_URL}/mesas/${id}`, data);
  }

  getMesas(): Observable<Mesa[]> {
    return this.httpMesasService.get<Mesa[]>(`${this.API_URL}/mesas`);
  }

  getMesaById(id: Mesa['id']): Observable<Mesa> {
    return this.httpMesasService.get<Mesa>(`${this.API_URL}/mesas/${id}`);
  }

  createMesa(mesaData: Partial<Mesa>): Observable<{ message: string }> {
    return this.httpMesasService.post<{ message: string }>(`${this.API_URL}/mesas`, mesaData);
  }

  deleteMultiplesMesas(ids: Mesa['id'][]): Observable<{ message: string }> {
    console.log(typeof ids);
    return this.httpMesasService.post<{ message: string }>(`${this.API_URL}/mesas/deletemany`, {
      ids,
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
