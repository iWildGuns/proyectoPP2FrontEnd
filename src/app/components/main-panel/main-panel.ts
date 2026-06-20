import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MesaFormComponent } from '../mesa-form/mesa-form';
import { MesaService } from '../../services/mesa.service';
import { MesaDetails } from '../mesa-details/mesa-details';
import { Mesa, mesaStatus } from '../../types';

@Component({
  selector: 'app-main-panel',
  standalone: true,
  imports: [CommonModule, MesaDetails, MesaFormComponent],
  templateUrl: './main-panel.html',
  styleUrl: './main-panel.css',
})
export class MainPanelComponent implements OnInit {
  selectedMesa$: Observable<Mesa | null>;
  mesas$: Observable<Mesa[]>;
  showMesaForm: boolean = false;
  arrayMesas: Mesa['id'][] = [];
  isDeleteModeActive: boolean = false;

  constructor(private mesaService: MesaService) {
    this.selectedMesa$ = this.mesaService.getSelectedMesa();

    this.mesas$ = this.mesaService.getMesas();
  }

  ngOnInit(): void {
    this.mesaService.getMesas().subscribe({
      next: (res: any) => {
        console.log('MESAS BACKEND:', res);
      },
      error: (error) => {
        console.log('ERROR BACKEND:', error);
      },
    });
  }

  selectMesa(mesa: Mesa): void {
    this.mesaService.selectMesa(mesa);
    console.log(mesa);
  }

  getTiempoOcupacion(mesa: Mesa): string {
    return this.mesaService.getTiempoOcupacion(mesa);
  }

  getOcupacionPorcentaje(mesa: Mesa): number {
    return this.mesaService.getOcupacionPorcentaje(mesa);
  }

  getEstadoColor(estado: mesaStatus): string {
    switch (estado) {
      case 'Ocupada':
        return '#ff6b6b';

      case 'Disponible':
        return '#51cf66';

      case 'Reservada':
        return '#ffd43b';

      case 'Mantenimiento':
        return '#868e96';

      default:
        return '#999';
    }
  }

  openMesaForm() {
    this.showMesaForm = true;
  }
  closeMesaForm(): void {
    this.showMesaForm = false;
  }

  onMesaCreated(): void {
    this.closeMesaForm();
    this.refreshMesas();
  }

  refreshMesas(): void {
    this.mesas$ = this.mesaService.getMesas();
  }

  /** "Delete Many Mesas" ME ESA MATANDO EL SPANGLISH PROFESOR, AYUDAAAA */

  activeDeleteMode(): void {
    this.isDeleteModeActive = !this.isDeleteModeActive;
    console.log('eliminando mesas');
  }

  toggleMesaSeleccion(id: Mesa['id'], event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;

    if (isChecked) {
      // Si se marca, lo agregamos al arreglo
      this.arrayMesas!.push(id);
      console.log(this.arrayMesas);
    } else {
      // Si se desmarca, lo filtramos para sacarlo del arreglo
      this.arrayMesas = this.arrayMesas!.filter((mesaId) => mesaId !== id);
    }
  }

  cancelRemove() {
    this.isDeleteModeActive = !this.isDeleteModeActive;
    this.arrayMesas = [];
  }

  eliminarMesas() {
    this.mesaService.deleteMultiplesMesas(this.arrayMesas).subscribe({
      next: (data) => {
        console.log(data);
        this.cancelRemove();
      },
      error: (error) => {
        console.log(error);
      },
    });
    this.refreshMesas();
  }
}
