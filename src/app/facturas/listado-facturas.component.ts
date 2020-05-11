import { Component, OnInit } from '@angular/core';
import { Facturas } from './modelo/facturas';
import { FacturasService } from './services/facturas.service';
import { Paciente } from '../paciente/paciente';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-listado-facturas',
  templateUrl: './listado-facturas.component.html',
})
export class ListadoFacturasComponent implements OnInit {

  facturas: Facturas[];

  constructor(private facturaService: FacturasService) { }

  ngOnInit(): void {
    this.facturaService.getTodasFacturas().subscribe(
      facturas => this.facturas = facturas
    );
  }

  //Método para borrar la factura.
  delete(factura: Facturas): void{

    //Botón si está seguro que desea eliminar la factura de Sweetalert2.
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: '¿Estás seguro?',
      text:  `¿Seguro que deseas borrar el paciente ${factura.descripcion}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this.facturaService.borrarFactura(factura.id).subscribe(
          response => {
            this.facturas = this.facturas.filter(trat => trat !== factura)
            swalWithBootstrapButtons.fire(
              'Borrado!',
              `El ${factura.descripcion} ha sido borrado con éxito`,
              'success'
            )
          }
        )
        
      } 
      
    })
  }

}
