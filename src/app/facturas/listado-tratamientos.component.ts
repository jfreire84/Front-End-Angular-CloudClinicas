import { Component, OnInit } from '@angular/core';
import { FacturasService } from './services/facturas.service';
import { Tratamiento } from './modelo/tratamiento';

@Component({
  selector: 'app-listado-tratamientos',
  templateUrl: './listado-tratamientos.component.html',
<<<<<<< HEAD
=======
  styleUrls: ['./listado-tratamientos.component.css']
>>>>>>> cf4ad9c... Listado y crear tratamientos
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
