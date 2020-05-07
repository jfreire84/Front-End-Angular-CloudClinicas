import { Component, OnInit } from '@angular/core';
import { FacturasService } from './services/facturas.service';
import { Facturas } from './modelo/facturas';
import { ActivatedRoute } from '@angular/router';
import { Paciente } from '../paciente/paciente';

@Component({
  selector: 'app-detalles-factura',
  templateUrl: './detalles-factura.component.html',
  styleUrls: ['./detalles-factura.component.css']
})
export class DetallesFacturaComponent implements OnInit {

  factura: Facturas;
  titulo: string = 'Factura';

  constructor(private facturaService: FacturasService, private activatedRoute: ActivatedRoute ) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      let id = +params.get('id');
      this.facturaService.getFactura(id).subscribe(factura => {
        this.factura = factura;
      })
    })
  }

}
