import { Component, OnInit } from '@angular/core';
import { FacturasService } from './services/facturas.service';
import { Tratamiento } from './modelo/tratamiento';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listado-tratamientos',
  templateUrl: './listado-tratamientos.component.html',
  styleUrls: ['./listado-tratamientos.component.css']
})
export class ListadoTratamientosComponent implements OnInit {

  tratamientos: Tratamiento[];

  constructor(private facturaService: FacturasService) { }

  ngOnInit(): void {
    this.facturaService.getTratamientos().subscribe(
      tratamiento => this.tratamientos = tratamiento
    );
  }

  //Método para borrar el tratamiento
  delete(tratamiento: Tratamiento): void{

    //Botón si está seguro que desea eliminar el tratamiento de Sweetalert2.
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: '¿Estás seguro?',
      text:  `¿Seguro que deseas borrar el paciente ${tratamiento.nombre}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this.facturaService.borrarTratamiento(tratamiento.id).subscribe(
          response => {
            this.tratamientos = this.tratamientos.filter(trat => trat !== tratamiento)
            swalWithBootstrapButtons.fire(
              'Borrado!',
              `El ${tratamiento.nombre} ha sido borrado con éxito`,
              'success'
            )
          }
        )
        
      } 
      
    })

  }

}
