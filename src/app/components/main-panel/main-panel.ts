import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
// import { EstadoMesa } from '../../models/mesa.model';
import { MesaService } from '../../services/mesa.service';
import { Mesa, mesaStatus } from '../../types';
import { MesaDetails } from '../mesa-details/mesa-details';
import { MesaFormComponent } from '../mesa-form/mesa-form';

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

  // EstadoMesa = EstadoMesa;

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

  // deselectMesa(): void {
  //   this.mesaService.deselectMesa();
  // }

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
    this.closeMesaForm(); // Cerramos el modal
    this.refreshMesas(); // Recargamos la lista
  }

  refreshMesas(): void {
    // Al reasignar el observable, el pipe 'async' en el HTML
    // vuelve a disparar la petición GET al backend automáticamente.
    this.mesas$ = this.mesaService.getMesas();
  }
}
