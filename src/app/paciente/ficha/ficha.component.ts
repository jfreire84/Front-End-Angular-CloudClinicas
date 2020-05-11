import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {PacienteService} from '../paciente.service';
import { Paciente } from '../paciente';
import { Facturas } from 'src/app/facturas/modelo/facturas';
import { FacturasService } from 'src/app/facturas/services/facturas.service';
import Swal from "sweetalert2";


@Component({
  selector: 'app-ficha',
  templateUrl: './ficha.component.html',
  styleUrls: ['./ficha.component.css']
})
export class FichaComponent implements OnInit {

  facturas: Facturas[];
  paciente: Paciente;
  titulo: String = "Ficha del Paciente";

  constructor( private router : Router, private pacienteService : PacienteService, 
    private activedRouter: ActivatedRoute, private facturaService: FacturasService) { }


  ngOnInit(): void {
    this.activedRouter.paramMap.subscribe(params => {
      let id: number = +params.get('id');
        if(id){
          this.pacienteService.getById(id).subscribe(pacientes => this.paciente = pacientes)
        }
    })
  }

  //Método para borrar la factura
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
            this.facturas = this.facturas.filter(fac => fac !== factura)
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

