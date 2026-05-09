import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable, switchMap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { SalonService } from '../../services/salon.service';
import { MesaService } from '../../services/mesa.service';
import { Salon, Mesa, EstadoMesa } from '../../models';

@Component({
  selector: 'app-salon-detail',
  imports: [CommonModule],
  templateUrl: './salon-detail.html',
  styleUrl: './salon-detail.css',
})
export class SalonDetail implements OnInit {
  salon$!: Observable<Salon | null>;
  mesas$!: Observable<Mesa[]>;
  EstadoMesa = EstadoMesa;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private salonService: SalonService,
    private mesaService: MesaService,
  ) {}

  ngOnInit() {
    this.salon$ = this.route.paramMap.pipe(
      map((params) => params.get('salonId')!),
      switchMap((id) => this.salonService.getSalonById(id)),
    );
    this.mesas$ = this.route.paramMap.pipe(
      map((params) => params.get('salonId')!),
      switchMap((id) => this.mesaService.getMesasBySalon(id)),
    );
  }

  irAMesa(mesa: Mesa) {
    const salonId = this.route.snapshot.paramMap.get('salonId');
    this.router.navigate(['/main/salon', salonId, 'mesa', mesa.id]);
  }

  irAConfig() {
    const salonId = this.route.snapshot.paramMap.get('salonId');
    this.router.navigate(['/main/salon', salonId, 'config']);
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
}
