import { Injectable } from '@angular/core';
import API from '../../lib/b';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  constructor() {}

  getPedidos() {
    return API.get('/pedidos');
  }
}