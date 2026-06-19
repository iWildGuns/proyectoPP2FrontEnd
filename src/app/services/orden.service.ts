import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrdenService {
  constructor(private http: HttpClient) {}

  getPedidos(): Observable<any> {
    return this.http.get('http://localhost:3000/pedidos');
  }

  getPedidoById(id: string): Observable<any> {
    return this.http.get('http://localhost:3000/pedidos/${id}');
  }

  addPedido(pedido: any): Observable<any> {
    return this.http.post('http://localhost:3000/pedidos', pedido);
  }

  updatePedido(id: string, pedido: any) {
    return this.http.put('http://localhost:3000/pedidos/' + id, pedido);
  }

  deletePedido(id: string): Observable<any> {
    return this.http.delete('http://localhost:3000/pedidos/${id}');
  }
}
