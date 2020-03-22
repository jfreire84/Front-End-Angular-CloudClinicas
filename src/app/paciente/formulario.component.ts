import { Component, OnInit } from '@angular/core';
import { Paciente } from './paciente';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {

  constructor() { }

  public pacienteNuevo: Paciente = new Paciente();

  ngOnInit(): void {
  }

  public create() {
    console.log("Boton funciona");
    console.log(this.pacienteNuevo);
  }

}
