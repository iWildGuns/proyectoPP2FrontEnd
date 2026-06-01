import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  constructor(private http: HttpClient) {}

  getPedidos() {
     return this.http.get ('http://localhost:3000/pedidos');
  }
}