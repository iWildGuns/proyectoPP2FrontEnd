import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PedidoService, PlatoService } from '../../services';
import { Mesa, Pedido, Plato } from '../../types';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-pedido-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './pedido-form.html',
  styleUrl: './pedido-form.css',
})
export class PedidoForm implements OnInit {
  @Input() mesa: Mesa | null = null;
  @Input() platosDisponibles: Plato[] | [] = [];
  @Output() formClosed = new EventEmitter<void>();
  @Output() pedidoCreated = new EventEmitter<Pedido>();

  pedidosSubject$ = new BehaviorSubject<Pedido[]>([]);
  pedidos$: Observable<Pedido[]> = this.pedidosSubject$.asObservable();

  private fb = inject(FormBuilder);
  private pedidoService = inject(PedidoService);
  private platoService = inject(PlatoService);

  pedidoForm!: FormGroup;
  isSubmitting: boolean = false;

  pedidosActuales: Pedido[] | [] = [];

  constructor() {}

  ngOnInit(): void {
    this.pedidoForm = this.fb.group({
      // mesa: ['', [Validators.required, Validators.min(1)]],
      platoId: this.fb.array([], Validators.minLength(1)),
    });
    this.getPedidos();
  }

  get platosFormArray(): FormArray {
    return this.pedidoForm.get('platoId') as FormArray;
  }

  getPedidos() {
    return this.pedidoService.getPedidoByMesaId(this.mesa!.id).subscribe({
      next: (data) => {
        this.pedidosActuales = data;
        console.log('Pedidos actuales___', this.pedidosActuales);
      },
    });
  }

  agregarPlatoAlPedido(platoId: Plato['id']) {
    this.platosFormArray.push(this.fb.control(platoId));
  }

  eliminarPlatoDelPedido(index: number) {
    this.platosFormArray.removeAt(index);
  }

  obtenerInfoPlato(id: Plato['id']): Plato | undefined {
    return this.platosDisponibles.find((p) => p.id === id);
  }

  calcularTotal(): number {
    return this.platosFormArray.controls.reduce((total, control) => {
      const plato = this.obtenerInfoPlato(control.value);
      return total + (plato ? plato.precio : 0);
    }, 0);
  }

  cancelar() {
    this.formClosed.emit();
  }

  enviarPedido() {
    if (this.pedidoForm.invalid) return;

    this.isSubmitting = true;
    const payload = this.pedidoForm.value;

    console.log('Payload listo para mandar al bachend', payload);
  }

  onSubmit() {
    console.log('Un submit');
  }
}
