import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Facturas } from '../modelo/facturas'; 
import { formatDate } from '@angular/common';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Paciente } from 'src/app/paciente/paciente';

@Injectable({
  providedIn: 'root'
})
export class FacturasService {

  //Url para acceder al backend.
  private urlEndPoint: string = "http://localhost:8080/api/facturas";

 
  private httpHeader = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) { 

  }

  //Método para buscar la factura por id
  getFactura(id: number): Observable<Facturas>{
        return this.http.get<Facturas>(`${this.urlEndPoint}/${id}`);
  }

  //Método para listar todas las facturas.

  getTodasFacturas(): Observable<Facturas[]> {
    return this.http.get<Facturas[]>(`${this.urlEndPoint}`).pipe(
        map(response => {
            let facturas = response as Facturas[];
            return facturas.map(fac => {
                fac.fechaCreacionFac = formatDate(fac.fechaCreacionFac, 'dd-MM-yyyy', 'en-US');
                return fac;
            }
            )
        })
    );
}

//Método para borrar la factura
delete(id: number): Observable<void> {
  return this.http.delete<void>(`${this.urlEndPoint}/${id}`);
}


}
