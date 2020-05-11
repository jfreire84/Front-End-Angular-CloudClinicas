import { Component, OnInit } from '@angular/core';
import { FacturasService } from './services/facturas.service';
import { Tratamiento } from './modelo/tratamiento';

@Component({
  selector: 'app-listado-tratamientos',
  templateUrl: './listado-tratamientos.component.html',
})
export class ListadoTratamientosComponent implements OnInit {

  tratamientos: Tratamiento[];

  constructor(private facturaService: FacturasService) { }

  ngOnInit(): void {
    this.facturaService.getTratamientos().subscribe(
      tratamiento => this.tratamientos = tratamiento
    );
  }

}
