import { Component, OnInit } from '@angular/core';
import {PacienteService} from './paciente.service'
import { Paciente } from './paciente';
import Swal from "sweetalert2";

@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.component.html',
  styleUrls: ['./paciente.component.css']
})

export class PacienteComponent implements OnInit {

  pacientes: Paciente[];

  constructor(private pacienteService: PacienteService) { }

    ngOnInit(): void {
      this.pacienteService.getPacientes().subscribe(
        pacientes => this.pacientes = pacientes
      )
  }

  

  //Método de la ruta para borrar el cliente.

  delete(paciente: Paciente): void{

    //Botón si está seguro que desea eliminar el paciente de Sweetalert2.
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: '¿Estás seguro?',
      text:  `¿Seguro que deseas borrar el paciente ${paciente.nombre} ${paciente.apellidos}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this.pacienteService.delete(paciente.id).subscribe(
          response => {
            this.pacientes = this.pacientes.filter(paci => paci !== paciente)
            swalWithBootstrapButtons.fire(
              'Borrado!',
              `El ${paciente.nombre} ${paciente.apellidos} ha sido borrado con éxito`,
              'success'
            )
          }
        )
        
      } 
      
    })


  }

}
