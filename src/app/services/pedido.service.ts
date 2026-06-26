import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Mesa, Pedido, Plato } from '../types';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PedidoService {
  private http = inject(HttpClient);
  private API_URL = 'http://localhost:1500/api';

  public pedidos: Pedido[] = [];

  getPedidos(): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(`${this.API_URL}/pedidos`);
  }

  getPedidoByMesaId(mesaId: Mesa['id']): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(`${this.API_URL}/mesas/${mesaId}/pedidos`);
  }

  addPedido(data: { mesaId: Mesa['id']; platos: Plato['id'] }): Observable<Pedido> {
    return this.http.post<Pedido>(`${this.API_URL}/pedidos`, data);
  }
}
