import { Component, OnInit } from '@angular/core';
import {PacienteService} from './paciente.service'
import { Paciente } from './paciente';

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

}
