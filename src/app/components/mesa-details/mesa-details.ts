import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Observable } from 'rxjs';
import { MesaService, PedidoService, PlatoService } from '../../services';
import { Mesa, mesaStatus, Pedido, Plato } from '../../types';
import { PedidoForm } from '../pedido-form/pedido-form';

@Component({
  selector: 'app-mesa-details',
  imports: [CommonModule, PedidoForm],
  templateUrl: './mesa-details.html',
  styleUrl: './mesa-details.css',
})
export class MesaDetails implements OnChanges {
  @Input() mesaId: Mesa['id'] | null = null;
  @Output() mesaActualizada = new EventEmitter<void>();
  private mesaService = inject(MesaService);
  private platoService = inject(PlatoService);
  mesa$: Observable<Mesa> | null = null;
  showPedidoForm: boolean = false;
  platosDisponibles: Plato[] | [] = [];

  // pedidosSubject$ = new BehaviorSubject<Pedido[]>([]);
  // pedidos$: Observable<Pedido[]> = this.pedidosSubject$.asObservable();

  constructor() {
    this.getPlatos();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['mesaId'] && this.mesaId) {
      this.mesa$ = this.mesaService.getMesaById(this.mesaId);
    }
  }

  getPlatos() {
    this.platoService.getPlatosBackend().subscribe({
      next: (data) => {
        this.platosDisponibles = data;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  editMesaForm() {
    console.log('Editando la mesa');
  }

  deselectMesa(): void {
    this.mesaActualizada.emit();
    this.mesaService.deselectMesa();
  }

  getTiempoOcupacion(mesa: Mesa): string {
    return this.mesaService.getTiempoOcupacion(mesa);
  }

  getOcupacionPorcentaje(mesa: Mesa): number {
    return this.mesaService.getOcupacionPorcentaje(mesa);
  }

  getEstadoClass(estado: string): string {
    const map: Record<string, string> = {
      Disponible: 'badge-success',
      Ocupada: 'badge-danger',
      Reservada: 'badge-warning',
    };
    return map[estado] ?? 'badge-default';
  }

  openPedidoForm() {
    this.showPedidoForm = true;
  }

  ciclarEstado(mesa: Mesa) {
    const ordenEstados: mesaStatus[] = ['Disponible', 'Ocupada', 'Reservada', 'Mantenimiento'];
    const indiceActual = ordenEstados.indexOf(mesa.estado);
    const siguienteIndice = (indiceActual + 1) % ordenEstados.length;
    const nuevoEstado = ordenEstados[siguienteIndice];

    mesa.estado = nuevoEstado;

    this.mesaService.updateMesaState(mesa.id, nuevoEstado).subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (error) => {
        console.log(error);
      },
    });
    console.log(nuevoEstado);
  }

  closePedidoForm() {
    this.showPedidoForm = false;
  }

  onPedidoCreated(data: Pedido): void {
    this.mesaActualizada.emit();
    // const pedidosActuales = this.pedidosSubject$.getValue();
    // const nuevoPedidoAdd = [...pedidosActuales, data];

    // this.pedidosSubject$.next(nuevoPedidoAdd);
    // this.closePedidoForm();
  }

  calcularTotal(mesa: Mesa): number {
    if (!mesa.pedidos) return 0;

    return mesa.pedidos.reduce((totalPedido, pedido) => {
      // Suma los platos de cada pedido
      const sumaPlatos = pedido.platos.reduce((sum, plato) => sum + plato.precio, 0);
      return totalPedido + sumaPlatos;
    }, 0);
  }
}
