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
  pedidosActuales: Pedido[] | [] = [];

  private fb = inject(FormBuilder);
  private pedidoService = inject(PedidoService);
  private platoService = inject(PlatoService);

  pedidoForm!: FormGroup;
  isSubmitting: boolean = false;

  constructor() {}

  ngOnInit(): void {
    this.pedidoForm = this.fb.group({
      // Usamos un validador manual en lugar de Validators.minLength
      platoId: this.fb.array(
        [],
        [
          (control) => {
            // Si el arreglo existe y tiene al menos 1 elemento, es válido (null).
            // Si está vacío, es inválido ({ vacio: true }).
            return control.value && control.value.length > 0 ? null : { vacio: true };
          },
        ],
      ),
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
    // --- EL INTERROGATORIO ---
    this.platosFormArray.push(this.fb.control(platoId));
    console.log('¿Formulario Válido?:', this.pedidoForm.valid);
    console.log('Errores del Form Padre:', this.pedidoForm.errors);
    console.log('Errores del Array de platos:', this.platosFormArray.errors);

    this.platosFormArray.controls.forEach((c, index) => {
      if (c.invalid) {
        console.log(`El plato #${index} es inválido por:`, c.errors);
      }
    });
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

  onCancel() {
    this.formClosed.emit();
  }

  enviarPedido() {
    if (this.pedidoForm.invalid) return;

    this.isSubmitting = true;
    const payload = {
      mesaId: Number(this.mesa?.id),
      platoId: this.pedidoForm.value.platoId,
    };

    console.log('Payload listo para mandar al backend', payload);
    console.log(payload);
    this.pedidoService.addPedido(payload).subscribe({
      next: (data) => {
        console.log('guardadno en base de datos', data);
        this.formClosed.emit();
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  onSubmit() {
    console.log('Un submit');
  }
}
