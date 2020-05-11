import { Component, OnInit } from '@angular/core';
import { FacturasService } from './services/facturas.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Tratamiento } from './modelo/tratamiento';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listado-tratamiento-form',
  templateUrl: './listado-tratamiento-form.component.html',
  styleUrls: ['./listado-tratamiento-form.component.css']
})
export class ListadoTratamientoFormComponent implements OnInit {

  public tratamientoNuevo: Tratamiento = new Tratamiento();

  constructor( private router : Router, private tratamientoService : FacturasService, private activedRouter: ActivatedRoute) { }

  ngOnInit(): void {
  }

  public create(): void {
    console.log(this.tratamientoNuevo);
    this.tratamientoService.crearTratamiento(this.tratamientoNuevo).subscribe(
      response => {
       this.router.navigate(['/tratamientos']);
       Swal.fire('Nuevo Tratamiento', `Tratamiento ${this.tratamientoNuevo.nombre} creado con éxito`, 'success');
      }
      
    );
    console.log(this.tratamientoNuevo);
  }

}
