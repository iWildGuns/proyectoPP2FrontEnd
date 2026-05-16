import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SalonService } from '../../services/salon.service';

import { Salon } from '../../models';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-salon-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './salon-list.html',
  styleUrls: ['./salon-list.css'],
})

export class SalonListComponent implements OnInit {

  salones$: Observable<Salon[]>;

  selectedSalon$: Observable<Salon | null>;

  constructor(
    private salonService: SalonService
  ) {

    this.salones$ =
      this.salonService.getSalones();

    this.selectedSalon$ =
      this.salonService.getSelectedSalon();

  }

  ngOnInit(): void {

    this.salonService.getSalonesBackend()

      .then((res) => {

        console.log(
          'SALONES BACKEND:',
          res.data
        );

        this.salonService.setSalones(
          res.data
        );

      })

      .catch((error) => {

        console.log(
          'ERROR SALONES:',
          error
        );

      });

  }

  selectSalon(salon: Salon): void {

    this.salonService.selectSalon(
      salon
    );

  }

  isSelected(salon: Salon): boolean {

    return false;

  }
}