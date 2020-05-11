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

  
  

  }

