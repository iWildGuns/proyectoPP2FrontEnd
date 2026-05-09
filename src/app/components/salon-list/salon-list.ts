import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SalonService } from '../../services/salon.service';
import { Salon } from '../../models';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-salon-list',
  imports: [CommonModule],
  templateUrl: './salon-list.html',
  styleUrl: './salon-list.css',
})
export class SalonListComponent implements OnInit {
  salones$: Observable<Salon[]>;
  selectedSalon$: Observable<Salon | null>;

  constructor(private salonService: SalonService) {
    this.salones$ = this.salonService.getSalones();
    this.selectedSalon$ = this.salonService.getSelectedSalon();
  }

  ngOnInit(): void {}

  selectSalon(salon: Salon): void {
    this.salonService.selectSalon(salon);
  }

  isSelected(salon: Salon): boolean {
    // Implementar lógica de selección
    return false;
  }
}
