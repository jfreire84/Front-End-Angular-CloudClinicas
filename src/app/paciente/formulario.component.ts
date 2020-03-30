import { Component, OnInit } from '@angular/core';
import { Paciente } from './paciente';
import {Router, ActivatedRoute} from '@angular/router';
import {PacienteService} from './paciente.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {

  constructor( private router : Router, private pacienteService : PacienteService, private activedRouter: ActivatedRoute) { }

  public pacienteNuevo: Paciente = new Paciente();
  

  ngOnInit() {
    this.cargarPaciente()
  }

  //Método que va a enseñar los datos del paciente al clicar en editar.
  cargarPaciente(): void{
      this.activedRouter.params.subscribe
      (params => {
        let id = params['id']
        if(id){
          this.pacienteService.getById(id).subscribe((pacienteNuevo) => this.pacienteNuevo = pacienteNuevo)
        }}
      )  

        }
  
        
  //Método de la ruta para crear nuevo paciente que se va a poner en el boton crear nuevo paciente.
  public create(): void {
    this.pacienteService.create(this.pacienteNuevo).subscribe(
      response => {
       this.router.navigate(['/pacientes']);
       Swal.fire('Nuevo Paciente', `Paciente ${this.pacienteNuevo.nombre} creado con éxito`, 'success');
      }
    );
    
  }

  //Método de la ruta para actualizar el cliente
  
  public update(): void{
    this.pacienteService.update(this.pacienteNuevo).subscribe(
      response => {
        this.router.navigate(['/pacientes']);
        Swal.fire('Paciente actualizado', `Paciente ${this.pacienteNuevo.nombre} actualizado con éxito`, 'success');
       }
    )
  }

  

}
