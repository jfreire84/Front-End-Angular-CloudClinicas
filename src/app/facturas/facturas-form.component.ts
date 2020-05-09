import { Component, OnInit } from '@angular/core';
import { Facturas } from './modelo/facturas';
import { Tratamiento } from './modelo/tratamiento';
import { PacienteService } from '../paciente/paciente.service';
import { FacturasService } from './services/facturas.service';
import { Router, ActivatedRoute } from '@angular/router';
import { flatMap } from 'rxjs/operators';
import { ItemFactura } from './modelo/item-factura';
import {FormControl} from '@angular/forms';
import {Observable, from} from 'rxjs';
import {map} from 'rxjs/operators';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';



@Component({
  selector: 'app-facturas-form',
  templateUrl: './facturas-form.component.html',
  styleUrls: ['./facturas-form.component.css']
})
export class FacturasFormComponent implements OnInit {

  titulo: string = 'Nueva Factura';
  factura: Facturas = new Facturas();

  myControl = new FormControl();
  //filteredOptions: Observable<Tratamiento[]>;

  autocompleteControl = new FormControl();

  productosFiltrados: Observable<Tratamiento[]>;

  constructor(private pacienteService: PacienteService,
    private facturaService: FacturasService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    
    this.activatedRoute.paramMap.subscribe(params => {
      let pacienteId = +params.get('pacienteId');
      this.pacienteService.getById(pacienteId).subscribe(paciente => this.factura.paciente = paciente);
    
    })

    this.productosFiltrados = this.myControl.valueChanges
    .pipe(
      map(value => typeof value === 'string'? value: value.nombre),
      flatMap(value => value ? this._filter(value): [])
    );
  }



  private _filter(value: string): Observable<Tratamiento[]> {
    const filterValue = value.toLowerCase(); 
    return this.facturaService.filtrarTratamientos(filterValue);
  }

  //Método para mostrar el nombre del Tratamiento dentro del la barra al seleccionaren el filtro.
  mostrarNombreTratamiento(tratamiento?: Tratamiento): string | undefined {
    return tratamiento ? tratamiento.nombre: undefined;
  }

  //Método que va a manejar el objeto seleccionado en el buscador.
  seleccionarTraramiento(event: MatAutocompleteSelectedEvent): void{
    let tratamiento = event.option.value as Tratamiento;
    console.log(tratamiento);

    let nuevaLinea = new ItemFactura();
    nuevaLinea.tratamiento = tratamiento;
    //Añadimos la nueva linea a la factura
    this.factura.lineasFactura.push(nuevaLinea);

    //Para poder a volver a buscar otro productos y agregar otra linea.
    //Limpiamos el autocomplete.
    this.autocompleteControl.setValue('');
    event.option.focus();
    event.option.deselect();


  }
 
  }


