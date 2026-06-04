import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

import { Salon } from '../../models/salon.model';
import { SalonService } from '../../services/salon.service';

@Component({
selector: 'app-salon-list',
standalone: true,
imports: [CommonModule],
templateUrl: './salon-list.html',
styleUrls: ['./salon-list.css']
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
  .subscribe({

    next: (res: any) => {

      const salones =
        res?.data ?? res;

      this.salonService.setSalones(
        salones
      );

    },

    error: (error) => {

      console.log(
        'ERROR SALONES:',
        error
      );

    }

  });

}

selectSalon(
salon: Salon
): void {

this.salonService.selectSalon(
  salon
);

}

}