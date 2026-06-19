import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pedido } from '../types';

@Injectable({
  providedIn: 'root',
})
export class PedidoService {
  private API_URL = `http://localhost:1500/api`;
  private httpPedidosServices = inject(HttpClient);
  public pedidos: Pedido[] = [];

  constructor() {}

  getPedidos() {
    return this.httpPedidosServices.get(`${this.API_URL}/pedidos`);
  }
}
