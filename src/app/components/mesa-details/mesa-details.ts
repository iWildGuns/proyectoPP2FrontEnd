import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MesaService } from '../../services';
import { Observable } from 'rxjs';
import { Mesa } from '../../types';

@Component({
  selector: 'app-mesa-details',
  imports: [CommonModule],
  templateUrl: './mesa-details.html',
  styleUrl: './mesa-details.css',
})
export class MesaDetails implements OnChanges {
  @Input() mesaId: Mesa['id'] | null = null;
  private mesaService = inject(MesaService);
  mesa$: Observable<Mesa> | null = null;

  constructor() {}

  // getMesaById() {
  //   this.mesaService.getMesaById(this.mesaId).subscribe({
  //     next: (res: any) => {
  //       this.mesa = res;
  //     },
  //     error: (error) => {
  //       console.log(error);
  //     },
  //   });
  // }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['mesaId'] && this.mesaId) {
      this.mesa$ = this.mesaService.getMesaById(this.mesaId);
      console.log('Thisss mesaaaaaa', this.mesa$);
    }
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

  // getEstadoColor(estado: mesaStatus): string {
  //   switch (estado) {
  //     case 'Ocupada':
  //       return '#ff6b6b';

  //     case 'Disponible':
  //       return '#51cf66';

  //     case 'Reservada':
  //       return '#ffd43b';

  //     case 'Mantenimiento':
  //       return '#868e96';

  //     default:
  //       return '#999';
  //   }
  // }

  getEstadoClass(estado: string): string {
    const map: Record<string, string> = {
      Disponible: 'badge-success',
      Ocupada: 'badge-danger',
      Reservada: 'badge-warning',
    };
    return map[estado] ?? 'badge-default';
  }
}
