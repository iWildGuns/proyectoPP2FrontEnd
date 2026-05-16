import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SalonService } from '../../services/salon.service';
import { MesaService } from '../../services/mesa.service';
import { Salon, Mesa, EstadoMesa } from '../../models';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-main-panel',
  imports: [CommonModule],
  templateUrl: './main-panel.html',
  styleUrl: './main-panel.css',
})
export class MainPanelComponent implements OnInit {
  selectedSalon$: Observable<Salon | null>;
  selectedMesa$: Observable<Mesa | null>;
  mesasPorSalon$: Observable<Mesa[]>;
  EstadoMesa = EstadoMesa;

  constructor(
    private salonService: SalonService,
    private mesaService: MesaService,
  ) {
    this.selectedSalon$ = this.salonService.getSelectedSalon();
    this.selectedMesa$ = this.mesaService.getSelectedMesa();
    this.mesasPorSalon$ = this.mesaService.getMesas();
  }

  ngOnInit(): void {
    this.loadMesas();
  }

  loadMesas(): void {
    this.mesaService.logMesas().subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  selectMesa(mesa: Mesa): void {
    this.mesaService.selectMesa(mesa);
  }

  deselectMesa(): void {
    this.mesaService.deselectMesa();
  }

  getTiempoOcupacion(mesa: Mesa): string {
    return this.mesaService.getTiempoOcupacion(mesa);
  }

  getOcupacionPorcentaje(mesa: Mesa): number {
    return this.mesaService.getOcupacionPorcentaje(mesa);
  }

  getEstadoColor(estado: EstadoMesa): string {
    switch (estado) {
      case EstadoMesa.OCUPADA:
        return '#ff6b6b';
      case EstadoMesa.DISPONIBLE:
        return '#51cf66';
      case EstadoMesa.RESERVADA:
        return '#ffd43b';
      case EstadoMesa.MANTENIMIENTO:
        return '#868e96';
      default:
        return '#999';
    }
  }
}
