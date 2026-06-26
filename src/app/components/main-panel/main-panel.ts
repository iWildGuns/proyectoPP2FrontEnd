import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
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
  mesaSubject$ = new BehaviorSubject<Mesa[]>([]);
  mesas$: Observable<Mesa[]> = this.mesaSubject$.asObservable();
  arrayMesas: Mesa['id'][] = [];
  showMesaForm: boolean = false;
  isDeleteModeActive: boolean = false;

  constructor(private mesaService: MesaService) {
    this.selectedMesa$ = this.mesaService.getSelectedMesa();
  }

  ngOnInit(): void {
    this.refreshMesas();
  }

  selectMesa(mesa: Mesa): void {
    if (this.isDeleteModeActive) return;
    this.mesaService.selectMesa(mesa);
    // this.activeDeleteMode();
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

  onMesaCreated(data: Mesa): void {
    const mesasActuales = this.mesaSubject$.getValue();
    const nuevaMesaAdd = [...mesasActuales, data];

    this.mesaSubject$.next(nuevaMesaAdd);
    this.closeMesaForm();
  }

  refreshMesas(): void {
    this.mesaService.getMesas().subscribe({
      next: (data: Mesa[]) => {
        this.mesaSubject$.next(data);
      },
      error: (error) => {
        console.log('ERROR BACKEND:', error);
      },
    });
  }

  /** "Delete Many Mesas" ME ESA MATANDO EL SPANGLISH PROFESOR, AYUDAAAA */

  activeDeleteMode(): void {
    this.isDeleteModeActive = !this.isDeleteModeActive;
    console.log('eliminando mesas');
  }

  toggleMesaSeleccion(id: Mesa['id'], event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;

    if (isChecked) {
      this.arrayMesas!.push(id);
      console.log(this.arrayMesas);
    } else {
      this.arrayMesas = this.arrayMesas!.filter((mesaId) => mesaId !== id);
    }
  }

  cancelRemove() {
    this.isDeleteModeActive = !this.isDeleteModeActive;
    this.arrayMesas = [];
  }

  eliminarMesas() {
    if (this.arrayMesas.length === 0) return;
    this.mesaService.deleteMultiplesMesas(this.arrayMesas).subscribe({
      next: (data) => {
        const mesasActuales = this.mesaSubject$.getValue();
        const mesasRefresh = mesasActuales.filter((mesa) => !this.arrayMesas.includes(mesa.id));
        this.mesaSubject$.next(mesasRefresh);
        this.cancelRemove();
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
