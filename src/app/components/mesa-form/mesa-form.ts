import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MesaService } from '../../services/mesa.service';
import { Mesa } from '../../types';

@Component({
  selector: 'app-mesa-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './mesa-form.html',
  styleUrl: './mesa-form.css',
})
export class MesaFormComponent {
  @Output() formClosed = new EventEmitter<void>();
  @Output() mesaCreated = new EventEmitter<Mesa>();

  private fb = inject(FormBuilder);
  private mesaService = inject(MesaService);

  mesaForm: FormGroup;
  isSubmitting = false;

  constructor() {
    this.mesaForm = this.fb.group({
      numero: ['', [Validators.required, Validators.min(1)]],
      capacidad: ['', [Validators.required, Validators.min(1)]],
    });
  }

  // Getters para facilitar el acceso a los errores en el HTML
  get numero() {
    return this.mesaForm.get('numero');
  }
  get capacidad() {
    return this.mesaForm.get('capacidad');
  }

  onSubmit(): void {
    if (this.mesaForm.invalid) {
      this.mesaForm.markAllAsTouched(); // Muestra los errores si intentan enviar vacío
      return;
    }

    this.isSubmitting = true;
    const nuevaMesa = this.mesaForm.value;

    this.mesaService.createMesa(nuevaMesa).subscribe({
      next: (data) => {
        this.isSubmitting = false;
        this.mesaCreated.emit(data); // Avisamos al padre que se creó
        this.mesaForm.reset({ estado: 'Disponible' }); // Limpiamos el form
      },
      error: (err) => {
        console.error('Error al crear la mesa', err);
        this.isSubmitting = false;
      },
    });
  }

  onCancel(): void {
    this.formClosed.emit();
  }
}
