import {HttpClient} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Paciente } from './paciente';
import { Injectable } from '@angular/core';
import {HttpHeaders} from '@angular/common/http';

@Injectable()
export class PacienteService {

    //En la clase Service creamos el método get para acceder a los datos de la base de datos.
    constructor(private http : HttpClient){}

    //Guardamos la direccion de la api en una url.
    private urlGetPacientes: string = 'http://localhost:8080/api/clientes';
    private pacientes: Paciente[];

    private httpHeader = new HttpHeaders({'Content-Type': 'application/json'});


    //Metodo para listar los pacientes guardados en la base de datos.
    getPacientes(): Observable<Paciente[]>{
        return this.http.get<Paciente[]>(this.urlGetPacientes);
    }

    //Metodo para crear un paciente nuevo.
    create(pacienteNuevo: Paciente): Observable<Paciente>{
        return this.http.post<Paciente>(this.urlGetPacientes, pacienteNuevo, {headers:this.httpHeader})
    }
}