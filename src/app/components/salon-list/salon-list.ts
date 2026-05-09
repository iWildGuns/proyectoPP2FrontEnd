import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SalonService } from '../../services/salon.service';
import { Salon } from '../../models';
import { Observable } from 'rxjs';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-salon-list',
  imports: [CommonModule, RouterModule],
  templateUrl: './salon-list.html',
  styleUrl: './salon-list.css',
})
export class SalonListComponent implements OnInit {
  salones$: Observable<Salon[]>;
  selectedSalon$: Observable<Salon | null>;

  constructor(
    private salonService: SalonService,
    private router: Router,
  ) {
    this.salones$ = this.salonService.getSalones();
    this.selectedSalon$ = this.salonService.getSelectedSalon();
  }

  ngOnInit(): void {}

  // cuando el usuario clickea un salón
  selectSalon(salon: Salon) {
    console.log('navegando a ', salon.id);
    this.router.navigate(['/main/salon', salon.id]);
  }

  isSelected(salon: Salon): boolean {
    // podés comparar con la URL activa
    return this.router.url.includes(`/salon/${salon.id}`);
  }
}
