import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrdenService {
  private http = inject(HttpClient);
  private API_URL = 'http://localhost:3000/pedidos';

  getPedidos(): Observable<any> {
    return this.http.get(`${this.API_URL}`);
  }

  getPedidoById(id: string): Observable<any> {
    return this.http.get(`${this.API_URL}/${id}`);
  }

  addPedido(pedido: any): Observable<any> {
    return this.http.post(`${this.API_URL}`, pedido, {
      headers: { 'X-Toast-Message': 'Pedido añadido con éxito'}
    });
  }

  updatePedido(id: string, pedido: any) {
    return this.http.put(`${this.API_URL}/${id}`, pedido, {
      headers: { 'X-Toast-Message': 'Pedido actualizado con éxito'}
    });
  }

  deletePedido(id: string): Observable<any> {
    return this.http.delete(`${this.API_URL}/${id}`, {
      headers: { 'X-Toast-Message': 'Pedido eliminado con éxito'}
    });
  }
}
