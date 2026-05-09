import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MesaService } from '../../services/mesa.service';
import { SalonService } from '../../services/salon.service';
import { Mesa, EstadoMesa, CrearMesaRequest } from '../../models';

@Component({
  selector: 'app-salon-config',
  imports: [CommonModule, FormsModule],
  templateUrl: './salon-config.html',
  styleUrl: './salon-config.css',
})
export class SalonConfig implements OnInit {
  mesas$!: Observable<Mesa[]>;
  EstadoMesa = EstadoMesa;
  salonId!: string;

  // Form nueva mesa
  nuevaMesa: CrearMesaRequest = {
    numero: 0,
    capacidad: 2,
    salonId: '',
  };

  mostrarFormulario = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private mesaService: MesaService,
    private salonService: SalonService,
  ) {}

  ngOnInit() {
    this.salonId = this.route.snapshot.paramMap.get('salonId')!;

    this.mesas$ = this.route.paramMap.pipe(
      map((params) => params.get('salonId')!),
      switchMap((id) => this.mesaService.getMesasBySalon(id)),
    );
  }

  volver() {
    this.router.navigate(['/main/salon', this.salonId]);
  }

  toggleFormulario() {
    this.mostrarFormulario = !this.mostrarFormulario;
    this.nuevaMesa = { numero: 0, capacidad: 2, salonId: this.salonId };
  }

  agregarMesa() {
    if (!this.nuevaMesa.numero || !this.nuevaMesa.capacidad) return;

    const mesa: Mesa = {
      id: 'M' + Date.now(),
      numero: this.nuevaMesa.numero,
      capacidad: this.nuevaMesa.capacidad,
      salonId: this.salonId,
      estado: EstadoMesa.DISPONIBLE,
      ordenes: [],
      fechaCreacion: new Date(),
      fechaModificacion: new Date(),
    };

    this.mesaService.addMesa(mesa);
    this.mostrarFormulario = false;
  }

  cambiarEstado(mesa: Mesa, estado: EstadoMesa) {
    this.mesaService.updateMesa({ ...mesa, estado });
  }

  eliminarMesa(id: string) {
    if (confirm('¿Estás seguro de eliminar esta mesa?')) {
      this.mesaService.deleteMesa(id);
    }
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
