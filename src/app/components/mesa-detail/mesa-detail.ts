import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { MesaService } from '../../services/mesa.service';
import { Mesa, EstadoMesa } from '../../models';

@Component({
  selector: 'app-mesa-detail',
  imports: [CommonModule],
  templateUrl: './mesa-detail.html',
  styleUrl: './mesa-detail.css',
})
export class MesaDetail implements OnInit {
  mesa$!: Observable<Mesa | null>;
  EstadoMesa = EstadoMesa;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private mesaService: MesaService,
  ) {}

  ngOnInit() {
    this.mesa$ = this.route.paramMap.pipe(
      map((params) => params.get('mesaId')!),
      switchMap((id) =>
        this.mesaService.getMesas().pipe(map((mesas) => mesas.find((m) => m.id === id) ?? null)),
      ),
    );
  }

  volver() {
    const salonId = this.route.snapshot.paramMap.get('salonId');
    this.router.navigate(['/main/salon', salonId]);
  }

  getEstadoColor(estado: EstadoMesa): string {
    const colores: Record<EstadoMesa, string> = {
      [EstadoMesa.DISPONIBLE]: '#48bb78',
      [EstadoMesa.OCUPADA]: '#f56565',
      [EstadoMesa.RESERVADA]: '#ed8936',
      [EstadoMesa.MANTENIMIENTO]: '#a0aec0',
    };
    return colores[estado];
  }

  getTiempoOcupacion(mesa: Mesa): string {
    return this.mesaService.getTiempoOcupacion(mesa);
  }

  getOcupacionPorcentaje(mesa: Mesa): number {
    return this.mesaService.getOcupacionPorcentaje(mesa);
  }
}
