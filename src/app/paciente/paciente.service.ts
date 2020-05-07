import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { Paciente } from './paciente';
import { Injectable } from '@angular/core';
import { formatDate } from '@angular/common';
import { HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';


@Injectable()
export class PacienteService {

    //En la clase Service creamos el método get para acceder a los datos de la base de datos.
    constructor(private http: HttpClient, private router: Router) { }

    //Guardamos la direccion de la api en una url.
    private urlGetPacientes: string = 'http://localhost:8080/api/clientes';
    private pacientes: Paciente[];

    private httpHeader = new HttpHeaders({ 'Content-Type': 'application/json' });

    //Guardamos en una variable el error si accede a un recurso que no está autorizado

    private noAutorizado(e): boolean{
        if(e.status == 401 || e.status == 403){
        this.router.navigate(['http://www.google.com']);
        return true;
        }
    }

    //Metodo para listar los pacientes guardados en la base de datos.
    getPacientes(): Observable<Paciente[]> {
        return this.http.get<Paciente[]>(this.urlGetPacientes).pipe(
            map(response => {
                let pacientes = response as Paciente[];
                return pacientes.map(paciente => {
                    paciente.fechanac = formatDate(paciente.fechanac, 'dd-MM-yyyy', 'en-US');
                    paciente.fecha = formatDate(paciente.fecha, 'dd-MM-yyyy', 'en-US');
                    return paciente;
                }
                )
            })
        );
    }

    //Metodo para crear un paciente nuevo.

    create(pacienteNuevo: Paciente): Observable<Paciente> {
        return this.http.post<Paciente>(this.urlGetPacientes, pacienteNuevo, { headers: this.httpHeader }).pipe(
            catchError(e => {

                //Manejamos los errores

                if(this.noAutorizado(e)){
                    return throwError(e);
                }

                if(e.status == 400){
                    return throwError(e);
                }

                console.error(e.error.mensaje);
                Swal.fire('Error al crear el paciente', e.error.mensaje, 'error');
                return throwError(e);
            })
        )
    }

    //Método para buscar el cliente por id.
    getById(id): Observable<Paciente> {
        return this.http.get<Paciente>(`${this.urlGetPacientes}/${id}`).pipe(

            catchError(e => {

                if(this.noAutorizado(e)){
                    return throwError(e);
                }

                console.error(e.error.mensaje);
                Swal.fire('Error al buscar el paciente', e.error.mensaje, 'error');
                return throwError(e);
            })


        );
    }

    //Método para editar el paciente.
    update(pacienteAct: Paciente): Observable<Paciente> {
        return this.http.put<Paciente>(`${this.urlGetPacientes}/${pacienteAct.id}`, pacienteAct, { headers: this.httpHeader }).pipe(
            catchError(e => {

                if(this.noAutorizado(e)){
                    return throwError(e);
                }

                console.error(e.error.mensaje);
                Swal.fire('Error al editar el paciente', e.error.mensaje, 'error');
                return throwError(e);
            })
        );
    }

    //Método para borrar el paciente.
    delete(id: number): Observable<Paciente> {
        return this.http.delete<Paciente>(`${this.urlGetPacientes}/${id}`, { headers: this.httpHeader }).pipe(
            catchError(e => {
                if(this.noAutorizado(e)){
                    return throwError(e);
                }

                console.error(e.error.mensaje);
                Swal.fire('Error al eliminar el paciente', e.error.mensaje, 'error');
                return throwError(e);
            })
        );
    }


}