import { Component, OnInit } from '@angular/core';
import { Paciente } from './paciente';
import {Router} from '@angular/router';
import {PacienteService} from './paciente.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {

  constructor( private router : Router, private pacienteService : PacienteService) { }

  public pacienteNuevo: Paciente = new Paciente();
  

  ngOnInit(): void {
  }

  public create(): void {
    this.pacienteService.create(this.pacienteNuevo).subscribe(
      response => {
       this.router.navigate(['/pacientes']);
       Swal.fire('Nuevo Paciente', `Paciente ${this.pacienteNuevo.nombre} creado con éxito`, 'success');
      }
    );
    
  }

}
