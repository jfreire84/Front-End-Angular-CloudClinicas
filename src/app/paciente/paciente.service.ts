import {HttpClient} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { Paciente } from './paciente';
import { Injectable } from '@angular/core';
import {HttpHeaders} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import Swal from 'sweetalert2';

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
        return this.http.post<Paciente>(this.urlGetPacientes, pacienteNuevo, {headers:this.httpHeader}).pipe(
            catchError(e => {
                console.error(e.error.mensaje);
                Swal.fire('Error al crear el paciente', e.error.mensaje, 'error' );
                return throwError(e);
            })
        )
    }

    //Método para buscar el cliente por id.
    getById(id): Observable<Paciente>{
        return this.http.get<Paciente>(`${this.urlGetPacientes}/${id}`);
    }

    //Método para editar el cliente.
    update(pacienteAct: Paciente): Observable<Paciente>{
        return this.http.put<Paciente>(`${this.urlGetPacientes}/${pacienteAct.id}`, pacienteAct, {headers:this.httpHeader}).pipe(
            catchError(e => {
                console.error(e.error.mensaje);
                Swal.fire('Error al editar el paciente', e.error.mensaje, 'error' );
                return throwError(e);
            })
        );
    }

    //Método para borrar el paciente.
    delete(id: number): Observable<Paciente>{
        return this.http.delete<Paciente>(`${this.urlGetPacientes}/${id}`, {headers:this.httpHeader}).pipe(
            catchError(e => {
                console.error(e.error.mensaje);
                Swal.fire('Error al eliminar el paciente', e.error.mensaje, 'error' );
                return throwError(e);
            })
        );
    }


}