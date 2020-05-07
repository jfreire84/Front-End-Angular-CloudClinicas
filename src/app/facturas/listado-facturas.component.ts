import { Component, OnInit } from '@angular/core';
import { Facturas } from './modelo/facturas';
import { FacturasService } from './services/facturas.service';
import { Paciente } from '../paciente/paciente';



@Component({
  selector: 'app-listado-facturas',
  templateUrl: './listado-facturas.component.html',
  styleUrls: ['./listado-facturas.component.css']
})
export class ListadoFacturasComponent implements OnInit {

  facturas: Facturas[];

  constructor(private facturaService: FacturasService) { }

  ngOnInit(): void {
    this.facturaService.getTodasFacturas().subscribe(
      facturas => this.facturas = facturas
    );
  }

}
