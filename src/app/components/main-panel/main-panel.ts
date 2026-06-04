import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

import { Salon } from '../../models/salon.model';
import { Mesa, EstadoMesa } from '../../models/mesa.model';

import { MesaService } from '../../services/mesa.service';
import { SalonService } from '../../services/salon.service';

@Component({
selector: 'app-main-panel',
standalone: true,
imports: [CommonModule],
templateUrl: './main-panel.html',
styleUrl: './main-panel.css',
})
export class MainPanelComponent implements OnInit {

selectedMesa$: Observable<Mesa | null>;
selectedSalon$: Observable<Salon | null>;
mesasPorSalon$: Observable<Mesa[]>;

EstadoMesa = EstadoMesa;

constructor(
private mesaService: MesaService,
private salonService: SalonService
) {

this.selectedMesa$ =
  this.mesaService.getSelectedMesa();

this.selectedSalon$ =
  this.salonService.getSelectedSalon();

this.mesasPorSalon$ =
  this.mesaService.getMesas();

}

ngOnInit(): void {

this.mesaService.getMesasBackend()
  .subscribe({

    next: (res: any) => {

      console.log(
        'MESAS BACKEND:',
        res
      );

      const mesas =
        res?.data ?? res;

      this.mesaService.setMesas(
        mesas
      );

    },

    error: (error) => {

      console.log(
        'ERROR BACKEND:',
        error
      );

    }

  });

}

selectMesa(
mesa: Mesa
): void {

this.mesaService.selectMesa(
  mesa
);

}

deselectMesa(): void {

this.mesaService.deselectMesa();

}

getTiempoOcupacion(
mesa: Mesa
): string {

return this.mesaService.getTiempoOcupacion(
  mesa
);

}

getOcupacionPorcentaje(
mesa: Mesa
): number {

return this.mesaService.getOcupacionPorcentaje(
  mesa
);

}

getEstadoColor(
estado: EstadoMesa
): string {

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