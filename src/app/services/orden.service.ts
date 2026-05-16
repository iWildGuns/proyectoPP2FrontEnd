import { Injectable } from '@angular/core';
import api from '../../lib/axios';

@Injectable({
  providedIn: 'root'
})
export class OrdenService {

  constructor() {}

  getPedidos() {
    return api.get('/pedidos');
  }

  getPedidoById(id: string) {
    return api.get(`/pedidos/${id}`);
  }

  addPedido(pedido: any) {
    return api.post('/pedidos', pedido);
  }

  updatePedido(id: string, pedido: any) {
    return api.put(`/pedidos/${id}`, pedido);
  }

  deletePedido(id: string) {
    return api.delete(`/pedidos/${id}`);
  }
}