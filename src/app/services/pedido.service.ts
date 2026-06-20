import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Pedido } from '../types';

@Injectable({
  providedIn: 'root',
})
export class PedidoService {
  private http = inject(HttpClient);
  private API_URL = 'http://localhost:1500/api';
  
  public pedidos: Pedido[] = [];

  getPedidos() {
    return this.http.get(`${this.API_URL}/pedidos`);
  }
}
