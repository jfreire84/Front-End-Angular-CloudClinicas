import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Facturas } from '../modelo/facturas'; 
import { formatDate } from '@angular/common';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Paciente } from 'src/app/paciente/paciente';
import { Tratamiento } from '../modelo/tratamiento';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class FacturasService {

  //Url para acceder al backend.
  private urlEndPoint: string = "http://localhost:8080/api/facturas";
  private urlEndPointTratamientos: string = "http://localhost:8080/api/tratamientos";

 
  private httpHeader = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient, private router: Router) { 

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
/*
delete(id: number): Observable<void> {
  return this.http.delete<void>(`${this.urlEndPoint}/${id}`);
}
*/

delete(id: number): Observable<void> {
  return this.http.delete<void>(`${this.urlEndPoint}/${id}`, { headers: this.httpHeader });

}





//Método para crear la factura
crearFactura(factura: Facturas): Observable<Facturas> {
  return this.http.post<Facturas>(this.urlEndPoint, factura);
}

//Método para filtar los tratamientos por nombre.
filtrarTratamientos(texto: string): Observable<Tratamiento[]>{
  return this.http.get<Tratamiento[]>(`${this.urlEndPointTratamientos}/filtrar/${texto}`)
}


  //Método para listar todas los tratamientos

  getTratamientos(): Observable<Tratamiento[]> {
    return this.http.get<Tratamiento[]>(`${this.urlEndPointTratamientos}`).pipe(
        map(response => {
            let tratamiento = response as Tratamiento[];
                return tratamiento;
            })
    );
}

//Método para crear el tratamiento
crearTratamiento(tratamiento: Tratamiento): Observable<Tratamiento> {
  return this.http.post<Tratamiento>(this.urlEndPointTratamientos, tratamiento);
}

/*
private noAutorizado(e): boolean{
  if(e.status == 401 || e.status == 403){
  this.router.navigate(['http://www.google.com']);
  return true;
  }
}

createTra(tratamientoNuevo: Tratamiento): Observable<Tratamiento> {
  return this.http.post<Tratamiento>(this.urlEndPointTratamientos, tratamientoNuevo).pipe(
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
*/


}
