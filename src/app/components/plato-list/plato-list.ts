import { CommonModule } from '@angular/common';
import { Component, ElementRef, signal, viewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PlatoService } from '../../services';
import { Plato } from '../../types';

@Component({
  selector: 'app-plato-list',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './plato-list.html',
  styleUrl: './plato-list.css',
})
export class PlatoListComponent {
  platos = signal<Plato[]>([]);
  menuDialog = viewChild<ElementRef<HTMLDialogElement>>('menuDialog');
  confirmDialog = viewChild<ElementRef<HTMLDialogElement>>('confirmDialog');
  form: FormGroup;
  isEditing = false;
  isDeleting = signal(false);
  hoveredIndex: number | null = null;
  platoParaEliminar: Plato | null = null;
  sinGlutenLogo: string = 'sin_gluten_legal-01.png';

  constructor(
    private fb: FormBuilder,
    private platoService: PlatoService,
  ) {
    this.form = this.fb.group({
      id: [null],
      codigo: ['', Validators.required],
      nombre: ['', Validators.required],
      descripcion: [''],
      precio: [0, [Validators.required, Validators.min(1)]],
      sinGluten: [false],
      disponible: [true],
    });
    this.loadPlatos();
  }

  // Getters para facilitar el acceso a los errores en el HTML
  get codigo() {
    return this.form.get('codigo');
  }
  get nombre() {
    return this.form.get('nombre');
  }
  get descripcion() {
    return this.form.get('descripcion');
  }
  get precio() {
    return this.form.get('precio');
  }

  loadPlatos() {
    this.platoService.getPlatosBackend().subscribe((data) => this.platos.set(data));
  }

  openModal(plato?: Plato) {
    this.isEditing = !!plato;
    if (plato) this.form.patchValue(plato);
    else
      this.form.reset({
        codigo: '',
        nombre: '',
        descripcion: '',
        precio: 0,
        sinGluten: false,
        disponible: true,
      });
    this.menuDialog()?.nativeElement.showModal();
  }

  save() {
    if (this.form.invalid) {
      console.log('Formulario invalido: ', this.form.errors);
      return;
    }
    const data: Plato = this.form.value;

    if (!data.id) {
      delete data.id;
    }

    const obs = this.isEditing
      ? this.platoService.updatePlatoBackend(data)
      : this.platoService.addPlatoBackend(data);

    obs.subscribe({
      next: (res) => {
        this.loadPlatos();
        this.menuDialog()?.nativeElement.close();
      },
      error: (err) => {
        console.error('Error al guardar:', err);
      },
    });
  }

  delete() {
    const data: Plato = this.form.value;
    const obs = this.platoService.deletePlatoBackend(data.id);

    this.openDeleteModal(data);

    // obs.subscribe({
    //   next: (res) => {
    //     this.loadPlatos();
    //     this.dialog()?.nativeElement.close();
    //   },
    //   error: (err) => {
    //     console.error('Error al eliminar plato:', err);
    //   },
  // );
    }
    
    openDeleteModal(plato: Plato) {
      this.platoParaEliminar = plato;
      this.menuDialog()?.nativeElement.close();
      setTimeout(() => {
        this.confirmDialog()?.nativeElement.showModal();
      }, 100);
    }
    
    confirmDelete() {
      if (!this.platoParaEliminar) return;

      this.isDeleting.set(true);
      
      this.platoService.deletePlatoBackend(this.platoParaEliminar.id!).subscribe({
        next: () => {
          this.loadPlatos();
          this.confirmDialog()?.nativeElement.close();
          this.platoParaEliminar = null;
          this.isDeleting.set(false);
        },
        error: (err) => {
            console.error('Error al eliminar: ', err);
          }
      });
    }
  }
