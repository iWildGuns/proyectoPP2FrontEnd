import { Component, OnInit } from '@angular/core';
import { PlatoService } from '../../services/plato.service';
import { Plato } from '../../models/platillo.model';

@Component({
  selector: 'app-salon-list',
  templateUrl: './salon-list.html',
  styleUrls: ['./salon-list.css']
})
export class SalonListComponent implements OnInit {

  platos: Plato[] = [];

  constructor(private platoService: PlatoService) {}

  ngOnInit(): void {
    this.platoService.getPlatos().subscribe(data => {
      this.platos = data;
    });
  }
}